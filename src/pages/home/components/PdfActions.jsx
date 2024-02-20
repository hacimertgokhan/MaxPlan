import '../components/style/pdfactions.styles.css';
import styled from 'styled-components'
import {Link} from "react-router-dom";

export const NavLink = styled(Link)`
    position: absolute;
    bottom: 10%;
    left: 0;
    right: 0;
    margin: auto;
    width: 75px;
    height: 25px;
    background-color: #50cb70;
    outline: none;
    border: none;
    border-radius: 4px;
    color: #151515;
    cursor: pointer;
    text-decoration: none;
    display: grid;
    place-items: center;
    font-size: 14px;
`;

export default function PdfActions() {
    return (
        <>
            <div className="PdfActions">
                <h1>Sunumlar</h1>
                <ul>
                    <li>
                        <h1>Temel Kavramlar</h1>
                        <NavLink to="/Sunum" activestyle>
                            Başlat
                        </NavLink>
                    </li>
                    <li>
                        <h1>Temel Kavramlar</h1>
                        <NavLink to="/Test" activestyle>
                            Başlat
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}