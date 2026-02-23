import { Box, Button, TextField, Typography, MenuItem, FormControl, FormLabel } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useState, useEffect, useRef } from "react";
import {APIProvider, Map, AdvancedMarker, Pin} from "@vis.gl/react-google-maps";
import GoogleMapLocation from "./GoogleMapLocation";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";

function ScratchCreation() {

  const navigate = useNavigate();

  // user id from local storage
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const userId = loginUser?.userId; 

  
  // Carry Template ID
  const location = useLocation();
  const template_id = location.state?.template_id;
  const template_name = location.state?.template_name;
    
    const [eventInfo, setEventInfo] = useState({
      
      event_title: "",
      description: "",
      location: "",      
      location_lat: null,
      location_lng: null,
      additionalNote: "",

      start_date: "",
      
      start_time: "",
      end_time: "",
      event_image_url: ""
      
      
    });
    

    const [errors, setErrors] = useState({});

    
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    
    
    const [defaultLocationMarker, setDefaultLocationMarker] = useState({
      lat: 51.752,
      lng: -1.2577,
    });

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

        setEventInfo((prev) => ({
          ...prev,
          event_image_url: imageUrl,
        }));
   


        console.log("Uploaded Successfully.");
      } catch (err) {
        console.error("Image upload failed.");
      }
    };

  

    const handleOnChange = (e) => {
      setEventInfo({
        ...eventInfo,
        [e.target.name]: e.target.value,
      });
    };


    // if template id == null
    useEffect(() => {
      if (!template_id) {
        navigate("/template-selection");
      }
    }, [template_id, navigate]);

    const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    if (!eventInfo.event_title.trim()) {
      newErrors.event_title = "Event title is required.";
      isValid = false;
    }

    if (!eventInfo.description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    if (!eventInfo.location) {
      newErrors.location = "Location is required.";
      isValid = false;
    }

    if (!eventInfo.start_date) {
      newErrors.start_date = "Start date is required.";
      isValid = false;
    }

    if (!eventInfo.start_time) {
      newErrors.start_time = "Start time is required.";
      isValid = false;
    }

    if (!eventInfo.end_time) {
      newErrors.end_time = "End time is required.";
      isValid = false;
    }

    // ---- date check ----
    if (eventInfo.start_date) {
      const selectedDate = new Date(eventInfo.start_date);
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


    const handleCreateEvent = async (e) => {
      e.preventDefault();
      if (!validateInputs()) return;

      try {

        const payLoadEventInfo = {
          template: {
            template_id: template_id
          },
          user: { userID: userId },
          event_title: eventInfo.event_title,
          description: eventInfo.description,
          location: eventInfo.location,
          location_lat: eventInfo.location_lat,
          location_lng: eventInfo.location_lng,
          additionalNote: eventInfo.additionalNote || null,
          start_date: eventInfo.start_date,
          start_time: eventInfo.start_time,
          end_time: eventInfo.end_time,
          event_image_url: eventInfo.event_image_url || null
          
        };
        
        const res = await axios.post("http://localhost:8080/event-registration/events/createEvents", 
          payLoadEventInfo);

        
        toast.success("Event has been created.")
        navigate(`/event-preview/${res.data.slug}`)

        

      } catch (error) {
        
        toast.error("Event creation failed.")
      }
    
    };


  return (
      <Box sx={{ display: "flex",justifyContent: "center",
            alignItems: "center", m: "20px"}}>
        

        <Box
          sx={{
                      
            display: "flex",
            p: "10px",
            
            height: "auto",
            boxShadow: 2,
            borderRadius: 3,
            overflow: "hidden"
            

          }}
        >
          
          <Box
            component="form"
            onSubmit={handleCreateEvent}
            sx={{
              backgroundColor: "#fff",
              padding: 4,
              borderRadius: 2,
              width: "650px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
          <Box
            sx={{
              backgroundColor: "#f4f0f7",
              
              p: 1,
              borderRadius: 2,
              m: "0"
            }}
          >
          <Typography variant="body2" sx={{ color: "gray" }}>
            Selected Template
          </Typography>

          <Typography  sx={{ fontWeight: "bold", fontSize: "15px" }}>
            {template_name}
          </Typography>
        </Box>



            <FormControl>
              <FormLabel 
              sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "17px"}}
              >
                Event Title
                <Typography component="span" sx={{ color: "red", pl: "2px" }}>
                  *
                </Typography>
              </FormLabel>
              <Typography sx={{color: "gray", mt: "5px"}}>This title will be shown at the top of your event page.</Typography>
              <TextField
                  placeholder="Example: Birthday Party, Friends Reunion"
                  name="event_title"
                  value={eventInfo.event_title}
                  onChange={handleOnChange}
                  fullWidth
                  slotProps={{
                    htmlInput: { maxLength: 50 },
                  }}
                  sx={{mt: "20px"}}
                  error={!!errors.event_title}
                  helperText={errors.event_title  }
              />
              <Typography
               sx={{ 
                color: "gray", 
                fontSize: "12px", 
                textAlign: "right", 
                mt: "2px", 
                fontStyle: "italic" 
              }}
              >Max Length: 50
              </Typography>
            </FormControl>

            <FormControl>
              <FormLabel 
              sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "17px"}}
              >
                Description
                <Typography component="span" sx={{ color: "red", pl: "2px" }}>
                  *
                </Typography>
              </FormLabel>
              <Typography sx={{color: "gray", mt: "5px"}}>Give attendees a short overview of what your event is about.</Typography>
              <TextField
                placeholder="Describe about your event briefly."
                name="description"
                value={eventInfo.description}
                onChange={handleOnChange}
                multiline
                rows={4}
                fullWidth
                sx={{mt: "20px"}}
                error={!!errors.description}
                helperText={errors.description}
                slotProps={{
                    htmlInput: { maxLength: 350 },
                }}
              />
              <Typography
               sx={{ 
                color: "gray", 
                fontSize: "12px", 
                textAlign: "right", 
                mt: "2px", 
                fontStyle: "italic" 
              }}
              >Max Length: 350
              </Typography>
            </FormControl>




            {/* --------- Google Map -------- */}
            <APIProvider 
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
            >

              <FormControl>
                <FormLabel 
                  sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "17px"}}
                >
                  Location
                  <Typography component="span" sx={{ color: "red", pl: "2px" }}>
                  *
                </Typography>
                </FormLabel>

                <GoogleMapLocation
                  inputRef={inputRef}
                  setEvent={setEventInfo}
                  setDefaultLocationMarker={setDefaultLocationMarker}
                  mapRef={mapRef}
                  // error={!!errors.location}
                  // helperText={errors.location}
                />
                {errors.location && (
                <Typography sx={{ color: "#d32f2f", fontSize: "12px", mt: "5px", ml: "17px" }}>
                  {errors.location}
                </Typography>
              )}

            </FormControl>

              <Box sx={{height: "300px", width: "100%"}}>
                <Map 
                
                center={defaultLocationMarker}
                defaultZoom={14}
                mapId={import.meta.env.VITE_MAP_ID}
              
                >
                  <AdvancedMarker
                    position={defaultLocationMarker}
                  >
                    <Pin background="white" borderColor="purple" glyphColor={"purple"} />
                  </AdvancedMarker>
                    
                </Map>
                

              </Box>
              

            </APIProvider>

            {eventInfo.location.address && (
              <Typography sx={{ fontSize: 14, color: "green" }}>
                Selected Location: {eventInfo.location}
              </Typography>
            )}

            <FormControl>
            <FormLabel sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "16px"}}>
              Addtional Address
              <Typography component="span" sx={{ color: "gray", pl: "2px" }}>
                  (Optional)
              </Typography>
            </FormLabel>
            <TextField
             placeholder="Enter additional information."
                name="additionalNote"
                value={eventInfo.additionalNote}
                onChange={handleOnChange}
                multiline
                rows={2}
                fullWidth
                sx={{mt: "15px"}}
                
                slotProps={{
                    htmlInput: { maxLength: 100 },
                }}
              
            />
            <Typography
               sx={{ 
                color: "gray", 
                fontSize: "12px", 
                textAlign: "right", 
                mt: "2px", 
                fontStyle: "italic" 
              }}
              >Max Length: 100
              </Typography>
            </FormControl>
          
            

            <FormControl>
            <FormLabel sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "16px"}}>
              Date
              <Typography component="span" sx={{ color: "red", pl: "2px" }}>
                  *
              </Typography>
            </FormLabel>
            <TextField
              type="date"
              // label="Start Date"
              name="start_date"
              value={eventInfo.start_date}
              onChange={handleOnChange}
              error={!!errors.start_date}
              helperText={errors.start_date}
              
            />
            </FormControl>

            
            <FormControl>
              <FormLabel sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "16px"}}>
                Start Time
                <Typography component="span" sx={{ color: "red", pl: "2px" }}>
                  *
                </Typography>
              </FormLabel>
              <TextField
                type="time"
                
                name="start_time"
                value={eventInfo.start_time}
                onChange={handleOnChange}
                error={!!errors.start_time}
                helperText={errors.start_time}
                
              />
            </FormControl>

            <FormControl>
              <FormLabel sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "16px"}}>
                End Time
                <Typography component="span" sx={{ color: "red", pl: "2px" }}>
                  *
                </Typography>
              </FormLabel>
              <TextField
                type="time"
                
                name="end_time"
                value={eventInfo.end_time}
                onChange={handleOnChange}
                error={!!errors.end_time}
              helperText={errors.end_time}
                
              />
            </FormControl>

          
          {/* this is for uploading image to cloudinary */}
            {/* <FormControl>
              <FormLabel 
              sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "16px", pb: "10px"}}
              >
                Event Picture
                
              </FormLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                              
              />
            </FormControl> */}
          
            
            <Button 
              type="submit" variant="contained"
              sx={{bgcolor: "#3a9ad6"}}
              
            >
              Create Event
            </Button>
          </Box>
        </Box>
      </Box>
    );
}

export default ScratchCreation;
