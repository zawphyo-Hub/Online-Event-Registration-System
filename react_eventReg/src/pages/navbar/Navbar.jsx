import { Box, Button, Typography, Stack, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../../assets/logo3.png';
function Navbar(){
    return(
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", m: "20px" , }}>
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
                  
                </Box>

                <Box>

                <Button
                to="/mainpage"
                component={Link}
                sx={{color: "black", }}
                >
                    Home

                </Button>
                <Button
                to="/eventDashboard"
                component={Link}
                sx={{color: "black", }}
                >
                    Dashboard

                </Button>
                <Button
                component={Link}
                to="/template-selection"
                sx={{color: "black"}}
                >
                    Create Events

                </Button>
                <Button
                component={Link}
                to="/profile"
                sx={{color: "black", }}
                >
                    Profile

                </Button>
                </Box>

            </Box>
            

        </Box>
    )
    

}
export default Navbar;