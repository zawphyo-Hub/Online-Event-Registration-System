import { useEffect, useState } from "react";
import {Box, Typography, Card, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField,} from "@mui/material";
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
    
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Management Attendees
      </Typography>

      <Card sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>First Name</strong></TableCell>
              <TableCell><strong>Last Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
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
  );
}

export default AttendeeManagement;
