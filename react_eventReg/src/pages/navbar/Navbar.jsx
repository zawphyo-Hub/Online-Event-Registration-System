import { Box, Button, Typography, Stack, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../../assets/logo2.png';
function Navbar(){
    return(
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", m: "20px" }}>
                <Box sx={{display: "flex"}}>
                    <Box
                        component="img"
                        src={logo}
                        alt="Platform logo"
                        sx={{
                        height: "35px",
                        width: "auto"            
                        }}
                    />
                    <Typography sx={{display: "flex", alignItems: "center", fontFamily: "sans-serif", 
                    fontWeight: "bold"}}
                    >Event</Typography>
                </Box>

                <Box>

                <Button
                to="/mainpage"
                component={Link}
                >
                    Home

                </Button>
                <Button
                to="/dashboard"
                component={Link}
                >
                    Dashboard

                </Button>
                <Button
                component={Link}
                to="/event-creation"
                >
                    Create Events

                </Button>
                <Button
                component={Link}
                to="/profile"
                >
                    Profile

                </Button>
                </Box>

            </Box>
            

        </Box>
    )
    

}
export default Navbar;