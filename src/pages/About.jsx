import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const About = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    About CarFinder
                </Typography>
                <Typography variant="body1" paragraph>
                    Welcome to CarFinder, your ultimate destination for finding the perfect car that matches your needs and preferences. Our platform is designed to make car searching and comparison simple and efficient.
                </Typography>
                <Typography variant="body1" paragraph>
                    At CarFinder, we understand that choosing a car is a significant decision. That's why we provide comprehensive information about various car models, including detailed specifications, pricing, and features to help you make an informed choice.
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" paragraph>
                        To simplify the car buying process by providing accurate, up-to-date information and a user-friendly platform for car enthusiasts and buyers.
                    </Typography>
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Why Choose Us?
                    </Typography>
                    <Typography variant="body1" component="div">
                        <ul>
                            <li>Extensive database of cars</li>
                            <li>Detailed specifications and features</li>
                            <li>User-friendly interface</li>
                            <li>Regular updates and new listings</li>
                            <li>Reliable information from trusted sources</li>
                        </ul>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default About;