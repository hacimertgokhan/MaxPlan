
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewHome from "./main/NewHome.jsx";
import NewSettings from "./main/settings/NewSettings.jsx";
import Presentation from "./main/pdf/Presentation.jsx";




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
