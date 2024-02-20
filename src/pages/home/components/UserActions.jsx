import '../components/style/useractions.styles.css';
import {BiData, BiLogoGithub, BiLogoGmail, BiSolidArchive, BiSolidBook, BiSolidUser} from "react-icons/bi";
import {BaseDirectory, exists, readTextFile} from "@tauri-apps/api/fs";
import yaml from "js-yaml";
const delay = ms => new Promise(res => setTimeout(res, ms));

let a, b, about;
const loadConfig = async () => {
    a = await readTextFile('MaxPlan//config.yml', {dir: BaseDirectory.Document});
    b = yaml.load(a);
}


// Daha uyumlu çalışıyor.
loadConfig().then(() => {
    about = {
        name: b.ogretim_gorevlisi,
        mail: b.mail_adresi,
        lesson: b.ana_bransi
    }
})

export default function UserActions() {
    return (
      <>
          <div className="UserActions">
              <h1>Kullanıcı</h1>
              <div className="About">
                  <ul>
                      <li><span id="Ico"><BiSolidUser/></span>{about.name}</li>
                      <li><span id="Ico"><BiSolidBook/></span>{about.lesson}</li>
                      <li><span id="Mail"><BiSolidArchive/></span>{about.mail}</li>
                  </ul>
              </div>
          </div>
      </>
    );
}

              /*
              <div className="Datas">
                  <ul>
                      <li><span id="Ico"><BiData/></span> Kullanıcı Kimliği</li>
                  </ul>
              </div>
              */