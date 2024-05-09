import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

function useThunk(thunk) {
  const dispatch = useDispatch()
  const runThunk = useCallback(
    (arg) => {
      dispatch(thunk(arg)).unwrap()
    },
    [dispatch, thunk]
  )
  return [runThunk]
}

export default useThunk
