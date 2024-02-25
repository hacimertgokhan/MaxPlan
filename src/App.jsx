
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NewHome from "./main/NewHome.jsx";
import NewSettings from "./main/settings/NewSettings.jsx";
import Presentation from "./main/pdf/Presentation.jsx";
import Program from "./app/program/Program.jsx";
import MaxPlan from "./screen/MaxPlan.jsx";
import YoutubeVideoPlayer from "./player/YoutubeVideoPlayer.jsx";



export default function App() {
    return (
        <>

            <Router>
                <Routes>
                    <Route exact path="/" element={<MaxPlan/>}/>
                    <Route exact path="/Video" element={<YoutubeVideoPlayer videoId={"vTfMjI4rVSI"}/>}/>
                    <Route exact path="/Anasayfa" element={<NewHome/>}/>
                    <Route exact path="/Ayarlar" element={<NewSettings/>}/>
                    <Route exact path="/Sunum" element={<Presentation/>}/>
                    <Route exact path="/Program" element={<Program/>}/>
                </Routes>
            </Router>

        </>
    );
}
