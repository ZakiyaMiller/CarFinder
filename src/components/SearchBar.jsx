import React, { useState, useCallback } from 'react';
import { TextField, InputAdornment, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';
import debounce from 'lodash/debounce';

const SearchBar = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();

    const debouncedSearch = useCallback(
        debounce((query) => {
            onSearch?.(query);
        }, 300),
        []
    );

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchText(query);
        debouncedSearch(query);
    };

    return (
        <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search cars..."
            value={searchText}
            onChange={handleSearchChange}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                ),
                sx: {
                    height: '36px',
                    bgcolor: isHovered
                        ? theme.palette.mode === 'dark'
                            ? 'rgba(26, 26, 26, 0.9)'
                            : 'rgba(255, 255, 255, 0.9)'
                        : 'transparent',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    '& fieldset': {
                        borderRadius: '20px',
                        borderColor: 'primary.main',
                        borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                        borderColor: 'primary.main !important',
                    },
                    '& input': {
                        color: theme.palette.text.secondary,
                    },
                    '& input::placeholder': {
                        color: theme.palette.text.secondary,
                        opacity: 1,
                    }
                }
            }}
        />
    );
};

export default SearchBar;