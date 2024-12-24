import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../store/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { RootState } from '../../store/store';
import './EditProduct.css';

interface FormData {
  title: string;
  description: string;
  image: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) => state.products.products.find((p) => p.id === id));

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: product,
  });

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  const onSubmit = (data: FormData) => {
    dispatch(updateProduct({ ...product, ...data }));
    navigate('/');
  };

  return (
    <div className="edit-product">
      <h2>Редактирование продукта</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Название"
          {...register('title', { required: 'Поле обязательно' })}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Описание"
          {...register('description', { required: 'Поле обязательно' })}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL изображения"
          {...register('image', { required: 'Поле обязательно' })}
          error={!!errors.image}
          helperText={errors.image?.message}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </form>
    </div>
  );
};

export default EditProduct;