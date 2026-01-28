import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from "../../assets/logo2.png";

function TwoFactorQrImage(){
  const location = useLocation();
  const navigate = useNavigate();
  const { twoFaQr, email} = location.state || {};

  const [verificationCode, setVerificationCode] = useState('');

  const handleNumberOnly = (e) => {
        const numberValue = e.target.value.replace(/\D/g, ""); // restricted to number only
        setVerificationCode(numberValue);
        
    };

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:8080/EventApi/authentication/verification", {
        email,
        verificationCode,
      });
      
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
         sx={{background: "linear-gradient(to top, #20002c, #cbb4d4)", 
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
            gap: "5px",
            mb: 3 }}
        >
                <Box
                    component="img"
                    src={logo}
                    alt="Platform logo"
                    sx={{ height: 25 }}
                
                />
                <Typography
                
                sx={{
                fontWeight: 600,
                fontSize: "13px",
                color: "#13b977"
                }}
            >
                Activate Two-Steps Authentication
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
                    onChange={handleNumberOnly}
                    sx={{ m:3}}
                />
                

        </Box>
            <Box sx={{ mt: 2,  }}>
                <Button variant="contained" onClick={handleVerify} 
                sx={{bgcolor: "#572c67",
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