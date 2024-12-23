import React, { useState } from 'react';
import { Box, IconButton, CircularProgress } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const ImageCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(images && images.length > 2 ? 2 : 0);
  const [imageLoading, setImageLoading] = useState(true);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      setImageLoading(true);
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      setImageLoading(true);
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handleThumbnailClick = (index) => {
    setImageLoading(true);
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  return (
    <Box sx={{ position: 'relative', width: '100%', mb: 3 }}>
      {/* Main Image */}
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          bgcolor: 'background.default',
        }}
      >
        {imageLoading && (
          <CircularProgress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          />
        )}
        <img
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          onLoad={() => setImageLoading(false)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '8px',
            opacity: imageLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
        
        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            left: 8,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 8,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Thumbnails */}
      <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        px: 2 
      }}>
        {images.map((image, index) => (
          <Box
            key={index}
            onClick={() => handleThumbnailClick(index)}
            sx={{
              width: 80,
              height: 80,
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: currentIndex === index ? '2px solid #1976d2' : 'none',
              opacity: currentIndex === index ? 1 : 0.7,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                opacity: 1
              }
            }}
          >
            <img
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageCarousel;
