import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { Box, Typography, Divider, Button} from "@mui/material";
import dateIcon from "../../assets/date.png";
import timeIcon from "../../assets/time.png";
import locationIcon from "../../assets/address.png";
import { Link } from "react-router-dom";

function PublicEventLink() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/event-registration/events/getSlug/${slug}`
          
        );
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event.");
      }
    };

    fetchEvent();
  }, [slug]);

  if (!event) 
  return (
      <Box 
      sx={{fontFamily: "sans-serif", fontSize: "17px", display: "flex",
        justifyContent: "center", mt: "30px", 
        
      }}
      >Loading...
      </Box>
    )

  const template = event.template || {};

  return (
      
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 3 },
        background: "linear-gradient(135deg, rgba(63,162,224,0.10), rgba(70,174,247,0.06))",
        fontFamily: template.font_family,
      }}
    >
      <Box
        sx={{
          maxWidth: 980,
          mx: "auto",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
          border: "1px solid rgba(0,0,0,0.06)",
          bgcolor: "white",
        }}
      >
        
        {(event.event_image_url || template.template_img_url) && (
          <Box sx={{ position: "relative" ,
            overflow: "hidden", bgcolor: event.event_image_url ? "rgba(0,0,0,0.04)" : "transparent",
          }}>
            <Box
              component="img"
              src={event.event_image_url || template.template_img_url}
              sx={{ width: "100%", height: { xs: 240, md: 340 }, 
              objectFit: event.event_image_url ? "contain" : "cover", 
            objectPosition: "center"}}
              alt="Event picture"
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                height: { xs: 240, md: 340 },
                background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 100%)",
              }}
            />

            
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                p: { xs: 2.5, md: 4 },
                color: "white",
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.9rem", md: "1.3rem" },
               lineHeight: 1.1, color: "white" }}>
                {event.event_title}
              </Typography>
            </Box>
          </Box>
          
                    
        )}

        
        <Box sx={{ p: { xs: 2.5, md: 4 } }}>
          
         
            <Box sx={{mb: "35px"}}>
              <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", md: "2rem" }, 
              lineHeight: 1.1, color: template.primary_color || "text.primary",  }}>
                {event.event_title}
              </Typography>

              <Typography sx={{ opacity: 0.9, maxWidth: 760, lineHeight: 1.6,
                mt: 1.2, color: template.secondary_color || "text.secondary",
               }}>
                {event.description}
              </Typography>

            </Box>
            <Divider sx={{mb: 1}}></Divider>
              
          

          
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
              mt: 2,
              gap: 1.4,
            }}
          >

            {/* location-------- */}
            <Box
              sx={{
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "linear-gradient(135deg, rgba(63,162,224,0.08), rgba(70,174,247,0.03))",
                p: 2,
                display: "flex",
                gap: 1.9,
                minWidth: "350px",
                alignItems: "flex-start",
              }}
            >
              <Box component="img" src={locationIcon} sx={{ width: 20, height: 20, mt: "2px" }} alt="Location" />
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: "0.95rem" }}>Event Location</Typography>
                <Typography sx={{ color: "text.secondary", mt: 0.4, lineHeight: 1.5 }}>
                  {event.location}
                </Typography>
              </Box>
            </Box>

            {/* DATE----------- */}
            <Box
              sx={{
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "linear-gradient(135deg, rgba(63,162,224,0.08), rgba(70,174,247,0.03))",
                p: 2,
                display: "flex",
                gap: 1.2,
                alignItems: "flex-start",
              }}
            >
              <Box component="img" src={dateIcon} sx={{ width: 20, height: 20, mt: "2px" }} alt="Date" />
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: "0.95rem" }}>Date</Typography>
                <Typography sx={{ color: "text.secondary", mt: 0.4, lineHeight: 1.5 }}>
                  {event.start_date}
                </Typography>
              </Box>
            </Box>

            {/* TIME------------ */}
            <Box
              sx={{
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "linear-gradient(135deg, rgba(63,162,224,0.08), rgba(70,174,247,0.03))",
                p: 2,
                display: "flex",
                gap: 1.2,
                alignItems: "flex-start",
              }}
            >
              <Box component="img" src={timeIcon} sx={{ width: 20, height: 20, mt: "2px" }} alt="Time" />
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: "0.95rem" }}>Time</Typography>
                <Typography sx={{ color: "text.secondary", mt: 0.4, lineHeight: 1.5 }}>
                  {event.start_time} - {event.end_time}
                </Typography>
              </Box>
            </Box>

            
          </Box>

          {/* ----------google map---------- */}
          {event.location_lat && event.location_lng && (
            <Box sx={{ mt: 2.2 }}>
              <Box
                sx={{
                  height: 320,
                  width: "100%",
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                  <Map
                    defaultCenter={{ lat: event.location_lat, lng: event.location_lng }}
                    defaultZoom={14}
                    mapId={import.meta.env.VITE_MAP_ID}
                  >
                    <AdvancedMarker position={{ lat: event.location_lat, lng: event.location_lng }}>
                      <Pin background="white" borderColor="purple" glyphColor="purple" />
                    </AdvancedMarker>
                  </Map>
                </APIProvider>
              </Box>
            </Box>
          )}

          {/* ----------Additional note----------- */}
          {event.additionalNote && event.additionalNote.trim() !== "" && (
            <Box
              sx={{
                mt: 2.5,
                p: 2,
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(0,0,0,0.02)",
              }}
            >
              <Typography sx={{ fontWeight: 900 }}>Additional Note</Typography>
              <Typography sx={{ color: "text.secondary", mt: 0.5, lineHeight: 1.6 }}>
                {event.additionalNote}
              </Typography>
            </Box>
          )}

          <Divider sx={{ mt: 3 }} />

       
          <Box sx={{ mt: 2.5, display: "flex", justifyContent: "flex-end" }}>
            <Button
              component={Link}
              to={`/attendee-reg/${slug}`}
              variant="contained"
              sx={{
                borderRadius: 2.2,
                fontWeight: 900,
                px: 3,
                py: 1.2,
                bgcolor: "#3a9ad6",
                "&:hover": { bgcolor: "#3a9ad6", opacity: 0.92 },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Register for event
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PublicEventLink;
