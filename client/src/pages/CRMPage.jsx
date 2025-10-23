import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Stack,
} from "@mui/material";
import { useSnack } from "../providers/SnackbarProvider";
import { useCurrentUser } from "../users/providers/UserProvider";
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
} from "../users/services/usersApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesDict";
import FormButton from "../components/FormButton"; // 🔔 ודא שהנתיב נכון לפי מיקום הקובץ שלך


function CRMPage() {
  const { user, token } = useCurrentUser();
  const setSnack = useSnack();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers(token);
      setUsers(data);
    } catch (err) {
      console.error(err);
      setSnack("error", "Failed to fetch users");
    }
  };

  useEffect(() => {
    if (!user?.isAdmin) {
      setSnack("error", "Access denied");
      navigate(ROUTES.root);
      return;
    }
    fetchUsers();
  }, [user, token]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId, token);
      setSnack("success", "User deleted");
      fetchUsers();
    } catch (err) {
      console.error(err);
      setSnack("error", "Failed to delete user");
    }
  };

  const handleToggleRole = async (userId, currentStatus) => {
    try {
      await updateUserRole(userId, !currentStatus, token);
      setSnack("info", "User role updated");
      fetchUsers();
    } catch (err) {
      console.error(err);
      setSnack("error", "Failed to update user role");
    }
  };

  // סינון משתמשים לפי טקסט החיפוש
  const filteredUsers = users.filter((u) => {
    const fullName = `${u.name.first} ${u.name.last}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div style={{ marginTop: 48, marginBottom: 32 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: "primary.main",
            fontWeight: 700,
            letterSpacing: 1,
            mb: 2,
          }}
        >
          CRM - User Management
        </Typography>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 16, padding: 8, width: 300, fontSize: 16 }}
      />

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Business</strong></TableCell>
              <TableCell><strong>Admin</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((u) => (
              <TableRow key={u._id}>
                <TableCell>{`${u.name.first} ${u.name.last}`}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.isBusiness ? "Yes" : "No"}</TableCell>
                <TableCell>{u.isAdmin ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {!u.isAdmin && (
                    <Stack direction="row" spacing={1}>
                      <FormButton
                        node="Switch Role"
                        variant="outlined"
                        size="small"
                        onClick={() => handleToggleRole(u._id, u.isBusiness)}
                      />
                      <FormButton
                        node="Delete"
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(u._id)}
                      />
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}

export default CRMPage;
