
import {BrowserRouter as Router ,Routes , Route  } from "react-router-dom"
import Home from './components/Home'
import Login from "./components/Login"
import Register from "./components/Register"

function App() {
 

return (
<>

<Router>
<Routes>
<Route path="/document/" element={<Home />} />
<Route path="/document/login" element={<Login />} />
<Route path="/document//register" element={<Register />} />
</Routes>
</Router>

</>
)
}

export default App
