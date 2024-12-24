import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleLike, deleteProduct } from '../../store/productSlice';
import { Product } from '../../store/productSlice';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material';
import './card.css'

interface CardProps {
  product: Product;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ product, onClick }) => {
  const dispatch = useDispatch();

  return (
    <div className="card" onClick={onClick}>
      <img src={product.image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
      <h3 style={{ margin: '16px 0', fontSize: '1.2em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.title}</h3>
      <p style={{ fontSize: '0.9em', color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.description}</p>
      <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
        <IconButton onClick={(e) => { e.stopPropagation(); dispatch(toggleLike(product.id)); }}>
          {product.isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <IconButton onClick={(e) => { e.stopPropagation(); dispatch(deleteProduct(product.id)); }}>
          <Delete color="action" />
        </IconButton>
      </div>
    </div>
  );
};

export default Card;