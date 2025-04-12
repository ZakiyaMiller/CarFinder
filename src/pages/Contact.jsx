import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    TextField,
    Button,
    Box,
    Grid,
    Snackbar,
    Alert
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        setSnackbar({
            open: true,
            message: 'Thank you for your message! We will get back to you soon.',
            severity: 'success'
        });
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Contact Us
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                multiline
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Send Message
                            </Button>
                        </form>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Get in Touch
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Email sx={{ mr: 2 }} />
                                <Typography>info@carfinder.com</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Phone sx={{ mr: 2 }} />
                                <Typography>+1 (555) 123-4567</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOn sx={{ mr: 2 }} />
                                <Typography>123 Car Street, Auto City, AC 12345</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert
                        onClose={() => setSnackbar({ ...snackbar, open: false })}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default Contact;