import { useState } from "react";
import { TextField, Button, Typography, Box } from '@mui/material';
import { toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import logo from "../../assets/logo3.png";


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
         sx={{backgroundImage: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);",
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
                        Multi-Authentication
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
                    sx={{bgcolor: "#3a9ad6",
                
                        
                        
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