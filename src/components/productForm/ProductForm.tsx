import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import { Product } from '../../store/productSlice';
import './productForm.css'

interface ProductFormProps {
  product: Product;
  onSubmit: (updatedProduct: Product) => void;
}

interface FormData {
  title: string;
  description: string;
  image: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: product,
  });

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit({ ...product, ...data });
  };

  return (
<form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
  <TextField
    label="Название"
    {...register('title', { required: 'Название обязательно' })}
    error={!!errors.title}
    helperText={errors.title?.message}
    sx={{
      '& .MuiInputBase-root': {
        color: 'white',
      },
      '& .MuiFormLabel-root': {
        color: 'white',
      },
      '& .MuiFormHelperText-root': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // Белая рамка
        },
        '&:hover fieldset': {
          borderColor: 'white', // Белая рамка при наведении
        },
        '&.Mui-focused fieldset': {
          borderColor: '#176BC5', // Белая рамка при фокусе
        },
      },
    }}
  />
  <TextField
    label="Описание"
    {...register('description', { required: 'Описание обязательно' })}
    error={!!errors.description}
    helperText={errors.description?.message}
    sx={{
      '& .MuiInputBase-root': {
        color: 'white',
      },
      '& .MuiFormLabel-root': {
        color: 'white',
      },
      '& .MuiFormHelperText-root': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // Белая рамка
        },
        '&:hover fieldset': {
          borderColor: 'white', // Белая рамка при наведении
        },
        '&.Mui-focused fieldset': {
          borderColor: '#176BC5', // Белая рамка при фокусе
        },
      },
    }}
  />
  <TextField
    label="URL изображения"
    {...register('image', { required: 'URL изображения обязателен' })}
    error={!!errors.image}
    helperText={errors.image?.message}
    sx={{
      '& .MuiInputBase-root': {
        color: 'white',
      },
      '& .MuiFormLabel-root': {
        color: 'white',
      },
      '& .MuiFormHelperText-root': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white', // Белая рамка
        },
        '&:hover fieldset': {
          borderColor: 'white', // Белая рамка при наведении
        },
        '&.Mui-focused fieldset': {
          borderColor: '#176BC5', // Белая рамка при фокусе
        },
      },
    }}
  />
  <Button type="submit" variant="contained" color="primary">
    Сохранить
  </Button>
</form>

  );
};

export default ProductForm;