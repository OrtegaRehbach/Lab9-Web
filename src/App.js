import React from "react";
import { Calculator } from "./components/Calculator/Calculator";

export function App() {
    return (
        <div>
            <h1>Calculadora</h1>
            <Calculator percntAsMod={true} allowNegatives={false}></Calculator>
        </div>
    );
}