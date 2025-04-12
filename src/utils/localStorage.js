// Utility functions to save and read wishlist items from LocalStorage

// Save car to wishlist
export const addToWishlist = (car) => {
  const wishlist = getWishlist();
  if (!wishlist.some(item => item.id === car.id)) {
    wishlist.push(car);
    localStorage.setItem('carWishlist', JSON.stringify(wishlist));
  }
};

// Remove car from wishlist
export const removeFromWishlist = (carId) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(car => car.id !== carId);
  localStorage.setItem('carWishlist', JSON.stringify(updatedWishlist));
};

// Get all wishlist items
export const getWishlist = () => {
  const wishlist = localStorage.getItem('carWishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

// Check if a car is in wishlist
export const isInWishlist = (carId) => {
  const wishlist = getWishlist();
  return wishlist.some(car => car.id === carId);
};