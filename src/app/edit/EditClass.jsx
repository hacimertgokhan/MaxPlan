import {BaseDirectory, readTextFile, writeTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
import {useState} from "react";

let cfg,config;

const set = async (classname,path, newvalue) => {
    cfg = await readTextFile(`MaxPlan//Class//${classname}.yml`, {dir: BaseDirectory.Document});
    config = yaml.load(cfg);
    config[`${path}`] = newvalue;
    const newYaml = yaml.dump(config);
    try {
        await writeTextFile(`MaxPlan//Class//${classname}.yml`, newYaml,{dir: BaseDirectory.Document});
    } catch (e) {
        console.log(e);
    }
}

export default function EditClass({display, _old, clsname}) {
    const [Input, setInput] = useState("");
    function InputHandler(e) {
        setInput(e.currentTarget.value);
        e.preventDefault();
    }

    function doSet() {
        if(!Input.trim()) return;
        set(clsname,_old, Input);
        window.location.reload();
    }

    return (
        <main style={{display: display,borderRadius: '5px',color: "white", justifyContent: "center", flexDirection: "column",gap: '2em',position: "absolute", width: "100%", height: "100%", background: "rgba(16, 16, 16, 0.75)", placeItems: "center"}}>
            <h1 style={{fontSize: '25px'}}><span style={{color: 'lightgreen'}}>{_old}</span> düzenleniyor...</h1>
            <input
                type={"text"}
                value={Input}
                style={{width: '230px', height: '25px', background: "#fff", outline: "none", border: "none"}}
                onChange={(e) => {InputHandler(e)}}
            />
            <button onClick={() => {doSet()}} style={{width: '100px',marginTop: '100px',cursor: 'pointer',background: "#50cb70",height: '25px',outline: "none", border: "none"}}>Onayla</button>
        </main>
    );
}