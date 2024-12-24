import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для описания продукта
export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  isLiked: boolean;
}

// Интерфейс состояния продуктов
interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  favoritesOnly: boolean;
}

// Начальное состояние
const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  favoritesOnly: false,
};

// Создаём slice для управления состоянием продуктов
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Устанавливаем список продуктов
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    // Переключение состояния лайка
    toggleLike(state, action: PayloadAction<string>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) product.isLiked = !product.isLiked;
      state.filteredProducts = state.products;
    },
    // Удаление продукта
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.filteredProducts = state.products;
    },
    // Фильтрация избранных продуктов
    filterFavorites(state) {
      state.favoritesOnly = !state.favoritesOnly;
      state.filteredProducts = state.favoritesOnly
        ? state.products.filter((p) => p.isLiked)
        : state.products;
    },
    // Добавление нового продукта
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
      state.filteredProducts = state.products;
    },
    // Обновление информации о продукте
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
      state.filteredProducts = state.products;
    },
  },
});

// Экспортируем действия и редьюсер
export const {
  setProducts,
  toggleLike,
  deleteProduct,
  filterFavorites,
  addProduct,
  updateProduct,
} = productSlice.actions;
export default productSlice.reducer;