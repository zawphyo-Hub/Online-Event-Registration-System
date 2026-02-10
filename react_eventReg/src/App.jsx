import {  Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import Login from "./pages/signin/Login";
import Signup from "./pages/signup/Signup";
import TwoFactorQr from "./pages/mfa_authentication/TwoFactorQrImage";
import MainPage from "./pages/home/MainPage";
import TotpVerification from "./pages/mfa_authentication/TotpVerification";
import TwoFactorQrImage from "./pages/mfa_authentication/TwoFactorQrImage";
import EventCreation from "./pages/create-event-process/EventCreationOptions";
import EventCreationOptions from "./pages/create-event-process/EventCreationOptions";
import ScratchCreation from "./pages/create-event-process/ScratchCreation";
import AIAssistant from "./pages/create-event-process/AIAssistant";
import Templates from "./pages/event-template/template";

function App() {

    return(
        <div>
                        
            <ToastContainer position="top-center" />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/twofaqr" element={<TwoFactorQr/>} />
                <Route path="/mainpage" element={<MainPage/>} />
                <Route path="/totpverify" element={<TotpVerification/>} />
                <Route path="/twofaqr" element={<TwoFactorQrImage/>} />
                <Route path="/event-creation" element={<EventCreationOptions/>} />
                <Route path="/scratch-creation" element={<ScratchCreation/>} />
                <Route path="/ai-assistant" element={<AIAssistant/>} />
                <Route path="/templates" element={<Templates/>} />
                
                
                
            </Routes>
           
        </div>
    )
 

 
}

export default App
