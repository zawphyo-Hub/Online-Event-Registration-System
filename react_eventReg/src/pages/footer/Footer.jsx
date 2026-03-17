import { Box, Typography, Stack, Link as MuiLink, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/logo3.png";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        pt: 6,
        pb: 3,
        px: 2,
        borderTop: "1px solid #e2e8f0",
        background:
          "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          
        }}
      >
        <Box
          sx={{
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            gridTemplateColumns: { xs: "1fr", md: "1.3fr 1fr 1fr" },
            gap: { xs: 4, md: 6 },
            
          }}
        >
          
          <Box>
            <Box
              component="img"
              src={logo}
              alt="Agenda logo"
              sx={{
                height: 42,
                width: "auto",
                mb: 2,
              }}
            />

            <Typography
              sx={{
                color: "#475569",
                lineHeight: 1.8,
                fontSize: "0.96rem",
                maxWidth: 360,
              }}
            >
              Agenda helps you create event pages, share invitations, manage
              registrations, and verify attendees through one simple platform.
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "#64748b",
                fontSize: "0.92rem",
                fontWeight: 500,
              }}
            >
              supportagenda@gmail.com
            </Typography>
          </Box>

          {/* Navigation */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#0f172a",
                mb: 2,
                fontSize: "1rem",
              }}
            >
              Navigation
            </Typography>

            <Stack spacing={1.3}>
              <MuiLink
                component={RouterLink}
                to="/mainpage"
                underline="none"
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  width: "fit-content",
                  transition: "0.2s ease",
                  "&:hover": {
                    color: "#0b84d8",
                  },
                }}
              >
                Home
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/eventDashboard"
                underline="none"
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  width: "fit-content",
                  transition: "0.2s ease",
                  "&:hover": {
                    color: "#0b84d8",
                  },
                }}
              >
                Dashboard
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/template-selection"
                underline="none"
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  width: "fit-content",
                  transition: "0.2s ease",
                  "&:hover": {
                    color: "#0b84d8",
                  },
                }}
              >
                Create Events
              </MuiLink>

              <MuiLink
                component={RouterLink}
                to="/profile"
                underline="none"
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  width: "fit-content",
                  transition: "0.2s ease",
                  "&:hover": {
                    color: "#0b84d8",
                  },
                }}
              >
                Profile
              </MuiLink>
            </Stack>
          </Box>

          {/* Platform */}
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#0f172a",
                mb: 2,
                fontSize: "1rem",
              }}
            >
              Agenda's Purpose
            </Typography>

            <Stack spacing={1.3}>
              <Typography sx={{ color: "#64748b", fontWeight: 500 }}>
                Event page creation
              </Typography>
              <Typography sx={{ color: "#64748b", fontWeight: 500 }}>
                Shareable invitation links
              </Typography>
              <Typography sx={{ color: "#64748b", fontWeight: 500 }}>
                Registration tracking
              </Typography>
              <Typography sx={{ color: "#64748b", fontWeight: 500 }}>
                QR code verification
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "#e2e8f0" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "center" },
            gap: 1.5,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            sx={{
              color: "#64748b",
              fontSize: "0.88rem",
            }}
          >
            © {new Date().getFullYear()} Agenda. All rights reserved.
          </Typography>

         
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;