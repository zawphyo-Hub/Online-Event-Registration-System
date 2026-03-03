import { Box, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../../assets/logo3.png';

function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);",
        px: 2,
      }}
    >
      
      <Box
        sx={{
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: 1000,
          width: "100%",
          minHeight: 380,
          
          overflow: "hidden",
        }}
      >
        
        
        <Box
          sx={{
            flex: 1,
            bgcolor: "#209ae6",
            color: "white",
            p: { xs: 3, md: 7 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
                        
          }}
        >
          

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              lineHeight: 1.15,
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              letterSpacing: "-0.02em",
            }}
          >
            Online Invitation & Event Registration Platform
          </Typography>

          <Typography
            sx={{
              mt: 2.2,
              opacity: 0.95,
              maxWidth: 420,
              fontSize: { xs: "0.98rem", md: "1.05rem" },
              lineHeight: 1.7,
            }}
          >
            Create beautiful digital invitations, share your event link instantly,
            and manage attendees with ease using Agenda.
          </Typography>
        </Box>

        
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            // alignItems: "center"
          }}
        >
          {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
            Get Started
          </Typography> */}
          <Box sx={{display: "flex", justifyContent: "center",
                        alignItems: "center"}}>
            <Box component="img" src={logo} alt="Logo" sx={{ height: "30px",
                        width: "90px", mb: 3, }} />

          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            Login or create an account to start managing your events.
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/login"
              sx={{
                bgcolor: "#3a9ad6",
                "&:hover": { bgcolor: "#2c78b7" },
              }}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/signup"
              sx={{
                borderColor: "#3a9ad6",
                color: "#3a9ad6",
                "&:hover": { bgcolor: "#f0f7ff" },
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;