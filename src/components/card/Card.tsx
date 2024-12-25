import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike, deleteProduct, setProducts, filterFavorites } from '../../store/productSlice';
import { Product } from '../../store/productSlice';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';

import './card.css';

interface CardProps {
  product: Product;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ product, onClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favoritesOnly } = useSelector((state: RootState) => state.products);

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId)); // Удаляем продукт из состояния Redux
    if (favoritesOnly) {
      dispatch(filterFavorites()); // Применяем фильтрацию после удаления
    }
  };
  
  return (
<div className="card" onClick={onClick}>
      <img className="card__img" src={product.image} alt={product.title} />
      <h3 className="card__title">{product.title}</h3>
      <p className="card__description">{product.description}</p>
      <div className="card__actions">
        <IconButton 
          className={`card__actions-button ${product.isLiked ? 'card__actions-button--liked' : ''}`} 
          onClick={(e) => { e.stopPropagation(); dispatch(toggleLike(product.id)); }}>
          {product.isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <IconButton 
          className="card__actions-button card__actions-button--deleted" 
          onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}>
          <Delete color="action" />
        </IconButton>
        <IconButton 
          className="card__actions-button card__actions-button--edit" 
          onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.id}/edit`); }}>
          <Edit color="primary" />
        </IconButton>
      </div>
    </div>
  );
};

export default Card;