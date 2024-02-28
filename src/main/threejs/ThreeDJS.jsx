import * as THREE from 'three';

import { useEffect, useRef } from "react";
import { useNavigate} from "react-router-dom";
import {NavLink} from "../components/Navigation.jsx";
import {FaGraduationCap} from "react-icons/fa";

export default function ThreeDJS() {
    const navigate = useNavigate();
    const container = useRef(null);
    const BlackBox = useRef(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.current.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x8bd880 }  );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame( animate );

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render( scene, camera );
        }

        animate();

    }, []);
    return (
        <main style={{overflow: 'hidden'}}>
            <div ref={BlackBox} style={{position: 'absolute', width: '100%', height: '100%', background: '#101010', opacity: 0}}></div>
            <div onClick={() => {
                container.current.style.transition = "300ms";
                container.current.style.opacity = 0;
                setTimeout(() => {
                    BlackBox.current.style.transition = "300ms";
                    BlackBox.current.style.opacity = 1;
                }, 1000)
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }} style={{ cursor: 'pointer',background: "transparent", color: "white", fontSize: '20px', position: 'fixed', padding: '25px'}}>
                <FaGraduationCap/>
            </div>
            <div ref={container}></div>
        </main>
    );
}