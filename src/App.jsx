
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewHome from "./main/NewHome.jsx";
import NewSettings from "./main/settings/NewSettings.jsx";
import Presentation from "./main/pdf/Presentation.jsx";
import Program from "./app/program/Program.jsx";
import MaxPlan from "./screen/MaxPlan.jsx";
import YoutubeVideoPlayer from "./player/YoutubeVideoPlayer.jsx";
import WhiteBoard from "./whiteboard/WhiteBoard.jsx";
import ThreeDJS from "./main/threejs/ThreeDJS.jsx";



export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route exact path="/" element={<MaxPlan/>}/>
                    <Route exact path="/Video" element={<YoutubeVideoPlayer/>}/>
                    <Route exact path="/Anasayfa" element={<NewHome/>}/>
                    <Route exact path="/Board" element={<WhiteBoard/>}/>
                    <Route exact path="/3D" element={<ThreeDJS/>}/>
                    <Route exact path="/Ayarlar" element={<NewSettings/>}/>
                    <Route exact path="/Sunum" element={<Presentation/>}/>
                    <Route exact path="/Program" element={<Program/>}/>
                </Routes>
            </Router>

        </>
    );
}
