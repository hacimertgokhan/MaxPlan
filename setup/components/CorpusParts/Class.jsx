import {BiCheckSquare, BiCross, BiMinusCircle, BiPlus, BiPlusCircle} from "react-icons/bi";
import {useState} from "react";
import {AllDone, checkboxChange} from "./User.jsx";
export let exportedClassList = [];

export default function Class({display}) {

    const [ClassList, setClassList] = useState([]);
    const [classnameInput, setClassNameInput] = useState("");
    const [classlessonInput, setClassLessonInput] = useState("");

    const addClass = (classname, classlesson) => {
        if(!(classlessonInput === '')) {
            if (!(classnameInput === '')) {
                const newClass = {
                    id: Math.random(),
                    classname: classname,
                    classlesson: classlesson,
                };
                exportedClassList.push(newClass);
                setClassList([...ClassList, newClass]);
                setClassNameInput("");
                setClassLessonInput("");
            }
        }
        checkboxChange();
        AllDone();

    };

    const deleteClass = (id) => {
        const newList = ClassList.filter((cls) => cls.id !== id);
        setClassList(newList);
        exportedClassList = [newList];
        checkboxChange();
        AllDone();

    };


    return (
        <div className="Class" style={{display: display}}>
            <h1>Sınıflar</h1>
            <ul>
                <li>
                    <form>
                        <input
                            type="text"
                            value={classnameInput}
                            placeholder="Sınıf adı"
                            onChange={(e) => setClassNameInput(e.target.value)}
                        />
                    </form>
                </li>
                <li>
                    <form>
                        <input
                            type="text"
                            value={classlessonInput}
                            placeholder="Verilen ders"
                            onChange={(e) => setClassLessonInput(e.target.value)}
                        />
                        <button onClick={(e) => {
                            e.preventDefault();
                            addClass(classnameInput, classlessonInput);
                        }}><BiPlusCircle/>
                        </button>
                    </form>
                </li>
            </ul>
            <div className="Preview">
                <ul>
                    {
                        ClassList.map((a) => {
                            return (
                                <li key={a.id}>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        deleteClass(a.id);
                                        AllDone();
                                    }}>
                                        <BiMinusCircle/>
                                    </button>
                                    <p><span style={{color: '#50cb70'}}>{a.classname}</span> bölümüne verilen ders <span style={{color: '#6a6fe7'}}>{a.classlesson}</span></p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    );
}