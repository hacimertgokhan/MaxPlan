import './style/whiteboard.css';
import {BiDotsHorizontal, BiFullscreen, BiImage, BiSolidVideo, BiSquare} from "react-icons/bi";
import {NavLink} from "../main/components/Navigation.jsx";
import {FaGraduationCap} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import {BaseDirectory, readDir, readTextFile} from "@tauri-apps/api/fs";
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
export default function WhiteBoard() {
    const [Display, setDisplay] = useState("none");
    const [Type, setType] = useState("");
    const imgLoader = useRef();
    const [VideoList, setVideoList] = useState(videoList);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [Width, setWidth] = useState(200);
    const [Height, setHeight] = useState(200);
    const [X, setX] = useState(100);
    const [Y, setY] = useState(100);
    const [videoLink, setVideoLink] = useState(null);
    function ChangeDisplayForVideo() {
        if(Display === "none") {
            setDisplay("flex");
        } else {
            setDisplay("none");
        }
    }
    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);
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

    function YouTubeVideo({link}) {
        return (
            <div>
                <iframe
                    style={{transform: `translate(${X*0.2}%, ${Y*0.2}%)`}} width={Width*0.7} height={Height*0.7}
                    src={`https://www.youtube.com/embed/${link}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        );
    }

    function VideoLinkInput({display}) {
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
                <h1 style={{fontSize: '25px'}}><span style={{color: 'lightgreen'}}>Video bağlantısı giriniz.</span></h1>
                <input
                    type={"text"}
                    value={videoLink}
                    placeholder={"Girilen değer bir anahtar olmalı."}
                    style={{width: '230px', height: '25px', background: "#fff", outline: "none", border: "none"}}
                    onChange={(e) => {
                        setVideoLink(e.currentTarget.value)
                    }}
                />
                <h1 style={{fontSize: '25px'}}><span style={{color: 'lightgreen'}}>Ya da varolan videoyu seçiniz.</span></h1>
                <div className="SelectVideoForBoard">
                    <ul>
                        {
                            VideoList?.map((b) => {
                                return (
                                    <li key={Math.random()} onClick={() => {
                                        setVideoLink(b.key)
                                        setDisplay("none");
                                    }}>
                                        <strong>{b.name}</strong>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                <button onClick={() => {
                    setDisplay("none")
                }} style={{
                    width: '100px',
                    cursor: 'pointer',
                    background: "#50cb70",
                    height: '25px',
                    outline: "none",
                    border: "none"
                }}>Onayla
                </button>
            </main>
        )
    }

    return (
        <main className="Board">
            <div className="Draw">
                <div className="Panel">

                    <ul>
                        <li style={{fontSize: '11px'}} onClick={() => {
                            setType("")
                        }}>
                            Boş
                        </li>
                        <li style={{fontSize: '11px'}} onClick={() => {
                            setType("Dot")
                        }}>

                            <BiDotsHorizontal/>
                        </li>
                        <li style={{fontSize: '11px'}} onClick={() => {
                            setType("Grid")
                        }}>

                            <BiSquare/>
                        </li>
                        <li style={{fontSize: '10px', transform: 'rotateZ(90deg)'}} onClick={() => {
                            setType("Line")
                        }}>
                            <p style={{marginBottom: '2px'}}>|||</p>
                        </li>
                        <li onClick={() => {
                            imgLoader.current.click()
                        }}>
                            <BiImage/>
                            <input
                                accept="image/*"
                                type="file"
                                ref={imgLoader}
                                style={{display: 'none'}}
                                onChange={(e) => setSelectedImage(e.target.files[0])}
                            />
                        </li>
                        <li onClick={() => {
                            ChangeDisplayForVideo();
                        }}>
                            <BiSolidVideo/>
                        </li>
                        <li style={{fontSize: '11px'}} onClick={() => {
                            fullScreen()
                        }}>
                            <BiFullscreen/>
                        </li>
                        <li>
                            <NavLink to="/Anasayfa" activestyle>
                                <FaGraduationCap/>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="RightCorner">
                    <label>
                        Genişlik
                        <input type={"range"} min={200} max={1920} onChange={(e) => setWidth(e.currentTarget.value)}/>
                    </label>
                    <label>
                        Yükseklik
                        <input type={"range"} min={200} max={1080} onChange={(e) => setHeight(e.currentTarget.value)}/>
                    </label>
                    <label>
                        X Ekseni
                        <input type={"range"} min={0} max={900} onChange={(e) => setX(e.currentTarget.value)}/>
                    </label>
                    <label>
                        Y Ekseni
                        <input type={"range"} min={0} max={500} onChange={(e) => setY(e.currentTarget.value)}/>
                    </label>
                    <label>
                        <button onClick={() => {setImageUrl("");setVideoLink("")}}>
                            Fotoğrafı & Videoyu Kaldır
                        </button>
                    </label>
                </div>
                <div className={Type}>
                    {videoLink && (
                        <YouTubeVideo link={videoLink}/>
                    )}
                    {imageUrl && selectedImage && (
                        <div>
                            <img src={imageUrl} alt={selectedImage.name} style={{transform: `translate(${X}%, ${Y}%)`}} width={Width} height={Height}/>
                        </div>
                    )}
                </div>
            </div>
            <VideoLinkInput display={Display}/>
        </main>
    )
}