import React, {useState} from 'react';
import YouTube from 'react-youtube';
import './style/video.css';
import {BiHome, BiPlusCircle} from "react-icons/bi";
import {CgList} from "react-icons/cg";
import {LuFocus} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {BaseDirectory, readDir, readTextFile, removeFile, writeTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
let videoList = [];

/*

    Video yükleyicisi:Başlangıç

 */

const addVideo = (name,key) => {
    const newCont = {
        id: Math.random(),
        name: name,
        key: key,
    };
    videoList.push(newCont);
};
const videos = await readDir('MaxPlan//Videos//', { dir: BaseDirectory.Document, recursive: true });
async function processVideos(entries) {
    let contents;
    for (const entry of entries) {
        contents = await readTextFile(`MaxPlan//Videos//${entry.name}`, {
            dir: BaseDirectory.Document,
            recursive: true
        });
        const parsed = yaml.load(contents);
        if(!videoList.includes(parsed.name)) {
            addVideo(parsed.name, parsed.key);
            console.log(videoList)
        }

    }
}

/*

    Video yükleyicisi:Bitiş

 */

processVideos(videos).then(() => {
    console.log(videos);
});

export default function YoutubeVideoPlayer() {
    const [ID, setID] = useState("");
    const [Focus, setFocus] = useState("");
    const navigate = useNavigate();
    const [VideoList, setVideoList] = useState(videoList);
    const [VideoSelector, setVideoSelector] = useState("flex");
    const VideoDisplay = () => {
        if(VideoSelector === ("none")) {
            setVideoSelector("flex")
        } else {
            setVideoSelector("none")
        }
    }
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
            <YoutubeVideoSelector display={VideoSelector}/>
            <div style={{boxShadow: Focus}} className="Video">
                <YouTube videoId={ID} opts={opts} />
            </div>
            <div className={"Buttons"}>
                <ul>
                    <li onClick={() => navigate('/Anasayfa')}>
                        <BiHome/>
                    </li>
                    <li onClick={() => setVideoSelector("flex")}>
                        <CgList/>
                    </li>
                    <li onClick={() => changeFocus()}>
                        <LuFocus/>
                    </li>
                    <li onClick={() => {}}>
                        <BiPlusCircle/>
                    </li>
                </ul>
            </div>
        </main>
    );

    function YoutubeVideoSelector({display}) {
        return (
            <main style={{
                display: display,
                borderRadius: '5px',
                color: "white",
                justifyContent: "center",
                flexDirection: "column",
                gap: '2em',
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgba(16, 16, 16, 0.75)",
                placeItems: "center"
            }}>
                <h1>Hangi videoyu izlemek istiyorsunuz ?</h1>
                <div className="SelectVideo">
                    <ul>
                        {
                            VideoList?.map((b) => {
                                return (
                                    <li key={Math.random()} onClick={() => {
                                        setID(b.key)
                                        setVideoSelector("none");
                                    }}>
                                        <strong>{b.name}</strong>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <button onClick={() => {setVideoSelector("none")}}>Devam edin</button>
                </div>
            </main>
        );
    }
};

