import React, {useState} from 'react';
import YouTube from 'react-youtube';
import './style/video.css';
import {BiHome} from "react-icons/bi";
import {CgList} from "react-icons/cg";
import {LuFocus} from "react-icons/lu";
import {useNavigate} from "react-router-dom";

export default function YoutubeVideoPlayer({ videoId }) {
    const [Focus, setFocus] = useState("");
    const navigate = useNavigate();
    function changeFocus() {
        if(Focus === "") {
            setFocus("0 0 0 500px #000");
        } else {
            setFocus("");
        }
        fullScreen();
    }

    function fullScreen() {
        let isInFullScreen = (document.fullscreenElement && true) || (document.webkitFullscreenElement && true) || (document.mozFullScreenElement && true) || (document.msFullscreenElement && true);

        let docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    const opts = {
        height: '600',
        width: '1100',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <main className={"YoutubeVideo"}>
            <div style={{boxShadow: Focus}} className="Video">
                <YouTube videoId={videoId} opts={opts} />
            </div>
            <div className={"Buttons"}>
                <ul>
                    <li onClick={() => navigate('/Anasayfa')}>
                        <BiHome/>
                    </li>
                    <li>
                        <CgList/>
                    </li>
                    <li onClick={() => changeFocus()}>
                        <LuFocus/>
                    </li>
                </ul>
            </div>
        </main>
    );
};

