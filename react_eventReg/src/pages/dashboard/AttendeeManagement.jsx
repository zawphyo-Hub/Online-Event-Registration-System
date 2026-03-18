import { useEffect, useState } from "react";
import {Box, Typography, Card, Table, TableHead, TableRow, TableCell, TableBody, Button, 
  TextField, Select, MenuItem, Paper, Stack, Divider} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../navbar/Navbar";

function AttendeeManagement() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [editAttendeeId, setEditAttendeeId] = useState(null);
  const [editedAttendee, setEditedAttendee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isVerified: false
    
  });

  const fetchAttendees = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/attendees/getAttendeeEvent/${eventId}`
      );
      setAttendees(res.data);
    } catch (error) {
      toast.error("Error Loading Attendees.");
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, [eventId]);

  const handleEditAttendees = (attendee) => {
    setEditAttendeeId(attendee.attendee_id);
    setEditedAttendee({
      firstName: attendee.firstName,
      lastName: attendee.lastName,
      email: attendee.email,
      isVerified: attendee.isVerified,
    });
  };

  const handleUpdateAttendees = async (id) => {
    try {
      await axios.put(`http://localhost:8080/attendees/update/${id}`, editedAttendee);
      toast.success("Attendee updated.");
      setEditAttendeeId(null);
      fetchAttendees();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDeleteAttendees = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this attendee?");
  
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:8080/attendees/delete/${id}`);
      toast.success("Attendee deleted.");
      fetchAttendees();
    } catch (error) {
      toast.error("Error Deleting Attendee!");
    }
  };

  return (
    <Box>
        <Navbar></Navbar>
    
    <Box sx={{minHeight: "87vh",background:
            "linear-gradient(135deg, #0f172a 0%, #0f3d68 45%, #0b84d8 100%)",}}>

    
    <Box sx={{ p: 4,  }}>
      <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.5rem", md: "1.7rem" },
                color: "#fcfcfc",
                lineHeight: 1.1,
              }}
            >
              Attendee Dashboard
            </Typography>

            {/* -------------summary */}
              <Paper
                elevation={0}
                sx={{
                  mt: 3,
                  p: 2.5,
                  borderRadius: 4,
                  border: "1px solid #e2e8f0",
                  bgcolor: "#ffffff",
                }}
              >
                
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 2, sm: 4 }}
                  divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />}
                >
                  <Typography sx={{fontWeight: 600}}>Summary</Typography>
                  <Box>
                    <Typography sx={{ fontSize: 13, color: "#94a3b8" }}>
                      Total Attendees
                    </Typography>
                    <Typography sx={{ mt: 0.5, fontWeight: 500, fontSize: "1.3rem", color: "#0f172a" }}>
                      {attendees.length}
                    </Typography>
                  </Box>
      
                  
                </Stack>
              </Paper>
           
          </Box>

          
        </Box>

      <Card sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>First Name</strong></TableCell>
              <TableCell><strong>Last Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Check-In</strong></TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {attendees.map((attendee) => (
              <TableRow key={attendee.attendee_id}>
                <TableCell>
                  {editAttendeeId === attendee.attendee_id ? (
                    <TextField
                      value={editedAttendee.firstName}
                      onChange={(e) =>
                        setEditedAttendee({
                          ...editedAttendee,
                          firstName: e.target.value,
                        })
                      }
                      size="small"
                    />
                  ) : (
                    attendee.firstName
                  )}
                </TableCell>

                <TableCell>
                  {editAttendeeId === attendee.attendee_id ? (
                    <TextField
                      value={editedAttendee.lastName}
                      onChange={(e) =>
                        setEditedAttendee({
                          ...editedAttendee,
                          lastName: e.target.value,
                        })
                      }
                      size="small"
                    />
                  ) : (
                    attendee.lastName
                  )}
                </TableCell>

                <TableCell>
                  {editAttendeeId === attendee.attendee_id ? (
                    <TextField
                      value={editedAttendee.email}
                      onChange={(e) =>
                        setEditedAttendee({
                          ...editedAttendee,
                          email: e.target.value,
                        })
                      }
                      size="small"
                    />
                  ) : (
                    attendee.email
                  )}
                </TableCell>


                <TableCell>
                    {editAttendeeId === attendee.attendee_id ? (
                      <Select
                        value={editedAttendee.isVerified}
                        onChange={(e) =>
                          setEditedAttendee({ ...editedAttendee, isVerified: e.target.value === true })
                        }
                        size="small"
                      >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                      </Select>
                    ) : (
                      attendee.isVerified ? "True" : "False"
                    )}
                  </TableCell>

                <TableCell align="center">
                  {editAttendeeId === attendee.attendee_id ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleUpdateAttendees(attendee.attendee_id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditAttendees(attendee)}
                    >
                      Edit
                    </Button>
                  )}

                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => handleDeleteAttendees(attendee.attendee_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {attendees.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No registered attendees.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </Box>
    </Box>
    </Box>
  );
}

export default AttendeeManagement;
