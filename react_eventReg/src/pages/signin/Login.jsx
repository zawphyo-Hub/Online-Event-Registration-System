import {Box, Typography, Button, Stack, Divider, TextField} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo3.png";
import Googlelogo from "../../assets/google.png";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {

  const[emailError, setEmailError] = useState("");
  
  const[passwordError, setPasswordError] = useState("");
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  //---------- For Login Fail Attempt Block -----------------
  const [remainingTime, setRemainingTime] = useState(0);
  const [blockedEmail, setBlockedEmail] = useState("");
  const maxAttempt = 5;
  const blockTime = 5 * 60 * 1000; // 5 mins


  //
  useEffect(() => {
    const savedBlockedEmail = localStorage.getItem("lastBlockedEmail");

    if (savedBlockedEmail) {
      setBlockedEmail(savedBlockedEmail);
      setEmail(savedBlockedEmail);

      const state = getLoginState(savedBlockedEmail);

      if (state.blockedUntil && Date.now() < state.blockedUntil) {
        const remaining = Math.ceil((state.blockedUntil - Date.now()) / 1000);
        setRemainingTime(remaining);
      } else {
        localStorage.removeItem("lastBlockedEmail");
        setRemainingTime(0);
      }
    }
  }, []);

  // count login block time 
  useEffect(() => {
    if (!blockedEmail) return;

    const interval = setInterval(() => {
      const state = getLoginState(blockedEmail);

      if (state.blockedUntil && Date.now() < state.blockedUntil) {
        const remaining = Math.ceil((state.blockedUntil - Date.now()) / 1000);
        setRemainingTime(remaining);
      } else {
        setRemainingTime(0);
        setBlockedEmail("");
        localStorage.removeItem("lastBlockedEmail");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [blockedEmail]);

  // login block time format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const getStorageKey = (email) => `loginBlockState_${email.toLowerCase()}`;

  const getLoginState = (email) => {
    const state = JSON.parse(localStorage.getItem(getStorageKey(email))) || {
      attempts: 0,
      blockedUntil: null,
    };

    // reset if block already expired
    if (state.blockedUntil && Date.now() >= state.blockedUntil) {
      const resetState = { attempts: 0, blockedUntil: null };
      localStorage.setItem(getStorageKey(email), JSON.stringify(resetState));
      return resetState;
    }

    return state;
  };

  const setLoginState = (email, state) => {
    localStorage.setItem(getStorageKey(email), JSON.stringify(state));
  };
  //------------------------------------------------------------

  const validateInputs = () => {
    let isValid = true;

   
    // ---- Email Error Message ----
    if(!email){
      setEmailError("Email is required.");
      isValid = false;
    }else if(!/\S+@\S+\.\S+/.test(email)){
      setEmailError("Incorrect Email.");
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

      
      const state = getLoginState(email);

           
      try {
        const response =  await axios.post('http://localhost:8080/EventApi/authentication/login', 
          {email, password});

          // if success, reset attempts
          setLoginState(email, { attempts: 0, blockedUntil: null });
          localStorage.removeItem("lastBlockedEmail");
          setBlockedEmail("");
          setRemainingTime(0);
 
          const data = response.data;

          // if MFA enabled AND QR not verified
          if (data.mfaEnabled && data.secretQrCode) {
            navigate("/twofaqr", { 
              state: { 
                email: data.email, 
                twoFaQr: data.secretQrCode 
              } 
            });
          }

          // mfa verified and enabled
          else if (data.mfaEnabled) {
            navigate("/totpverify", { state: { email: data.email } });
          }
         
          else {
            
            // store user info in local storage
            localStorage.setItem("user", JSON.stringify(response.data));
            // console.log("Stored user:", JSON.parse(localStorage.getItem("user")));

            toast.success("Login successful!");
            navigate("/mainpage");

            
          }
       
        
    } catch (error) {

        const latestState = getLoginState(email);
        let newAttempts = latestState.attempts + 1;
        let blockedUntil = null;

        if (newAttempts >= maxAttempt) {
          blockedUntil = Date.now() + blockTime;

          setLoginState(email, {
            attempts: newAttempts,
            blockedUntil,
          });

          localStorage.setItem("lastBlockedEmail", email.trim().toLowerCase());
          setBlockedEmail(email.trim().toLowerCase());
          setRemainingTime(Math.ceil((blockedUntil - Date.now()) / 1000));

          toast.error("Too Many Login Attempts. Try Again Later.");
        } else {
          setLoginState(email, {
            attempts: newAttempts,
            blockedUntil: null,
          });

          if (error.response?.data?.message) {
            toast.error(`${error.response.data.message} (${newAttempts}/${maxAttempt})`);
          } else {
            toast.error(`Login failed! Attempt ${newAttempts} of ${maxAttempt}`);
          }
        }
      }
    };




  return (
    <Box
      sx={{
        minHeight: "100vh",
        // backgroundImage: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);",
        background:
            "linear-gradient(135deg, #0f172a 0%, #0f3d68 45%, #0b84d8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1
        
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
              to="/forgot-pw"
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
            disabled={remainingTime > 0}
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
        {remainingTime > 0 && (
          <Typography
            sx={{
              mt: 1,
              textAlign: "center",
              fontSize: 13,
              color: "red"
            }}
          >
            Try again in {formatTime(remainingTime)}
          </Typography>
        )}

        
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