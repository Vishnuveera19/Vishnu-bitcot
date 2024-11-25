import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Typography, Box, Card, CardContent, IconButton, Paper, Avatar, TextField, InputAdornment, Button } from '@mui/material';
import { RemoveRedEye as RemoveRedEyeIcon, Delete as DeleteIcon, Edit as EditIcon, Clear as ClearIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ViewContact from './ViewContact';


function App() {

  //States to store the data 

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddPanelOpen, setAddPanelOpen] = useState(false);
  const [isEditPanelOpen, setEditPanelOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToView, setContactToView] = useState(null);

  // useEffect to fetch the contact details

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/BitcotDev/fresher-machin-test/main/json/sample.json"
    )
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  // To add Contacts

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  // To Edit contacts

  const handleEditContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  // To handle Edit modal opening and closing 
  const handleEditClick = (contact) => {
    setContactToEdit(contact);
    setEditPanelOpen(true);
  };

  // To handle view modal opening and closing 
  const handleViewClick = (contact) => {
    setContactToView(contact);
    setViewModalOpen(true);
  };

  // To handle the deletion of the cards
  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Filter Contacts for the searchbar
  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      (contact.mobile && contact.mobile.toLowerCase().includes(searchLower))
    );
  });


  return (
    <Paper style={{ minHeight: "100vh", padding: "20px", position: "relative" }}>
      <Container>
        {/* Box to include all the cards and icons  */}
        <Box
          sx={{
            backgroundColor: "#e3f2fd",
            padding: "10px",
            borderRadius: "8px",
            maxWidth: "400px",
            margin: "0 auto",
            height: "500px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ marginLeft: "10px" }}>
              All Contacts
            </Typography>
            {/* Add Icon */}
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setAddPanelOpen(true)}
              sx={{
                borderRadius: "25px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Add New
            </Button>
          </Box>

          {/* Search Bar */}

          <Box sx={{ marginBottom: "10px", display: "flex", justifyContent: "center" }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search Contacts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "black" }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setSearchTerm("")}
                      aria-label="clear search"
                    >
                      <ClearIcon sx={{ color: "gray" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "95%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                },
              }}
            />

          </Box>
          {/* Cards and cardcontents */}

          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  height: "60px",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    padding: "8px",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#1976d2",
                      marginRight: "10px",
                      width: 40,
                      height: 40,
                    }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                      {contact.name}
                    </Typography>
                    <Typography color="textSecondary" sx={{ fontSize: "0.875rem" }}>
                      {contact.mobile}
                    </Typography>
                  </Box>
                </CardContent>

                {/* Icon Buttons */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1px",
                    paddingRight: "10px",
                  }}
                >
                  <IconButton
                    aria-label="view"
                    onClick={() => handleViewClick(contact)}
                  >
                    <RemoveRedEyeIcon sx={{ color: "black", fontSize: "1.2rem" }} />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => handleDelete(contact.id)}
                  >
                    <DeleteIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>

                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => handleEditClick(contact)}
                  >
                    <EditIcon sx={{ fontSize: "1.2rem" }} />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
        {/* Add modal */}
        <AddContact
          isOpen={isAddPanelOpen}
          onClose={() => setAddPanelOpen(false)}
          onAddContact={handleAddContact}
        />
        {/* Edit Modal */}
        <EditContact
          isOpen={isEditPanelOpen}
          contactToEdit={contactToEdit}
          onClose={() => setEditPanelOpen(false)}
          onEditContact={handleEditContact}
        />
        {/* View Modal */}
        <ViewContact
          isOpen={isViewModalOpen}
          onClose={() => setViewModalOpen(false)}
          contact={contactToView}
        />
      </Container>
    </Paper>
  );
}

export default App;
