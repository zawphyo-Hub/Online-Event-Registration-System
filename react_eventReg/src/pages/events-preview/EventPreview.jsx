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
        <div style={{padding: "5px", height: "30px", width: "300px"}}>
     
          "Please wait while we are publishing your event..."
        </div>
       
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
                
        maxWidth: 700,
        mx: "auto",
        my: 4,
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 4,
      }}
    >

      {/* --- Show custom image or template default image ---*/}
      {(event.event_image_url || template.template_img_url) && (
        <Box
          component="img"
          src={event.event_image_url || template.template_img_url}
          sx={{ width: "100%", height: 360, objectFit: "cover" }}
        />
      )}

      <Box sx={{ p: 4 }}>

        {/* --- Event Image upload --- */}
        {customizeAction && (
          <Box sx={{  mb: 4 }}>
            <Typography variant="h5" sx={{mb: "20px", fontWeight: "bold"}}>Event Information</Typography>
            <Typography  sx={{ mb: 1,  fontSize: "13px", color: "gray" }}>
              Event Image (Optional)
            </Typography>

            <input
              type="file"
              accept="image/*"
              
              onChange={handleUploadImage}
            />

            {event.event_image_url && (
              <Typography variant="body2" sx={{ mt: 1, color: "green" }}>
                Event image uploaded
              </Typography>
            )}
          </Box>
        )}
        

        {/* --- event title --- */}
        {customizeAction ? (
          <TextField
            fullWidth
            
            label="Event Title"
            value={event.event_title}
            onChange={(e) =>
              setEvent({ ...event, event_title: e.target.value })
            }
          />
        ) : (
          <Typography variant="h5" fontWeight="bold" sx={{ color: template.primary_color }}>
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
            onChange={(e) =>
              setEvent({ ...event, description: e.target.value })
            }
          />
        ) : (
          <Typography sx={{ mt: 1, color: template.secondary_color }}>
            {event.description}
          </Typography>
        )}

        <Divider sx={{ my: 3}} />

        {customizeAction && (
          <Typography variant="h5" sx={{mb: "20px", fontWeight: "bold"}}>Date - Time</Typography>
          
        )}

        <Box sx={{ display: "grid", rowGap: 1.5 }}>

          {/* --- date --- */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box component="img" src={dateIcon} sx={{ width: 20, mr: 1 }} />

            {customizeAction ? (
              <Box>
                                           
              <TextField
                type="date"
                size="small"
                value={event.start_date || ""}
                onChange={(e) =>
                  setEvent({ ...event, start_date: e.target.value })
                }
              />
              </Box>
            ) : (
              <Typography>
                <strong>Date:</strong> {event.start_date}
              </Typography>
            )}
          </Box>

          {/* --- Start Time and end time --- */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box component="img" src={timeIcon} sx={{ width: 20}} />

            {customizeAction ? (
              <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                
                <TextField
                  type="time"
                  size="small"
                  label="Start"
                  value={event.start_time || ""}
                  onChange={(e) =>
                    setEvent({ ...event, start_time: e.target.value })
                  }
                />

                <TextField
                  type="time"
                  size="small"
                  label="End"
                  value={event.end_time || ""}
                  onChange={(e) =>
                    setEvent({ ...event, end_time: e.target.value })
                  }
                />

              
                
              </Box>
              

            ) : (
              <Typography>
                <strong>Time:</strong> {event.start_time} - {event.end_time}
              </Typography>
            )}
          </Box>

          
          {customizeAction && (
          <Divider sx={{ my: 3}} />
          
        )}

        {customizeAction && (
          <Typography variant="h5" sx={{mb: "10px", fontWeight: "bold"}}>Location</Typography>
          
        )}

         
         {/* --- Google Map --- */}
         {event.location_lat && event.location_lng && (
            <Box>

               <Box sx={{ display: "flex", alignItems: "center", mb: "15px" }}>
                    <Box component="img" src={locationIcon} sx={{ width: 20, mr: 1 }} />
                      <Typography>
                      <strong>Location:</strong> {event.location}
                      </Typography>
                  </Box>

                            

                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                libraries={["places"]}

                >
                   {customizeAction && (
                      <GoogleMapLocation
                        inputRef={inputRef}
                        setEvent={setEvent}
                        setDefaultLocationMarker={setDefaultLocationMarker}
                        
                      />
                    )}
                <Box sx={{ height: "300px", width: "100%" }}>

                   
                    <Map
                    center={{
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
            
        </Box>

        {customizeAction ? (
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{ mb: 1, fontWeight: "bold", fontSize: "16px" }}
            >
              Additional Note
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Enter additional information."
              value={event.additionalNote || ""}
              onChange={(e) =>
                setEvent({ ...event, additionalNote: e.target.value })
              }
              slotProps={{
                htmlInput: { maxLength: 100 },
              }}
            />
          </Box>
        ) : (
          event.additionalNote?.trim() && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Additional Note:
              </Typography>
              <Typography sx={{ color: "gray" }}>
                {event.additionalNote}
              </Typography>
            </Box>
          )
        )}

        <Divider sx={{ mt: 3}} />
        
        <Box sx={{ display: "flex", mt: 3, justifyContent: "space-between" }}>
          {!customizeAction && (
            <>
             <Button
                variant="contained"
                sx={{ bgcolor: "#037e20"}}
                onClick={() => setCustomizeAction(true)}
              >
                Customize
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#3a9ad6"}}
                onClick={handlePublishButton}
              >
                Publish Event
              </Button>

             
            </>
          )}

          {customizeAction && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={handleUpdateButton}
              >
                Save Changes
              </Button>

              <Button
                variant="outlined"
                
                onClick={() => setCustomizeAction(false)}
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      


      </Box>
    </Box>
  );
}
export default EventPreview;

