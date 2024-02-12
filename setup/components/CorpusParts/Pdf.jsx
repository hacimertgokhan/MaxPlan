import {BiCheckSquare, BiCross, BiMinusCircle, BiPlus, BiPlusCircle} from "react-icons/bi";
import {useState} from "react";
import {AllDone, checkboxChange} from "./User.jsx";
export let exportedPdfList = [];
export default function Pdf({display}) {

    const [PdfList, setPdfList] = useState([]);
    const [pdfnameInput, setPdfNameInput] = useState("");
    const [pdflinkInput, setPdfLinkInput] = useState("");

    const addPdf = (classname, classlesson) => {
        if(!(pdfnameInput === '')) {
            if (!(pdflinkInput === '')) {
                const newClass = {
                    id: Math.random(),
                    pdfname: classname,
                    pdflink: classlesson,
                };
                setPdfList([...PdfList, newClass]);
                exportedPdfList.push(newClass);
                setPdfNameInput("");
                setPdfLinkInput("");
            }
        }
        checkboxChange();
    };

    const deletePdf = (id) => {
        const newList = PdfList.filter((cls) => cls.id !== id);
        setPdfList(newList);
        exportedPdfList = newList;
        checkboxChange();

    };


    return (
        <div className="Pdf" style={{display: display}}>
            <h1>Dosyalar</h1>
            <ul>
                <li>
                    <form>
                        <input
                            type="text"
                            value={pdfnameInput}
                            placeholder="PDF Adı"
                            onChange={(e) => setPdfNameInput(e.target.value)}
                        />
                    </form>
                </li>
                <li>
                    <form>
                        <input
                            type="text"
                            value={pdflinkInput}
                            placeholder="PDF Bağlantısı"
                            onChange={(e) => setPdfLinkInput(e.target.value)}
                        />
                        <button onClick={(e) => {
                            e.preventDefault();
                            addPdf(pdfnameInput, pdflinkInput);
                            AllDone();
                        }}><BiPlusCircle/>
                        </button>
                    </form>
                </li>
            </ul>
            <div className="Preview">
                <ul>
                    {
                        PdfList.map((a) => {
                            return (
                                <li key={a.id}>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        deletePdf(a.id);
                                        AllDone();

                                    }}>
                                        <BiMinusCircle/>
                                    </button>
                                    <p><span style={{color: '#50cb70'}}>{a.pdfname}</span> sunumunun bağlantısı: <span style={{color: '#6a6fe7'}}>{a.pdflink}</span></p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}