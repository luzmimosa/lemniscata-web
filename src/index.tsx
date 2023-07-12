import React from "react";
import {createRoot} from "react-dom/client";
import {LemniscataRouter} from "./Router";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("root element not found");

const root = createRoot(rootElement);
root.render(
    <LemniscataRouter/>
);