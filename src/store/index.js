import { configureStore } from '@reduxjs/toolkit'
import { ToDoReducer } from './slices/ToDoSlice'

const store = configureStore({
  reducer: {
    todolists: ToDoReducer,
  },
})

export { store }
export * from './thunks/ToDoThunk'
