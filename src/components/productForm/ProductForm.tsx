import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { Product } from '../../store/productSlice';
import './productForm.css';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Product) => void;
  title: string;
  buttonText: string;
}

interface FormData {
  title: string;
  description: string;
  image: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, title, buttonText }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: product || {
      title: '',
      description: '',
      image: '',
    },
  });

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    const newProduct = {
      ...product,
      ...data,
      id: product?.id || crypto.randomUUID(),
      isLiked: product?.isLiked || false,
    };
    onSubmit(newProduct);
  };

  return (
    <div className="container">
      <h1 className="header">{title}</h1>
      <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          label="Название"
          {...register('title', { required: 'Название обязательно' })}
          error={!!errors.title}
          helperText={errors.title?.message}
          sx={{
            '& .MuiInputBase-root': { color: 'white' },
            '& .MuiFormLabel-root': { color: 'white' },
            '& .MuiFormHelperText-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: '#176BC5' },
            },
          }}
        />
        <TextField
          label="Описание"
          {...register('description', { required: 'Описание обязательно' })}
          error={!!errors.description}
          helperText={errors.description?.message}
          sx={{
            '& .MuiInputBase-root': { color: 'white' },
            '& .MuiFormLabel-root': { color: 'white' },
            '& .MuiFormHelperText-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: '#176BC5' },
            },
          }}
        />
        <TextField
          label="URL изображения"
          {...register('image', { required: 'URL изображения обязателен' })}
          error={!!errors.image}
          helperText={errors.image?.message}
          sx={{
            '& .MuiInputBase-root': { color: 'white' },
            '& .MuiFormLabel-root': { color: 'white' },
            '& .MuiFormHelperText-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: '#176BC5' },
            },
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
