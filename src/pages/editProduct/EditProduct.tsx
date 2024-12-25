import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/productForm/ProductForm';
import { RootState } from '../../store/store';
import { updateProduct } from '../../store/productSlice';
import { Product } from '../../store/productSlice';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) => state.products.products.find((p) => p.id === id));

  if (!product) {
    return <div>Продукт не найден</div>;
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct));
    navigate('/');
  };

  return (
    <div style={{ padding: '16px', color: '#FFFFFF', textAlign: 'center' }}>
      <h2>Редактирование продукта</h2>
      <ProductForm product={product} onSubmit={handleUpdateProduct} />
    </div>
  );
};

export default EditProduct;