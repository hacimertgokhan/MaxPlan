import './event_cnn.css';
import {useEffect, useState} from "react";
import {BaseDirectory, writeTextFile} from "@tauri-apps/api/fs";
import {notes, processNotes} from "../../main/NewHome.jsx";

const randStr = (len) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for(let a = 0;a<len; a++) {
        result += chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return result;
}


const createNote = (note,date,id) => {
    try {
        let dname = randStr(6);
        if(!note.trim()) return;
        writeTextFile(`MaxPlan//Notes//${dname}.yml`, `dname: ${dname}\nnot: ${note}\nolusturulma_tarihi: ${date}\nnot_id: ${id}`, {dir: BaseDirectory.Document});
        return true;
    } catch (e) {
        console.log('Err: ' + e);
        return false;
    }
}

export default function CreateNewNote({display}) {
    const [Input, setInput] = useState();
    const date = new Date();
    const getDayName = () => {const day = date.getDay();const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];return days[day-1];}
    const [CurrentDate, setCurrentDate] = useState(`${getDayName()} | ${date.getHours()}.${date.getMinutes()}.${date.getSeconds()} | ${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`);
    function InputHandler(e) {setInput(e.currentTarget.value);}
    const createNewUserNote = (a,b,c) => {
        if(createNote(a,b,c)) {
            window.location.reload();

        }
    }



    return (
        <div className="CreateNewNote" style={{display: display}}>
            <h1>Notunuzu giriniz.</h1>
            <textarea
                value={Input}
                onChange={(e) => {InputHandler(e)}}
            />
            <button onClick={() => createNewUserNote(Input, CurrentDate, Math.floor(Math.random() * 82183927))}>Ekle</button>
        </div>
    );
}