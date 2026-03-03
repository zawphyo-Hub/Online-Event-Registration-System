import { useEffect, useState } from "react";
import { Box, Typography, Drawer, List, ListItem, ListItemText, Card, CardContent, CardActions, Button, Chip, Grid, colors } from "@mui/material";
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
    <Box >
        <Navbar />

            
        <Box sx={{ flexGrow: 1, p: 4}}>

          
          {!loading && events.length === 0 &&(
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              
              <Typography>No events has been created.</Typography>
            </Box>
          )}
          
         {!loading && events.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {events.map((event) => (
              <Card
                key={event.eventId}
                elevation={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" sx={{ color: "#000000", fontWeight: 550 }}>
                            {event.event_title}
                        </Typography>

                        <Typography
                            sx={{
                            p: "10px",
                            borderRadius: "20px",
                            fontSize: "14px" ,                           
                            backgroundColor:
                                event.status === "PUBLISHED" ? "#e6f4ea" : "#fdecea",
                            color:
                                event.status === "PUBLISHED" ? "#009222" : "#ae0000",
                            }}
                        >
                            {event.status}
                        </Typography>
                    </Box>

                  <Typography  sx={{color:"gray"}}>
                    <strong style={{paddingRight: "5px"}}>Date:</strong> {event.start_date}
                    
                  </Typography>

                  <Typography  sx={{color:"gray"}}>
                    <strong style={{paddingRight: "5px"}}>Time:</strong> 
                    {event.start_time} - {event.end_time}
                  </Typography>

                 
                    <Typography  sx={{color:"gray"}}>
                      <strong style={{paddingRight: "5px"}}>Location:</strong> {event.location}
                    </Typography>
                  

                
                </CardContent>

                <CardActions
                  sx={{
                    px: 2,
                    pb: 2,
                    pt: 0,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                    justifyContent: { xs: "flex-start", sm: "space-between" },
                    "& > :not(style) + :not(style)": {
                      marginLeft: 0,
                    },
                    gap: 1.2,
                  }}
                  >
                  
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    <Button
                      variant="contained"
                      component={Link}
                      to={`/attendee-management/${event.eventId}`}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 700,
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      Manage Attendees
                    </Button>

                    <Button
                      variant="contained"
                      component={Link}
                      to={`/event-preview/${event.slug}`}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 700,
                        width: { xs: "100%", sm: "auto" },
                      }}
                    >
                      Edit Event
                    </Button>

                    {event.status === "PUBLISHED" && (
                      <Button
                        variant="outlined"
                        onClick={() => copyLink(event.slug)}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 700,
                          width: { xs: "100%", sm: "auto" },
                        }}
                      >
                        Copy Link
                      </Button>
                    )}
                  </Box>

                  
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(event.eventId)}
                    sx={{
                      width: { xs: "100%", sm: "auto" },
                      borderRadius: 2,
                      fontWeight: 700,
                      
                      borderColor: "rgba(200,0,0,0.6)",
                      color: "rgba(200,0,0,0.9)",
                                                           
                    }}
                  >
                    Delete
                  </Button>
                  </CardActions>
              </Card>
            ))}
          </Box> )}
        </Box>
      </Box>
    
    
  );
}

export default EventDashboard;
