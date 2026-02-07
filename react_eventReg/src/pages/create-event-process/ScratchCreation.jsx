import { Box, Button, TextField, Typography, MenuItem, FormControl, FormLabel } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useState, useEffect, useRef } from "react";
import {APIProvider, Map, AdvancedMarker, Pin, useMapsLibrary} from "@vis.gl/react-google-maps";


function ScratchCreation() {
  const [eventInfo, setEventInfo] = useState({
    event_title: "",
    description: "",
    location: {
      address:"",
      latitude: null,
      longitude: null
    },

    start_date: "",
    
    start_time: "",
    end_time: "",
    event_image_url: "",
    
  });

  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  const [defaultLocationMarker, setDefaultLocationMarker] = useState({
    lat: 51.752,
    lng: -1.2577,
  });

 useEffect(() => {
  if (!places || !inputRef.current) return; 

  const autocomplete = new places.Autocomplete(inputRef.current, {
    fields: ["geometry", "formatted_address"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setDefaultLocationMarker({ lat, lng });
    setEventInfo(prev => ({
      ...prev,
      location: {
        address: place.formatted_address,
        latitude: lat,
        longitude: lng,
      },
    }));
    mapRef.current?.panTo({ lat, lng });
  });

}, [places]);


  const handleChange = (e) => {
    setEventInfo({
      ...eventInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventInfo);
   
  };

return (
    <Box sx={{background: "linear-gradient(to top, #20002c, #cbb4d4)", }}>
      

      <Box
        sx={{
                    
          display: "flex",
          p: "40px",
          justifyContent: "center",
          alignItems: "center",
          height: "auto"
        }}
      >
        
        <Box
          component="form"
          onSubmit={handleSubmit}
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
          {/* <Typography variant="h6" textAlign="center">
            Create Event
          </Typography> */}

          <FormControl>
            <FormLabel 
            sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "17px"}}
            >
              Event Title
            </FormLabel>
            <Typography sx={{color: "gray", mt: "5px"}}>This title will be shown at the top of your event page.</Typography>
            <TextField
                placeholder="Example: Birthday Party, Friends Reunion"
                name="event_title"
                value={eventInfo.event_title}
                onChange={handleChange}
                fullWidth
                sx={{mt: "20px"}}
            />
          </FormControl>

          <FormControl>
            <FormLabel 
            sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "17px"}}
            >
              Description
            </FormLabel>
            <Typography sx={{color: "gray", mt: "5px"}}>Give attendees a short overview of what your event is about.</Typography>
            <TextField
              placeholder="Describe about your event briefly."
              name="description"
              value={eventInfo.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              sx={{mt: "20px"}}
            />
          </FormControl>


         <FormControl>
            <FormLabel 
            sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "17px"}}
            >
              Location
            </FormLabel>
            <TextField
              placeholder="Search Location"
              // name="location"
              inputRef={inputRef}
              // value={eventInfo.location.address}
              // onChange={handleChange}
              fullWidth
              sx={{mt: "10px"}}
            />
          </FormControl>

          {/* --------- Google Map -------- */}
          <APIProvider 
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
          >
            <Box sx={{height: "300px", width: "100%"}}>
              <Map 
              ref={mapRef}
              defaultCenter={defaultLocationMarker}
              defaultZoom={8}
              mapId={import.meta.env.VITE_MAP_ID}
              onClick={(e) => {
                const lat = e.detail.latLng.lat;
                const lng = e.detail.latLng.lng;

                setDefaultLocationMarker({ lat, lng });
               
                setEventInfo((prev) => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    latitude: lat,
                    longitude: lng,
                  },
                }));
              }}
              >
                <AdvancedMarker
                position={defaultLocationMarker}
                draggable
                onDragEnd={(e) => {
                  const lat = e.latLng.lat();
                  const lng = e.latLng.lng();

                  setDefaultLocationMarker({ lat, lng });
                  
                  setEventInfo((prev) => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      latitude: lat,
                      longitude: lng,
                    },
                  }));
                }}
              >
                <Pin background="white" borderColor="purple" glyphColor={"purple"} />
              </AdvancedMarker>
                  
              </Map>
              

            </Box>
            

          </APIProvider>

          {/* {eventInfo.location.address && (
            <Typography sx={{ fontSize: 13, color: "gray" }}>
              Selected: {eventInfo.location.address}
            </Typography>
          )} */}
         

          

          <FormControl>
          <FormLabel sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "16px"}}>Date</FormLabel>
          <TextField
            type="date"
            // label="Start Date"
            name="start_date"
            value={eventInfo.start_date}
            onChange={handleChange}
            
          />
          </FormControl>

          
          <FormControl>
            <FormLabel sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "16px"}}>Start Time</FormLabel>
            <TextField
              type="time"
              
              name="start_time"
              value={eventInfo.start_time}
              onChange={handleChange}
              
            />
          </FormControl>

          <FormControl>
            <FormLabel sx={{color: "black", fontFamily: "sans-serif", fontWeight: "bold", fontSize: "16px"}}>End Time</FormLabel>
            <TextField
              type="time"
              // label="End Time"
              name="end_time"
              value={eventInfo.end_time}
              onChange={handleChange}
              
            />
          </FormControl>

          <TextField
            label="Event Image URL"
            name="event_image_url"
            value={eventInfo.event_image_url}
            onChange={handleChange}
            fullWidth
          />
         
          
          <Button type="submit" variant="contained">
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ScratchCreation;
