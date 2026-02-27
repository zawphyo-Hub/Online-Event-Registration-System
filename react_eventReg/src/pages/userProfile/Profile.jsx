import { Box, Button, Typography, TextField, Switch, FormControlLabel, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import editIcon from "../../assets/pen.png";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";



function Profile() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    mfaEnabled: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      
      return;
    }
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserData({
        username: parsedUser.username,
        email: parsedUser.email,
        mfaEnabled: parsedUser.mfaEnabled,
      });
    }
  }, []);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
    setUserData({
      username: user.username,
      email: user.email,
      mfaEnabled: user.mfaEnabled,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
     toast.success("You have been logged out.");
      setTimeout(() => {
        navigate("/login");
      }, 300);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/users/update/${user.userId}`,
        {
          username: userData.username,
          email: userData.email,
          mfaEnabled: userData.mfaEnabled,
        }
      );

        if (res.data.secretKey2FA && userData.mfaEnabled === true) {
          toast.info("Scan the QR code to enable multi-factor authentication.")
          navigate("/twofaqr", {
            state: {
              twoFaQr: res.data.secretKey2FA,
              email: res.data.email,
            },
          });
          return;
        }

      // Update new user data in localStorage
      const updatedUser = {
        ...user,
        username: res.data.username,
        email: res.data.email,
        mfaEnabled: res.data.mfaEnabled,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEdit(false);

      toast.success("Profile updated.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update.");
    }
  };

  if (!user) {
    return (
      <Box
        sx={{
          fontSize: "17px",
          display: "flex",
          justifyContent: "center",
          mt: "30px",
        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box>
      <Navbar></Navbar>
    
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 2,
        }}
      >
        
        <Box sx={{ mb: 2, display: "flex" , gap: "5px"}}>
          <Typography sx={{ fontWeight: 600 }}>User ID: </Typography>
          <Typography>{user.userId}</Typography>
        </Box>

        
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Name</Typography>
          {edit ? (
            <TextField
              fullWidth
              size="small"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
          ) : (
            <Typography>{user.username}</Typography>
          )}
        </Box>

        
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Email</Typography>
          {edit ? (
            <TextField
              fullWidth
              size="small"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          ) : (
            <Typography>{user.email}</Typography>
          )}
        </Box>

        

        
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 600 }}>MFA Enabled</Typography>
          {edit ? (
            <FormControlLabel
              control={
                <Switch
                  checked={userData.mfaEnabled || false}
                  onChange={handleChange}
                  name="mfaEnabled"
                />
              }
              label={userData.mfaEnabled ? "Yes" : "No"}
            />
          ) : (
            <Typography>
              {user.mfaEnabled ? "Yes" : "No"}
            </Typography>
          )}
        </Box>

        
        {!edit ? (
          <Button
            variant="contained"
            fullWidth
            onClick={handleEdit}
            sx={{ display: "flex", gap: 1 }}
          >
            <Box
              component="img"
              src={editIcon}
              sx={{ width: 18, height: 18 }}
            />
            Edit Profile
          </Button>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleUpdate}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        )}
        <Button
          variant="outlined"
          color="error"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
    </Box>
  );
}

export default Profile;