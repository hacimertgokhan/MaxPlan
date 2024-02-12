import {BiCheckSquare, BiSolidXSquare} from "react-icons/bi";
import {exportedPdfList} from "./Pdf.jsx";
import {exportedClassList} from "./Class.jsx";
import {useState} from "react";
import DoSetup from "../DoSetup.jsx";

export let exportedName;
export let exportedMail;
export let exportedLesson;

let userValues = false;
export let pdfList = false;
export let classList = false;
export let _allDone = false;

export const checkboxChange = () => {
    pdfList = exportedPdfList.length !== 0;
    classList = exportedClassList.length !== 0;
    AllDone();
}

export const AllDone = () => {
    if(pdfList) {
        if (classList) {
            if (userValues) {
                _allDone=true;
            } else {
                _allDone=false;
            }
        } else {
            _allDone=false;
        }
    } else {
        _allDone=false;
    }
}

export default function User({display}) {
    const userReturner = () => {if(userValues) {return (<BiCheckSquare/>);} else {return (<span style={{color: '#d85424'}}><BiSolidXSquare/></span>);}}
    const pdfReturner = () => {if(pdfList) {return (<BiCheckSquare/>);} else {return (<span style={{color: '#d85424'}}><BiSolidXSquare/></span>);}}
    const classReturner = () => {if(classList) {return (<BiCheckSquare/>);} else {return (<span style={{color: '#d85424'}}><BiSolidXSquare/></span>);}}

    const [Name, setName] = useState('');
    const [Lesson, setLesson] = useState('');
    const [Mail, setMail] = useState('');

    const UserCheckBox = () => {
        if(!(Name.length < 2)) {
            if(!(Mail.length < 2)) {
                if(!(Lesson.length < 2)) {
                    userValues = true;
                } else {
                    userValues = false;
                }
            } else {
                userValues = false;
            }
        } else {
            userValues = false;
        }
        AllDone();

    }

    return (
        <div className="User" style={{display: display}}>
        <h1>Kullanıcı</h1>
            <ul>
                <li>
                    <label>Adınız,</label>
                    <input onChange={(e) => {setName(e.currentTarget.value); UserCheckBox();  AllDone(); exportedName=(e.currentTarget.value);}} type="text" placeholder="Lütfen bir ad belirtiniz."/>
                </li>
                <li>
                    <label>Ders,</label>
                    <input onChange={(e) => {setLesson(e.currentTarget.value); UserCheckBox(); AllDone(); exportedLesson=(e.currentTarget.value);}} type="text" placeholder="Lütfen bir ders belirtiniz."/>
                </li>
                <li>
                    <label>Mail,</label>
                    <input onChange={(e) => {setMail(e.currentTarget.value); UserCheckBox(); AllDone(); exportedMail=(e.currentTarget.value);}} type="text" placeholder="Lütfen bir mail belirtiniz."/>
                </li>
            </ul>
            <span className="Checkbox">
                <ul>
                    <li>Kullanıcı işlemleri <p>{userReturner()}</p></li>
                    <li>Dosya işlemleri <p>{pdfReturner()}</p></li>
                    <li>Sınıf işlemleri <p>{classReturner()}</p></li>
                </ul>
            </span>
            <DoSetup current={_allDone}/>

        </div>
    );
}

/*

            <ul>
                {
                    exportedPdfList.map((a) => {
                        return (<li key={a.id}>{a.classname} - {a.classlesson}</li>);
                    })
                }
            </ul>

 */