import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addToWishlist, removeFromWishlist, isInWishlist } from '../utils/localStorage';

const CarCard = ({ car, onWishlistUpdate }) => {
  const navigate = useNavigate();
  const [inWishlist, setInWishlist] = React.useState(false);

  React.useEffect(() => {
    setInWishlist(isInWishlist(car.id));
  }, [car.id]);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
    setInWishlist(!inWishlist);
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('wishlistUpdate'));
    // Notify parent component about wishlist update
    if (onWishlistUpdate) {
      onWishlistUpdate();
    }
  };

  return (
    <Card 
      onClick={() => navigate(`/car-details/${car.id}`)}
      sx={{ 
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.palette.mode === 'light' 
            ? '0 8px 24px rgba(139, 0, 0, 0.15)'
            : theme.shadows[8]
        }
      }}
    >
      <IconButton
        className="wishlist-icon"
        onClick={handleWishlistClick}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }
        }}
      >
        {inWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>

      <CardMedia
        component="img"
        height="200"
        image={car.imageUrl}
        alt={car.name}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {car.name}
        </Typography>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          ${car.price.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {car.brand} • {car.fuelType} • {car.seatingCapacity} Seats
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {car.specs}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CarCard;