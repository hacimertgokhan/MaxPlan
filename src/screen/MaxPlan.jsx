import './style/screen.css';
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
export default function MaxPlan() {
    const [Opacity, setOpacity] = useState(1);
    const bgRef = useRef(null);
    const navigate = useNavigate();
   useEffect(() => {
        setTimeout(() => {
            setOpacity(0);
            bgRef.current.style.transition = "300ms;";
            bgRef.current.style.background = "#202020";
        }, 2000)
        setTimeout(() => {
            navigate('/Anasayfa');
        }, 4500)
    }, []);
    return (
      <main className="html" ref={bgRef}>
        <div className={"MaxPlanScreen"}>
            <h1 style={{opacity: Opacity}}>MaxPlan</h1>
        </div>
      </main>
    );
}
