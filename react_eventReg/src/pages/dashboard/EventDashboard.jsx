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


        try {
            const res = await axios.get(
                `http://localhost:8080/event-registration/events/getUsersEvent/${userId}`
            );
            setEvents(res.data);
        } catch (err) {
            console.error("Error Fetching Event Data.");
        }

    };
    fetchEvents();
  }, []);

  

  return (
    <Box >
        <Navbar />
    
        <Box sx={{ flexGrow: 1, p: 4}}>
          

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {events.map((event) => (
              <Card
                key={event.eventId}
                elevation={3}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6" sx={{ color: "#000000", fontWeight: 600}}>
                            {event.event_title}
                        </Typography>

                        <Typography
                            sx={{
                            p: "10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            
                            backgroundColor:
                                event.status === "PUBLISHED" ? "#e6f4ea" : "#fdecea",
                            color:
                                event.status === "PUBLISHED" ? "#009222" : "#ae0000",
                            }}
                        >
                            {event.status}
                        </Typography>
                    </Box>

                  <Typography variant="body2" sx={{color:"gray"}}>
                    <strong style={{paddingRight: "5px"}}>Date:</strong> {event.start_date}
                    
                  </Typography>

                  <Typography variant="body2" sx={{color:"gray"}}>
                    <strong style={{paddingRight: "5px"}}>Time:</strong> 
                    {event.start_time} - {event.end_time}
                  </Typography>

                 
                    <Typography variant="body2" sx={{color:"gray"}}>
                      <strong style={{paddingRight: "5px"}}>Location:</strong> {event.location}
                    </Typography>
                  

                
                </CardContent>

                <CardActions>
                  <Button
                    variant="contained"
                      size="medium"
                    component={Link}
                    sx={{color: "white", pl: "10px", pr: "10px", fontSize: "12px"}}
                    to={`/attendee-management/${event.eventId}`}
                  >
                    Manage Attendees
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    component={Link}
                    sx={{ color: "white", pl: "10px", pr: "10px", fontSize: "12px"}}
                    to={`/event-preview/${event.slug}`}
                    
                  >
                    Edit Event
                  </Button>

                   
                  {event.status === "PUBLISHED" && (
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ color: "white", pl: "10px", pr: "10px", fontSize: "12px"}}
                      onClick={() => copyLink(event.slug)}
                    >
                      Copy Link
                    </Button>
                  )}
                 
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    
    
  );
}

export default EventDashboard;
