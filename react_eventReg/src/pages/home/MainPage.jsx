import { Box, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

function MainPage(){
    const location = useLocation();
    const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) return;
    
    if (location.state?.loginSuccess) {
      hasShownToast.current = true;
      toast.success("Login Successful.");
    }

    if (location.state?.loginError) {
      hasShownToast.current = true;
      toast.error("Login Error.");
    }
  }, [location.state]);
    return(
        <Box >
            <Navbar />
            <Typography>Hello. This is home Page. </Typography>
            
            
           
        </Box>
    )
    

}
export default MainPage;