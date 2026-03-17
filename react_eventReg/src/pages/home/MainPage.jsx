// import { Box, Typography, Button, Stack, Card, CardContent, Grid, Container } from "@mui/material";
// import { useLocation, Link, useNavigate} from "react-router-dom";
// import { useEffect, useRef } from "react";
// import { toast } from "react-toastify";
// import Navbar from "../navbar/Navbar";
// import Footer from "../footer/Footer";

// function MainPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const hasShownToast = useRef(false);

//   useEffect(() => {
//     if (hasShownToast.current) return;

//     if (location.state?.loginSuccess) {
//       hasShownToast.current = true;
//       toast.success("Login Successful.");
//       navigate(location.pathname, { replace: true, state: {} });
//     }

//     if (location.state?.loginError) {
//       hasShownToast.current = true;
//       toast.error("Login Error.");
//       navigate(location.pathname, { replace: true, state: {} });
//     }
//   }, [location.state,  location.pathname, navigate]);

//   return (
//     <Box>
//       <Navbar />

      
//       <Box
//         sx={{
//          minHeight: "70vh",
//           display: "flex",
//           alignItems: "center",
//           backgroundImage: "radial-gradient(circle 248px at center,  #1683e1 47%, #0079cf 100%);",
         
//         }}
//       >
//         <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } 
      
//       }}>
//           <Grid container spacing={4} alignItems="center"
//           justifyContent="center"
//           rowGap={{ xs: 3, sm: 4 }}
//           columnGap={{ md: 6 }}>

            

//             <Grid item xs={12} md={6}>
//               <Box sx={{
//                 color: "white",
//                 maxWidth: 520,
//                 mx: { xs: "auto", lg: 0 },
//                 textAlign: { xs: "center", lg: "left" },
//               }}>
//                 <Typography
//                   sx={{
//                     fontWeight: 800,
//                     lineHeight: 1.1,
//                     letterSpacing: "-0.02em",
//                     fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
//                   }}
//                 >
//                   Agenda
//                 </Typography>

//                 <Typography
//                   sx={{
//                     mt: 1.2,
//                     opacity: 0.9,
//                     lineHeight: 1.7,
//                     fontSize: { xs: "1rem", md: "1.05rem" },
//                   }}
//                 >
//                   Create an event page, share the link, and manage attendees in one place.
//                 </Typography>

//                 <Stack direction="row" spacing={2} sx={{ mt: 3,  justifyContent: { xs: "center", lg: "flex-start" }, 
//                 flexWrap: "wrap",}}>
//                   <Button
//                     variant="contained"
//                     size="large"
//                     component={Link}
//                     to="/template-selection"
//                     sx={{
//                       px: 3,
//                       py: 1.1,
//                       borderRadius: 2,
//                       fontWeight: 700,
//                       backgroundColor: "white",
//                       color: "#0b5c7a",
                      
//                     }}
//                   >
//                     Create Event
//                   </Button>

//                   <Button
//                     component={Link}
//                     to="/eventDashboard"
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       px: 3,
//                       py: 1.1,
//                       color: "rgba(255,255,255,0.9)",
//                       fontWeight: 700,
//                       textTransform: "none",
//                       "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
//                     }}
//                   >
//                     DASHBOARD
//                   </Button>
//                 </Stack>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   borderRadius: 3,
//                   border: "1px solid rgba(0,0,0,0.08)",
//                   backgroundColor: "rgba(255,255,255,0.9)",
//                   backdropFilter: "blur(6px)",
//                   transform: { md: "scale(1.04)" },
                  
//                 }}
//               >
//                 <CardContent sx={{ p: 5 }}>
//                   <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>
//                     What you can do in Agenda
//                   </Typography>

//                   <Box component="ul" sx={{ mt: 1.5, pl: 2.2, color: "text.secondary", lineHeight: 1.9 }}>
//                     <li>Create digital invitations + event Page </li>
//                     <li>Use templates for specific event</li>
//                     <li>Generate a shareable event link</li>
//                     <li>Invite your friends and families online</li>
//                     <li>Email confirmations with QR code + verification feature</li>
//                     <li>Manage, and verify attendees in the dashboard</li>
//                   </Box>

                 
//                 </CardContent>
//               </Card>
//             </Grid>

           
            
//           </Grid>
//         </Container>
//       </Box>

      
//       <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
//         <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.6rem" } }}>
//           How it works
//         </Typography>

//         <Grid container spacing={2.5} sx={{ mt: 1.5 }}>
//           {[
//             {
//               title: "1) Create your event",
//               desc: "Fill in event details, pick a template, and customize it.",
//             },
//             {
//               title: "2) Publish & share",
//               desc: "Get a shareable link and send it to your guests instantly.",
//             },
//             {
//               title: "3) Manage attendees",
//               desc: "Track registrations, manage attendees and verify them during check-in.",
//             },
//           ].map((item) => (
//             <Grid key={item.title} item xs={12} md={4}>
//               <Card
//                 elevation={0}
//                 sx={{
//                   height: "100%",
//                   borderRadius: 3,
//                   border: "1px solid rgba(0,0,0,0.08)",
//                 }}
//               >
//                 <CardContent sx={{ p: 3 }}>
//                   <Typography sx={{ fontWeight: 800 }}>{item.title}</Typography>
//                   <Typography sx={{ mt: 1, color: "text.secondary" }}>{item.desc}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

        
//         <Card
//           elevation={0}
//           sx={{
//             mt: 3,
//             borderRadius: 3,
//             border: "1px solid rgba(0,0,0,0.08)",
//             bgcolor: " #1c7fc6",
//            color: "white"
//           }}
//         >
//           <CardContent sx={{ p: 3, }}>
//             <Grid container spacing={2} alignItems="center">
//               <Grid item xs={12} md={8}>
//                 <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
//                   Ready to publish your first event?
//                 </Typography>
//                 <Box sx={{display: "flex", }}>
//                   <Typography sx={{ mt: 0.5, color: "white" }}>
//                   Choose a template and build a shareable event page in minutes.
                  
//                   </Typography>
//                   <Typography
//                     component={Link}
//                     to="/template-selection"
//                     sx={{
//                       mt: 0.5,
//                       paddingLeft: "5px",
//                       cursor: "pointer",
                      
//                       color: "white",
//                       display: "inline"
//                     }}
//                   >
//                     Click Here.
//                   </Typography>

//                 </Box>
                
//               </Grid>
              
//             </Grid>
//           </CardContent>
//         </Card>
//       </Container>

//       <Footer></Footer>
//     </Box>
//   );
// }

// export default MainPage;
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  Grid,
  Container,
  Chip,
  Paper,
} from "@mui/material";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) return;

    if (location.state?.loginSuccess) {
      hasShownToast.current = true;
      toast.success("Login Successful.");
      navigate(location.pathname, { replace: true, state: {} });
    }

    if (location.state?.loginError) {
      hasShownToast.current = true;
      toast.error("Login Error.");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const features = [
    {
      title: "Template-based event setup",
      desc: "Start faster with ready-made invitation and event page templates.",
    },
    {
      title: "Shareable event pages",
      desc: "Publish your event and send guests a simple link they can open anywhere.",
    },
    {
      title: "Registration management",
      desc: "Track responses, manage attendee records, and stay organised.",
    },
    {
      title: "Email confirmation flow",
      desc: "Send confirmations with QR codes for a smoother attendee journey.",
    },
    {
      title: "QR verification",
      desc: "Verify guests quickly during check-in with your QR scanning feature.",
    },
    {
      title: "Central dashboard",
      desc: "Manage events and attendees from one simple dashboard",
    },
  ];

  const steps = [
    {
      title: "Create your event",
      desc: "Choose a template, add event details, and customize the page to match your occasion.",
    },
    {
      title: "Publish and share",
      desc: "Generate a public event page and send the link to your guests in seconds.",
    },
    {
      title: "Track and verify",
      desc: "Monitor registrations and verify attendees during check-in using QR validation.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #0f172a 0%, #0f3d68 45%, #0b84d8 100%)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            filter: "blur(10px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -140,
            left: -80,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            filter: "blur(10px)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 7, md: 10 } }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: "white", maxWidth: 580 }}>
                
                <Typography
                  sx={{
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    fontSize: { xs: "1.9rem", sm: "2rem", md: "2.8rem" },
                  }}
                >
                  Create, share, and manage events in one place
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    color: "rgba(255,255,255,0.84)",
                    lineHeight: 1.8,
                    fontSize: { xs: "1rem", md: "1.08rem" },
                    maxWidth: 520,
                  }}
                >
                  Agenda helps you build professional event pages, send invitations,
                  collect registrations, and verify attendees with QR-based check-in.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ mt: 4 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/template-selection"
                    sx={{
                      px: 3.2,
                      py: 1.4,
                      borderRadius: 3,
                      fontWeight: 700,
                      textTransform: "none",
                      bgcolor: "white",
                      color: "#0f172a",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "#e2e8f0",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Create Event
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/eventDashboard"
                    sx={{
                      px: 3.2,
                      py: 1.4,
                      borderRadius: 3,
                      fontWeight: 700,
                      textTransform: "none",
                      color: "white",
                      borderColor: "rgba(255,255,255,0.28)",
                      "&:hover": {
                        borderColor: "rgba(255,255,255,0.5)",
                        bgcolor: "rgba(255,255,255,0.08)",
                      },
                    }}
                  >
                    Open Dashboard
                  </Button>
                </Stack>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1.5, sm: 3 }}
                  sx={{ mt: 4, color: "rgba(255,255,255,0.78)" }}
                >
                  <Typography sx={{ fontSize: "0.95rem" }}>Template-based setup</Typography>
                  <Typography sx={{ fontSize: "0.95rem" }}>Shareable event pages</Typography>
                  <Typography sx={{ fontSize: "0.95rem" }}>QR attendee verification</Typography>
                </Stack>
              </Box>
            </Grid>

            
          </Grid>
        </Container>
      </Box>

      
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.6rem", md: "2rem" },
              color: "#0f172a",
            }}
          >
            Everything you need to manage events
          </Typography>
          <Typography
            sx={{
              mt: 1.2,
              color: "#64748b",
              maxWidth: 760,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Agenda combines event publishing, invitations, attendee tracking, and
            verification into one streamlined workflow.
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {features.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.title}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  bgcolor: "#ffffff",
                  transition: "0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 2.5,
                      bgcolor: "#0985d8",
                      mb: 2,
                    }}
                  /> */}
                  <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 1, color: "#64748b", lineHeight: 1.8 }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How it works */}
      <Box sx={{ bgcolor: "#ffffff", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.6rem", md: "2rem" },
                color: "#0f172a",
              }}
            >
              How it works
            </Typography>
            <Typography
              sx={{
                mt: 1.2,
                color: "#64748b",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              A simple flow from event creation to attendee check-in.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {steps.map((item, index) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
                    bgcolor: "#f8fafc",
                  }}
                >
                  <CardContent sx={{ p: 3.2 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        bgcolor: "#0b84d8",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "1rem",
                        mb: 2,
                      }}
                    >
                      {index + 1}
                    </Box>

                    <Typography sx={{ fontWeight: 800, color: "#0f172a" }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ mt: 1, color: "#64748b", lineHeight: 1.8 }}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 5,
            background: "linear-gradient(135deg, #0b84d8 0%, #0f3d68 100%)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.12)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.5rem", md: "1.7rem" },
                  lineHeight: 1.2,
                }}
              >
                Ready to publish your first event?
              </Typography>

              <Typography
                sx={{
                  mt: 1.2,
                  color: "rgba(255,255,255,0.84)",
                  lineHeight: 1.8,
                  maxWidth: 620,
                }}
              >
                Pick a template, customize your event page, and share it with guests in
                just a few steps.
              </Typography>
              <Typography
                    component={Link}
                    to="/template-selection"
                    sx={{
                      mt: 0.5,
                      
                      cursor: "pointer",
                      
                      color: "white",
                      display: "inline"
                    }}
                  >
                    Click Here.
                  </Typography>
            </Grid>
            
            
          </Grid>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}

export default MainPage;