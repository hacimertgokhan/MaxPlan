import User, {_allDone} from "./CorpusParts/User.jsx";
import Class from "./CorpusParts/Class.jsx";
import Pdf from "./CorpusParts/Pdf.jsx";

export default function Corpus({user, cls, pdf}) {
    return (
        <span className="Corpus">
            <User display={user}/>
            <Class display={cls}/>
            <Pdf display={pdf}/>
        </span>
    );
}