import { Box, Typography, Button } from "@mui/material";
import date from '../../assets/date.png';
import time from '../../assets/time.png';
import location from '../../assets/address.png';

function TemplateAPreview({ template }) {
  if (!template) return null;

  return (
    <Box
      sx={{
        fontFamily: template.font_family,
        backgroundColor: template.background_color,
        
        maxWidth: "800px",
        margin: "20px auto",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      {/* Preview Image */}
      <Box
        component="img"
        src="https://res.cloudinary.com/dlj9ags4d/image/upload/v1770759961/gathering_nestty.jpg"
        alt="Event preview"
        sx={{
          width: "100%",
          height: 360,
          objectFit: "cover",
        }}
      />

      <Box sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" sx={{color: template.primary_color}}>
          Event Title
        </Typography>

        <Typography sx={{ mt: 2, color: template.secondary_color}}>
          Event Description: This is a sample description to help you visualise how your event
          details will appear using this template. You can customise everything
          later.
        </Typography>

        <Box sx={{ mt: 3 }}>
          {/* Location */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Box
              component="img"
              src={location}
              alt="Location"
              sx={{ width: 20, height: 20, mr: 1 }}
            />
            <Typography>
              <strong>Location:</strong> Building A, Street B, Example Road, 001 ABC.
            </Typography>
          </Box>

          {/* Date */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Box
              component="img"
              src={date}
              alt="Date"
              sx={{ width: 20, height: 20, mr: 1 }}
            />
            <Typography>
              <strong>Date:</strong> 20 May 20AA
            </Typography>
          </Box>

          {/* Time */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Box
              component="img"
              src={time}
              alt="Time"
              sx={{ width: 20, height: 20, mr: 1 }}
            />
            <Typography>
              <strong>Time:</strong> 10:00 - 15:00
            </Typography>
          </Box>
        </Box>

        <Button
          sx={{
            mt: 4,
            backgroundColor: template.primary_color,
            color: "#fff",
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: template.primary_color,
              opacity: 0.9,
            },
          }}
        >
          Select This Template
        </Button>
      </Box>
    </Box>
  );
}

export default TemplateAPreview;
