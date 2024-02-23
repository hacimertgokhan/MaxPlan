import './addNewClass.css';
import {useEffect, useState} from "react";
import {BaseDirectory, removeFile, writeTextFile} from "@tauri-apps/api/fs";
import {BiMinusCircle} from "react-icons/bi";
export default function AddNewClass({display}) {
    const [Name, setName] = useState("");
    const [Number, setNumber] = useState("");
    const [ClassName, setClassName] = useState("");
    const [LessonListInput, setLessonListInput] = useState("");
    const [LessonList, setLessonList] = useState([]);

    function NameHandler(e) {setName(e.currentTarget.value)}
    function NumberHandler(e) {setNumber(e.currentTarget.value)}
    function ClassNameHandler(e) {setClassName(e.currentTarget.value)}
    function LessonListHandler(e) {setLessonListInput(e.currentTarget.value)}

    function addLesson(lesson, id) {
        if(!lesson.trim()) return;
        if(!LessonList.includes(lesson)) {
            const content = {
                id: id,
                lesson: lesson,
            }
            setLessonList([...LessonList, content]);
        }
        setLessonListInput("")
    }

    const createClass = (ClsName,TemNumber,TemName) => {
        let list = [];
        if(TemNumber.trim() && ClsName.trim() && TemName.trim()) {
            if(LessonList.length > 0) {
                LessonList.map((ll) => {
                    list.push(ll.lesson);
                })
                try {
                    writeTextFile(`MaxPlan//Class//${ClsName}.yml`, `sinif_adi: ${ClsName}\nsinif_temsilcisi: ${TemName}\nsinif_temsilci_numarasi: ${Number}\nsinif_id: ${Math.random()}\nson_islenen_sunum: Henüz ders işlenmemiş\nsinifa_verilen_ders: ${list.toString()}`, {dir: BaseDirectory.Document});
                } catch (e) {
                    console.log('Err: ' + e);
                }
            }
        }
        window.location.reload();
    }
    function deleteLesson(id) {
        const newNoteList = LessonList.filter(ll => ll.id!==id);
        setLessonList(newNoteList);
    }

    return (
      <>
          <main className="AddNewClass" style={{display: display}}>
              <div className="ClassList">
                  <h1>Sınıf Bilgileri</h1>
                  <ul>
                      <li>
                          <label>
                              Sınıfın adı
                              <input
                                  type={"text"}
                                  value={ClassName}
                                  onChange={(e) => {
                                      ClassNameHandler(e)
                                  }}
                                  placeholder={"Sınıf adı"}
                              />
                          </label>
                      </li>
                      <li>
                          <label>
                              Sınıf temsilcisinin adı
                              <input
                                  type={"text"}
                                  value={Name}
                                  onChange={(e) => {
                                      NameHandler(e)
                                  }}
                                  placeholder={"Temsilci adı"}
                              />
                          </label>
                      </li>
                      <li>
                          <label>
                              Temsilcinin numarası
                              <input
                                  type={"number"}
                                  value={Number}
                                  onChange={(e) => {
                                      NumberHandler(e)
                                  }}
                                  placeholder={"Temsilci numarası"}
                              />
                          </label>
                      </li>
                      <li>
                          <label>
                              Sınıfa verilen dersler
                              <div className="LessList">
                                  <input
                                      type={"text"}
                                      value={LessonListInput}
                                      onChange={(e) => {
                                          LessonListHandler(e)
                                      }}
                                      placeholder={"Ders adı"}
                                  />
                                  <button onClick={() => addLesson(LessonListInput, Math.floor(Math.random()*590234827))}>+</button>
                                  <div className="Preview">
                                      {LessonList.map((lessl) => {
                                          return (
                                              <label key={lessl.id}>
                                                  {lessl.lesson}
                                                  <button onClick={() => {deleteLesson(lessl.id)}}><BiMinusCircle/></button>
                                              </label>
                                          )
                                      })}
                                  </div>
                              </div>
                          </label>
                      </li>
                      <li>
                          <button onClick={() => createClass(ClassName, Number, Name)}>Sınıfı oluştur</button>
                      </li>
                  </ul>
              </div>
          </main>
      </>
    );
}