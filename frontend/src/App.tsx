import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Cerimonialista from "./pages/Cerimonialista"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/cerimonialista" element={<Cerimonialista/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
