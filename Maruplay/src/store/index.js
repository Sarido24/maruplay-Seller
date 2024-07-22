import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../store/products-slice'

export default configureStore({
  reducer: {
    products : productsReducer
  },
})