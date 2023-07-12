import React, {useEffect, useRef, useState} from "react";

import "./splashScreen.css"
import {SplashDrawer} from "./SplashDrawer";
export const SplashScreen = () => {

    const drawer = new SplashDrawer();
    drawer.beginDraw();

    return (
        <div id={"splash-screen"}>
            <SplashCanvas
                onResize={() => {drawer.setCanvasSize(window.innerWidth, window.innerHeight)}}
                onCanvasLoaded={(canvas) => drawer.setCanvas(canvas.getContext("2d")!)}
            />
        </div>
    );
}

const SplashCanvas = (props: {
    onResize: () => void,
    onCanvasLoaded: (canvas: HTMLCanvasElement) => void,
}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasSize, setCanvasSize] = useState({width: window.innerWidth, height: window.innerHeight});

    const handleCanvasResize = () => {
        console.log("handleCanvasResize");
        setCanvasSize({width: document.body.clientWidth, height: document.body.clientHeight})
        props.onResize();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        props.onCanvasLoaded(canvas);

        window.addEventListener("resize", handleCanvasResize);
    }, [canvasRef]);

    return (
        <div id={"splash-screen"}>
            <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
        </div>
);
}
