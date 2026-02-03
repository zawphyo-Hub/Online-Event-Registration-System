import { Box, Button, TextField, Typography, MenuItem, FormControl, FormLabel } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useState } from "react";

function ScratchCreation() {
  const [eventInfo, setEventInfo] = useState({
    event_title: "",
    description: "",
    location: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    event_image_url: "",
    slug: "",
    status: "DRAFT",
  });

  const handleChange = (e) => {
    setEventInfo({
      ...eventInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventInfo); // send to backend later
  };

  return (
    <Box sx={{background: "linear-gradient(to top, #20002c, #cbb4d4)"}}>
      

      <Box
        sx={{
                    
          display: "flex",
          p: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#fff",
            padding: 4,
            borderRadius: 2,
            width: "400px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            Create Event
          </Typography>

          
            <FormLabel sx={{color: "black"}}>Event Title</FormLabel>
            <Typography>This title will be shown at the top of your event page.</Typography>
            <TextField
                placeholder="Example: Birthday Party, Friends Reunion"
                name="event_title"
                value={eventInfo.event_title}
                onChange={handleChange}
                fullWidth
            />
          

          <FormLabel sx={{color: "black"}}>Description</FormLabel>
          <Typography>Give attendees a short overview of what your event is about.</Typography>
          <TextField
            placeholder="Describe about your event briefly."
            name="description"
            value={eventInfo.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Location"
            name="location"
            value={eventInfo.location}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            type="date"
            // label="Start Date"
            name="start_date"
            value={eventInfo.start_date}
            onChange={handleChange}
            
          />

          <TextField
            type="date"
            // label="End Date"
            name="end_date"
            value={eventInfo.end_date}
            onChange={handleChange}
            
          />

          <TextField
            type="time"
            // label="Start Time"
            name="start_time"
            value={eventInfo.start_time}
            onChange={handleChange}
            
          />

          <TextField
            type="time"
            // label="End Time"
            name="end_time"
            value={eventInfo.end_time}
            onChange={handleChange}
            
          />

          <TextField
            label="Event Image URL"
            name="event_image_url"
            value={eventInfo.event_image_url}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Slug"
            name="slug"
            value={eventInfo.slug}
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
