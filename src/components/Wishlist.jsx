import React, { useState, useEffect, useCallback } from 'react';
import {
    IconButton,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Box,
    Tooltip
} from '@mui/material';
import { Favorite, FavoriteBorder, Close } from '@mui/icons-material';
import { getWishlist, removeFromWishlist } from '../utils/localStorage';

const Wishlist = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);

    const refreshWishlist = useCallback(() => {
        setWishlistItems(getWishlist());
    }, []);

    useEffect(() => {
        refreshWishlist();
        // Add event listener for wishlist updates
        window.addEventListener('wishlistUpdate', refreshWishlist);
        return () => {
            window.removeEventListener('wishlistUpdate', refreshWishlist);
        };
    }, [refreshWishlist]);

    const handleRemove = (carId) => {
        removeFromWishlist(carId);
        refreshWishlist();
        // Dispatch event to notify other components
        window.dispatchEvent(new Event('wishlistUpdate'));
    };

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Tooltip title="Wishlist">
                <IconButton onClick={toggleDrawer} color="primary">
                    <Badge badgeContent={wishlistItems.length} color="error" showZero>
                        <Favorite />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 350, p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">My Wishlist</Typography>
                        <IconButton onClick={toggleDrawer}>
                            <Close />
                        </IconButton>
                    </Box>

                    {wishlistItems.length === 0 ? (
                        <Typography color="text.secondary">No cars in wishlist</Typography>
                    ) : (
                        <List>
                            {wishlistItems.map((car) => (
                                <Card key={car.id} sx={{ mb: 2 }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={car.imageUrl}
                                        alt={car.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{car.name}</Typography>
                                        <Typography color="text.secondary">${car.price}</Typography>
                                        <IconButton
                                            onClick={() => handleRemove(car.id)}
                                            color="error"
                                            size="small"
                                        >
                                            <Favorite />
                                        </IconButton>
                                    </CardContent>
                                </Card>
                            ))}
                        </List>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default Wishlist;