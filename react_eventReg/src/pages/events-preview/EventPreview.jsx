import { Box, Typography, Divider, Button, Link, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import dateIcon from "../../assets/date.png";
import timeIcon from "../../assets/time.png";
import locationIcon from "../../assets/address.png";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import GoogleMapLocation from "../create-event-process/GoogleMapLocation";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function EventPreview(){
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [customizeAction, setCustomizeAction] = useState(false);

  // For Google Map auto complete
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const [defaultLocationMarker, setDefaultLocationMarker] = useState({
      lat: 51.752,
      lng: -1.2577,
    });

  const navigate = useNavigate();

 
  // Fetch the event data
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

  // publish button
  const handlePublishButton = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/event-registration/events/publishEvent/${event.eventId}`
      );

      toast.info(
        "Please wait while we are publishing your event...",
        {
          style: {
            width: "420px"
          }
        }
      
       
    );

    setTimeout(() => {
      navigate(`/success-public/${slug}`);
    }, 2000);
      
    } catch (err) {
      toast.error("Failed to publish event.");
    }
  };

  // update button
  const handleUpdateButton = async () => {
    try {
      const payLoad = {
        ...event,
        location: event.location,          
        location_lat: event.location_lat,  
        location_lng: event.location_lng,  
      };
      await axios.put(
        `http://localhost:8080/event-registration/events/update/${event.eventId}`,
        payLoad
      );
      toast.success("Event updated.");
      setCustomizeAction(false);
    } catch (err) {
      toast.error("Update failed. Error!");
    }
  };

  // ---- Image Upload to cloudinary ----
  const handleUploadImage = async (e) => {
    const fileImage = e.target.files[0];
    if (!fileImage) return;

    const formData = new FormData();
    formData.append("file", fileImage);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = res.data.secure_url;

      setEvent((prev) => ({
        ...prev,
        event_image_url: imageUrl,
      }));
  
      console.log("Imaged uploaded to cloudinary.");
    } catch (err) {
      toast.error("Image upload failed.");
    }
  };
  

  if (!event) 
  return (
      <Box 
      sx={{fontSize: "17px", display: "flex",
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
      <Box sx={{ position: "relative", height: { xs: 240, md: 340 },
      overflow: "hidden", bgcolor: event.event_image_url ? "rgba(0,0,0,0.04)" : "transparent", }}>
        
           
          {/* Main image----------*/}
          <Box
            component="img"
            src={event.event_image_url || template.template_img_url}
            alt="Event cover"
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: event.event_image_url ? "contain" : "cover",   
              objectPosition: "center",
            }}
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
          <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.9rem", md: "1.3rem" } }}>
            {customizeAction ? "Customize your event" : event.event_title}
          </Typography>

        </Box>
      </Box>
      )}
      
      <Box sx={{ p: { xs: 2.5, md: 4 } }}>
        {/* --- Event Image upload --- */}
        {customizeAction && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 900, fontSize: "1.1rem", mb: 1 }}>
              Event Information
            </Typography>

            <Typography sx={{ mb: 1, fontSize: "0.9rem", color: "text.secondary" }}>
              Event Image (Optional)
            </Typography>

            <input type="file" accept="image/*" onChange={handleUploadImage} />

            {event.event_image_url && (
              <Typography sx={{ mt: 1, color: "success.main", fontSize: "0.9rem" }}>
                Event image uploaded
              </Typography>
            )}
          </Box>
        )}

        {/* ----- event title ----- */}
        {customizeAction ? (
          <TextField
            fullWidth
            label="Event Title"
            value={event.event_title}
            onChange={(e) => setEvent({ ...event, event_title: e.target.value })}
          />
        ) : (
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.6rem", md: "2rem" },
              color: template.primary_color || "text.primary",
              lineHeight: 1.15,
            }}
          >
            {event.event_title}
          </Typography>
        )}

        {/* --- event description --- */}
        {customizeAction ? (
          <TextField
            fullWidth
            multiline
            rows={3}
            sx={{ mt: 2 }}
            label="Description"
            value={event.description}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
          />
        ) : (
          <Typography
            sx={{
              mt: 1,
              color: template.secondary_color || "text.secondary",
              lineHeight: 1.7,
              maxWidth: 780,
            }}
          >
            {event.description}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Date / Time / Location*/}
        {customizeAction && (
          <Typography sx={{ fontWeight: 900, fontSize: "1.1rem", mb: 1.2 }}>
            Date • Time • Location
          </Typography>
        )}

        
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
            gap: 1.2,
          }}
        >

           {/* --------------LOCATION------------ */}
          <Box
            sx={{
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,0.08)",
              background: "linear-gradient(135deg, rgba(63,162,224,0.08), rgba(70,174,247,0.03))",
              p: 2,
              display: "flex",
              gap: 1.2,
              alignItems: "flex-start",
              minWidth: "350px"
            }}
          >
            <Box component="img" src={locationIcon} alt="Location" sx={{ width: 20, height: 20, mt: "2px" }} />
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ fontWeight: 900, fontSize: "0.95rem" }}>Location</Typography>

              <Typography sx={{ color: "text.secondary", mt: 0.6, lineHeight: 1.5 }}>
                {event.location || "No location selected"}
              </Typography>
            </Box>
          </Box>


          {/* ---------DATE ----------*/}
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
            <Box component="img" src={dateIcon} alt="Date" sx={{ width: 20, height: 20, mt: "2px" }} />
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ fontWeight: 900, fontSize: "0.95rem" }}>Date</Typography>

              {customizeAction ? (
                <TextField
                  type="date"
                  size="small"
                  sx={{ mt: 1, width: "100%" }}
                  value={event.start_date || ""}
                  onChange={(e) => setEvent({ ...event, start_date: e.target.value })}
                />
              ) : (
                <Typography sx={{ color: "text.secondary", mt: 0.6, lineHeight: 1.5 }}>
                  {event.start_date}
                </Typography>
              )}
            </Box>
          </Box>

          {/* ------------TIME------------- */}
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
            <Box component="img" src={timeIcon} alt="Time" sx={{ width: 20, height: 20, mt: "2px" }} />
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ fontWeight: 900, fontSize: "0.95rem" }}>Time</Typography>

              {customizeAction ? (
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <TextField
                    type="time"
                    size="small"
                    label="Start"
                    sx={{ flex: 1 }}
                    value={event.start_time || ""}
                    onChange={(e) => setEvent({ ...event, start_time: e.target.value })}
                  />
                  <TextField
                    type="time"
                    size="small"
                    label="End"
                    sx={{ flex: 1 }}
                    value={event.end_time || ""}
                    onChange={(e) => setEvent({ ...event, end_time: e.target.value })}
                  />
                </Box>
              ) : (
                <Typography sx={{ color: "text.secondary", mt: 0.6, lineHeight: 1.5 }}>
                  {event.start_time} - {event.end_time}
                </Typography>
              )}
            </Box>
          </Box>

         
        </Box>

        {/* ---------Google map auto complete-------- */}
        {event.location_lat && event.location_lng && (
          <Box sx={{ mt: 2.2 }}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
            {customizeAction && (
              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 900, fontSize: "1.1rem", mb: 1 }}>
                  Update location
                </Typography>
                <GoogleMapLocation
                  inputRef={inputRef}
                  setEvent={setEvent}
                  setDefaultLocationMarker={setDefaultLocationMarker}
                />
              </Box>
            )}

            <Box sx={{ height: 320, width: "100%", borderRadius: 3, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
              
                <Map
                  center={{ lat: event.location_lat, lng: event.location_lng }}
                  defaultZoom={14}
                  mapId={import.meta.env.VITE_MAP_ID}
                >
                  <AdvancedMarker position={{ lat: event.location_lat, lng: event.location_lng }}>
                    <Pin background="white" borderColor="purple" glyphColor="purple" />
                  </AdvancedMarker>
                </Map>
              
            </Box>
            </APIProvider>
          </Box>
        )}

        {/* ----------Additional note----------*/}
        {customizeAction ? (
          <Box sx={{ mt: 2.5 }}>
            <Typography sx={{ mb: 1, fontWeight: 900, fontSize: "1.05rem" }}>
              Additional Note
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Enter additional information."
              value={event.additionalNote || ""}
              onChange={(e) => setEvent({ ...event, additionalNote: e.target.value })}
              slotProps={{ htmlInput: { maxLength: 100 } }}
            />
          </Box>
        ) : (
          event.additionalNote?.trim() && (
            <Box sx={{ mt: 2.5 }}>
              <Typography sx={{ fontWeight: 900 }}>Additional Note</Typography>
              <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                {event.additionalNote}
              </Typography>
            </Box>
          )
        )}

        <Divider sx={{ mt: 3 }} />

       
        <Box
          sx={{
            mt: 2.5,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.2,
            justifyContent: "flex-end",
          }}
        >
          {!customizeAction && (
            <>
              <Button
                variant="outlined"
                onClick={() => setCustomizeAction(true)}
                sx={{ borderRadius: 2.2, fontWeight: 800 }}
              >
                Customize
              </Button>

              <Button
                variant="contained"
                onClick={handlePublishButton}
                sx={{ borderRadius: 2.2, fontWeight: 800, bgcolor: "#3a9ad6", "&:hover": { bgcolor: "#3a9ad6", opacity: 0.92 } }}
              >
                Publish Event
              </Button>
            </>
          )}

          {customizeAction && (
            <>
              <Button
                variant="contained"
                onClick={handleUpdateButton}
                sx={{ borderRadius: 2.2, fontWeight: 800, bgcolor: "#037e20", "&:hover": { bgcolor: "#037e20", opacity: 0.92 } }}
              >
                Save Changes
              </Button>

              <Button
                variant="outlined"
                onClick={() => setCustomizeAction(false)}
                sx={{ borderRadius: 2.2, fontWeight: 800 }}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  </Box>
);
}
export default EventPreview;

