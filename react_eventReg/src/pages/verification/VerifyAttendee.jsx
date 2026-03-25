import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo3.png";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import correctIcon from "../../assets/check.png";

function VerifyAttendee() {
  const { secretKey } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyQR = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/attendees/verify/${secretKey}`
        );
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Verification failed");
      }
    };

    verifyQR();
  }, [secretKey]);


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
       bgcolor: "#fefcfc"

      }}
      
    >
      <Card sx={{ p: 4, width: 400, textAlign: "center", borderRadius:"10px",}}>
            <Box
                component="img"
                src={logo}
                sx={{
                    width: "100px",
                    height: "30px",
                    position: "absolute",
                    top: 16,
                    left: 16,
                                
                }}
            />
         
        
        {data && data.status === "SUCCESSFUL" ? (
          <Box>
           
            <Box sx={{display: "flex", justifyContent: "center"}}>

                
                <Box
                component="img"
                src={correctIcon}
                sx={{ width: "30px", height: "30px"}}
                />
                
                <Typography
                    sx={{
                      fontWeight: 900,
                      color: "success.main",
                      fontSize: { xs: "1.3rem", md: "1.5rem" },
                      mb: 1.5,
                    }}
                  >
                  VERIFIED ATTENDEE
                </Typography>

            </Box>
            

            <Typography mt={3}>
              <b>First Name:</b> {data.firstName}
            </Typography>

            <Typography>
              <b>Last Name:</b> {data.lastName}
            </Typography>

            <Typography>
              <b>Email:</b> {data.email}
            </Typography>
          </Box>
        ) : (
          <Box>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      color: "error.main",
                      fontSize: { xs: "1.3rem", md: "1.5rem" },
                      mb: 1.5,
                    }}
                  >
                    Verification Failed.
                  </Typography>

                  <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                    {error}
                  </Typography>
                </Box>
            )}
      </Card>
    </Box>
  );
}

export default VerifyAttendee;
