import { Box, Typography, Divider, Button, Link } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dateIcon from "../../assets/date.png";
import timeIcon from "../../assets/time.png";
import locationIcon from "../../assets/address.png";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";


function EventPreview(){
  const { slug } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/event-registration/events/getSlug/${slug}`
        );
        setEvent(res.data);
        
      } catch (error) {
        console.error("Failed to fetch event");
      }
    };

    fetchEvent();
  }, [slug]);
  

  // 
  if (!event) 
  return (
      <Box 
      sx={{fontFamily: "sans-serif", fontSize: "17px", display: "flex",
        justifyContent: "center", mt: "30px"
      }}
      >Loading event page....
      </Box>
    )

  const template = event.template || {};

  return (
    <Box
      sx={{
        fontFamily: template.font_family,
        backgroundColor: template.background_color,
        maxWidth: 900,
        mx: "auto",
        my: 4,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 4,
      }}
    >

      {template.template_img_url && (
        <Box
          component="img"
          src={template.template_img_url}
          sx={{ width: "100%", height: 360, objectFit: "cover" }}
        />
      )}

      <Box sx={{ p: 4 }}>

        <Typography variant="h4" fontWeight="bold" sx={{ color: template.primary_color }}>
          {event.event_title}
        </Typography>

        <Typography sx={{ mt: 1, color: template.secondary_color }}>
          {event.description}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "grid", rowGap: 1.5 }}>

          
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" src={dateIcon} sx={{ width: 20, mr: 1 }} />
            <Typography>
              <strong>Date:</strong> {event.start_date}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" src={timeIcon} sx={{ width: 20, mr: 1 }} />
            <Typography>
              <strong>Time:</strong> {event.start_time} - {event.end_time}
            </Typography>
          </Box>

          {/* --- Google Map --- */}
         {event.location_lat && event.location_lng && (
            <Box>

               <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
                    <Box component="img" src={locationIcon} sx={{ width: 20, mr: 1 }} />
                    <Typography>
                    <strong>Event Location:</strong> {event.location}
                    </Typography>
                </Box>
          

                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Box sx={{ height: "300px", width: "100%" }}>
                    <Map
                    defaultCenter={{
                        lat: event.location_lat,
                        lng: event.location_lng
                    }}
                    defaultZoom={14}
                    mapId={import.meta.env.VITE_MAP_ID}
                    >
                    <AdvancedMarker
                        position={{
                        lat: event.location_lat,
                        lng: event.location_lng
                        }}
                    >
                        <Pin background="white" borderColor="purple" glyphColor="purple" />
                    </AdvancedMarker>
                    </Map>
                </Box>
                </APIProvider>

            </Box>
            )}

            <Button  component={Link} sx={{ mt: "25px", fontSize: 16, color: template.primary_color, textDecoration: "underline"}}>
                Register for event
            </Button>
        </Box>

        

        


      </Box>
    </Box>
  );
}
export default EventPreview;