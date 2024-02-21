
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewHome from "./new/NewHome.jsx";
import NewSettings from "./new/settings/NewSettings.jsx";
import Presentation from "./new/pdf/Presentation.jsx";




export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route exact path="/" element={<NewHome/>}/>
                    <Route exact path="/Ayarlar" element={<NewSettings/>}/>
                    <Route exact path="/Sunum" element={<Presentation/>}/>
                </Routes>
            </Router>

        </>
    );
}
