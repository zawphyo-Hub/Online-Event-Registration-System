import { Box, Typography, Button, Divider } from "@mui/material";
import dateIcon from "../../assets/date.png";
import timeIcon from "../../assets/time.png";
import locationIcon from "../../assets/address.png";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function TemplatePreview() {

  const { template_id } = useParams(); // get template id from URL
  const [template, setTemplate] = useState(null);
  const navigate = useNavigate();

  

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

  if (!template) 
  return (
      <Box 
      sx={{fontFamily: "sans-serif", fontSize: "17px", display: "flex",
        justifyContent: "center", mt: "30px"
      }}
      >Loading template....
      </Box>
    )

  const handleSelect = () => {
    
    navigate("/scratch-creation", {
    state: { template_id: template_id,
      template_name: template.template_name
    }
  })
      
  };

  return (
    <Box
      sx={{
        fontFamily: template.font_family,
        
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
          alt="Template preview"
          sx={{ width: "100%", height: 360, objectFit: "cover" }}
        />
      )}

      
     
      <Box sx={{ p: 4 }}>
       
        <Typography variant="h4" fontWeight="bold" sx={{ color: template.primary_color }}> 
          Sample Event Title
        </Typography>

        
        <Typography sx={{ mt: 1, color: template.secondary_color, fontStyle: "italic" }}>
           Event Description: This is a sample description to help you visualise how your event
            details will appear using this template. 
        </Typography>

        <Divider sx={{ my: 3 }} />

       
       
        <Box sx={{ display: "grid", rowGap: 1.5 }}>

          
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={locationIcon}
              alt="Location"
              sx={{ width: 20, height: 20, mr: 1 }}
            />
            <Typography>
              <strong>Location:</strong> Example Hall, Building A, City Centre
            </Typography>
          </Box>

          
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={dateIcon}
              alt="Date"
              sx={{ width: 20, height: 20, mr: 1 }}
            />
            <Typography>
              <strong>Date:</strong> 20 May 20XX
            </Typography>
          </Box>

          
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={timeIcon}
              alt="Time"
              sx={{ width: 20, height: 20, mr: 1 }}
            />
            <Typography>
              <strong>Time:</strong> 10:00 AM - 3:00 PM
            </Typography>
          </Box>

        </Box>

        
        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
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

           <Button
            variant="contained"
            size="large"
            to="/template-selection"
            component={Link}
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
            Go back
          </Button>
        </Box>
      </Box>
    </Box>
  );
}



export default TemplatePreview;
