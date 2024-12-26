import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  isLiked: boolean;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  favoritesOnly: boolean;
}

const loadState = (): ProductState => {
  const savedState = localStorage.getItem('productsState');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    return parsedState;
  }
  return { products: [], filteredProducts: [], favoritesOnly: false };
};

const saveState = (state: ProductState) => {
  localStorage.setItem('productsState', JSON.stringify(state));
};

const initialState: ProductState = loadState();

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      
      if (state.favoritesOnly) {
        state.filteredProducts = action.payload.filter((product) => product.isLiked);
      } else {
        state.filteredProducts = action.payload;
      }
    
      saveState(state);
    },
    deleteProduct(state, action: PayloadAction<string>) {
      const productId = action.payload;
      state.products = state.products.filter((product) => product.id !== productId);
      state.filteredProducts = state.filteredProducts.filter((product) => product.id !== productId);
      saveState(state);
    },
    toggleLike(state, action: PayloadAction<string>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) product.isLiked = !product.isLiked;
      state.filteredProducts = state.products;
      saveState(state);
    },
    filterFavorites(state) {
      state.favoritesOnly = !state.favoritesOnly;
      state.filteredProducts = state.favoritesOnly
        ? state.products.filter((p) => p.isLiked)
        : state.products;
      saveState(state);
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
      state.filteredProducts = state.products;
      saveState(state);
    },     
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.products[index] = action.payload;
      state.filteredProducts = state.products;
      saveState(state);
    },
  },
});

export const {
  setProducts,
  toggleLike,
  deleteProduct,
  filterFavorites,
  addProduct,
  updateProduct,
} = productSlice.actions;

export default productSlice.reducer;
