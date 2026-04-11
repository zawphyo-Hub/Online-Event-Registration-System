import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from "../../assets/logo3.png";

function TwoFactorQrImage(){
  const location = useLocation();
  const navigate = useNavigate();
  const { twoFaQr, email} = location.state || {};

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

  const handleNumberOnly = (e) => {
        const numberValue = e.target.value.replace(/\D/g, ""); // restricted to number only
        setVerificationCode(numberValue);
        
    };

  const validateInputs = () => {
    let isValid = true;

   
    // ---- Email Error Message ----
    if(!verificationCode){
      setVerificationCodeError("Verification code is required.");
      isValid = false;
    }
    else{
      setVerificationCodeError("");
    }

    
  return isValid;

  }

  const handleVerify = async () => {

    const isValid = validateInputs();

      if (!isValid) {
        return;
      }

    try {
      const res = await axios.post("http://localhost:8080/EventApi/authentication/verification", {
        email,
        verificationCode,
      });

        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(res.data));
              
        toast.success("Two-Factor Authentication has been activated.");
         
        navigate("/mainpage");
     
    } catch (err) {
      toast.error(err.response?.data?.message || "Error Multi-Factor Authentication.");
      
    }
  };

  if (!twoFaQr || !email) {
    return (
      <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
        Access Blocked.
      </Typography>
    );
  }

  return (

    <Box 
         sx={{
          // backgroundImage: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);",
           background:
            "linear-gradient(135deg, #0f172a 0%, #0f3d68 45%, #0b84d8 100%)",
            minHeight: "100vh",
            textAlign: "center", 
            display: "flex", 
            justifyContent: "center", alignItems: "center"
            
         }}
    >
    <Box 
      
    sx={
        {
        maxWidth: 460,
            
        margin: "10px",
        p:3,
        backgroundColor: "white",
        borderRadius: 2,
        
        boxShadow: 1}
        }
      >
        <Box sx={{ display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5px",
              mb: 3 }}
          >
                <Box
                  component="img"
                  src={logo}
                  alt="Platform logo"
                  sx={{ height: "30px" }}
                  
                />
                <Typography
                  
                  sx={{
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#8b8b8b"
                  }}
              >
                  Activate Multi-Authentication
              </Typography>
          </Box>

        <Typography sx={{fontSize: "17px"}}>
            Scan this QR code with your authenticator app to enable two-factor authentication.
        </Typography>

        <Box sx={{display: "flex", mt: 3}}>
            <Box 
                component="img"
                src={twoFaQr}
                sx={{ width: 200, height: 200}}      
            />
            
                
                <TextField
                    label="6-digit code"
                    variant="outlined"
                    value={verificationCode}
                    helperText={verificationCodeError}
                    error={Boolean(verificationCodeError)}
                    onChange={handleNumberOnly}
                    sx={{ m:3}}
                />
                

        </Box>
            <Box sx={{ mt: 2,  }}>
                <Button variant="contained" onClick={handleVerify} 
                sx={{bgcolor: "#3a9ad6",
                    width: "100%"
                }}>
                Verify Code
                </Button>
            </Box>

        
    </Box>
    </Box>
  );

}
export default TwoFactorQrImage;