import '@react-pdf-viewer/core/lib/styles/index.css';
import {documentDir} from "@tauri-apps/api/path";
import {invoke} from "@tauri-apps/api";
import {useEffect} from "react";
import {FaHome} from "react-icons/fa";
import {BiFullscreen} from "react-icons/bi";

/*
    import { open, save, dialog } from '@tauri-apps/api/dialog';

    const openFile = async () => {
      const result = await dialog.open();
      if (result) {
        const fileName = result[0].name;
        console.log('File Name:', fileName);
      }
    };

    openFile();
 */


export default function Presentation({file, display}) {
    function rel() {
        window.location.reload();
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

    return (
        <>
            <main style={{display: display}}>
                <div onClick={rel} style={{
                    position: "fixed",
                    width: "2%",
                    height: "2%",
                    zIndex: 50,
                    bottom: '5%',
                    cursor: 'pointer',
                    color: 'indianred',
                    marginLeft: '30px',
                    background: 'transparent',
                    fontSize: "30px"
                }}>
                    <FaHome/>
                </div>
                <div onClick={fullScreen} style={{
                    position: "fixed",
                    width: "2%",
                    height: "2%",
                    zIndex: 50,
                    bottom: '10%',
                    cursor: 'pointer',
                    color: 'lightgreen',
                    marginLeft: '30px',
                    background: 'transparent',
                    fontSize: "30px"
                }}>
                    <BiFullscreen/>
                </div>
                <iframe src={file} width="100%" height="100%" style={{position: "absolute"}}/>
            </main>
        </>
    );


}