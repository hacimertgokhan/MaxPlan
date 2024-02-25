import './style/program.css';
import {BiEdit, BiHome, BiInfoSquare} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import {BaseDirectory, readDir, readTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
import {CreateID} from "../PreIDCreator.js";
import {useEffect, useState} from "react";
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

const entries = await readDir('MaxPlan//Program//', { dir: BaseDirectory.Document, recursive: true });
async function processEntries(entries) {
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

processEntries(entries).then(() => {});




export default function Program() {
    const navigate = useNavigate();
    const [Pazartesi, setPazartesi] = useState(pzt);
    const [TotalForPazartesi, setTotalForPazartesi] = useState();
    const [TotalForSali, setTotalForSali] = useState();
    const [TotalForCarsamba, setTotalForCarsamba] = useState();
    const [TotalForPersembe, setTotalForPersembe] = useState();
    const [TotalForCuma, setTotalForCuma] = useState();
    const [Calculate, setCalculate] = useState(0);
    const [HighDay, setHighDay] = useState("");
    const [Sali, setSali] = useState(sl);
    const [Carsamba, setCarsamba] = useState(crs);
    const [Persembe, setPersembe] = useState(prs);
    const [Cuma, setCuma] = useState(cm);

    const [PercentageOf0, setPercentageOf0] = useState();
    const [PercentageOf1, setPercentageOf1] = useState();
    const [PercentageOf2, setPercentageOf2] = useState();
    const [PercentageOf3, setPercentageOf3] = useState();
    const [PercentageOf4, setPercentageOf4] = useState();

    let list = [];
    const [SortFor, setSortFor] = useState(list);

    const evalFor = () => {
        let totalpzt = 0;
        for(let c = 0; c<Pazartesi.length;c++) {
            let f = (Pazartesi[c].time).substring(0,5).replace(":", ".");
            let l = (Pazartesi[c].time).substring(Pazartesi[c].time.length-5).replace(":", ".");
            totalpzt += Math.abs(f-l);
        }
        setTotalForPazartesi(totalpzt);

        let totalsl = 0;
        for(let c = 0; c<Sali.length;c++) {
            let f = (Sali[c].time).substring(0,5).replace(":", ".");
            let l = (Sali[c].time).substring(Sali[c].time.length-5).replace(":", ".");
            totalsl += Math.abs(f-l);
        }
        setTotalForSali(totalsl);

        let totalcrs = 0;
        for(let c = 0; c<Carsamba.length;c++) {
            let f = (Carsamba[c].time).substring(0,5).replace(":", ".");
            let l = (Carsamba[c].time).substring(Carsamba[c].time.length-5).replace(":", ".");
            totalcrs += Math.abs(f-l);
        }
        setTotalForCarsamba(totalcrs);

        let totalprs = 0;
        for(let c = 0; c<Persembe.length;c++) {
            let f = (Persembe[c].time).substring(0,5).replace(":", ".");
            let l = (Persembe[c].time).substring(Persembe[c].time.length-5).replace(":", ".");
            totalprs += Math.abs(f-l);
        }
        setTotalForPersembe(totalprs);

        let totalcm = 0;
        for(let c = 0; c<Cuma.length;c++) {
            let f = (Cuma[c].time).substring(0,5).replace(":", ".");
            let l = (Cuma[c].time).substring(Cuma[c].time.length-5).replace(":", ".");
            totalcm += Math.abs(f-l);
        }
        setTotalForCuma(totalcm);
        let totalAll = totalcm+totalcrs+totalprs+totalpzt+totalsl;
        setCalculate(totalAll);
        setPercentageOf0(totalpzt/totalAll*100);
        setPercentageOf1(totalsl/totalAll*100);
        setPercentageOf2(totalcrs/totalAll*100);
        setPercentageOf3(totalprs/totalAll*100);
        setPercentageOf4(totalcm/totalAll*100);
        list = [];
        const ipazartesi = {
            percentage: Number(totalpzt/totalAll*100).toFixed(2),
            day: "Pazartesi",
            totalTime: totalpzt
        }
        const isali = {
            percentage: Number(totalsl/totalAll*100).toFixed(2),
            day: "Salı",
            totalTime: totalsl
        }
        const icarsamba = {
            percentage: Number(totalcrs/totalAll*100).toFixed(2),
            day: "Çarşamba",
            totalTime: totalcrs
        }
        const ipersembe = {
            percentage: Number(totalprs/totalAll*100).toFixed(2),
            day: "Perşembe",
            totalTime: totalprs
        }
        const icuma = {
            percentage: Number(totalcm/totalAll*100).toFixed(2),
            day: "Cuma",
            totalTime: totalcm
        }

        list.push(icuma);
        list.push(ipazartesi);
        list.push(ipersembe);
        list.push(icarsamba);
        list.push(isali);
        console.log(list);
        let percenList = [];
        list.map((w) => {
            percenList.push(w.percentage);
        })
        percenList.sort(function (a,b) {
            return b-a;
        })
        list.map((x) => {
            if(x.percentage === percenList[0]) {
                const highDay = {
                    a: x.percentage,
                    b: x.day,
                    c: x.totalTime
                }
                setHighDay(highDay);
            }
        })
    }


    useEffect(() => {
        evalFor();

    }, [])

    return (
      <main>
          <div className="Programs">
            <div className="Showcase">
                <span className="EditProgram"><BiEdit/></span>
                <span className="ReturnHome" onClick={() => {navigate('/Anasayfa')}}><BiHome/></span>
                <h1>Ders Programınız</h1>
                <p>Bir haftada ortalama {Calculate} saat ders işliyorsunuz</p>
                <p style={{fontSize: '13px'}}>En yoğun gününüz %{HighDay.a} oran, {HighDay.c} saat ile <span style={{color: 'lightgreen'}}>{HighDay.b}</span>.</p>
                <ul>
                    <li>
                        <h2>Pazartesi</h2>
                        <div className="Load">
                            {
                                Pazartesi?.map((a) => {
                                    return (
                                        <span key={Math.random()}>
                                            <h5>{a.cls}</h5>
                                            <p>{a.lesson}</p>
                                            <q>{a.time}</q>
                                        </span>
                                    );
                                })
                            }
                        </div>
                        <span className="Details">
                            <h3>
                                Toplam ders yükü
                                <br/>
                                {TotalForPazartesi} Saat
                            </h3>
                            <h3>
                                Ders ağırlık oranı
                                <br/>
                                %{Number(PercentageOf0).toFixed(2)}
                            </h3>
                        </span>
                    </li>
                    <li>
                        <h2>Salı</h2>
                        <div className="Load">
                            {
                                Sali?.map((a) => {
                                    return (
                                        <span key={Math.random()}>
                                            <h5>{a.cls}</h5>
                                            <p>{a.lesson}</p>
                                            <q>{a.time}</q>
                                        </span>
                                    );
                                })
                            }
                        </div>
                        <span className="Details">
                            <h3>
                                Toplam ders yükü
                                <br/>
                                {TotalForSali} Saat
                            </h3>
                            <h3>
                                Ders ağırlık oranı
                                <br/>
                                %{Number(PercentageOf1).toFixed(2)}
                            </h3>
                        </span>
                    </li>
                    <li>
                        <h2>Çarşamba</h2>
                        <div className="Load">
                            {
                                Carsamba?.map((a) => {
                                    return (
                                        <span key={Math.random()}>
                                            <h5>{a.cls}</h5>
                                            <p>{a.lesson}</p>
                                            <q>{a.time}</q>
                                        </span>
                                    );
                                })
                            }
                        </div>
                        <span className="Details">
                            <h3>
                                Toplam ders yükü
                                <br/>
                                {TotalForCarsamba} Saat
                            </h3>
                            <h3>
                                Ders ağırlık oranı
                                <br/>
                                %{Number(PercentageOf2).toFixed(2)}
                            </h3>
                        </span>
                    </li>
                    <li>
                        <h2>Perşembe</h2>
                        <div className="Load">
                            {
                                Persembe?.map((a) => {
                                    return (
                                        <span key={Math.random()}>
                                            <h5>{a.cls}</h5>
                                            <p>{a.lesson}</p>
                                            <q>{a.time}</q>
                                        </span>
                                    );
                                })
                            }
                        </div>
                        <span className="Details">
                            <h3>
                                Toplam ders yükü
                                <br/>
                                {TotalForPersembe} Saat
                            </h3>
                            <h3>
                                Ders ağırlık oranı
                                <br/>
                                %{Number(PercentageOf3).toFixed(2)}
                            </h3>
                        </span>
                    </li>
                    <li>
                        <h2>Cuma</h2>
                        <div className="Load">
                            {
                                Cuma?.map((a) => {
                                    return (
                                        <span key={Math.random()}>
                                            <h5>{a.cls}</h5>
                                            <p>{a.lesson}</p>
                                            <q>{a.time}</q>
                                        </span>
                                    );
                                })
                            }
                        </div>
                        <span className="Details">
                            <h3>
                                Toplam ders yükü
                                <br/>
                                {TotalForCuma} Saat
                            </h3>
                            <h3>
                                Ders ağırlık oranı
                                <br/>
                                %{Number(PercentageOf4).toFixed(2)}
                            </h3>
                        </span>
                    </li>
                </ul>
            </div>
          </div>
      </main>
    );
}