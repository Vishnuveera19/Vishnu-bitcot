import React from "react";
import { Box, Typography, Button, Dialog } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ViewContact = ({ isOpen, onClose, contact }) => {
    if (!isOpen || !contact) return null;

    const columnDefs = [
        { headerName: "Field", field: "field", flex: 1 },
        { headerName: "Value", field: "value", flex: 2 },
    ];

    const rowData = [
        { field: "Name", value: contact.name },
        { field: "Phone Number", value: contact.mobile },
        { field: "Email", value: contact.email },
        { field: "Address", value: contact.address },
    ];

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Contact Details
                </Typography>
                <div
                    className="ag-theme-alpine"
                    style={{ height: 200, width: "100%" }}

                >
                    {/* Using Aggrid to display the values */}
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        domLayout="autoHeight"
                    />
                </div>
                <Box sx={{ textAlign: "right", marginTop: 5 }}>
                    <Button variant="contained" onClick={onClose} size="small">
                        Close
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default ViewContact;
