import './style/program.css';
import {BiEdit, BiHome} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {BaseDirectory, readDir, readTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
import {CreateID} from "../PreIDCreator.js";
import {useEffect, useState} from "react";
let program = [];

const addContent = (day,lesson,time,cls) => {
    const newCont = {
        id: CreateID(),
        day: day,
        lesson: lesson,
        time: time,
        cls: cls,
    };
    program.push(newCont);
};

const entries = await readDir('MaxPlan//Program//', { dir: BaseDirectory.Document, recursive: true });
async function processEntries(entries) {
    let contents;
    for (const entry of entries) {
        contents = await readTextFile(`MaxPlan//Program//${entry.name}`, {
            dir: BaseDirectory.Document,
            recursive: true
        });
        const parsed = yaml.load(contents);
        if(!program.includes(parsed.name)) {
            addContent(parsed.gun, parsed.ders, parsed.aralik, parsed.sinif);
        }

    }
}

processEntries(entries).then(() => {
    console.log(entries);
})


export default function Program() {
    const navigate = useNavigate();
    const [Pazartesi, setPazartesi] = useState([]);
    const [Sali, setSali] = useState([]);
    const [Carsamba, setCarsamba] = useState([]);
    const [Persembe, setPersembe] = useState([]);
    const [Cuma, setCuma] = useState([]);

    const loadCategories = () => {
        program.map((days) => {
            const dayProgram = {
                id: days.id,
                day: days.day,
                lesson: days.lesson,
                time: days.time,
                cls: days.cls,
            };
            if(days.day === "Pazartesi") {
                setPazartesi([...Pazartesi, dayProgram]);
                console.log(Pazartesi)
            } else if(days.day === "Salı") {
                setSali([...Sali, dayProgram]);
            } else if(days.day === "Çarşamba") {
                setCarsamba([...Carsamba, dayProgram]);
            } else if(days.day === "Perşembe") {
                setPersembe([...Persembe, dayProgram]);
            } else if(days.day === "Cuma") {
                setCuma([...Cuma, dayProgram]);
            }
        })
    }

    useEffect(() => {
        loadCategories();
    }, [])
    return (
      <main>
          <div className="Programs">
            <div className="Showcase">
                <span className="EditProgram"><BiEdit/></span>
                <span className="ReturnHome" onClick={() => {navigate('/')}}><BiHome/></span>
                <h1>Ders Programınız</h1>
                <ul>
                    <li>
                        <h2>Pazartesi</h2>
                        <div className="Load">
                            {
                                Pazartesi.map((pazartesi) => {
                                    return (
                                        <span key={pazartesi.id}>
                                            <h5>{pazartesi.cls}</h5>
                                            <p>{pazartesi.lesson}</p>
                                            <q>{pazartesi.time}</q>
                                        </span>
                                    );
                                })
                            }
                        </div>
                        <span className="Details">
                            <h3>
                                Toplam ders yükü
                                <br/>
                                10 Saat
                            </h3>
                            <h3>
                                Ders ağırlık oranı
                                <br/>
                                %32
                            </h3>
                        </span>
                    </li>
                    <li>
                        <h2>Salı</h2>
                        <span className="Details">
                            <h3>
                                Toplam ders yükü
                                <br/>
                                7 Saat
                            </h3>
                            <h3>
                                Ders ağırlık oranı
                                <br/>
                                %25
                            </h3>
                        </span>
                    </li>
                    <li>
                        <h2>Çarşamba</h2>
                        <span className="Details">

                        </span>
                    </li>
                    <li>
                        <h2>Perşembe</h2>
                        <span className="Details">

                        </span>
                    </li>
                    <li>
                        <h2>Cuma</h2>
                        <span className="Details">

                        </span>
                    </li>
                </ul>
            </div>
          </div>
      </main>
    );
}