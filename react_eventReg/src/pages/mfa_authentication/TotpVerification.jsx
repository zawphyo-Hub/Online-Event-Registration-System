import { useState, useEffect } from "react";
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


    const[verifyError, setVerifyError] = useState("");
    const validateInputs = () => {
        let isValid = true;

    
        // ---- Email Error Message ----
        if(!verificationCode){
            setVerifyError("This field is required.");
            isValid = false;
        }
        else{
         setVerifyError("")
        }
        return isValid;

    }

    // ---------- TOTP block time ----------
    const [remainingTime, setRemainingTime] = useState(0);
    const [blockedEmail, setBlockedEmail] = useState("");
    const maxAttempt = 5;
    const blockTime = 5 * 60 * 1000; // 5 mins

    const getStorageKey = (email) => `totpBlockState_${email.toLowerCase()}`;

    const getTotpState = (email) => {
        const state = JSON.parse(localStorage.getItem(getStorageKey(email))) || {
        attempts: 0,
        blockedUntil: null,
        };

        if (state.blockedUntil && Date.now() >= state.blockedUntil) {
        const resetState = { attempts: 0, blockedUntil: null };
        localStorage.setItem(getStorageKey(email), JSON.stringify(resetState));
        return resetState;
        }

        return state;
    };

    const setTotpState = (email, state) => {
        localStorage.setItem(getStorageKey(email), JSON.stringify(state));
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };


    // restore block state on page load
    useEffect(() => {
        if (!email) return;

        const state = getTotpState(email);

        if (state.blockedUntil && Date.now() < state.blockedUntil) {
        setBlockedEmail(email.toLowerCase());
        const remaining = Math.ceil((state.blockedUntil - Date.now()) / 1000);
        setRemainingTime(remaining);
        }
    }, [email]);

    // timer for unblocking the page
    useEffect(() => {
        if (!blockedEmail) return;

        const interval = setInterval(() => {
        const state = getTotpState(blockedEmail);

        if (state.blockedUntil && Date.now() < state.blockedUntil) {
            const remaining = Math.ceil((state.blockedUntil - Date.now()) / 1000);
            setRemainingTime(remaining);
        } else {
            setRemainingTime(0);
            setBlockedEmail("");
        }
        }, 1000);

        return () => clearInterval(interval);
    }, [blockedEmail]);

    const handleNumberOnly = (e) => {
        const numberValue = e.target.value.replace(/\D/g, ""); // restricted to number only
        setVerificationCode(numberValue);
        
    };
    const handleVerify = async () => {

        const isValid = validateInputs();

        if (!isValid) {
            return;
        }
        const state = getTotpState(email);

        // blocked
        if (state.blockedUntil && Date.now() < state.blockedUntil) {
        const remaining = Math.ceil((state.blockedUntil - Date.now()) / 1000);
        setBlockedEmail(email.toLowerCase());
        setRemainingTime(remaining);
        toast.error(`Too many attempts. Try again in ${formatTime(remaining)}.`);
        return;
        }
        
        try {
        const res = await axios.post("http://localhost:8080/EventApi/authentication/verification", {
            email,
            verificationCode,
        });

            // if success, reset attempts
            setTotpState(email, { attempts: 0, blockedUntil: null });
            setBlockedEmail("");
            setRemainingTime(0);

            // Store user info in localStorage
            localStorage.setItem("user", JSON.stringify(res.data));
            
            toast.success("Verification successful.");
            
            navigate("/mainpage");
        
        } catch (err) {
        const latestState = getTotpState(email);
        let newAttempts = latestState.attempts + 1;
        let blockedUntil = null;

        if (newAttempts >= maxAttempt) {
            blockedUntil = Date.now() + blockTime;

            setTotpState(email, {
            attempts: newAttempts,
            blockedUntil,
            });

            setBlockedEmail(email.toLowerCase());
            setRemainingTime(Math.ceil((blockedUntil - Date.now()) / 1000));

            toast.error("Too many incorrect codes. Try again in 5 minutes.");
        } else {
            setTotpState(email, {
            attempts: newAttempts,
            blockedUntil: null,
            });

            if (err.response?.data?.message) {
            toast.error(`${err.response.data.message} (${newAttempts}/${maxAttempt})`);
            } else {
            toast.error(`Verification Failed. Attempt ${newAttempts} of ${maxAttempt}`);
            }
            
        }
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
                        helperText={verifyError}
                        error={Boolean(verifyError)}
                        value={verificationCode}
                        onChange={handleNumberOnly}
                        
                    />
                    
                    <Button 
                    variant="contained" 
                    onClick={handleVerify}
                    sx={{bgcolor: "#3a9ad6"}}
                    disabled={remainingTime > 0}         
                        
                                        
                    >
                        Verify
                    </Button>
                    </Box>

                    {remainingTime > 0 && (
                    <Typography
                        sx={{
                        mt: 1,
                        textAlign: "center",
                        fontSize: 13,
                        color: "red",
                        }}
                    >
                        Try again in {formatTime(remainingTime)}
                    </Typography>
                    )}
                    
            </Box>
            
        
        </Box> 
        
       
     
    )
}
export default TotpVerification;