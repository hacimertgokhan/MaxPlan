import styled from 'styled-components'
import { FaCode, FaGraduationCap } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import './comp.style.css';
import {GiBigGear} from "react-icons/gi";

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    transition: 300ms;
    cursor: pointer;
    &.active {
        color: #50cb70;
    }
`;

export default function Navigation() {
    return (
        <div className="Navigation">
            <h1>MaxPlan</h1>
            <ul>
                <li>
                    <NavLink to="/" activestyle>
                        <FaGraduationCap/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Ayarlar" activestyle>
                        <GiBigGear/>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}