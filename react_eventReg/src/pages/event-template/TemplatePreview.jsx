import { Box, Typography, Button, Divider, Chip } from "@mui/material";
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
        
        
          {template.template_img_url && (
            <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={template.template_img_url}
              alt="Template preview"
              sx={{ width: "100%", height: { xs: 240, md: 340 }, objectFit: "cover" }}
            />
          

          
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 100%)",
                height: { xs: 240, md: 340 }, 
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
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
              {template.template_name}
            </Typography>

            <Typography sx={{ mt: 0.6, opacity: 0.9, maxWidth: 700 }}>
              Preview how your event page will look using this template.
            </Typography>
          </Box>
        </Box>
        )}
          

       
        <Box sx={{ p: { xs: 2.5, md: 4 } }}>
          
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.6rem", md: "2rem" },
              color: template.primary_color || "text.primary",
              lineHeight: 1.15,
            }}
          >
            Sample Event Title
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: template.secondary_color || "text.secondary",
              lineHeight: 1.7,
              maxWidth: 780,
            }}
          >
            This is a sample description to help you visualise how your event details will appear using this template.
          </Typography>

          <Divider sx={{ my: 3 }} />

          
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
              gap: 1.2,
            }}
          >
            {[
              { icon: locationIcon, label: "Location", value: "Example Hall, Building A, City Centre." },
              { icon: dateIcon, label: "Date", value: "Example Date" },
              { icon: timeIcon, label: "Time", value: "Example Time" },
            ].map((item) => (
              <Box
                key={item.label}
                sx={{
                  borderRadius: 3,
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  background: "linear-gradient(135deg, rgba(63,162,224,0.08), rgba(70,174,247,0.03))",
                  p: 2,
                  display: "flex",
                  gap: 1.2,
                  alignItems: "flex-start",
                }}
              >
                <Box component="img" src={item.icon} alt={item.label} sx={{ width: 20, height: 20, mt: "2px" }} />
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: "0.95rem" }}>{item.label}</Typography>
                  <Typography sx={{ color: "text.secondary", mt: 0.3, lineHeight: 1.5 }}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1.2,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/template-selection"
              sx={{
                borderRadius: 2.2,
                fontWeight: 700,
                px: 3,
              }}
            >
              Back
            </Button>

            <Button
              variant="contained"
              size="large"
              onClick={handleSelect}
              sx={{
                borderRadius: 2.2,
                fontWeight: 700,
                px: 3,
                backgroundColor: template.primary_color || "#3a9ad6",
                "&:hover": { backgroundColor: template.primary_color || "#3a9ad6", opacity: 0.92 },
              }}
            >
              Use This Template
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}



export default TemplatePreview;
