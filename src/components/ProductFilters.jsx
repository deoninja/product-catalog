import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Chip,
  Paper,
} from '@mui/material';

const ProductFilters = ({ 
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedFilters,
  onRemoveFilter
}) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 2 }}>
        {/* Category Filter */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            label="Category"
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Range Filter */}
        <Box sx={{ width: { xs: '100%', md: 300 } }}>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => onPriceRangeChange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            valueLabelFormat={(value) => `₱${value}`}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              ₱{priceRange[0]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ₱{priceRange[1]}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Active Filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedFilters.map((filter) => (
          <Chip
            key={filter.id}
            label={filter.label}
            onDelete={() => onRemoveFilter(filter.id)}
            color="primary"
            variant="outlined"
            size="small"
          />
        ))}
      </Box>
    </Paper>
  );
};

export default ProductFilters;
