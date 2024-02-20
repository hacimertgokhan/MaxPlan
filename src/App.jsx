
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Preview from "./pages/home/components/pdf/Preview.jsx";
import TestPreview from "./pages/home/components/pdf/TestPreview.jsx";
import NewHome from "./new/NewHome.jsx";
import NewSettings from "./new/settings/NewSettings.jsx";




export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route exact path="/" element={<NewHome/>}/>
                    <Route exact path="/Ayarlar" element={<NewSettings/>}/>
                    <Route exact path="/Sunum" element={<Preview/>}/>
                    <Route exact path="/Test" element={<TestPreview/>}/>
                </Routes>
            </Router>

        </>
    );
}
