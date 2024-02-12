import '../style/pdfactions.styles.css';
import PdfViewerComponent from "./PdfViewerComponent.jsx";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {FaHome} from "react-icons/fa";

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 15px;
    gap: 0.5em;
    height: 100%;
    transition: 300ms;
    cursor: pointer;
    &.active {
        color: #50cb70;
    }
`;

export default function Preview() {
    return (
        <>
            <div className="Preview">
                <NavLink to="/" activestyle><FaHome/>Anasayfaya dön</NavLink>
            </div>
            <div className="PDF-viewer">
                <PdfViewerComponent/>
            </div>
        </>
    );
}