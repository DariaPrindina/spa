import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Button } from '@mui/material';
import './productDetails.css'

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) => state.products.products.find((p) => p.id === id));

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div className='product_page'>
      <Button variant="contained"
        sx={{
          background: 'linear-gradient(to right, #0A7AF3, #770A88)', // Градиент от синего к фиолетовому
          borderRadius: '8px', // Скругление углов
          color: 'white', // Белый цвет текста
          padding: '10px 20px', // Отступы
          transition: 'background 0.3s ease', // Плавный переход
          '&:hover': {
            backgroundColor: '',
            background: '#0A7AF3', // При наведении кнопка становится розовой
          },
        }} onClick={() => navigate('/')} style={{ marginBottom: '16px' }}>
        Назад к списку
      </Button>
      <div className='product_item'>
        <img className='product_image' src={product.image} alt={product.title} />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;