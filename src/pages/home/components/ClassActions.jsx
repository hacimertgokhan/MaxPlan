import '../components/style/classactions.style.css';


export default function ClassActions() {
    return (
        <>
            <div className="ClassPart">
                <h1>Sınıflar</h1>
                <div className="ClassActions">
                    <ul>
                    </ul>
                </div>
            </div>
        </>
    );
}

/*
import {BaseDirectory, readDir, readTextFile, removeFile, writeTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
import {useId, useState} from "react";

const delay = ms => new Promise(res => setTimeout(res, ms));

let classArray = [];

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

const deleteClass = async (id) => {
    const remove = await removeFile(`MaxPlan//Class//${id}`, {dir: BaseDirectory.Document});
    await delay(50)
    window.location.reload()
    if (remove) {
        console.log('Err: ' + remove.toString());
    } else {
        console.error('Succ: ' + remove.toString());
    }
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

{
    classArray.map((a) => {
        return (
            <li key={a.id}>
                <h5><strong>{a.name}</strong></h5>
                <p>Derslik: <strong>{a.less}</strong></p>
                <p>Temsilci: <strong>{a.tems}</strong></p>
                <span className="Buttons">
                <button onClick={(e) => {
                    e.preventDefault();
                    deleteClass(`${a.name}.yml`).then(() => {
                        window.location.reload()
                    });
                }}>Sil</button>
            </span>
                <div className="HoverInformation">
                    <p>Temsilci Numarası <strong>{a.num}</strong></p>
                </div>
            </li>
        )
    })
}
*/