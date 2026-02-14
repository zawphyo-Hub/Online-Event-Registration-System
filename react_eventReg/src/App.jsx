import {  Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import Login from "./pages/signin/Login";
import Signup from "./pages/signup/Signup";
import TwoFactorQr from "./pages/mfa_authentication/TwoFactorQrImage";
import MainPage from "./pages/home/MainPage";
import TotpVerification from "./pages/mfa_authentication/TotpVerification";
import TwoFactorQrImage from "./pages/mfa_authentication/TwoFactorQrImage";

import ScratchCreation from "./pages/create-event-process/ScratchCreation";

import TemplateSelection from "./pages/event-template/TemplateSelection";
import TemplatePreview from "./pages/event-template/TemplatePreview";
import EventPreview from "./pages/events-preview/EventPreview";
import Profile from "./pages/userProfile/Profile";
import EventDashboard from "./pages/dashboard/eventDashboard";
import PublicEventLink from "./pages/public-event/PublicEventLink";
import SuccessPublicPage from "./pages/public-event/SuccessPublicPage";
import AttendeeRegister from "./pages/attendee-registerpage/AttendeeRegister";

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
                
                <Route path="/scratch-creation" element={<ScratchCreation/>} />
                
                
                <Route path="/template-selection" element={<TemplateSelection/>} />
                <Route path="/template-preview/:template_id" element={<TemplatePreview/>} />
                <Route path="/event-preview/:slug" element={<EventPreview/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/eventDashboard" element={<EventDashboard/>} />
                <Route path="/agenda/public-event/:slug" element={<PublicEventLink/>} />
                <Route path="/success-public/:slug" element={<SuccessPublicPage/>} />

                <Route path="/attendee-reg/:slug" element={<AttendeeRegister/>} />
                
                
                
                
            </Routes>
           
        </div>
    )
 

 
}

export default App;
