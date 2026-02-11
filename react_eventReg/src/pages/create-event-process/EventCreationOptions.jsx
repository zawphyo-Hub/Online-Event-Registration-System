import { Box, Button, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";

function EventCreationOptions(){
    return(
        <Box>
            <Navbar />
            <Box 
            sx={{
                background: "linear-gradient(to top, #20002c, #cbb4d4)",
                height: "87vh",
                alignItems: "center", display: "flex", justifyContent: "center"

            }}
            >
            <Box 
            sx={{display: "flex", justifyContent: "center", gap: "40px"
            
            }}>
                <Button
                component={Link}
                to="/template-selection"
                sx={{color: "#000000", backgroundColor: "white"}}
                
                >
                    CREATE BY YOURSELF
                </Button>
                <Button
                component={Link}
                to="/ai-assistant"
                sx={{color: "#000000", backgroundColor: "white"}}
                >
                    CREATE WITH AI
                
                </Button>
            </Box>
            </Box>
            
        </Box>
    )
    

}
export default EventCreationOptions;