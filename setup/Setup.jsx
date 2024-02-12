import './style/setup.style.css';
import Caput from "./components/Caput.jsx";
import Corpus from "./components/Corpus.jsx";
import {BiArchive, BiBook, BiUser} from "react-icons/bi";
import {useState} from "react";


export default function MaxPlanSetup() {
    const [UserAct, setUserAct] = useState('');
    const [ClsAct, setClsAct] = useState('');
    const [PdfAct, setPdfAct] = useState('');

    const [UserValue, setUserValue] = useState('');
    const [ClsValue, setClsValue] = useState('');
    const [PdfValue, setPdfValue] = useState('');

    const ClickChange = (type) =>{
        if(type === 'user') {

            setUserAct('act');
            setPdfAct('none');
            setClsAct('none');

            setUserValue('block');
            setClsValue('none');
            setPdfValue('none');

        } else if ( type === 'cls') {

            setUserAct('none');
            setPdfAct('none');
            setClsAct('act');

            setUserValue('none');
            setClsValue('block');
            setPdfValue('none');

        } else if ( type === 'pdf') {

            setUserAct('none');
            setPdfAct('act');
            setClsAct('none');

            setUserValue('none');
            setClsValue('none');
            setPdfValue('block');

        }
    }
    return (
        <>
            <div className="Setup">
                <span className="Sections">
                    <ul>
                        <li id={UserAct}>
                            <a onClick={() => {ClickChange('user')}}><BiUser/></a>
                        </li>
                        <li id={PdfAct}>
                            <a onClick={() => {ClickChange('pdf')}}><BiArchive/></a>
                        </li>
                        <li id={ClsAct}>
                            <a onClick={() => {ClickChange('cls')}}><BiBook/></a>
                        </li>
                    </ul>
                </span>
                <Caput/>
                <Corpus user={UserValue} pdf={PdfValue} cls={ClsValue}/>
            </div>
        </>
    )
}