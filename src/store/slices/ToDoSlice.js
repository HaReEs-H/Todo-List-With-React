import { createSlice } from '@reduxjs/toolkit'
import { fetchToDo, addToDo, updateToDo, deleteToDo } from '../thunks/ToDoThunk'

const ToDoSlice = createSlice({
  name: 'todolist',
  initialState: {
    toDoData: [],
  },
  extraReducers(builder) {
    builder.addCase(fetchToDo.fulfilled, (state, action) => {
      state.toDoData = action.payload
    })
    builder.addCase(addToDo.fulfilled, (state, action) => {
      state.toDoData.push(action.payload)
    })
    builder.addCase(updateToDo.fulfilled, (state, action) => {
      const index = state.toDoData.findIndex(
        (todo) => todo.id === action.payload.id
      )
      if (index !== -1) {
        state.toDoData[index] = action.payload
      } else {
        console.log('Todo not found for update:', action.payload)
      }
    })
    builder.addCase(deleteToDo.fulfilled, (state, action) => {
      state.toDoData = state.toDoData.filter(
        (todo) => todo.id !== action.payload
      )
    })
  },
})

export const ToDoReducer = ToDoSlice.reducer
