import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Slide,
  Fade,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Drawer,
  Badge,
  Chip,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  FilterList,
  Sort,
  ViewModule,
  ViewList,
  ShoppingCart,
  LocalShipping,
  Storefront,
  TrendingUp,
  NewReleases,
} from '@mui/icons-material';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import ProductFilters from '../components/ProductFilters';
import { motion, AnimatePresence } from 'framer-motion';

const ProductShowcase = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [currentTab, setCurrentTab] = useState(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.products);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Derived states using useMemo
  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });

    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'discount':
        return filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
      default:
        return filtered;
    }
  }, [products, selectedCategory, priceRange, sortBy]);

  // Event handlers
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFavoriteToggle = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, { ...product, quantity: 1 }]);
  };

  const speedDialActions = [
    { icon: <Sort />, name: 'Sort', onClick: () => {} },
    { icon: <FilterList />, name: 'Filter', onClick: () => setIsFilterDrawerOpen(true) },
    { icon: <ViewModule />, name: 'Grid View', onClick: () => setViewMode('grid') },
    { icon: <ViewList />, name: 'List View', onClick: () => setViewMode('list') },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Discover Amazing Products
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
          Explore our curated collection of premium products
        </Typography>
      </Box>

      {/* Actions Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs value={currentTab} onChange={handleTabChange} variant="scrollable">
          <Tab icon={<Storefront />} label="All" />
          <Tab icon={<TrendingUp />} label="Popular" />
          <Tab icon={<LocalShipping />} label="New Arrivals" />
          <Tab icon={<NewReleases />} label="Deals" />
        </Tabs>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Cart">
            <IconButton>
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Favorites">
            <IconButton>
              <Badge badgeContent={favorites.length} color="error">
                <Favorite />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedFilters.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              onDelete={() => {
                setSelectedFilters(prev => prev.filter(f => f.id !== filter.id));
              }}
              color="primary"
              variant="outlined"
              size="small"
            />
          ))}
        </Box>
      )}

      {/* Products Grid */}
      <AnimatePresence>
        <Grid container spacing={3}>
          {sortedAndFilteredProducts.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={viewMode === 'list' ? 12 : 6}
              md={viewMode === 'list' ? 12 : 4}
              lg={viewMode === 'list' ? 12 : 3}
              component={motion.div}
              layout="position"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                layout: { duration: 0.3 }
              }}
            >
              <ProductCard
                product={product}
                onClick={() => setSelectedProduct(product)}
                onFavoriteClick={() => handleFavoriteToggle(product.id)}
                onAddToCart={() => handleAddToCart(product)}
                isFavorite={favorites.includes(product.id)}
                viewMode={viewMode}
              />
            </Grid>
          ))}
        </Grid>
      </AnimatePresence>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      >
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          onClose={() => setIsFilterDrawerOpen(false)}
        />
      </Drawer>

      {/* Product Details Modal */}
      <ProductDetailsModal
        open={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onFavoriteToggle={handleFavoriteToggle}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
      />

      {/* Mobile SpeedDial */}
      {isMobile && (
        <SpeedDial
          ariaLabel="Product actions"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {speedDialActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      )}
    </Container>
  );
};

export default ProductShowcase;
