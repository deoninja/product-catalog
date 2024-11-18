import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Rating,
  Chip,
  IconButton,
  Button,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  LocalOffer,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Add,
} from '@mui/icons-material';

const ProductCard = ({
  product,
  onClick,
  onFavoriteClick,
  onAddToCart,
  isFavorite,
  viewMode = 'grid'
}) => {
  const isListView = viewMode === 'list';

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: isListView ? 'translateX(-4px)' : 'translateY(-4px)',
          boxShadow: 6,
          '& .product-actions': {
            opacity: 1,
          },
        },
        display: isListView ? 'flex' : 'block',
        gap: isListView ? 3 : 0,
      }}
    >
      {/* Product Image */}
      <Box
        sx={{
          position: 'relative',
          width: isListView ? 200 : '100%',
          flexShrink: 0,
          ...(isListView ? {
            height: 200,
          } : {
            paddingTop: '100%',
          }),
          borderRadius: 1,
          overflow: 'hidden',
          mb: isListView ? 0 : 2,
        }}
        onClick={onClick}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        
        {/* Product Badges */}
        <Box sx={{ position: 'absolute', top: 8, left: 8, right: 8, display: 'flex', justifyContent: 'space-between' }}>
          {product.discountPercentage > 20 && (
            <Chip
              icon={<LocalOffer sx={{ fontSize: 16 }} />}
              label={`${Math.round(product.discountPercentage)}% OFF`}
              color="primary"
              size="small"
              sx={{ bgcolor: 'rgba(25, 118, 210, 0.9)' }}
            />
          )}
          {product.stock < 10 && (
            <Chip
              label="Low Stock"
              color="error"
              size="small"
              sx={{ bgcolor: 'rgba(211, 47, 47, 0.9)' }}
            />
          )}
        </Box>

        {/* Quick Actions */}
        <Box
          className="product-actions"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            display: 'flex',
            gap: 1,
            opacity: 0,
            transition: 'opacity 0.2s',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 1,
            p: 0.5,
          }}
        >
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"} TransitionComponent={Zoom}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteClick?.();
              }}
              color={isFavorite ? "error" : "default"}
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to cart" TransitionComponent={Zoom}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.();
              }}
              color="primary"
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Product Info */}
      <Box sx={{ flex: 1 }} onClick={onClick}>
        <Typography
          variant={isListView ? "h6" : "subtitle1"}
          sx={{
            fontWeight: 'bold',
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.2,
            height: isListView ? 'auto' : '2.4em',
          }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: isListView ? 3 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: isListView ? 'auto' : 40,
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
          <Rating value={product.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({product.rating})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
              ₱{product.price.toFixed(2)}
            </Typography>
            {product.discountPercentage > 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ₱{(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </Typography>
            )}
          </Box>
          <Chip
            icon={<ShoppingCart sx={{ fontSize: 16 }} />}
            label={`${product.stock} left`}
            variant="outlined"
            size="small"
            color={product.stock < 10 ? 'error' : 'default'}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductCard;
