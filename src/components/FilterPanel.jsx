import React, { useState, useEffect } from 'react';
import {
    Paper,
    Select,
    MenuItem,
    Slider,
    FormControl,
    InputLabel,
    Typography,
    Box,
    Button
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

const FilterPanel = ({ filters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const [isSticky, setIsSticky] = useState(false);
    const brands = ['All', 'Toyota', 'Honda', 'Tesla', 'BMW', 'Maruti'];
    const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric'];
    const seatingCapacities = ['All', '5', '7'];

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsSticky(offset > 64); // 64px is the height of the navbar
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleChange = (field, value) => {
        setLocalFilters({
            ...localFilters,
            [field]: value === 'All' ? '' : value
        });
    };

    const handleApplyFilters = () => {
        onFilterChange(localFilters);
    };

    return (
        <Paper 
            sx={{
                p: 1.5,
                position: isSticky ? 'fixed' : 'static',
                top: isSticky ? '64px' : 'auto',
                left: 0,
                right: 0,
                zIndex: 1000,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isSticky ? 'translateY(0)' : 'translateY(-15px)',
                opacity: isSticky ? 1 : 0.85,
                boxShadow: isSticky ? 3 : 1,
                background: (theme) => theme.palette.mode === 'dark'
                    ? 'linear-gradient(45deg, rgba(15, 15, 15, 0.8), rgba(255, 69, 0, 0.1))'
                    : 'linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(230, 81, 0, 0.1))',
                backdropFilter: 'blur(10px)',
                willChange: 'transform, opacity',
            }}
        >
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 120, flex: 1 }}>
                    <InputLabel size="small">Brand</InputLabel>
                    <Select
                        value={localFilters.brand || 'All'}
                        label="Brand"
                        onChange={(e) => handleChange('brand', e.target.value)}
                        size="small"
                    >
                        {brands.map(brand => (
                            <MenuItem key={brand} value={brand}>
                                {brand}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120, flex: 1 }}>
                    <InputLabel size="small">Fuel Type</InputLabel>
                    <Select
                        value={localFilters.fuelType || 'All'}
                        label="Fuel Type"
                        onChange={(e) => handleChange('fuelType', e.target.value)}
                        size="small"
                    >
                        {fuelTypes.map(type => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ minWidth: 200, flex: 2, my: -0.5 }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>Price Range</Typography>
                    <Slider
                        value={localFilters.priceRange}
                        onChange={(e, newValue) => handleChange('priceRange', newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={100000}
                        step={5000}
                        size="small"
                        sx={{ mt: 1 }}
                    />
                    <Box display="flex" justifyContent="space-between" sx={{ mt: 0.5 }}>
                        <Typography variant="caption">${localFilters.priceRange[0]}</Typography>
                        <Typography variant="caption">${localFilters.priceRange[1]}</Typography>
                    </Box>
                </Box>

                <FormControl sx={{ minWidth: 120, flex: 1 }}>
                    <InputLabel size="small">Seating</InputLabel>
                    <Select
                        value={localFilters.seatingCapacity || 'All'}
                        label="Seating"
                        onChange={(e) => handleChange('seatingCapacity', e.target.value)}
                        size="small"
                    >
                        {seatingCapacities.map(capacity => (
                            <MenuItem key={capacity} value={capacity}>
                                {capacity}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    startIcon={<FilterList />}
                    onClick={handleApplyFilters}
                    sx={{ height: 36 }}
                >
                    Apply
                </Button>
                </Box>
        </Paper>
    );
};

export default FilterPanel;