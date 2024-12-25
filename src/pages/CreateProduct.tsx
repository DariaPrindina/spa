import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/productSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface FormData {
  title: string;
  description: string;
  image: string;
}

const CreateProduct: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newProduct = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      image: data.image,
      isLiked: false,
    };
    dispatch(addProduct(newProduct));
    navigate('/');
  };

  return (
    <div style={{ padding: '16px' }}>
      <h1>Создать продукт</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Название"
          {...register('title', { required: 'Название обязательно' })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Описание"
          {...register('description', { required: 'Описание обязательно' })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          label="URL изображения"
          {...register('image', { required: 'URL изображения обязателен' })}
          error={!!errors.image}
          helperText={errors.image?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Создать
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
