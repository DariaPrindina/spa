import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setProducts, filterFavorites } from '../store/productSlice';
import Card from '../components/card/Card';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredProducts, favoritesOnly } = useSelector((state: RootState) => state.products);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const storedProducts = localStorage.getItem('filteredProducts');
    if (storedProducts) {
      // Если данные есть, используем их и не делаем запрос
      dispatch(setProducts(JSON.parse(storedProducts)));
    } else {
      const fetchColors = async () => {
        if (loading) return;
        setLoading(true);
        try {
          const response = await axios.get('https://www.thecolorapi.com/scheme', {
            params: {
              hex: '474A51',
              mode: 'monochrome',
              count: 20, // Количество карточек на странице
            },
          });
          const colors = response.data.colors.map((item: any) => ({
            id: item.hex.value.slice(1),
            title: item.name.value,
            description: `This is a shade of ${item.name.value}.`,
            image: `https://www.colorhexa.com/${item.hex.value.substring(1)}.png`,
            isLiked: false,
          }));
          dispatch(setProducts(colors)); // Добавляем карточки в состояние
        } catch (error) {
          console.error('Ошибка загрузки данных:', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchColors();
  }
  }, [dispatch]);

    useEffect(() => {
    // Когда filteredProducts изменяется, обновляем localStorage
    if (filteredProducts.length > 0) {
      localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
    }
  }, [filteredProducts]);
  

  return (
    <div style={{ padding: '16px' }}>
      <Button 
        variant="contained"
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
        }}
        onClick={() => navigate('/create')} // Переход на страницу создания карточки
      >
        Добавить карточку
      </Button>
      
      <Button 
        variant="contained"
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
        }}
        onClick={() => dispatch(filterFavorites())}
      >
        {favoritesOnly ? 'Показать все' : 'Показать избранное'}
      </Button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '30px', marginTop: '16px' }}>
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} onClick={() => navigate(`/products/${product.id}`)} />
        ))}
      </div>
      
    </div>
  );
};

export default Products;
