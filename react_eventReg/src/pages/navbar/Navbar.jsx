import { Box, Button, Drawer, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo3.png";
import MenuIconImg from "../../assets/menu.png";
import RemoveIconImg from "../../assets/remove.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const NavButtons = ({ onClick }) => (
    <>
      <Button component={Link} to="/mainpage" sx={{ color: "black", fontWeight: 600 }} onClick={onClick}>
        Home
      </Button>
      <Button component={Link} to="/eventDashboard" sx={{ color: "black", fontWeight: 600 }} onClick={onClick}>
        Dashboard
      </Button>
      <Button component={Link} to="/template-selection" sx={{ color: "black", fontWeight: 600 }} onClick={onClick}>
        Create Events
      </Button>
      <Button component={Link} to="/verify-builtin" sx={{ color: "black", fontWeight: 600 }} onClick={onClick}>
        Verification
      </Button>
      <Button component={Link} to="/profile" sx={{ color: "black", fontWeight: 600 }} onClick={onClick}>
        Profile
      </Button>
      
    </>
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", m: "20px" }}>
        
        
        <Box sx={{ display: "flex" }}>
          <Box
            component="img"
            src={logo}
            alt="Platform logo"
            sx={{ height: "35px", width: "auto" }}
          />
        </Box>

       
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <NavButtons />
        </Box>

        
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ display: { xs: "flex", md: "none",  } }}
        >
          <Box component="img" src={MenuIconImg} alt="Menu" sx={{ height: 30, width: 30 }} />
        </IconButton>
      </Box>

     
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 2, width: 230 }}>

          
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Box
              component="img"
              src={logo}
              alt="Agenda logo"
              sx={{ height: 30, width: "auto" }}
            />

            <IconButton onClick={() => setOpen(false)}>
              <Box
                component="img"
                src={RemoveIconImg}
                alt="Close"
                sx={{ height: 22, width: 22 }}
              />
            </IconButton>
          </Box>

          
          <Stack spacing={1}>
            <NavButtons onClick={() => setOpen(false)} />
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;