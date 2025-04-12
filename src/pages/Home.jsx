import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Box, useTheme } from '@mui/material';
import FilterPanel from '../components/FilterPanel';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';
import { fetchCars } from '../services/api';
import bgVideo from '../assets/bgVideo.mp4';

const Home = ({ searchQuery }) => {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({
        brand: '',
        priceRange: [0, 100000],
        fuelType: '',
        seatingCapacity: ''
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1
    });
    const [error, setError] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, totalPages } = await fetchCars({
                    searchQuery,
                    filters,
                    page: pagination.currentPage
                });
                setCars(data);
                setPagination((prev) => ({ ...prev, totalPages }));
                setError(null);
            } catch (err) {
                console.error('Error fetching cars:', err);
                setError('Failed to fetch car data. Please try again later.');
            }
        };

        fetchData();
    }, [searchQuery, filters, pagination.currentPage]);

    useEffect(() => {
        const fadeInTimeout = setTimeout(() => {
            setOpacity(1);
        }, 500);

        return () => clearTimeout(fadeInTimeout);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);

            const fadeOutStart = window.innerHeight * 0.3;
            const fadeOutEnd = window.innerHeight * 0.8;
            if (position > fadeOutStart) {
                const newOpacity = 1 - (position - fadeOutStart) / (fadeOutEnd - fadeOutStart);
                setOpacity(Math.max(0, Math.min(1, newOpacity)));
            } else {
                setOpacity(1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => {
            // Ensure newPage is within valid range
            const validPage = Math.max(1, Math.min(newPage, prev.totalPages));
            return { ...prev, currentPage: validPage };
        });
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
                <video
                    autoPlay
                    muted
                    loop
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                >
                    <source src={bgVideo} type="video/mp4" />
                </video>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0, 0, 0, 0.4)',
                        zIndex: 1
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '15%',
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: '"UnifrakturCook", cursive',
                            fontWeight: 700,
                            textAlign: 'center',
                            padding: '20px 40px',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '4px',
                            '& span': {
                                background: 'linear-gradient(45deg, #FF4500, #8B0000, #FF0000)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundSize: '200% auto',
                                animation: 'gradient 3s linear infinite'
                            },
                            '@keyframes gradient': {
                                '0%': {
                                    backgroundPosition: '0% 50%'
                                },
                                '100%': {
                                    backgroundPosition: '200% 50%'
                                }
                            }
                        }}
                    >
                        <span>Where Precision Meets Passion!</span>
                    </Typography>
                </Box>
            </Box>

            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            {error ? (
                                <Grid item xs={12}>
                                    <p style={{ color: 'red' }}>{error}</p>
                                </Grid>
                            ) : Array.isArray(cars) && cars.length > 0 ? (
                                cars.map((car) => (
                                    <Grid item xs={12} sm={6} md={4} lg={4} key={car.id}>
                                        <CarCard car={car} />
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <p>No cars found.</p>
                                </Grid>
                            )}
                        </Grid>
                        <Box sx={{ mt: 4 }}>
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;