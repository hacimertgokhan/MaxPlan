import {classList, exportedLesson, exportedMail, exportedName, pdfList} from "./CorpusParts/User.jsx";
import {BaseDirectory, createDir, exists, removeFile, writeTextFile} from "@tauri-apps/api/fs";
import {exportedClassList} from "./CorpusParts/Class.jsx";
import {exportedPdfList} from "./CorpusParts/Pdf.jsx";

export default function DoSetup({current}) {
    const setup = async () => {
        if (exportedName.length > 2) {
            if (exportedMail.length > 2) {
                if (exportedLesson.length > 2) {
                    if (pdfList) {
                        if (classList) {
                            let fileContent = (`ogretim_gorevlisi: ${exportedName}\nana_bransi: ${exportedLesson}\nmail_adresi: ${exportedMail}`);
                            try {
                                await createDir('MaxPlan', {dir: BaseDirectory.Document});
                                await createDir('MaxPlan//PDF', {dir: BaseDirectory.Document});
                                await createDir('MaxPlan//Class', {dir: BaseDirectory.Document});
                                await writeTextFile('MaxPlan//config.yml', fileContent, {dir: BaseDirectory.Document});
                                exportedPdfList.map((a) => {
                                    writeTextFile(`MaxPlan//PDF//${a.pdfname}.yml`, `pdf_adi: ${a.pdfname}\npdf_baglantisi: ${a.pdflink}\npdf_id: ${a.id}`, {dir: BaseDirectory.Document});
                                })
                                exportedClassList.map((a) => {
                                    writeTextFile(`MaxPlan//Class//${a.classname}.yml`, `sinif_adi: ${a.classname}\nsinifa_verilen_ders: ${a.classlesson}\nsinif_temsilcisi: none\nsinif_temsilci_numarasi: none\nsinif_id: ${a.id}`, {dir: BaseDirectory.Document});
                                })
                                window.location.reload();
                            } catch (e) {
                                console.error(e);
                            }
                        }
                    }
                }
            }
        }
    }

    function setupCurrent() {
        if(!current) {
            return (
                <p>Kurulumu bitirmek için bütün işlemleri gerçekleştiriniz.</p>
            )
        } else {
            return (
                <button onClick={setup}>Kurulumu bitir</button>
            );
        }
    }

    return (
        <div className="DoSetup">{setupCurrent()}</div>
    );
}