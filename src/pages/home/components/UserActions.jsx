import '../components/style/useractions.styles.css';
import {BiData, BiLogoGithub, BiLogoGmail, BiSolidArchive, BiSolidBook, BiSolidUser} from "react-icons/bi";
import {BaseDirectory, exists} from "@tauri-apps/api/fs";
if(exists('MaxPlan', {dir: BaseDirectory.Document})) {

}

let about = {
    name: 'H. Mert Gökhan',
    mail: 'hacimertgokhan@gmail.com',
    lesson: 'Anatomi'
}


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
            <div className="Datas">
                <ul>
                    <li><span id="Ico"><BiData/></span> Kullanıcı Kimliği</li>
                </ul>
            </div>
        </div>
      </>
    );
}