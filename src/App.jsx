import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from "./Components/Navbar/Navbar"

import Home from './Pages/Home/Home'
import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Analytics from './Pages/Analytics/Analytics'
import Admin from './Pages/Admin/Admin'
import Generate from './Pages/Generate/Generate'

function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
