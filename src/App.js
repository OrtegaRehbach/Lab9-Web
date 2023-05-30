import React, { useState } from "react";
import { Calculator } from "./components/Calculator/Calculator";

export function App() {

    const [allowNegatives, setAllowNegatives] = useState(false);
    const [percntAsMod, setPercntAsMod] = useState(true);

    return (
        <div>
            <h1>Calculadora</h1>
            <Calculator percntAsMod={percntAsMod} allowNegatives={allowNegatives}></Calculator>
            <div className="checkbox-container">
                <label>
                    <input type="checkbox" id="allow-negatives-checkbox" onChange={e => setAllowNegatives(e.target.checked)}/>
                    Allow Negatives
                </label>
                <label>
                    <input type="checkbox" id="percnt-as-mod-checkbox" defaultChecked={true} onChange={e => setPercntAsMod(e.target.checked)}/>
                    Percent as Module
                </label>
            </div>
        </div>
    );
}