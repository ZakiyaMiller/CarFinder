import axios from 'axios';

const API_BASE_URL = '/cars.json'; // Ensure the correct path for fetching car data from the public directory

/**
 * Fetches car data based on search query, filters, and pagination.
 * @param {Object} params - Parameters for the API call.
 * @param {string} params.searchQuery - Search query string.
 * @param {Object} params.filters - Filters for the API call (brand, price range, etc.).
 * @param {number} params.page - Current page number for pagination.
 * @returns {Promise<Object>} - Returns car data and total pages or an error state.
 */
export const fetchCars = async ({ searchQuery, filters, page }) => {
  try {
    const response = await axios.get('/cars.json');
    let filteredCars = response.data.cars;

    // Apply search filter
    if (searchQuery) {
      filteredCars = filteredCars.filter(car => 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply brand filter
    if (filters.brand) {
      filteredCars = filteredCars.filter(car => car.brand === filters.brand);
    }

    // Apply fuel type filter
    if (filters.fuelType) {
      filteredCars = filteredCars.filter(car => car.fuelType === filters.fuelType);
    }

    // Apply seating capacity filter
    if (filters.seatingCapacity) {
      filteredCars = filteredCars.filter(car => 
        car.seatingCapacity === parseInt(filters.seatingCapacity)
      );
    }

    // Apply price range filter
    filteredCars = filteredCars.filter(car => 
      car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredCars.length / 10);
    const start = (page - 1) * 10;
    const end = start + 10;
    const paginatedCars = filteredCars.slice(start, end);

    return {
      data: paginatedCars,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching cars:', error);
    return { error: 'Failed to fetch car data. Please try again later.' };
  }
};

// API utilities: fetch data, error handling, filtering, etc.