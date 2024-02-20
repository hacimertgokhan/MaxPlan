import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import {FaHome} from "react-icons/fa";
import {NavLink} from "./Preview.jsx";
import '../style/pdfactions.styles.css';

export default function TestPreview() {
    return (
        <>
            <div className="TestPreview">
                <NavLink to="/" activestyle><FaHome/></NavLink>
            </div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl="/test1.pdf"/>;
            </Worker>
        </>
    );
}