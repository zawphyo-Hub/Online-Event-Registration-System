import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { useState } from "react";

function AIAssistant() {
  const [eventInfo, setEventInfo] = useState({
    event_title: "",
    
    location: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    
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
    <Box>
      <Navbar />

      {/* Background */}
      <Box
        sx={{
          background: "linear-gradient(to top, #20002c, #cbb4d4)",
          minHeight: "87vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Form Card */}
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

          <TextField
            label="Event Title"
            name="event_title"
            value={eventInfo.event_title}
            onChange={handleChange}
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

          
          <Button type="submit" variant="contained">
            Create Event
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AIAssistant;
