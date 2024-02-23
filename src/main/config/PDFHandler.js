import {BaseDirectory, readBinaryFile, readDir, readTextFile} from "@tauri-apps/api/fs";

const main = await readDir('MaxPlan', {dir: BaseDirectory.Document});

const pdfs = await readDir('MaxPlan//PDF//DOCS//', { dir: BaseDirectory.Document });

export function getPDF(pdfname) {
    if (main) {
        for (const entry of pdfs) {
            if(entry.name.toString() === `${pdfname}.pdf`) {
                console.log(entry.path.toString())
                return entry.path.toString();
            }
        }
    }
}

