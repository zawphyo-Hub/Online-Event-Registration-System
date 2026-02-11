import { Box, Typography, Button, Divider } from "@mui/material";
import dateIcon from "../../assets/date.png";
import timeIcon from "../../assets/time.png";
import locationIcon from "../../assets/address.png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function TemplatePreview() {

   const { template_id } = useParams(); // get template id from URL
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/templates/${template_id}`);
        setTemplate(res.data);
      } catch (error) {
        console.error("Failed to fetch template:", error);
      }
    };

    fetchTemplate();
  }, [template_id]);

  if (!template) return <div>Loading template...</div>;

  const handleSelect = () => {
    console.log("Template selected:", template.template_name);
   
  };

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
      {/* COVER IMAGE */}
      {template.template_img_url && (
        <Box
          component="img"
          src={template.template_img_url}
          alt="Template preview"
          sx={{ width: "100%", height: 360, objectFit: "cover" }}
        />
      )}

      {/* CONTENT */}
     
      <Box sx={{ p: 4 }}>
        {/* TITLE */}
        <Typography variant="h4" fontWeight="bold" sx={{ color: template.primary_color }}> 
          Sample Event Title
        </Typography>

        {/* TAGLINE */}
        <Typography sx={{ mt: 1, color: template.secondary_color, fontStyle: "italic" }}>
           Event Description: This is a sample description to help you visualise how your event
            details will appear using this template. You can customise everything
            later.
        </Typography>

        <Divider sx={{ my: 3 }} />

       
        {/* EVENT INFO */}
        <Box sx={{ display: "grid", rowGap: 1.5 }}>
          <InfoRow icon={locationIcon} label="Location">
            Example Hall, Building A, City Centre
          </InfoRow>

          <InfoRow icon={dateIcon} label="Date">
            20 May 20XX
          </InfoRow>

          <InfoRow icon={timeIcon} label="Time">
            10:00 AM - 3:00 PM
          </InfoRow>
        </Box>

        {/* ACTION */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSelect}
            sx={{
              backgroundColor: template.primary_color,
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: template.primary_color,
                opacity: 0.9,
              },
            }}
          >
            Use This Template
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* Small reusable row */
function InfoRow({ icon, label, children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src={icon}
        alt={label}
        sx={{ width: 20, height: 20, mr: 1 }}
      />
      <Typography>
        <strong>{label}:</strong> {children}
      </Typography>
    </Box>
  );
}

export default TemplatePreview;
