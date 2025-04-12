import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Stack } from '@mui/material';
import { DirectionsCar, Brightness4, Brightness7, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Wishlist from './Wishlist';
import SearchBar from './SearchBar';

const Navbar = ({ onToggleTheme, mode, onSearch }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AppBar
            position="fixed"
            sx={{
                background: scrolled
                    ? mode === 'dark'
                        ? 'linear-gradient(45deg, rgba(15, 15, 15, 0.95), rgba(255, 69, 0, 0.15))'
                        : 'linear-gradient(45deg, rgba(255, 255, 255, 0.95), rgba(230, 81, 0, 0.15))'
                    : 'rgba(15, 15, 15, 0.2)',
                backdropFilter: 'blur(10px)',
                borderBottom: scrolled ? `1px solid ${mode === 'dark' ? '#2E2E2E' : '#E0E0E0'}` : 'none',
                transition: 'all 0.3s ease-in-out',
            }}
        >
            <Toolbar sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                minHeight: '56px !important',
                padding: '0 16px'
            }}>
                <IconButton
                    edge="start"
                    sx={{
                        color: 'primary.main',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: 'secondary.main'
                        }
                    }}
                >
                    <DirectionsCar />
                </IconButton>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        background: mode === 'dark'
                            ? 'linear-gradient(45deg, #8B0000, #FF0000, #FF4500)'
                            : 'linear-gradient(45deg, #800000, #B22222, #FF0000)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    CarFinder
                </Typography>
                <Box sx={{ flexGrow: 1, mx: 2 }}>
                    <SearchBar onSearch={onSearch} />
                </Box>
                <Stack direction="row" spacing={2} sx={{ mr: 2 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ '&:hover': { color: 'primary.main' } }}>Home</Typography>
                    </Link>
                    <Link to="/cars" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ '&:hover': { color: 'primary.main' } }}>Cars</Typography>
                    </Link>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ '&:hover': { color: 'primary.main' } }}>About</Typography>
                    </Link>
                    <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography sx={{ '&:hover': { color: 'primary.main' } }}>Contact</Typography>
                    </Link>
                </Stack>
                <IconButton
                    onClick={onToggleTheme}
                    sx={{
                        color: 'primary.main',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: 'secondary.main'
                        }
                    }}
                >
                    {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                <Wishlist />
                <IconButton
                    sx={{
                        color: 'primary.main',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            color: 'secondary.main'
                        }
                    }}
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;