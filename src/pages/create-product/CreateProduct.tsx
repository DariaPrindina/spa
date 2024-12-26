import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/productSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './createProduct.css'
import ProductForm from '../../components/productForm/ProductForm';

interface FormData {
  title: string;
  description: string;
  image: string;
}

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createNewProduct: SubmitHandler<FormData> = (data) => {
    const newProduct = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      image: data.image,
      isLiked: false,
    };
    dispatch(addProduct(newProduct));
    navigate('/products');
  };

  return (
    <ProductForm
      onSubmit={createNewProduct}
      title="Создать продукт"
      buttonText="Создать"
    />
  );
};

export default CreateProduct;
