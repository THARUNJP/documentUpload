
import {BrowserRouter as Router ,Routes , Route  } from "react-router-dom"
import Home from './components/Home'
import Login from "./components/Login"
import Register from "./components/Register"

function App() {
 

return (
<>

<Router basename="/documentUpload">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>

</>
)
}

export default App
