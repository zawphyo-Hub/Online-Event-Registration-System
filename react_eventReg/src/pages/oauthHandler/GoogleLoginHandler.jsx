import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box } from "@mui/material";


function GoogleLoginHandler() {
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; 
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
   
    const email = params.get("email");
    const username = params.get("username");
    const id = params.get("id");

    if (email) {
      const userData = {
        userId: id,
        username: username,
        email: email,
        mfaEnabled: false
      };


      localStorage.setItem("user", JSON.stringify(userData));

      setTimeout(() => {
        navigate("/mainpage", { state: { loginSuccess: true } });
      }, 1000);
      
      
            

    } else {
     
      toast.error("Login Error.");
      navigate("/login", { state: { loginError: true } });
    }
  }, [navigate]);

  return <Box 
      sx={{fontSize: "17px", display: "flex",
        justifyContent: "center", mt: "30px", 
      }}
      >
        Logging in...
      </Box>
}

export default GoogleLoginHandler; 