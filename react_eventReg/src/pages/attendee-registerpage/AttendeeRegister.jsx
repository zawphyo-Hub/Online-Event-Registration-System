import { useState } from "react";
import { Box, Typography, TextField, Button, Card } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/logo3.png";

function AttendeeRegister() {
  const { slug } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const validateInputs = () => {
    if (!firstName || !lastName || !email) {
      toast.error("All fields are required.");
      return false;
    }

    if (!email.includes("@")) {
      toast.error("Invalid email format.");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      await axios.post(
        `http://localhost:8080/event-registration/attendees/register/${slug}`,
        {
          firstName,
          lastName,
          email,
        }
      );

      toast.success("Successfully Registered for Event.");
      

    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed.");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <Card sx={{ p: 4, width: 400, borderRadius: 3 , boxShadow: 1, border: "1px solid black"
        }}>
       
        <Box sx={{ textAlign: "center", mb: 1}}>
            <Box
            component="img"
            src={logo}
            alt="Platform logo"
            sx={{ height: 32 }}
            
            />
        </Box>

        <Box sx={{ textAlign: "center", mb: 2 }}>
 
  <Typography variant="body2" color="gray">
    Please fill out the form to register for this event.
  </Typography>
</Box>

        <Box component="form" onSubmit={handleRegister}>
          <TextField
            label="First Name"
            fullWidth
            sx={{ mb: 2 }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            label="Last Name"
            fullWidth
            sx={{ mb: 2 }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 3 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            
            fullWidth
            sx={{ bgcolor: "#3a9ad6", color: "white"}}
          >
            Register For Event
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default AttendeeRegister;
