import './style/newsettings.css';
import {BiPencil, BiSolidBook, BiSolidInfoSquare, BiSolidTrash, BiSolidUser} from "react-icons/bi";
import {useRef} from "react";
import {GiPaper} from "react-icons/gi";
import {BsEnvelopePaper} from "react-icons/bs";
import {FaGraduationCap} from "react-icons/fa";
import {NavLink} from "../../pages/components/Navigation.jsx";
export default function NewSettings() {
    const open = useRef();
    return (
      <main className={"MaxPlanSettings"}>
        <ul>
            <li>
                <h1 className={"h1"}>Sunumlar</h1>
                <span className="Presentations">
                    <span className="Detail">
                        <h1><BiSolidBook/> <span style={{fontSize: '20px', color: 'white'}}>Kaslar</span></h1>
                        <button><BiPencil/></button>
                        <span className="Remove">
                            <button><BiSolidTrash/></button>
                        </span>
                    </span>
                </span>
                <span className="AddPDF">
                    <button onClick={() => {open.current.click()}}>
                        <input ref={open} accept=".pdf" type="file" style={{display: "none"}}/>
                        Yeni Sunum Ekle
                    </button>
                </span>
            </li>
            <li>
                <h1 className={"h1"} style={{padding: '15px 100px'}}>Sınıflar</h1>
                <span className="Classes">
                    <span className="Detail">
                        <span className="ClassInfo">
                            <h2><BiSolidUser/> <span
                                style={{fontSize: '15px', color: '#9dfeb7'}}>Hacı Mert Gökhan</span></h2>
                            <h2><BiSolidInfoSquare/> <span style={{fontSize: '15px', color: '#9dfeb7'}}>00000000</span></h2>
                            <h2><BsEnvelopePaper/> <span style={{fontSize: '15px', color: '#9dfeb7'}}>Fizyoterapi</span></h2>
                        </span>
                        <span className="Edit">
                            <button><BiPencil/></button>
                            <button><BiPencil/></button>
                            <button><BiPencil/></button>
                        </span>
                        <div className="Delete">
                            <button><BiSolidTrash/> <span
                                style={{fontSize: '15px', color: 'white'}}>Sınıfı kaldır</span></button>
                        </div>
                    </span>
                </span>
                <span className="AddPDF">
                    <button>
                        Yeni Sınıf Ekle
                    </button>
                </span>
            </li>
            <li>
                <h1 className={"h1"} style={{padding: '15px 75px'}}>Bilgilerim</h1>
                <span className="Informations">
                    <span className={"Detail"}>
                        <span className="Name">
                            <h1><BiSolidUser/> <span
                                style={{fontSize: '15px', color: '#fff'}}>Hacı Mert Gökhan</span></h1>
                            <button><BiPencil/></button>
                        </span>
                        <span className="Lesson">
                            <h1><BiSolidBook/> <span
                                style={{fontSize: '15px', color: '#fff'}}>Anatomi</span></h1>
                            <button><BiPencil/></button>
                        </span>
                        <span className="Mail">
                            <h1><BiSolidBook/> <span
                                style={{fontSize: '15px', color: '#fff'}}>hacimertgokhan@gmail.com</span></h1>
                            <button><BiPencil/></button>
                        </span>
                    </span>
                </span>
                <div className={"ReturnHome"}>
                    <NavLink to="/" activestyle>
                        <FaGraduationCap/>
                    </NavLink>
                </div>
            </li>
        </ul>
      </main>
    );
}