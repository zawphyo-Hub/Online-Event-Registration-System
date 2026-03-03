import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function TemplateSelection() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get("http://localhost:8080/templates/getAllTemplate");
        setTemplates(res.data);
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleSelect = (template_id) => {
    navigate(`/template-preview/${template_id}`);
  };

  
  return (
    <Box sx={{ p: 4,  }}>
      <Typography variant="h6" mb={3} textAlign="center"
      sx={{fontWeight: 600}}>
        Choose a Template
      </Typography>

            
      <Grid
        container
        spacing={4}
        justifyContent="center"
      >
        {templates.map((template) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={template.template_id}
            display="flex"
            justifyContent="center"
          >
            <Card
              sx={{
                maxWidth: 320,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
              
              {template.template_img_url ? (
                <CardMedia
                  component="img"
                  height="220"
                  image={template.template_img_url}
                  alt={template.template_name}
                />
              ) : (
                <Box
                  sx={{
                    height: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg, rgba(63,162,224,0.15), rgba(70,174,247,0.08))",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "text.secondary",
                  }}
                >
                  Basic Template
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" align="center">
                  {template.template_name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {template.template_description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                sx={{bgcolor: "#3a9ad6", color: "white"}}
                  fullWidth
                  
                  onClick={() => handleSelect(template.template_id)}
                >
                  Select Template
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TemplateSelection;
