import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/logo3.png";

function ForgotPw() {
  const [email, setEmail] = useState("");
  const[emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

   
    // ---- Email Error Message ----
    if(!email){
      setEmailError("Email is required.");
      isValid = false;
    }
    else if(!/\S+@\S+\.\S+/.test(email)){
      setEmailError("Incorrect Email.");
      isValid = false;
    }
    else{
      setEmailError("");
    }

    
  return isValid;

  }

  const handleSubmit = async () => {
    
    
    const isValid = validateInputs();

    if (!isValid) {
        return;
    }
      

    try {
      const res = await axios.post(
        `http://localhost:8080/users/forgot-password?email=${email}`
      );

      toast.success("We've send you a reset link.");
      navigate("/login");
      
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
          toast.error(error.response.data.message)
       }else{
          toast.error("Eror Reset Link.")

       }
       
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)",
        p: 1
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 3,
          p: 4,
        }}
      >
        {/* Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 32 }}
          />
          {/* <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Forgot Password
          </Typography> */}
        </Box>

        {/* Message */}
        <Typography sx={{ mb: 3, color: "#555" }}>
          Enter your email address below and we'll send you a link to reset your password.
        </Typography>

        {/* Email Input */}
        <TextField
          label="Email"
          fullWidth
          value={email}
          helperText={emailError}
          error={!!emailError}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: "#3a9ad6", py: 1.2 }}
          onClick={handleSubmit}
        >
          Send Reset Link
        </Button>
      </Box>
    </Box>
  );
}

export default ForgotPw;