import '../style/events/event_sol.css';
import {BiMinusCircle} from "react-icons/bi";
export default function ({display, cls}) {
    return (
        <div className="ShowOfferedLessons" style={{display: display}}>
            <h1>{cls} Sınıfına verilen dersler</h1>
            <div className="Add">
                <input type={"text"} placeholder={"Ders adı giriniz."}/>
                <button>Ekle</button>
            </div>
            <div className="List">
                <ul>
                    <li>
                        <h1>Anatomi</h1>
                        <button><BiMinusCircle/><span style={{fontSize: '16px'}}>Dersi kaldır</span></button>
                    </li>
                </ul>
            </div>
        </div>
    );
}