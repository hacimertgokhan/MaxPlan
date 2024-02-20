import Navigation from "../components/Navigation.jsx";
import './style/settings.style.css';
import {FaCheck} from "react-icons/fa";
import {BaseDirectory, readDir, readTextFile, removeFile, writeTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
import {FaGithub} from "react-icons/fa";

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

export default function Settings() {
    return (
      <>
          <Navigation/>
          <div className="Settings">
              <div className="User">
                  <h1>Kullanıcı Ayarları</h1>
                  <ul>
                      <li><label>Adınızı değiştirin, <input type="text"/>
                          <button><FaCheck/></button>
                      </label></li>
                      <li><label>Mail adresinizi değiştirin, <input type="text"/>
                          <button><FaCheck/></button>
                      </label></li>
                      <li><label>Ana branşınızı değiştirin, <input type="text"/>
                          <button><FaCheck/></button>
                      </label></li>
                  </ul>
              </div>
              <div className="Program">
                  <h1>Program Ayarları</h1>
                  <ul>
                      <li>
                          <label>Temayı değiştirin,
                              <select>
                                  <option>Karanlık</option>
                                  <option>Aydınlık</option>
                              </select>
                          </label>
                      </li>
                  </ul>
              </div>
              <div className="ClassAndPdf">
                  <h1>Sınıf ve Sunum Ayarları</h1>
                  <ul>
                      {
                          classArray.map((a) => {
                              return (
                                  <li key={a.id}>
                                      <h5><strong>{a.name}</strong></h5>
                                      <label>
                                          <input type="text" placeholder="Sınıf adını değiştir"></input>
                                          <button><FaCheck/></button>
                                      </label>
                                      <label>
                                          <input type="text" placeholder="Temsilci num. değiştir"></input>
                                          <button><FaCheck/></button>
                                      </label>
                                      <label>
                                          <input type="text" placeholder="Sunulan dersi değiştir"></input>
                                          <button><FaCheck/></button>
                                      </label>
                                      <label>
                                          <input type="text" placeholder="Temsilci adını değiştir"></input>
                                          <button><FaCheck/></button>
                                      </label>
                                  </li>
                              )
                          })
                      }
                  </ul>
              </div>
          </div>
      </>
    );
}