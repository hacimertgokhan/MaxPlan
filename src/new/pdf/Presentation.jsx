import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {FaHome} from "react-icons/fa";
import './pdfactions.styles.css';
import {readBinaryFile} from "@tauri-apps/api/fs";
import {NavLink} from "../NewHome.jsx";
let dokuman;

const loadPDF = async () => {
    dokuman = await readBinaryFile('dokuman.pdf', {dir: BaseDirectory.Document});
}

loadPDF().then({});

export default new function Presentation() {
    return (
        <>
            <div className="TestPreview">
                <NavLink to="/" activestyle><FaHome/></NavLink>
            </div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={dokuman}/>;
            </Worker>
        </>
    );
}