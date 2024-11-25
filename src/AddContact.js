import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
} from "@mui/material";

const AddContact = ({ isOpen, onClose, onAddContact }) => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
    });

    const [errors, setErrors] = useState({});

    //Validations

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = formValues.name ? "" : "Name is required.";
        tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)
            ? ""
            : "Invalid email.";
        tempErrors.mobile = /^\d{10}$/.test(formValues.mobile)
            ? ""
            : "Mobile number must be 10 digits.";
        tempErrors.address = formValues.address ? "" : "Address is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every((x) => x === "");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = () => {
        if (validate()) {
            onAddContact({ ...formValues, id: Date.now() });
            onClose();
            setFormValues({ name: "", email: "", mobile: "", address: "" }); // Reset form
        }
    };

    if (!isOpen) return null;

    return (
        <Paper
            sx={{
                width: "300px",
                height: "100%",
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1200,
                boxShadow: 3,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Add New Contact
            </Typography>
            <TextField
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
                sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "25px",
                    },
                }}
            />
            <TextField
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "25px",
                    },
                }}
            />
            <TextField
                label="Mobile"
                name="mobile"
                value={formValues.mobile}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.mobile}
                helperText={errors.mobile}
                sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "25px",
                    },
                }}
            />
            <TextField
                label="Address"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                fullWidth
                error={!!errors.address}
                helperText={errors.address}
                sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "25px",
                    },
                }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <Button variant="outlined" size="small" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" size="small" onClick={handleSubmit}>
                    Add
                </Button>
            </Box>
        </Paper>
    );
};

export default AddContact;
