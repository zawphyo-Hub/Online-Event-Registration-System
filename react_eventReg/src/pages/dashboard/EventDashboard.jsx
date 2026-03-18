import { useEffect, useState } from "react";
import { Box, Typography, Drawer, List, ListItem, ListItemText, Card, CardContent, CardActions, Button, Chip, Grid, colors, 
  Paper, Divider, Container, Stack
 } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";


function EventDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  // read user object and get userId
  const loginUser = JSON.parse(localStorage.getItem("user")); 
  const userId = loginUser?.userId;

  const shareableLink = `${window.location.origin}/public-event/${slug}`;
  
    const copyLink = (slug) => {
      const link = `${window.location.origin}/agenda/public-event/${slug}`;
      navigator.clipboard.writeText(link);
      toast.info("Link Copied.")
    };
  

  

  useEffect(() => {

    const fetchEvents = async () => {
      
      setLoading(true);

        try {
            const res = await axios.get(
                `http://localhost:8080/event-registration/events/getUsersEvent/${userId}`
            );
            setEvents(res.data);
        } catch (err) {
            console.error("Error Fetching Event Data.");
        } finally {
          setLoading(false);
        }

    };
    fetchEvents();

  }, []);

  const handleDelete = async (eventId) => {
    const ok = window.confirm("Are you sure you want to delete this event?");
    if (!ok) return;

    try {
      await axios.delete(
        `http://localhost:8080/event-registration/events/delete/${eventId}`
      );

      
      setEvents((prev) => prev.filter((e) => e.eventId !== eventId));
      toast.success("Event deleted.");
    } catch (err) {
      
      toast.error("Error deleting event.");
    }
  };  

  return (
    <Box sx={{ minHeight: "100vh"}}>
      <Navbar />
      <Box sx={{background:
            "linear-gradient(135deg, #0f172a 0%, #0f3d68 45%, #0b84d8 100%)",}}>

      

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 },  }}>
        
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.5rem", md: "1.8rem" },
                color: "#fafafa",
                
              }}
            >
              Event Dashboard
            </Typography>
           
          </Box>

          
        </Box>

        {/* -------------summary */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: 2.5,
            borderRadius: 4,
            border: "1px solid #e2e8f0",
            bgcolor: "#ffffff",
          }}
        >
          
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 4 }}
            divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />}
          >
            <Typography sx={{fontWeight: 600}}>Summary</Typography>
            <Box>
              <Typography sx={{ fontSize: 13, color: "#94a3b8" }}>
                Total Events
              </Typography>
              <Typography sx={{ mt: 0.5, fontWeight: 500, fontSize: "1.3rem", color: "#0f172a" }}>
                {events.length}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 13, color: "#94a3b8" }}>
                Published Events
              </Typography>
              <Typography sx={{ mt: 0.5, fontWeight: 500, fontSize: "1.3rem", color: "#0f172a" }}>
                {events.filter((event) => event.status === "PUBLISHED").length}
              </Typography>
            </Box>

            <Box>
              <Typography sx={{ fontSize: 13, color: "#94a3b8" }}>
                Unpublished Events
              </Typography>
              <Typography sx={{ mt: 0.5, fontWeight: 500, fontSize: "1.3rem", color: "#0f172a" }}>
                {events.filter((event) => event.status !== "PUBLISHED").length}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Loading state */}
        {loading && (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "#64748b", fontSize: "1rem" }}>
              Loading your events...
            </Typography>
          </Paper>
        )}

        {/* Empty state */}
        {!loading && events.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
              textAlign: "center",
            }}
          >
            
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "#0f172a",
              }}
            >
              No events created yet
            </Typography>
            <Typography
              sx={{
                mt: 1,
                color: "#64748b",
                maxWidth: 500,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Start by creating your first event page and share it with your attendees.
            </Typography>

            <Button
              variant="contained"
              component={Link}
              to="/template-selection"
              sx={{
                mt: 3,
                borderRadius: 3,
                px: 3,
                py: 1.2,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",
              }}
            >
              Create Your First Event
            </Button>
          </Paper>
        )}

        {/* --------------Events list */}
        {!loading && events.length > 0 && (
          <Stack spacing={3}>
            {events.map((event, index) => {
              const isPublished = event.status === "PUBLISHED";

              return (
                <Card
                  key={event.eventId}
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
                    bgcolor: "#ffffff",
                    overflow: "hidden",
                    transition: "0.2s ease",
                    "&:hover": {
                      boxShadow: "0 16px 35px rgba(15, 23, 42, 0.08)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2.2, md: 3 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", md: "flex-start" },
                        gap: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: { xs: "1.2rem", md: "1.35rem" },
                            color: "#0f172a",
                            lineHeight: 1.2,
                          }}
                        >
                          {index + 1}. {event.event_title}
                        </Typography>

                        
                      </Box>

                      <Chip
                        label={event.status}
                        sx={{
                          fontWeight: 700,
                          borderRadius: "999px",
                          bgcolor: isPublished ? "#e8f7ee" : "#fff1f2",
                          color: isPublished ? "#0f8a43" : "#c2410c",
                          border: isPublished
                            ? "1px solid #b7ebc6"
                            : "1px solid #fed7aa",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        mt: 3,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                        gap: 2,
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          bgcolor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <Typography sx={{ fontSize: 13, color: "#94a3b8", mb: 0.5 }}>
                          Date
                        </Typography>
                        <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                          {event.start_date}
                        </Typography>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          bgcolor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <Typography sx={{ fontSize: 13, color: "#94a3b8", mb: 0.5 }}>
                          Time
                        </Typography>
                        <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                          {event.start_time} - {event.end_time}
                        </Typography>
                      </Paper>

                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          bgcolor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <Typography sx={{ fontSize: 13, color: "#94a3b8", mb: 0.5 }}>
                          Location
                        </Typography>
                        <Typography sx={{ fontWeight: 700, color: "#0f172a" }}>
                          {event.location || "Not specified"}
                        </Typography>
                      </Paper>
                    </Box>
                  </CardContent>

                  <Divider />

                  <CardActions
                    sx={{
                      p: { xs: 2, md: 2.5 },
                      display: "flex",
                      flexDirection: { xs: "column", lg: "row" },
                      alignItems: { xs: "stretch", lg: "center" },
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.2}
                      sx={{ width: { xs: "100%", lg: "auto" } }}
                    >
                      <Button
                        variant="contained"
                        component={Link}
                        to={`/attendee-management/${event.eventId}`}
                        sx={{
                          borderRadius: 2.5,
                          fontWeight: 700,
                          textTransform: "none",
                          boxShadow: "none",
                          width: { xs: "100%", sm: "auto" },
                        }}
                      >
                        Manage Attendees
                      </Button>

                      <Button
                        variant="outlined"
                        component={Link}
                        to={`/event-preview/${event.slug}`}
                        sx={{
                          borderRadius: 2.5,
                          fontWeight: 700,
                          textTransform: "none",
                          width: { xs: "100%", sm: "auto" },
                        }}
                      >
                        Edit Event
                      </Button>

                      {isPublished && (
                        <Button
                          variant="outlined"
                          onClick={() => copyLink(event.slug)}
                          sx={{
                            borderRadius: 2.5,
                            fontWeight: 700,
                            textTransform: "none",
                            width: { xs: "100%", sm: "auto" },
                          }}
                        >
                          Copy Link
                        </Button>
                      )}
                    </Stack>

                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(event.eventId)}
                      sx={{
                        borderRadius: 2.5,
                        fontWeight: 700,
                        textTransform: "none",
                        width: { xs: "100%", lg: "auto" },
                        borderColor: "#fecaca",
                        color: "#dc2626",
                        "&:hover": {
                          borderColor: "#ef4444",
                          bgcolor: "#fef2f2",
                        },
                      }}
                    >
                      Delete Event
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Stack>
        )}
      </Container>
    </Box>
    </Box>
  );

}

export default EventDashboard;
