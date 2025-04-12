import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const CarDetails = () => {
    const { id } = useParams(); // Get car ID from URL
    const navigate = useNavigate(); // For navigation
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.get('/cars.json'); // Fetch data from local JSON
                const carData = response.data.cars.find((car) => car.id === parseInt(id));

                if (carData) {
                    setCar(carData);
                } else {
                    setError('Car not found');
                }
            } catch (err) {
                console.error('Error fetching car data:', err);
                setError('Failed to fetch car data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, [id]);

    if (loading) {
        return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (error) {
        return <Typography color="error" align="center">{error}</Typography>;
    }

    return (
        <div style={{ maxWidth: '100%', padding: '20px' }}>
            <Card sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 4,
                padding: '20px',
                boxShadow: 3,
                backgroundColor: 'background.paper',
                borderRadius: 2
            }}>
                <div>
                    <CardMedia
                        component="img"
                        sx={{
                            height: 500,
                            objectFit: 'cover',
                            borderRadius: 2,
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.02)'
                            }
                        }}
                        image={car.imageUrl}
                        alt={car.name}
                    />
                </div>
                
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                        {car.name}
                    </Typography>
                    
                    <Typography variant="h4" color="primary" gutterBottom>
                        ${car.price.toLocaleString()}
                    </Typography>
                    
                    <div style={{ display: 'grid', gap: '16px' }}>
                        <Typography variant="h6" color="text.primary">
                            <strong>Brand:</strong> {car.brand}
                        </Typography>
                        
                        <Typography variant="h6" color="text.primary">
                            <strong>Fuel Type:</strong> {car.fuelType}
                        </Typography>
                        
                        <Typography variant="h6" color="text.primary">
                            <strong>Seating Capacity:</strong> {car.seatingCapacity} Seats
                        </Typography>
                        
                        <Typography variant="h6" color="text.primary" style={{ marginTop: '20px' }}>
                            <strong>Specifications:</strong>
                        </Typography>
                        <Typography variant="body1" paragraph style={{ lineHeight: 1.8 }}>
                            {car.specs}
                        </Typography>
                    </div>
                    
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/')}
                        sx={{
                            marginTop: 'auto',
                            padding: '12px 24px',
                            borderRadius: 2,
                            fontWeight: 'bold',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                transition: 'transform 0.2s'
                            }
                        }}
                    >
                        Back to Home
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default CarDetails;