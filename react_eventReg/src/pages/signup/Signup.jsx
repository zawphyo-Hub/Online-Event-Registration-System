import {Box, Typography, Button, Stack, Divider, TextField, Checkbox, FormControl, FormLabel, FormControlLabel} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo3.png";
import Googlelogo from "../../assets/google.png";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Signup(){

  const[username, setUserName] = useState("");
  const[password, setPassword] = useState("");
  const[email, setEmail] = useState("");
  const[confirmPassword, setConfirmPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);

  const[emailError, setEmailError] = useState("");
  const[usernameError, setUserNameError] = useState("");
  const[passwordError, setPasswordError] = useState("");
  const[confirmPasswordError, setConfirmPasswordError] = useState("");
  const[passwordRequirements, setPasswordRequirements] = useState(false);

  const navigate = useNavigate();


  const validateInputs = () => {
    let isValid = true;

    // ---- Name Error Message ----
    if(!username){
      setUserNameError("Username is required.");
      isValid = false;
    }

    // ---- Email Error Message ----
    if(!email){
      setEmailError("Email is required.");
      isValid = false;
    }
    else if(!/\S+@\S+\.\S+/.test(email)){
      setEmailError("Incorrect Email.");
      isValid = false;
    }else{
      setEmailError("");
    }

    // ---- Password Error ----
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


    // ---- Confirm Password ----
    if(!confirmPassword){
      setConfirmPasswordError("Confirm password is required.")
      isValid = false;
    } else if(confirmPassword !== password){
      setConfirmPasswordError("Password do not match.")
      isValid = false;

    }else{
      setConfirmPasswordError("")
    }

    return isValid;

    
  }

  const handleCreateAccountButton = async (e) => {
    e.preventDefault();

    const isValid = validateInputs();
    if (!isValid) {
      return; // prevent submit if invalid inputs
    }

    try {
        const response = await axios.post("http://localhost:8080/EventApi/authentication/registration", {
          username, email, password, mfaEnabled,
        })

            
        

        // Check if two-fa enabled, if true then return QR code
        if (response.data.mfaEnabled && response.data.secretQrCode) {
          
          navigate('/twofaqr', {
            state: {
              email,
              twoFaQr: response.data.secretQrCode,
             
            },
          });

        } else {
            // Store user info in localStorage
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("Stored user:", JSON.parse(localStorage.getItem("user")));
          toast.success("Account Successfully Created.");
          navigate("/mainpage");
        }
                
       } catch (error) {
        console.log("Full error:", error.response);
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);  // Show the backend message error
        } else {
            toast.error("Registration failed! Error.");
        }
        
       }

  }
  


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
          m: "20px", 
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
          onSubmit={handleCreateAccountButton}

        >
            <Stack spacing={2}>
            <FormControl>
                <TextField
                  label="Username"
                  name="username"
                  value={username}
                  helperText={usernameError}
                  onChange={(e) => setUserName(e.target.value)}
                  error={Boolean(usernameError)}
                  fullWidth
                  placeholder="Enter your name"
                  
                />
            </FormControl>

            <FormControl>
                <TextField
                  label="Email"
                  
                  name="email"
                  value={email}
                  helperText={emailError}
                  error={Boolean(emailError)}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  placeholder="Enter your email"
                                    
                />
            </FormControl>

            <FormControl>
                <TextField
                label="Password"
                name="password"
                value={password}
                helperText={passwordError}
                error={Boolean(passwordError)}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordRequirements(true);
                  setPasswordError("");
                }}
                type="password"
                placeholder="Enter your password"
                fullWidth
                />

            </FormControl>

            {/* ---- password requirements rules ---- */}
            {passwordRequirements && (
            <Box sx={{ mt: 1 }}>
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


                

            <FormControl>
                <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    helperText={confirmPasswordError}
                    error={Boolean(confirmPasswordError)}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    fullWidth
                />

            </FormControl>

           <FormControlLabel
           sx={{color: "black"}}
            control={
              <Checkbox
                checked={mfaEnabled}
                onChange={(e) => setMfaEnabled(e.target.checked)}
                sx={{padding: "0", pr: "2px"}}           
                color="primary"
              />
            }
            label={
                <Typography sx={{ fontSize: "14.6px" }}>
                Enable Two-Factor Authentication
                </Typography>
            }
           />
               
            </Stack>

            
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
          Create Account
        </Button>

        </Box>
              


        
        <Divider sx={{ my: 2, fontFamily: "sans-serif" }}>Or</Divider>
        
        <Button
          variant="outlined"
          fullWidth
          sx={{color: "black", fontSize: "14px", borderColor: "#572c67"}}
          startIcon={
            <Box
              component="img"
              src={Googlelogo}
              
              sx={{ height: 17,  }}
            />
          }
        >
          Sign Up with Google
        </Button>

        
        <Typography
          sx={{ textAlign: "center", mt: 3, fontSize: 14 }}
        >
          Don't have an account?
          <Typography
            component={Link}
            to="/login"
            sx={{
              fontSize: 14,
              color: "black",
              pl: "3px"
            }}
          >
            Sign in
          </Typography>
        </Typography>
      </Box>


    </Box>
  );
}

export default Signup;