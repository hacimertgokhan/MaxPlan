import '@react-pdf-viewer/core/lib/styles/index.css';
import {documentDir} from "@tauri-apps/api/path";
import {invoke} from "@tauri-apps/api";
import {useEffect} from "react";
import {FaHome} from "react-icons/fa";

const delay = ms => new Promise(res => setTimeout(res, ms));
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
    return (
        <>
            <main style={{display: display}}>
                <div onClick={rel} style={{
                    position: "fixed",
                    width: "2%",
                    height: "100%",
                    zIndex: 50,
                    bottom: '-95%',
                    cursor: 'pointer',
                    color: 'indianred',
                    marginLeft: '30px',
                    background: 'transparent',
                    fontSize: "30px"
                }}>
                    <FaHome/>
                </div>
                <iframe src={file} width="100%" height="100%" style={{position: "absolute"}}/>
            </main>
        </>
    );


}