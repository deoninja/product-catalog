import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ImageCarousel from './ImageCarousel';

const ProductDetailsModal = ({ open, onClose, product }) => {
  if (!product) return null;

  const allImages = [product.thumbnail, ...(product.images || [])].slice(0, 4);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            <p style={{ fontSize: '0.6rem', fontWeight: 'normal' }}>SMARTPHONES</p>
            {product.title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ p: 2 }}>
          <ImageCarousel images={allImages} title={product.title} />

          <Typography variant="h6" color="primary" gutterBottom>
            ₱ {product.price.toFixed(2)}
          </Typography>

          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Discount:
            </Typography>
            <Typography variant="body1" color="error">
              {product.discountPercentage}% OFF
            </Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Description:
            </Typography>
            <Typography variant="body1">
              {product.description}
            </Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Brand:
            </Typography>
            <Typography variant="body1">
              {product.brand}
            </Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Category:
            </Typography>
            <Typography variant="body1">
              {product.category}
            </Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Stock:
            </Typography>
            <Typography variant="body1">
              {product.stock} units
            </Typography>
          </Box>

          <Box sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Rating:
            </Typography>
            <Typography variant="body1">
              {product.rating} / 5
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsModal;
