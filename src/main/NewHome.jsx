import './style/newhome.css';
import {
    BiAccessibility, BiChalkboard,
    BiMinusCircle,
    BiPlusCircle, BiScreenshot,
    BiSkipNextCircle, BiSolidInfoSquare,
    BiSolidUser,
} from "react-icons/bi";
import styled from 'styled-components'
import {NavLink as Link, useNavigate} from "react-router-dom";
import {BsGear, BsTools, BsYoutube} from "react-icons/bs";
import {ImLast} from "react-icons/im";
import {BaseDirectory, readDir, readTextFile, removeFile, writeTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
import ShowOfferedLessons from "../app/events/ShowOfferedLessons.jsx";
import {useEffect, useRef, useState} from "react";
import Presentation from "./pdf/Presentation.jsx";
import CreateNewNote from "../app/note/CreateNewNote.jsx";
import {CreateID} from "../app/PreIDCreator.js";
let a,b, about;
let classArray = [];
let presentationList = [];
let noteList = [];

const setLastPresentation = async (classname, newvalue) => {
    let cfg = await readTextFile(`MaxPlan//Class//${classname}.yml`, {dir: BaseDirectory.Document});
    let config = yaml.load(cfg);
    config['son_islenen_sunum'] = newvalue;
    const newYaml = yaml.dump(config);
    try {
        await writeTextFile(`MaxPlan//Class//${classname}.yml`, newYaml,{dir: BaseDirectory.Document});
    } catch (e) {
        console.log(e);
    }
}

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
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



/*

    Not yükleyicisi:Başlangıç

 */

export const notes = await readDir('MaxPlan//Notes//', { dir: BaseDirectory.Document, recursive: true });
export const addNote = (name,date,id,dname) => {
    const newCont = {
        id: id,
        name: name,
        date: date,
        dname: dname,
    };
    noteList.push(newCont);
};
export async function processNotes(notes) {
    let contents;
    for (const entry of notes) {
        contents = await readTextFile(`MaxPlan//Notes//${entry.name}`, {
            dir: BaseDirectory.Document,
            recursive: true
        });
        const parsed = yaml.load(contents);
        if (!classArray.includes(parsed.not)) {
            addNote(parsed.not, parsed.olusturulma_tarihi, parsed.not_id, parsed.dname);
        }
    }
}

/*

    Not yükleyicisi:Bitiş

 */

/*

    Sunum yükleyicisi:Başlangıç

 */

const addPDF = (name,path,id) => {
    const newCont = {
        id: id,
        name: name,
        path: path,
    };
    presentationList.push(newCont);
};
const presentations = await readDir('MaxPlan//PDF//', { dir: BaseDirectory.Document, recursive: true });
async function processPresentations(entries) {
    let contents;
    for (const entry of entries) {
        contents = await readTextFile(`MaxPlan//PDF//${entry.name}`, {
            dir: BaseDirectory.Document,
            recursive: true
        });
        const parsed = yaml.load(contents);
        if (!classArray.includes(parsed.pdf_adi)) {
            addPDF(parsed.pdf_adi, parsed.pdf_baglantisi,parsed.pdf_id);
        }
    }
}

/*

    Sunum yükleyicisi:Bitiş

 */

/*

    Sınıf yükleyicisi:Başlangıç

 */

    const addContent = (name,less,tems,num,lastpre) => {
        const newCont = {
            id: Math.random(),
            name: name,
            less: less,
            tems: tems,
            num: num,
            lp: lastpre,
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
                addContent(parsed.sinif_adi, parsed.sinifa_verilen_ders, parsed.sinif_temsilcisi, parsed.sinif_temsilci_numarasi, parsed.son_islenen_sunum);
                console.log(classArray)
            }

        }
    }

/*

    Sınıf yükleyicisi:Bitiş

 */

processPresentations(presentations).then(() => {
    console.log(presentations);
});
processNotes(notes).then(() => {
    console.log(notes);
});
processEntries(entries).then(() => {
    console.log(entries);
});


/*

    getDAY Method

 */

let pzt = [];
let sl = [];
let crs = [];
let prs = [];
let cm = [];


const addForMonday = (lesson,time,cls,name,id) => {
    const newCont = {
        id: id,
        day: "Pazartesi",
        lesson: lesson,
        time: time,
        cls: cls,
        name: name,
    };
    pzt.push(newCont);
};

const addForTuesday = (lesson,time,cls,name,id) => {
    const newCont = {
        id: id,
        day: "Salı",
        lesson: lesson,
        time: time,
        cls: cls,
        name: name,
    };
    sl.push(newCont);
};

const addForWednesday = (lesson,time,cls,name,id) => {
    const newCont = {
        id: id,
        day: "Çarşamba",
        lesson: lesson,
        time: time,
        cls: cls,
        name: name,
    };
    crs.push(newCont);
};

const addForThursday = (lesson,time,cls,name,id) => {
    const newCont = {
        id: id,
        day: "Perşembe",
        lesson: lesson,
        time: time,
        cls: cls,
        name: name,
    };
    prs.push(newCont);
};

const addForFriday = (lesson,time,cls,name,id) => {
    const newCont = {
        id: id,
        day: "Cuma",
        lesson: lesson,
        time: time,
        cls: cls,
        name: name,
    };
    cm.push(newCont);
};

const dayEntries = await readDir('MaxPlan//Program//', { dir: BaseDirectory.Document, recursive: true });
async function processDay(entries) {
    let contents;
    for (const entry of entries) {
        contents = await readTextFile(`MaxPlan//Program//${entry.name}`, {
            dir: BaseDirectory.Document,
            recursive: true
        });
        const parsed = yaml.load(contents);
        if(parsed.gun === "Pazartesi") {
            addForMonday(parsed.ders, parsed.aralik, parsed.sinif, parsed.name,CreateID());
        } else if(parsed.gun === "Salı") {
            addForTuesday(parsed.ders, parsed.aralik, parsed.sinif, parsed.name,CreateID());
        } else if(parsed.gun === "Çarşamba") {
            addForWednesday(parsed.ders, parsed.aralik, parsed.sinif, parsed.name,CreateID());
        } else if(parsed.gun === "Perşembe") {
            addForThursday(parsed.ders, parsed.aralik, parsed.sinif, parsed.name,CreateID());
        } else if(parsed.gun === "Cuma") {
            addForFriday(parsed.ders, parsed.aralik, parsed.sinif, parsed.name,CreateID());
        }
    }
}

processDay(dayEntries).then(() => {});


export default function NewHome() {
    const navigate = useNavigate();
    const [Display, setDisplay] = useState("none");
    const [Use, setUse] = useState(false);
    const [DocDisplay, setDocDisplay] = useState("none");
    const [ProgramDisplay, setProgramDisplay] = useState("none");
    const [Display_StartPresentationFor, setDisplay_StartPresentationFor] = useState("none");
    const [PresentationName, setPresentationName] = useState("");
    const [WelcomeDisplay, setWelcomeDisplay] = useState("none");
    const [Doc, setDoc] = useState("");
    const [Class, setClass] = useState("");
    const [VideoSelector, setVideoSelector] = useState("none");
    const [SelectedVideo, setSelectedVideo] = useState("");
    const [Presentations, setPresentations] = useState(presentationList);
    const [NoteList, setNoteList] = useState(noteList);
    const [NoteDisplay, setNoteDisplay] = useState("none");
    const VideoDisplay = () => {
        if(VideoSelector === ("none")) {
            setVideoSelector("flex")
        } else {
            setVideoSelector("none")
        }
    }
    const LessonProgram = () => {
        if(WelcomeDisplay === ("none")) {
            setWelcomeDisplay("flex")
        } else {
            setWelcomeDisplay("none")
        }
    }
    const DisplayHandler = () => {
        if(Display === ("none")) {
            setDisplay("flex")
        } else {
            setDisplay("none")
        }
    }
    const NoteDisplayHandler = () => {
        if(NoteDisplay === ("none")) {
            setNoteDisplay("flex")
        } else {
            setNoteDisplay("none")
        }
    }
    const ProgramDisplayHandler = () => {
        if(ProgramDisplay === ("none")) {
            setProgramDisplay("flex")
        } else {
            setProgramDisplay("none")
        }
    }

    function fullScreen() {
        let isInFullScreen = (document.fullscreenElement && true) || (document.webkitFullscreenElement && true) || (document.mozFullScreenElement && true) || (document.msFullscreenElement && true);

        let docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    const date = new Date();
    const getDayName = () => {
        const aab = date.getDay();
        const abb = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
        return abb[aab];}
    const [Pazartesi, setPazartesi] = useState(pzt);
    const [Sali, setSali] = useState(sl);
    const [Carsamba, setCarsamba] = useState(crs);
    const [Persembe, setPersembe] = useState(prs);
    const [Cuma, setCuma] = useState(cm);
    const [DayProgram, setDayProgram] = useState([]);

    const getDayProgram = (DayName) => {
        if(DayName === "Pazartesi") {
            Pazartesi?.map((a) => {
                const newItem = {
                    cls: a.cls,
                    lesson: a.lesson,
                    time: a.time
                }
                if(DayProgram.length < Pazartesi.length) {
                    DayProgram.push(newItem);
                }
            })
        } else if(DayName === "Pazar") {
            Pazartesi?.map((a) => {
                const newItem = {
                    cls: a.cls,
                    lesson: a.lesson,
                    time: a.time
                }
                if(DayProgram.length < Pazartesi.length) {
                    DayProgram.push(newItem);
                }
            })
        } else if(DayName === "Cumartesi") {
            Pazartesi?.map((a) => {
                const newItem = {
                    cls: a.cls,
                    lesson: a.lesson,
                    time: a.time
                }
                if(DayProgram.length < Pazartesi.length) {
                    DayProgram.push(newItem);
                }
            })
        } else if(DayName === "Salı") {
            Sali?.map((a) => {
                const newItem = {
                    cls: a.cls,
                    lesson: a.lesson,
                    time: a.time
                }
                if(DayProgram.length < Sali.length) {
                    DayProgram.push(newItem);
                }
            })
        } else if(DayName === "Çarşamba") {
            Carsamba?.map((a) => {
                const newItem = {
                    cls: a.cls,
                    lesson: a.lesson,
                    time: a.time
                }
                if(DayProgram.length < Carsamba.length) {
                    DayProgram.push(newItem);
                }
            })
        } else if(DayName === "Perşembe") {
            Persembe?.map((a) => {
                const newItem = {
                    cls: a.cls,
                    lesson: a.lesson,
                    time: a.time
                }
                if(DayProgram.length < Persembe.length) {
                    DayProgram.push(newItem);
                }
            })
        } else if(DayName === "Cuma") {
            Cuma?.map((a) => {
                const newItem = {
                    cls: a.cls,
                    lesson: a.lesson,
                    time: a.time
                }
                if(DayProgram.length < Cuma.length) {
                    DayProgram.push(newItem);
                }
            })
        }
    }


    const [ScreenLockDisplay, setScreenLockDisplay] = useState("none");

    useEffect(() => {
        const keyDownHandler = event => {
            if(event.key === "Escape") {
                event.preventDefault();
                setDisplay("none");
                setDocDisplay("none");
                setNoteDisplay("none");
                setProgramDisplay("none");
                setWelcomeDisplay("none");
                setDisplay_StartPresentationFor("none");
            }
            if(event.key === "Tab") {
                event.preventDefault();
                if(ScreenLockDisplay === "none") {
                    setScreenLockDisplay("flex");
                } else {
                    setScreenLockDisplay("none");
                }
            }
        };
        console.log(getDayName())

        getDayProgram(getDayName());

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };

    }, []);

    function deleteNote(id,name) {
        const newNoteList = NoteList.filter(not => not.id!==id);
        setNoteList(newNoteList);
        try {
            removeFile(`MaxPlan//Notes//${name}.yml`, {dir: BaseDirectory.Document});
        } catch (e) {
            console.log(e);
        }
        window.location.reload();
    }

    function LoadPresentation(docname) {
        setDisplay_StartPresentationFor("flex");
        setDoc(docname);
        setUse(true)
    }

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
                                {
                                    NoteList?.map((not) => {
                                        return (
                                            <li key={not.id}>
                                                <p>{not.name}</p>
                                                <span>
                                                    <button
                                                        onClick={() => deleteNote(not.id, not.dname)}><BiMinusCircle/></button>
                                                    <h5>{not.date}</h5>
                                                </span>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <div className="Items">
                            <ul>
                                <li>
                                    <NavLink to="/Ayarlar" activestyle>
                                        <BsGear/>
                                    </NavLink>
                                </li>
                               <li onClick={() => {
                                   LessonProgram();
                               }}>
                                    <BiChalkboard/>
                                </li>
                                <li onClick={() => {
                                    ProgramDisplayHandler();
                                }}>
                                    <BsTools/>
                                </li>
                                <li>
                                    <NavLink to="/Video" activestyle>
                                        <BsYoutube/>
                                    </NavLink>
                                </li>
                                <li onClick={() => {
                                    NoteDisplayHandler();
                                }}>
                                    <BiPlusCircle/>
                                </li>
                                <li>
                                    <NavLink to="/Board" activestyle>
                                        <BiScreenshot/>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </header>
                </span>
                <main className="Management">
                    <span className="Presentation">
                        <h1>Sunumlar</h1>
                        <ul>
                            {Presentations?.map((aa) => {
                                return (
                                    <li key={aa.id}>
                                        <h1>{aa.name}</h1>
                                        <button onClick={() => {
                                            LoadPresentation(aa.path);
                                            setPresentationName(aa.name);
                                        }}><BiSkipNextCircle/>
                                            <span style={{fontSize: '20px'}}>
                                                Başlat
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
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
                                            <span><BiSolidUser/><span
                                                style={{fontSize: '15px'}}>{cls.tems}</span></span>
                                            <span><BiSolidInfoSquare/>
                                                <span className="FakeNumber"
                                                      style={{fontSize: '15px'}}>0000000000</span>
                                                <span className="RealNumber" style={{fontSize: '15px'}}>{cls.num}</span>
                                            </span>
                                            <span><ImLast/><span style={{fontSize: '15px'}}>{cls.lp}</span></span>
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
            <CreateNewNote display={NoteDisplay}/>
            <StartPresentationFor display={Display_StartPresentationFor}/>
            <ProgramSettings display={ProgramDisplay}/>
            <Welcome display={WelcomeDisplay}/>
            <ScreenLock display={ScreenLockDisplay}/>
            {Use ? <Presentation file={Doc} display={DocDisplay}/> : <></>}
        </>
    );




    function Welcome({display}) {
        return (
            <main style={{
                display: display,
                borderRadius: '5px',
                color: "white",
                justifyContent: "center",
                flexDirection: "column",
                gap: '2em',
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgba(16, 16, 16, 0.75)",
                placeItems: "center"
            }}>
                <h1>Merhaba {about.name} 👋</h1>
                <p>Bu gün sorumlu olunan derslerin listesi</p>
                <div className="WelcomeTable">
                    <ul>
                        {
                            DayProgram?.map((b) => {
                                return (
                                    <li>
                                        <strong>{b.cls}</strong>
                                        <p>{b.lesson}</p>
                                        <p>{b.time}</p>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', gap: '1em'}}>
                    <button className={"Continue"} onClick={() => {
                        setWelcomeDisplay("none")
                    }}>Devam edin
                    </button>
                    <button style={{width: '200px'}} className={"Continue"} onClick={() => {
                        setWelcomeDisplay("none")
                        navigate('/Program');
                    }}>Bütün ders programını göster
                    </button>
                </div>
            </main>
        );
    }

    function ProgramSettings({display}) {
        return (
            <main style={{
                display: display,
                borderRadius: '5px',
                color: "white",
                justifyContent: "center",
                flexDirection: "column",
                gap: '2em',
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgba(16, 16, 16, 0.75)",
                placeItems: "center"}}>
                <ul style={{
                    listStyleType: 'none',
                    display: 'flex',
                    gap: '2em',
                    width: '80%',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <li key={Math.random()} style={{
                        width: 'fit-content',
                        height: 'fit-content',
                        padding: '25px',
                        background: 'rgba(16,16,16,0.75)',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }} onClick={() => {
                        fullScreen()
                        setProgramDisplay("none");
                    }}>
                        <h1>Tam ekran yap</h1>
                        <div className="Infos">
                            <span
                                style={{fontSize: '15px'}}>Programı tam ekran yapın ya da tam ekran modunu kapatın.</span>
                        </div>
                    </li>
                </ul>
            </main>
        );
    }



    function ScreenLock({display}) {
        return (
            <main style={{
                display: display,
                borderRadius: '5px',
                color: "white",
                justifyContent: "center",
                flexDirection: "column",
                gap: '2em',
                position: "absolute",
                width: "100%",
                height: "100%",
                transition: '400ms',
                background: "rgba(16, 16, 16)",
                placeItems: "center"
            }} onClick={() => {
                setScreenLockDisplay("none");
            }}>
                <h1 style={{fontSize: '150px', fontStyle: "italic", color: 'lightgreen', cursor: 'pointer'}}>MaxPlan</h1>
                <p style={{fontSize: '25px', fontStyle: "italic", color: 'lightgreen', cursor: 'pointer', transform: 'translateY(-200%)'}}>Ekran kilit modunu kapatmak için ekranın herhangi bir yerine tıklayınız.</p>
            </main>
        );
    }

    function StartPresentationFor({display}) {
        return (
            <main style={{
                display: display,
                borderRadius: '5px',
                color: "white",
                justifyContent: "center",
                flexDirection: "column",
                gap: '2em',
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgba(16, 16, 16, 0.75)",
                placeItems: "center"
            }}>
                <ul style={{
                    listStyleType: 'none',
                    display: 'flex',
                    gap: '2em',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    {classArray?.map((cls) => {
                        return (
                            <li key={cls.id} style={{width: 'fit-content', height: 'fit-content', padding: '25px', background: 'rgba(16,16,16,0.75)', borderRadius: '5px', cursor: 'pointer'}} onClick={() => {
                                setLastPresentation(cls.name, PresentationName).then(r =>
                                    console.log(r)
                                )
                                setDisplay_StartPresentationFor("none");
                                setDocDisplay("flex");
                            }}>
                                <h1>{cls.name}</h1>
                                <div className="Infos">
                                    <span><span style={{fontSize: '15px'}}>{cls.name} sınıfı için bu sunumu başlat.</span></span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </main>
        );
    }
}

