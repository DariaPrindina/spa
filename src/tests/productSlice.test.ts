import { configureStore } from '@reduxjs/toolkit';
import productReducer, { setProducts, deleteProduct } from '../store/productSlice';
import { RootState } from '../store/store'; // Добавьте тип RootState из вашего store

describe('productSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productReducer,
      },
    });
  });

  it('should delete a product correctly', () => {
    const initialProducts = [
      { id: '1', title: 'Product 1', description: 'Desc 1', image: '', isLiked: false },
      { id: '2', title: 'Product 2', description: 'Desc 2', image: '', isLiked: false },
    ];

    store.dispatch(setProducts(initialProducts));
    store.dispatch(deleteProduct('1'));

    const state = store.getState() as RootState;
    expect(state.products.products).toHaveLength(1);
    expect(state.products.products[0].id).toBe('2');
  });
});
