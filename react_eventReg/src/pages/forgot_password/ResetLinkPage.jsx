import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/logo3.png";

function ResetLinkPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const[passwordRequirements, setPasswordRequirements] = useState(false);

  const validateInputs = () => {
    let isValid = true;

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 8) {
      
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmError("Confirm password is required.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmError("");
    }

    return isValid;
  };

  const handleReset = async () => {
    const isValid = validateInputs();
    if (!isValid) return;

    try {
      await axios.post(
        `http://localhost:8080/users/reset-password`,
        null,
        {
          params: {
            token: token,
            newPassword: password,
          },
        }
      );

      toast.success("Password Reset.");
      navigate("/login"); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) 
        {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error resetting password.");
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
        
        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 32 }}
          />
          {/* <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Reset Password
          </Typography> */}
        </Box>

        
        <Typography sx={{ mb: 3, color: "#555" }}>
          Enter your new password to reset your account password.
        </Typography>

        
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={password}
          helperText={passwordError}
          error={!!passwordError}
          onChange={(e) => 
            {setPassword(e.target.value);
            setPasswordRequirements(true);
            setPasswordError("");
            
            }}
          sx={{mb: "10px" }}
        />

        {/* ---- password requirements rules ---- */}
        {passwordRequirements && (
        <Box sx={{ mt: "5px", mb: "10px" }}>
            <Typography
            sx={{
                fontSize: 13,
                color: password.length >= 8 ? "success.main" : "error.main",
            }}
            >
            * At least 8 characters
            </Typography>

            <Typography
            sx={{
                fontSize: 13,
                color: /[A-Z]/.test(password) ? "success.main" : "error.main",
            }}
            >
            * At least one uppercase case
            </Typography>

        </Box>
        )}
        



        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          helperText={confirmError}
          error={!!confirmError}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, bgcolor: "#3a9ad6", py: 1.2 }}
          onClick={handleReset}
        >
          Reset Password
        </Button>
      </Box>
    </Box>
  );
}

export default ResetLinkPage;