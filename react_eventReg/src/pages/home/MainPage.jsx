import { Box, Typography, Button, Stack, Card, CardContent, Grid, Container } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function MainPage() {
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

  return (
    <Box>
      <Navbar />

      
      <Box
        sx={{
         minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          backgroundImage: "radial-gradient(circle 248px at center,  #25c0e7 47%, #46aef7 100%);",
         
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } 
      
      }}>
          <Grid container spacing={4} alignItems="center"
          justifyContent="center"
          rowGap={{ xs: 3, sm: 4 }}
          columnGap={{ md: 6 }}>

            <Grid item xs={12} md={6}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid rgba(0,0,0,0.08)",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(6px)",
                  transform: { md: "scale(1.04)" },
                  
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>
                    What you can do in Agenda
                  </Typography>

                  <Box component="ul" sx={{ mt: 1.5, pl: 2.2, color: "text.secondary", lineHeight: 1.9 }}>
                    <li>Create digital invitations + event Page </li>
                    <li>Use templates for specific event</li>
                    <li>Generate a shareable event link</li>
                    <li>Invite your friends and families online</li>
                    <li>Email confirmations with QR code + verification feature</li>
                    <li>Manage, and verify attendees in the dashboard</li>
                  </Box>

                 
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{
                color: "white",
                maxWidth: 520,
                mx: { xs: "auto", lg: 0 },
                textAlign: { xs: "center", lg: "left" },
              }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                  }}
                >
                  Agenda
                </Typography>

                <Typography
                  sx={{
                    mt: 1.2,
                    opacity: 0.9,
                    lineHeight: 1.7,
                    fontSize: { xs: "1rem", md: "1.05rem" },
                  }}
                >
                  Create an event page, share the link, and manage attendees in one place.
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 3,  justifyContent: { xs: "center", lg: "flex-start" }, 
                flexWrap: "wrap",}}>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/template-selection"
                    sx={{
                      px: 3,
                      py: 1.1,
                      borderRadius: 2,
                      fontWeight: 700,
                      backgroundColor: "white",
                      color: "#0b5c7a",
                      
                    }}
                  >
                    Create Event
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/eventDashboard"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 3,
                      py: 1.1,
                      color: "rgba(255,255,255,0.9)",
                      fontWeight: 700,
                      textTransform: "none",
                      "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
                    }}
                  >
                    DASHBOARD
                  </Button>
                </Stack>
              </Box>
            </Grid>

           
            
          </Grid>
        </Container>
      </Box>

      
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.6rem" } }}>
          How it works
        </Typography>

        <Grid container spacing={2.5} sx={{ mt: 1.5 }}>
          {[
            {
              title: "1) Create your event",
              desc: "Fill in event details, pick a template, and customize it.",
            },
            {
              title: "2) Publish & share",
              desc: "Get a shareable link and send it to your guests instantly.",
            },
            {
              title: "3) Manage attendees",
              desc: "Track registrations, manage attendees and verify them during check-in.",
            },
          ].map((item) => (
            <Grid key={item.title} item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ fontWeight: 800 }}>{item.title}</Typography>
                  <Typography sx={{ mt: 1, color: "text.secondary" }}>{item.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        
        <Card
          elevation={0}
          sx={{
            mt: 3,
            borderRadius: 3,
            border: "1px solid rgba(0,0,0,0.08)",
            background: "linear-gradient(135deg, rgba(0, 153, 248, 0.1), rgba(70,174,247,0.06))",
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  Ready to publish your first event?
                </Typography>
                <Typography sx={{ mt: 0.5, color: "text.secondary" }}>
                  Choose a template and build a shareable event page in minutes.
                </Typography>
              </Grid>
              
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <Footer></Footer>
    </Box>
  );
}

export default MainPage;