import { Box, Typography, Stack, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from '../../assets/logo3.png';

function Footer() {
  return (
    <Box
      sx={{
        mt: 6,
        py: 4,
        px: 2,
        borderTop: "1px solid rgba(0,0,0,0.08)",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          justifyContent: "space-between",
          gap: 2.5,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                justifyContent: { xs: "center", md: "flex-start" },
            }}
            >
            <Box
                component="img"
                src={logo}
                alt="Agenda logo"
                sx={{
                height: 36,
                width: "auto",
                }}
            />

            
        </Box>
        
        <Stack direction="row" spacing={2.5} flexWrap="wrap" justifyContent="center">
          <MuiLink component={RouterLink} to="/mainpage" underline="hover" color="text.secondary">
            Home
          </MuiLink>

          <MuiLink component={RouterLink} to="/eventDashboard" underline="hover" color="text.secondary">
            Dashboard
          </MuiLink>

          <MuiLink component={RouterLink} to="/template-selection" underline="hover" color="text.secondary">
            Create Events
          </MuiLink>

          <MuiLink component={RouterLink} to="/profile" underline="hover" color="text.secondary">
            Profile
          </MuiLink>
        </Stack>

        
        <Box>
          <Typography sx={{ fontWeight: 800, mb: 0.5 }}>
            Contact
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
            supportagenda@gmail.com
          </Typography>

        </Box>
      </Box>

      
      <Typography
        sx={{
          mt: 3,
          textAlign: "center",
          color: "text.secondary",
          fontSize: "0.85rem",
        }}
      >
        @{new Date().getFullYear()} Agenda. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;