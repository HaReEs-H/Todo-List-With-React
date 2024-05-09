import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import ListToDoComponent from './components/ListToDo'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ToDoForm from './components/ToDoForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListToDoComponent />} />
          <Route path="/add-todo" element={<ToDoForm isEditMode={false} />} />
          <Route
            path="/edit-todo/:id"
            element={<ToDoForm isEditMode={true} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
