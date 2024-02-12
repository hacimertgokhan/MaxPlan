
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Preview from "./pages/home/components/pdf/Preview.jsx";




export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/Ayarlar" element={<Settings/>}/>
                    <Route exact path="/Sunum" element={<Preview/>}/>
                </Routes>
            </Router>

        </>
    );
}
