import { useState } from "react";
import { TextField, Button, Typography, Box } from '@mui/material';
import { toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import logo from "../../assets/logo2.png";


function TotpVerification(){
    
    const navigate = useNavigate();
    const location = useLocation();
    const [verificationCode, setVerificationCode] = useState("");
    const { email } = location.state || {};

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

            // Store user info in localStorage
            localStorage.setItem("user", JSON.stringify(res.data));
            
            toast.success("Verification successful.");
            
            navigate("/mainpage");
        
        } catch (err) {
        
        toast.error(err.response?.data?.message || "Verification Error.");
        }
    };

     if (!email) {
        return (
          <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
            Access Blocked.
          </Typography>
        );
      }
    
        
    return(
       
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
                {maxWidth: 460,
                
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
                        Second-Step Authentication
                    </Typography>
                </Box>
                <Typography sx={{mt: "15px"}}>
                    Enter time-based one time password from your Authenticator.
                </Typography>
                    
                    <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        mt: "25px",
                        mb: "15px"
                        
                    }}
                    >
                    <TextField
                        label="6-digit code"
                        variant="outlined"
                        
                        value={verificationCode}
                        onChange={handleNumberOnly}
                        
                    />
                    
                    <Button 
                    variant="contained" 
                    onClick={handleVerify}
                    sx={{bgcolor: "#572c67",
                
                        
                        
                    }}
                    
                    >
                        Verify
                    </Button>
                    </Box>
                    
            </Box>
            
        
        </Box> 
        
       
     
    )
}
export default TotpVerification;