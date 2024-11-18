import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Alert,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clear,
  LocalOffer,
  Star,
} from '@mui/icons-material';
import { getProducts } from '../services/api';
import ProductDetailsModal from '../components/ProductDetailsModal';
import LoadingSkeleton from '../components/LoadingSkeleton';

const ProductsTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(isMobile ? 5 : 10);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProductsCatalog();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [searchTerm]);

  // Update items per page when screen size changes
  useEffect(() => {
    setItemsPerPage(isMobile ? 5 : 10);
  }, [isMobile]);

  const getProductsCatalog = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts();
      if (response && response.products) {
        setProducts(response.products);
      } else {
        setError('Invalid response format from the server.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <LoadingSkeleton />;
  }

  const renderMobileCard = (product) => (
    <Card 
      key={product.id}
      onClick={() => handleOpenModal(product)}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Box sx={{ display: 'flex', p: 2 }}>
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            width: 80,
            height: 80,
            objectFit: 'cover',
            borderRadius: 8,
            marginRight: 16
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {product.description.length > 60 
              ? `${product.description.substring(0, 60)}...` 
              : product.description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              ₱{formatPrice(product.price)}
            </Typography>
            <Stack direction="row" spacing={1}>
              {product.discountPercentage > 20 && (
                <Chip
                  icon={<LocalOffer sx={{ fontSize: 16 }} />}
                  label={`${Math.round(product.discountPercentage)}% OFF`}
                  color="primary"
                  size="small"
                />
              )}
              <Chip
                icon={<Star sx={{ fontSize: 16 }} />}
                label={product.rating}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: isMobile ? 1 : 2 }}>
      <Card>
        <CardContent>
          <Box className='flex justify-center items-center bg-primary text-white mb-4'>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              component="h2" 
              sx={{ 
                color: 'white', 
                fontWeight: 'bold', 
                margin: '0 auto', 
                padding: '0.5em' 
              }}
            >
              PRODUCTS DEMO
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="clear search"
                    onClick={() => setSearchTerm('')}
                    edge="end"
                    size="small"
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {isMobile ? (
            // Mobile view - card layout
            <Box sx={{ mb: 3 }}>
              {isSearching ? (
                <Typography variant="body1" color="text.secondary" sx={{ py: 2 }}>
                  Searching...
                </Typography>
              ) : paginatedProducts.length > 0 ? (
                paginatedProducts.map(renderMobileCard)
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ py: 2 }}>
                  No products matched your search keyword.
                </Typography>
              )}
            </Box>
          ) : (
            // Tablet and desktop view - table layout
            <TableContainer component={Paper} sx={{ mb: 3 }}>
              <Table>
                <TableHead className='bg-secondary'>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Thumbnail</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    {!isTablet && (
                      <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                    )}
                    <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isSearching ? (
                    <TableRow>
                      <TableCell colSpan={isTablet ? 3 : 4} align="start" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          Searching...
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                      <TableRow 
                        key={product.id} 
                        hover 
                        onClick={() => handleOpenModal(product)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            style={{
                              width: 64,
                              height: 64,
                              objectFit: 'cover',
                              borderRadius: 4
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1">
                            {product.title}
                          </Typography>
                        </TableCell>
                        {!isTablet && (
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {product.description}
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell>
                          <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                            ₱{formatPrice(product.price)}
                          </Typography>
                          {product.discountPercentage > 0 && (
                            <Chip
                              size="small"
                              label={`${Math.round(product.discountPercentage)}% OFF`}
                              color="primary"
                              sx={{ mt: 0.5 }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={isTablet ? 3 : 4} align="start" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          No products matched your search keyword.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: isMobile ? 1 : 2,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                size="small"
              >
                <ChevronLeft />
              </IconButton>

              <FormControl variant="outlined" size="small" sx={{ minWidth: 80 }}>
                <Select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(e.target.value)}
                  disabled={totalPages === 0}
                >
                  {[...Array(totalPages)].map((_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <IconButton
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                size="small"
              >
                <ChevronRight />
              </IconButton>
            </Box>

            {!isMobile && (
              <Typography sx={{ mx: 2 }}>
                of {totalPages} pages ({filteredProducts.length} items)
              </Typography>
            )}

            <FormControl 
              variant="outlined" 
              size="small" 
              sx={{ 
                minWidth: isMobile ? 100 : 120,
                ...(isMobile && { mt: 1 })
              }}
            >
              <InputLabel id="items-per-page-label">Per page</InputLabel>
              <Select
                labelId="items-per-page-label"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(e.target.value)}
                label="Per page"
              >
                {[5, 10, 25, 50].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      <ProductDetailsModal
        open={!!selectedProduct}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </Box>
  );
};

export default ProductsTable;