import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { addToDo, updateToDo } from '../store'
import { useNavigate } from 'react-router-dom'
import useThunk from '../hooks/use-thunk'
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const ToDoForm = ({ isEditMode }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      completed: false,
    },
  })

  const [doAddToDo] = useThunk(addToDo)
  const [doUpdateToDo] = useThunk(updateToDo)
  const navigate = useNavigate()

  const location = useLocation()
  useEffect(() => {
    console.log('Data passed through navigate:', location.state)
    if (location.state) {
      setValue('title', location.state.title)
      setValue('description', location.state.description)
      setValue('completed', location.state.completed)
      setValue('id', location.state.id)
    }
  }, [location, setValue])

  const handleSubmit1 = (todo) => {
    if (isEditMode) {
      doUpdateToDo(todo)
    } else {
      doAddToDo(todo)
    }
    navigate('/')
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '2em' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        {isEditMode ? 'Edit To-Do' : 'Add New To-Do'}
      </Typography>
      <form
        onSubmit={handleSubmit((data) => {
          handleSubmit1(data)
        })}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              {...register('title', { required: 'Title is required' })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              {...register('description', {
                required: 'Description is required',
              })}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox {...register('completed')} value="true" />}
              label="Completed"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {isEditMode ? 'Update To-Do' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

ToDoForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
  }),
  isEditMode: PropTypes.bool.isRequired,
}

export default ToDoForm
