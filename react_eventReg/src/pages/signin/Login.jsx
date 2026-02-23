import {Box, Typography, Button, Stack, Divider, TextField} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo3.png";
import Googlelogo from "../../assets/google.png";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {

  const[emailError, setEmailError] = useState("");
  
  const[passwordError, setPasswordError] = useState("");
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

   
    // ---- Email Error Message ----
    if(!email){
      setEmailError("Email is required.");
      isValid = false;
    }
    else{
      setEmailError("");
    }

    // ---- Password Error ----
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } 
    else {
      setPasswordError("");
    }
  return isValid;

  }


  // Google login handle
  const handleGoogleLogin = () => {
      window.location.href = "http://localhost:8080/oauth2/authorization/google"

  }

  const handleLogin = async (event) => {

     
      event.preventDefault();
      
      const isValid = validateInputs();

      if (!isValid) {
        return;
      }
      
      
      try {
        const response =  await axios.post('http://localhost:8080/EventApi/authentication/login', 
          {email, password});

         

                
        if (response.data.mfaEnabled) {
          
          navigate("/totpverify", { state: { email } }); // send email
        } 
        else {
          
          // store user info in local storage
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("Stored user:", JSON.parse(localStorage.getItem("user")));

          toast.success("Login successful!");
          navigate("/mainpage");

          
        }
       
        
    } catch (error) {
      
       if(error.response && error.response.data && error.response.data.message){
          toast.error(error.response.data.message)
       }else{
          toast.error("Login Failed! Error.")

       }
       
    }
    };




  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      
      <Box
        sx={{
          bgcolor: "#fff",
          width: "100%",
          maxWidth: "370px",
          borderRadius: 3,
          
          p: 4,
        }}
      >
        
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            component="img"
            src={logo}
            alt="Platform logo"
            sx={{ height: 32 }}
            
          />
        </Box>

        <Box
          component="form"
          onSubmit={handleLogin}
        >

          


          {/* Form */}
          <Stack spacing={2}>
            <TextField
              label="Email"
              placeholder="example@gmail.com"
              value={email}
              helperText={emailError}
              error={Boolean(emailError)}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              helperText={passwordError}
              error={Boolean(passwordError)}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              fullWidth
            />
          </Stack>

          {/* Forgot password */}
          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Typography
              component={Link}
              to="/forgot-password"
              sx={{
                fontSize: 14,
                color: "black",
                
              }}
            >
              Forgot your password?
            </Typography>
          </Box>

          {/* Sign in button */}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
              fontSize: "14px",
              
              bgcolor: "#3a9ad6"
            }}
          >
            Sign in
          </Button>
        </Box>

        
        <Divider sx={{ my: 2, fontFamily: "sans-serif" }}>Or</Divider>

        
        <Button
          variant="outlined"
          fullWidth
          sx={{color: "black", fontSize: "14px", borderColor: "#572c67"}}
          onClick={handleGoogleLogin}
          startIcon={
            <Box
              component="img"
              src={Googlelogo}
              
              sx={{ height: 17,  }}
            />
          }
        >
          Sign in with Google
        </Button>

        
        <Typography
          sx={{ textAlign: "center", mt: 3, fontSize: 14 }}
        >
          Don't have an account?
          <Typography
            component={Link}
            to="/signup"
            sx={{
              fontSize: 14,
              color: "black",
              pl: "3px"
            }}
          >
            Sign up
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;