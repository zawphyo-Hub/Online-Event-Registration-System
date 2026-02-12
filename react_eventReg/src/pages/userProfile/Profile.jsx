import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
  }, []);

  if (!user) {
    return <Typography>Loading user info...</Typography>;
  }
  

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Profile</Typography>
      <Typography><strong>Name:</strong> {user.username}</Typography>
      <Typography><strong>Email:</strong> {user.email}</Typography>
      <Typography><strong>User ID:</strong> {user.userId}</Typography>
      <Typography><strong>MFA Enabled:</strong> {user.mfaEnabled ? "Yes" : "No"}</Typography>
    </Box>
  );
}

export default Profile;
