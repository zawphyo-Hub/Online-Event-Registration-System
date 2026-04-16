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
  const [event, setEvent] = useState(null); // current event info
  const [draftEvent, setDraftEvent] = useState(null); // temporary event info
  const [customizeAction, setCustomizeAction] = useState(false);
  const [errors, setErrors] = useState({});

  // For Google Map auto complete
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const [defaultLocationMarker, setDefaultLocationMarker] = useState({
      lat: 51.752,
      lng: -1.2577,
    });

  const navigate = useNavigate();

  const currentEvent = customizeAction ? draftEvent : event; //display event info when update (draft or current event)

 
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

  // validate update data before saving
  const validateEventPreview = () => {
    const newErrors = {};
    let isValid = true;


    // Title validation
    if (!draftEvent?.event_title || draftEvent.event_title.trim() === "") {
      newErrors.event_title = "Title is required.";
      isValid = false;
    }

    // Description validation
    if (!draftEvent?.description || draftEvent.description.trim() === "") {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    if (draftEvent?.start_date) {
      const selectedDate = new Date(draftEvent.start_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.start_date = "Start date must not be in the past.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // customize button
  const handleCustomizeButton = () => {
    if (!event) return;
    setDraftEvent({ ...event });
    setCustomizeAction(true);
  };

  // cancel button
  const handleCancelButton = () => {
    setDraftEvent(null);
    setCustomizeAction(false);
  };

  // update button
  const handleUpdateButton = async () => {

    if (!validateEventPreview()) return;
    try {
      const payLoad = {
        ...draftEvent,
        location: draftEvent.location,          
        location_lat: draftEvent.location_lat,  
        location_lng: draftEvent.location_lng,  
      };
      await axios.put(
        `http://localhost:8080/event-registration/events/update/${event.eventId}`,
        payLoad
      );

      setEvent(draftEvent);
      setDraftEvent(null);
      setCustomizeAction(false);
      toast.success("Event updated.");
      
      
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

      setDraftEvent((prev) => ({
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

  

  const template = currentEvent.template || {};

  // date and time format for better reading
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).replace(/ /g, "-");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":");

    const period = Number(hours) < 12 ? "am" : "pm";

    return `${Number(hours)}:${minutes} ${period}`;
  };


  return (
    <Box
    sx={{
      minHeight: "100vh",
      py: { xs: 3, md: 5 },
      px: { xs: 2, md: 3 },
      // background: "linear-gradient(135deg, rgba(63,162,224,0.10), rgba(70,174,247,0.06))",
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
      {(currentEvent.event_image_url || template.template_img_url) && (
      <Box sx={{ position: "relative", height: { xs: 240, md: 340 },
      overflow: "hidden", bgcolor: currentEvent.event_image_url ? "rgba(0,0,0,0.04)" : "transparent", }}>
        
           
          {/* Main image----------*/}
          <Box
            component="img"
            src={currentEvent.event_image_url || template.template_img_url}
            alt="Event cover"
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: currentEvent.event_image_url ? "contain" : "cover",   
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
            {customizeAction ? "Customize your event" : currentEvent.event_title}
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

            {draftEvent?.event_image_url && (
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
            value={draftEvent.event_title}
            onChange={(e) => setDraftEvent({ ...draftEvent, event_title: e.target.value })}
            error={!!errors.event_title}
            helperText={errors.event_title}
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
            {currentEvent.event_title}
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
            value={draftEvent.description}
            onChange={(e) => setDraftEvent({ ...draftEvent, description: e.target.value })}
            error={!!errors.description}
            helperText={errors.description}
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
            {currentEvent.description}
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
                {currentEvent.location || "No location selected"}
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
                  value={draftEvent.start_date || ""}
                  onChange={(e) => {
                    setDraftEvent({ ...draftEvent, start_date: e.target.value });
                     setErrors((prev) => ({ ...prev, start_date: "" }));
                  }}
                  error={!!errors.start_date}
                  helperText={errors.start_date}
                />
              ) : (
                <Typography sx={{ color: "text.secondary", mt: 0.6, lineHeight: 1.5 }}>
                  {formatDate(currentEvent.start_date)}
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
                    value={draftEvent.start_time || ""}
                    onChange={(e) => setDraftEvent({ ...draftEvent, start_time: e.target.value })}
                  />
                  <TextField
                    type="time"
                    size="small"
                    label="End"
                    sx={{ flex: 1 }}
                    value={draftEvent.end_time || ""}
                    onChange={(e) => setDraftEvent({ ...draftEvent, end_time: e.target.value })}
                  />
                </Box>
              ) : (
                <Typography sx={{ color: "text.secondary", mt: 0.6, lineHeight: 1.5 }}>
                  {formatTime(currentEvent.start_time)} - {formatTime(currentEvent.end_time)}
                </Typography>
              )}
            </Box>
          </Box>

         
        </Box>

        {/* ---------Google map auto complete-------- */}
        {currentEvent.location_lat && currentEvent.location_lng && (
          <Box sx={{ mt: 2.2 }}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
            {customizeAction && (
              <Box sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 900, fontSize: "1.1rem", mb: 1 }}>
                  Update location
                </Typography>
                <GoogleMapLocation
                  inputRef={inputRef}
                  setEvent={setDraftEvent}
                  setDefaultLocationMarker={setDefaultLocationMarker}
                />
              </Box>
            )}

            <Box sx={{ height: 320, width: "100%", borderRadius: 3, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
              
                <Map
                  center={{ lat: currentEvent.location_lat, lng: currentEvent.location_lng }}
                  defaultZoom={14}
                  mapId={import.meta.env.VITE_MAP_ID}
                >
                  <AdvancedMarker position={{ lat: currentEvent.location_lat, lng: currentEvent.location_lng }}>
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
              value={draftEvent.additionalNote || ""}
              onChange={(e) => setDraftEvent({ ...draftEvent, additionalNote: e.target.value })}
              slotProps={{ htmlInput: { maxLength: 100 } }}
            />
          </Box>
        ) : (
          currentEvent.additionalNote?.trim() && (
            <Box sx={{ mt: 2.5 }}>
              <Typography sx={{ fontWeight: 900 }}>Additional Note</Typography>
              <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                {currentEvent.additionalNote}
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
                onClick={handleCustomizeButton}
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
                onClick={handleCancelButton}
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

