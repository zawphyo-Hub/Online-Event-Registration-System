import {Box,Button,Typography,TextField,Switch,FormControlLabel,Paper,Avatar,Stack,Divider,Chip,} from "@mui/material";
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
      const wasMfaEnabled = user.mfaEnabled; // check if mfa was already enabled or not

      const res = await axios.put(
        `http://localhost:8080/users/update/${user.userId}`,
        {
          username: userData.username,
          email: userData.email,
          mfaEnabled: userData.mfaEnabled,
        }
      );

      const isTurningOnMfa = !wasMfaEnabled && userData.mfaEnabled;

      if (isTurningOnMfa && res.data.secretKey2FA) {
        toast.info("Scan the QR code to enable multi-factor authentication.");
        navigate("/twofaqr", {
          state: {
            twoFaQr: res.data.secretKey2FA,
            email: res.data.email,
          },
        });
        return;
      }

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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Navbar />

      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 3, sm: 4, md: 5 },
        }}
      >
        

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          {/* -----------Left card------------- */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
              position: "sticky",
              top: 24,
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  fontSize: "2rem",
                  fontWeight: 700,
                  bgcolor: "#2563eb",
                }}
              >
                {user.username?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#0f172a",
                  }}
                >
                  {user.username}
                </Typography>
                <Typography
                  sx={{
                    color: "#64748b",
                    fontSize: "0.95rem",
                    wordBreak: "break-word",
                  }}
                >
                  {user.email}
                </Typography>
              </Box>

              <Chip
                label={user.mfaEnabled ? "MFA Protected" : "MFA Disabled"}
                color={user.mfaEnabled ? "success" : "default"}
                variant={user.mfaEnabled ? "filled" : "outlined"}
                sx={{ fontWeight: 600 }}
              />
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>
              <Box>
                <Typography sx={{ fontSize: 13, color: "#94a3b8", mb: 0.5 }}>
                  User ID
                </Typography>
                <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                  AGD{user.userId}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 13, color: "#94a3b8", mb: 0.5 }}>
                  Account Status
                </Typography>
                <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                  Active
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 13, color: "#94a3b8", mb: 0.5 }}>
                  Security
                </Typography>
                <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                  {user.mfaEnabled ? "Multi-factor login" : "Standard login"}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* ----------------Right card---------------- */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid #e2e8f0",
              bgcolor: "#ffffff",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                px: { xs: 2.5, sm: 4 },
                py: 3,
                borderBottom: "1px solid #e2e8f0",
                background:
                  "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#0f172a",
                }}
              >
                Personal Information
              </Typography>
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.92rem",
                  mt: 0.5,
                }}
              >
                Update your profile details and account security settings.
              </Typography>
            </Box>

            <Box sx={{ px: { xs: 2.5, sm: 4 }, py: 4 }}>
              <Stack spacing={3}>
                {/* ----------Name */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#0f172a",
                      mb: 1,
                      fontSize: "0.95rem",
                    }}
                  >
                    Full Name
                  </Typography>

                  {edit ? (
                    <TextField
                      fullWidth
                      size="medium"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                  ) : (
                    <Paper
                      elevation={0}
                      sx={{
                        px: 2,
                        py: 1.6,
                        borderRadius: 2.5,
                        bgcolor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <Typography sx={{ color: "#0f172a", fontWeight: 500 }}>
                        {user.username}
                      </Typography>
                    </Paper>
                  )}
                </Box>

                {/* -----Email */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#0f172a",
                      mb: 1,
                      fontSize: "0.95rem",
                    }}
                  >
                    Email Address
                  </Typography>

                  {edit ? (
                    <TextField
                      fullWidth
                      size="medium"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                  ) : (
                    <Paper
                      elevation={0}
                      sx={{
                        px: 2,
                        py: 1.6,
                        borderRadius: 2.5,
                        bgcolor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <Typography sx={{ color: "#0f172a", fontWeight: 500 }}>
                        {user.email}
                      </Typography>
                    </Paper>
                  )}
                </Box>

                {/*---------- MFA */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#0f172a",
                      mb: 1,
                      fontSize: "0.95rem",
                    }}
                  >
                    Multi-Factor Authentication
                  </Typography>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    {edit ? (
                      <FormControlLabel
                        sx={{ m: 0 }}
                        control={
                          <Switch
                            checked={userData.mfaEnabled || false}
                            onChange={handleChange}
                            name="mfaEnabled"
                          />
                        }
                        label={
                          <Box>
                            <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                              {userData.mfaEnabled ? "Enabled" : "Disabled"}
                            </Typography>
                            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
                              Add an extra layer of security to your account.
                            </Typography>
                          </Box>
                        }
                      />
                    ) : (
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: "#0f172a" }}>
                          {user.mfaEnabled ? "Enabled" : "Disabled"}
                        </Typography>
                        
                      </Box>
                    )}
                  </Paper>
                </Box>

                <Divider />

                {/* -------------buttons */}
                {!edit ? (
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Button
                      variant="contained"
                      onClick={handleEdit}
                      sx={{
                        px: 3,
                        py: 1.2,
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: "none",
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Box
                        component="img"
                        src={editIcon}
                        alt="Edit"
                        sx={{ width: 18, height: 18 }}
                      />
                      Edit Profile
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleLogout}
                      sx={{
                        px: 3,
                        py: 1.2,
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Logout
                    </Button>
                  </Stack>
                ) : (
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={handleUpdate}
                        sx={{
                          px: 3,
                          py: 1.2,
                          borderRadius: 2.5,
                          textTransform: "none",
                          fontWeight: 600,
                          boxShadow: "none",
                        }}
                      >
                        Save Changes
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={handleCancel}
                        sx={{
                          px: 3,
                          py: 1.2,
                          borderRadius: 2.5,
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleLogout}
                      sx={{
                        px: 3,
                        py: 1.2,
                        borderRadius: 2.5,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Logout
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;