import { Box, Button, Typography, Stack, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../../assets/logo2.png';


function Home() {
  return (

    <Box sx={{background: "linear-gradient(to top, #20002c, #cbb4d4)"}}>
      
      <Box sx={{ mb: 1.5, display: "flex", p: "15px", background: "white",  }}>
        <Box
          component="img"
          src={logo}
          alt="Platform logo"
          sx={{
            height: "35px",
            width: "auto"            
          }}
        />
        <Typography sx={{display: "flex", alignItems: "center", fontFamily: "sans-serif", 
        fontWeight: "bold"}}
        >Event</Typography>
      </Box>
  
    
    <Box
      sx={{
        
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
      }}
    >
      
      <Box
        sx={{
          bgcolor: "#ffffff",
          borderRadius: 3,
          
          maxWidth: 900,
          width: "100%",
          p: 6,
        }}
      >

      
        <Box spacing={5} 
          sx={{
            display: "flex",
            justifyContent: "center",
            
          }}
        >
                              
          <Box> 
            
            <Typography variant="h5" fontWeight="bold" gutterBottom >
              Event Registration Platform
            </Typography>

            <Typography variant="body1" color="text.secondary" 
            sx={{ 
              maxWidth: "500px"

            }}>
              Launch your events in minutes, and invite with your friends and families online.
              
            </Typography>
           
           
          </Box>

        <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "#572c67"}}
        />
          
            
          <Box
            sx={{
              
              pl: { md: 4, xs: 2 },
            }}
          >
              
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
              >
                Get Started
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Login or create an account to start managing your events.
              </Typography>

              <Stack spacing={2}>
                <Button variant="contained" size="large" component={Link} to="/login"
                sx={{bgcolor: "#572c67"}}>
                  Login
                </Button>

                <Button variant="outlined" size="large" component={Link} to="/signup" 
                sx={{borderColor: "#3e164d", color: "#3e164d"}}>
                  Sign Up
                </Button>
              </Stack>
            </Box>
          

        </Box>
      </Box>
    </Box>
    </Box>
  );
}

export default Home;