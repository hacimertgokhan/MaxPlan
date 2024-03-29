import {BaseDirectory, readTextFile, writeTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
import {useState} from "react";

let cfg,config;
const loadConfig = async () => {
    cfg = await readTextFile('MaxPlan//config.yml', {dir: BaseDirectory.Document});
    config = yaml.load(cfg);
}

loadConfig().then({});
const set = async (path, newvalue) => {
    config[`${path}`] = newvalue;
    const newYaml = yaml.dump(config);
    try {
        await writeTextFile("MaxPlan//config.yml", newYaml,{dir: BaseDirectory.Document});
    } catch (e) {
        console.log(e);
    }
}

export default function EditValue({display, _old}) {
    const [Input, setInput] = useState("");
    function InputHandler(e) {
        setInput(e.currentTarget.value);
        e.preventDefault();
    }

    function doSet() {
        if(!Input.trim()) return;
        set(_old, Input);
        window.location.reload()

    }

    return (
      <main style={{display: display,borderRadius: '5px',color: "white", justifyContent: "center", flexDirection: "column",gap: '2em',position: "absolute", width: "100%", height: "100%", background: "rgba(16, 16, 16, 0.75)", placeItems: "center"}}>
        <h1 style={{fontSize: '25px'}}><span style={{color: 'lightgreen'}}>{_old.replace("ogretim_gorevlisi", "Adınız").replace("ana_bransi", "Branş").replace("mail_adresi", "Mail")}</span> düzenleniyor...</h1>
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