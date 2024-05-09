import { useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Container,
  IconButton,
  Button,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
// import { getAllTodos } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useThunk from '../hooks/use-thunk'
import { deleteToDo, fetchToDo } from '../store'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

function ListToDoComponent() {
  const [doFetchToDo] = useThunk(fetchToDo)
  const [doDeleteToDo] = useThunk(deleteToDo)

  const { toDoData } = useSelector((state) => {
    return state.todolists
  })

  const navigate = useNavigate()

  function addNewToDo() {
    navigate('/add-todo')
  }

  useEffect(() => {
    doFetchToDo()
  }, [doFetchToDo])

  const handleDelete = (todoId) => {
    doDeleteToDo(todoId)
  }
  const handleEdit = (todoId) => {
    const todo = toDoData.find((t) => t.id === todoId)
    navigate('/edit-todo/${todoId}', { state: { ...todo } })
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2em' }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: '1em' }}
      >
        <Grid item>
          <Typography variant="h4" component="h1" gutterBottom>
            List of Todos
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={addNewToDo}>
            Add To-Do
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {toDoData.map((todo) => (
          <Grid item xs={12} sm={6} md={4} key={todo.id}>
            <Card
              style={{
                backgroundColor: todo.completed ? '#e0ffe0' : '#ffe0e0',
                border: `1px solid ${todo.completed ? '#4caf50' : '#f44336'}`,
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.title}
                  <IconButton size="small" style={{ marginLeft: '0.5em' }}>
                    {todo.completed ? (
                      <CheckCircleIcon style={{ color: '#4caf50' }} />
                    ) : (
                      <WarningIcon style={{ color: '#f44336' }} />
                    )}
                  </IconButton>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {todo.description}
                </Typography>
                <Grid item>
                  <IconButton size="small" onClick={() => handleEdit(todo.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Chip
                  label={todo.completed ? 'Completed' : 'Incomplete'}
                  color={todo.completed ? 'success' : 'warning'}
                  style={{ marginTop: '1em' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ListToDoComponent
