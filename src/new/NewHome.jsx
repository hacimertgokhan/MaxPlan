import './style/newhome.css';
import {
    BiMinusCircle,
    BiPlusCircle,
    BiSkipNextCircle, BiSolidInfoSquare,
    BiSolidUser,
} from "react-icons/bi";
import styled from 'styled-components'
import { NavLink as Link } from "react-router-dom";
import {BsGear} from "react-icons/bs";
import {ImLast} from "react-icons/im";
import {BaseDirectory, readDir, readTextFile, removeFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
import ShowOfferedLessons from "./events/ShowOfferedLessons.jsx";
import {useEffect, useState} from "react";
import {FaGraduationCap} from "react-icons/fa";
let a,b, about;
let classArray = [];
export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    transition: 300ms;
    cursor: pointer;
`;

const loadConfig = async () => {a = await readTextFile('MaxPlan//config.yml', {dir: BaseDirectory.Document});b = yaml.load(a);}


// Daha uyumlu çalışıyor.
loadConfig().then(() => {
    about = {
        name: b.ogretim_gorevlisi,
        mail: b.mail_adresi,
        lesson: b.ana_bransi
    }
});


const addContent = (name,less,tems,num) => {
    const newCont = {
        id: Math.random(),
        name: name,
        less: less,
        tems: tems,
        num: num,
    };
    classArray.push(newCont);
};

const entries = await readDir('MaxPlan//Class//', { dir: BaseDirectory.Document, recursive: true });
async function processEntries(entries) {
    let contents;
    for (const entry of entries) {
        contents = await readTextFile(`MaxPlan//Class//${entry.name}`, {
            dir: BaseDirectory.Document,
            recursive: true
        });
        const parsed = yaml.load(contents);
        if(!classArray.includes(parsed.sinif_adi)) {
            addContent(parsed.sinif_adi, parsed.sinifa_verilen_ders, parsed.sinif_temsilcisi, parsed.sinif_temsilci_numarasi);
            console.log(classArray)
        }

    }
}
processEntries(entries).then(() => {
    console.log(entries);
});


export default function NewHome() {
    const [Display, setDisplay] = useState("none");
    const [Class, setClass] = useState("");
    const DisplayHandler = () => {
        if(Display === ("none")) {
            setDisplay("flex")
        } else {
            setDisplay("none")
        }
    }

    useEffect(() => {
        const keyDownHandler = event => {
            if(event.key === "Escape") {
                event.preventDefault();
                setDisplay("none");
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };

    }, []);

    return (
        <>
            <span className="MaxPlan">
                <span className="Panel">
                    <header className="User">
                        <span className="Box">
                            <div className="Image">
                                <BiSolidUser/>
                            </div>
                            <div className="Texts">
                                <h1>{about.name}</h1>
                                <h2>{about.lesson}</h2>
                                <h3>{about.mail}</h3>
                            </div>
                        </span>
                    </header>
                    <header className="Notes">
                        <h1>Notlarım</h1>
                        <div className="Boxes">
                            <ul>
                                <li>
                                    <p>Fizyoterapi-1: Son işlenen konu kaslar</p>
                                    <span>
                                        <button><BiMinusCircle/></button>
                                        <h5>03.02.2024</h5>
                                    </span>
                                </li>

                            </ul>
                        </div>
                        <div className="Items">
                            <ul>
                                <li>
                                    <NavLink to="/Ayarlar" activestyle>
                                        <BsGear/>
                                    </NavLink>
                                </li>
                                <li>
                                    <BiPlusCircle/>
                                </li>
                            </ul>
                        </div>
                    </header>
                </span>
                <main className="Management">
                    <span className="Presentation">
                        <h1>Sunumlar</h1>
                        <ul>
                            <li>
                                <h1>Anatomi Temel Kavramlar</h1>
                                <button><BiSkipNextCircle/><span style={{fontSize: '20px'}}>Başlat</span></button>
                                <strong>En son 23.04.2024 tarihinde kullanıldı</strong>
                            </li>
                        </ul>
                    </span>
                    <span className="Classes">
                        <h1>Sınıflar</h1>
                        <ul>
                            {classArray?.map((cls) => {
                                return (
                                    <li key={cls.id} onClick={() => {
                                        setClass(cls.name)
                                        DisplayHandler();
                                    }}>
                                        <h1>{cls.name}</h1>
                                        <div className="Infos">
                                            <span><BiSolidUser/><span style={{fontSize: '15px'}}>{cls.tems}</span></span>
                                            <span><BiSolidInfoSquare/>
                                                <span className="FakeNumber" style={{fontSize: '15px'}}>0000000000</span>
                                                <span className="RealNumber" style={{fontSize: '15px'}}>{cls.num}</span>
                                            </span>
                                            <span><ImLast/><span style={{fontSize: '15px'}}>Kaslar</span></span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </span>
                    <span className="Project">
                        <h1><span style={{color: '#67C864'}}>M</span>ax<span style={{color: '#67C864'}}>P</span>lan</h1>
                    </span>
                </main>
            </span>
            <ShowOfferedLessons display={Display} cls={Class}/>
        </>
    );
}