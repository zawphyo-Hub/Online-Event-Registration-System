import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import Congrat from "../../assets/Congrat.png";


function SuccessPublicPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const shareableLink = `${window.location.origin}/agenda/public-event/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.info("Link Copied.")
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        m: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        
      }}
    >
      <Box sx={{maxWidth: 550,
          width: "100%",
          boxSizing: "border-box",
          borderRadius: 4,
          display: "flex",
        
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // overflow: "hidden",
        p: "30px",
          boxShadow: 3,
        gap: 2, }}
      >
        <Box sx={{display: "flex"}}>
      <Box 
        component="img"
        src={Congrat}
        sx={{
          width: "25px", height: "25px", pr: "7px"
        }}
      />
      <Typography variant="h5" sx={{ color: "green" }}>
        
        Your event has been published
      </Typography>
      <Box 
        component="img"
        src={Congrat}
        sx={{
          width: "25px", height: "25px", pl: "7px"
        }}
      />
      </Box>

      <Typography>
        Share this link with your attendees:
      </Typography>

      <TextField
        value={shareableLink}
        fullWidth
        sx={{ maxWidth: 500 }}
        Readonly
      />

     <Box sx={{display: "flex", gap: "10px"}}>
        <Button variant="contained" onClick={copyLink}>
            Copy Link
        </Button>

        
        <Button
            variant="contained"
            component={Link}
            to="/eventDashboard"
            
        >
            Go to Dashboard
        </Button>
      </Box>
      </Box>
    </Box>
  );
}

export default SuccessPublicPage;
