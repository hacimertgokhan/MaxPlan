import './style/newsettings.css';
import {BiPencil, BiSolidBook, BiSolidInfoSquare, BiSolidTrash, BiSolidUser} from "react-icons/bi";
import {useEffect, useRef, useState} from "react";
import {BsEnvelopePaper} from "react-icons/bs";
import {FaGraduationCap} from "react-icons/fa";
import {NavLink} from "../components/Navigation.jsx";
import {BaseDirectory, readDir, readTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
import EditValue from "../../app/edit/EditValue.jsx";
import EditClass from "../../app/edit/EditClass.jsx";
import AddNewClass from "../../app/add/AddNewClass.jsx";
let a,b,about;
let classArray = [];

const loadConfig = async () => {a = await readTextFile('MaxPlan//config.yml', {dir: BaseDirectory.Document});b = yaml.load(a);}

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

const deleteClass = async (id) => {
    const remove = await remove(`MaxPlan//Class//${id}.yml`, {dir: BaseDirectory.Document});
    if (remove) {
        console.log('Err: ' + remove.toString());
    } else {
        console.error('Succ: ' + remove.toString());
    }
};


export default function NewSettings() {
    const open = useRef();
    const [Display, setDisplay] = useState("none");
    const [Class, setClass] = useState("none");
    const [NewClass, setNewClass] = useState("none");
    const [ClassName, setClassName] = useState("");
    const [Edit, setEdit] = useState("");
    function DisplayHandler() {
        if(Display === "none") {
            setDisplay("flex");
        } else {
            setDisplay("none");
        }
    }

    function NewClassHandler() {
        if(NewClass === "none") {
            setNewClass("flex");
        } else {
            setNewClass("none");
        }
    }

    function ClassHandler() {
        if(Class === "none") {
            setClass("flex");
        } else {
            setClass("none");
        }
    }

    useEffect(() => {
        const keyDownHandler = event => {
            if(event.key === "Escape") {
                event.preventDefault();
                setDisplay("none");
                setNewClass("none");
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };

    }, []);
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
                    {classArray?.map((cls) => {
                        return (
                            <span className="Detail">
                                <span className="ClassInfo">
                                    <h2><BiSolidUser/> <span
                                        style={{fontSize: '15px', color: '#9dfeb7'}}>{cls.tems}</span></h2>
                                    <h2><BiSolidInfoSquare/> <span style={{fontSize: '15px', color: '#9dfeb7'}}>{cls.num}</span></h2>
                                    <h2><BsEnvelopePaper/> <span style={{fontSize: '15px', color: '#9dfeb7'}}>{cls.name}</span></h2>
                                </span>
                                <span className="Edit">
                                    <button  onClick={() => {
                                        ClassHandler();
                                        setEdit("sinif_temsilcisi");
                                        setClassName(cls.name);
                                    }}><BiPencil/></button>
                                    <button  onClick={() => {
                                        ClassHandler();
                                        setEdit("sinif_temsilci_numarasi");
                                        setClassName(cls.name);
                                    }}><BiPencil/></button>
                                    <button  onClick={() => {
                                        ClassHandler();
                                        setEdit("sinif_adi");
                                        setClassName(cls.name);
                                    }}><BiPencil/></button>
                                </span>
                                <div className="Delete">
                                    <button onClick={() => {deleteClass(cls.name);}}><BiSolidTrash/> <span
                                        style={{fontSize: '15px', color: 'white'}}>Sınıfı kaldır</span></button>
                                </div>
                            </span>
                        );
                    })}
                </span>
                <span className="AddPDF">
                    <button onClick={() => {NewClassHandler()}}>
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
                                style={{fontSize: '15px', color: '#fff'}}>{about.name}</span></h1>
                            <button onClick={() => {
                                DisplayHandler();
                                setEdit("ogretim_gorevlisi");
                            }}><BiPencil/></button>
                        </span>
                        <span className="Lesson">
                            <h1><BiSolidBook/> <span
                                style={{fontSize: '15px', color: '#fff'}}>{about.lesson}</span></h1>
                            <button onClick={() => {
                                DisplayHandler();
                                setEdit("ana_bransi");
                            }}><BiPencil/></button>
                        </span>
                        <span className="Mail">
                            <h1><BiSolidBook/> <span
                                style={{fontSize: '15px', color: '#fff'}}>{about.mail}</span></h1>
                            <button onClick={() => {
                                DisplayHandler();
                                setEdit("mail_adresi");
                            }}><BiPencil/></button>
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
          <EditValue display={Display} _old={Edit}/>
          <EditClass display={Class} _old={Edit} clsname={ClassName}/>
          <AddNewClass display={NewClass}/>
      </main>
    );
}