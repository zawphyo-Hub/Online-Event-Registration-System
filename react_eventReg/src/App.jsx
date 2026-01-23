import { BrowserRouter, Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import Login from "./pages/signin/Login";
import Signup from "./pages/signup/Signup";
function App() {

    return(
        <div>
            
            <ToastContainer position="top-center" />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                
                
            </Routes>
           
        </div>
    )
 

 
}

export default App
