import './style/newsettings.css';
import {BiPencil, BiSolidBook, BiSolidTrash} from "react-icons/bi";
import {useRef} from "react";
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

            </li>
            <li>
                <h1 className={"h1"} style={{padding: '15px 75px'}}>Bilgilerim</h1>

            </li>
        </ul>
      </main>
    );
}