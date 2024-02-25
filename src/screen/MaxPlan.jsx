import './style/screen.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
export default function MaxPlan() {
    const [Opacity, setOpacity] = useState(1);
    const navigate = useNavigate();
   useEffect(() => {
        setTimeout(() => {
            setOpacity(0);
        }, 3000)
        setTimeout(() => {
            navigate('/Anasayfa');
        }, 4500)
    }, []);
    return (
      <main className="html">
        <div className={"MaxPlanScreen"}>
            <h1 style={{opacity: Opacity}}>MaxPlan</h1>
        </div>
      </main>
    );
}
