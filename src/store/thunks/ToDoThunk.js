import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const fetchToDo = createAsyncThunk('todo/fetch', async () => {
  const response = await axios.get('http://localhost:3005/dummyData')
  return response.data
})

const addToDo = createAsyncThunk('todo/add', async (todo) => {
  const response = await axios.post('http://localhost:3005/dummyData', todo)
  return response.data
})

const updateToDo = createAsyncThunk('todo/update', async (todo) => {
  const response = await axios.put(
    `http://localhost:3005/dummyData/${todo.id}`,
    todo
  )
  return response.data
})

const deleteToDo = createAsyncThunk('todo/delete', async (id) => {
  await axios.delete(`http://localhost:3005/dummyData/${id}`)
  return id
})

export { fetchToDo, addToDo, updateToDo, deleteToDo }
