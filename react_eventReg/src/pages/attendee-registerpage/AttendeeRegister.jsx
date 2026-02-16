import { useState } from "react";
import { Box, Typography, TextField, Button, Card } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/logo3.png";

function AttendeeRegister() {
  const { slug } = useParams();

  const [isRegistered, setIsRegistered] = useState(false);

  const[firstNameError, setFirstNameError] = useState("");
  const[lastNameError, setLastNameError] = useState("");
  const[emailError, setEmailError] = useState("");


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const validateInputs = () => {
    let isValid = true;
    
    // ---- Email Error Message ----
    if(!email){
      setEmailError("Email is required.");
      isValid = false;
    } else if(!email.includes("@")){
      setEmailError("Incorrect Email.");
      isValid = false;
    }
    
    else{
      setEmailError("");
    }
    
    // ---- First Name Error Message ----
    if(!firstName){
      setFirstNameError("First Name is required.");
      isValid = false;
    }
    else{
      setFirstNameError("");
    }

    
    // ---- Last Name Error Message ----
    if(!lastName){
      setLastNameError("Last Name is required.");
      isValid = false;
    }
    else{
      setLastNameError("");
    }

    return isValid;

  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const isValid = validateInputs();

    if (!isValid) {
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/attendees/register-attendee/${slug}`,
        {
          firstName,
          lastName,
          email,
        }
      );

      toast.success("Registration Successful.");
      setIsRegistered(true);
      

    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Error!");
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
            alt="website logo"
            sx={{ height: 32 }}
            
            />
        </Box>

        
        {isRegistered ? (
          <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h5" sx={{ mb: 2, color: "green" }}>
              Thank You for Registering.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Your registration has been successfully received.
              
              
            </Typography>

             <Typography variant="body1" color="text.secondary">
             We look forward to seeing you at the event.
            </Typography>
          </Box>
        ) : (
          <Box >

        <Box sx={{ textAlign: "center", mb: 2 }}>
 
          <Typography variant="body2" color="gray">
            Please fill out the form to register for this event.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleRegister}>
          <TextField
            label="First Name"
            fullWidth
            helperText={firstNameError}
            error={Boolean(firstNameError)}
            sx={{ mb: 2 }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            label="Last Name"
            helperText={lastNameError}
            error={Boolean(lastNameError)}
            fullWidth
            sx={{ mb: 2 }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            label="Email"
            helperText={emailError}
            error={Boolean(emailError)}
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
        </Box>
        )}
      </Card>
    </Box>
  );
}

export default AttendeeRegister;
