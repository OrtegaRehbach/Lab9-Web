import React, { useState } from "react";
import "../../assets/styles/Calculator.scss";

export function Calculator({ allowNegatives, percntAsMod }) {

    const operators = ["/", "*", "-", "+"]
    const maxDigits = 9;
    const [lastExpression, setLastExpression] = useState("");
    const [result, setResult] = useState(0);
    const [display, setDisplay] = useState(result.toString());

    const isOperator = x => {
        return operators.includes(x) || (percntAsMod && x === "%");
    } 

    const handleClick = (value) => {
        if (display.length < maxDigits + 1) {
            let newValue = "";
            if ((display === "0" && value != ".") || (display === result.toString() && !isOperator(value) && value != ".") || display === "ERROR") {
                newValue = value;
            } else {
                newValue = isOperator(value) ? " " + value + " " : value;
                newValue = display + newValue;
            }
            setDisplay(newValue);
        }
    }

    const handlePercent = () => {
        const tokens = display.split(" ");
        let lastToken = tokens[tokens.length - 1];
        if (!isOperator(lastToken) && typeof eval(lastToken) === "number") {
            tokens[tokens.length - 1] = parseFloat(eval(lastToken) * (1/100));
            let newDisplay = tokens.toString().replaceAll(",", " ");
            setDisplay(newDisplay);
        }
    }

    const handlePlusMinus = () => {
        const tokens = display.split(" ");
        let lastToken = tokens[tokens.length - 1];
        if (!isOperator(lastToken) && typeof eval(lastToken) === "number") {
            tokens[tokens.length - 1] = "(-" + lastToken + ")";
            let newDisplay = tokens.toString().replaceAll(",", " ");
            setDisplay(newDisplay);
        }
    }

    const handleClear = () => {
        setDisplay("0");
        setResult(0);
        setLastExpression("");
    }

    const handleCalculate = () => {
        try {
            if (!isOperator(display.charAt(display.length - 1))) {
                let res = eval(display);
                res = res % 1 === 0 ? res : parseFloat(res);
                if (res < 0 && !allowNegatives) {
                    handleError();
                    return;
                }
                setLastExpression(display);
                setResult(res);
                setDisplay(res.toString());
            }
        } catch (error) {
            handleError()
        }
    }

    const handleError = () => {
        handleClear();
        setDisplay("ERROR");
    }

    return (
        <div className="calculator-wrapper">
            <div className="result-wrapper">
                <div className="prev-operation">{lastExpression}</div>
                <div className="result">{display}</div>
            </div>
            <div className="button-grid">
                {/* Row 1 */}
                <button type="button" className="calc-button span2" onClick={() => handleClear()}>C</button>
                <button type="button" className="calc-button" onClick={() => handlePlusMinus()}>+/&minus;</button>
                <button type="button" className="calc-button tinted" onClick={() => handleClick("/")}>&divide;</button>
                {/* Row 2 */}
                <button type="button" className="calc-button" onClick={() => handleClick("7")}>7</button>
                <button type="button" className="calc-button" onClick={() => handleClick("8")}>8</button>
                <button type="button" className="calc-button" onClick={() => handleClick("9")}>9</button>
                <button type="button" className="calc-button tinted" onClick={() => handleClick("*")}>&times;</button>
                {/* Row 3 */}
                <button type="button" className="calc-button" onClick={() => handleClick("4")}>4</button>
                <button type="button" className="calc-button" onClick={() => handleClick("5")}>5</button>
                <button type="button" className="calc-button" onClick={() => handleClick("6")}>6</button>
                <button type="button" className="calc-button tinted" onClick={() => handleClick("-")}>&minus;</button>
                {/* Row 4 */}
                <button type="button" className="calc-button" onClick={() => handleClick("1")}>1</button>
                <button type="button" className="calc-button" onClick={() => handleClick("2")}>2</button>
                <button type="button" className="calc-button" onClick={() => handleClick("3")}>3</button>
                <button type="button" className="calc-button tinted" onClick={() => handleClick("+")}>+</button>
                {/* Row 5 */}
                <button type="button" className="calc-button" onClick={() => {
                    if (percntAsMod) {
                        handleClick("%");
                    } else {
                        handlePercent();
                    }
                }}>%</button>
                <button type="button" className="calc-button" onClick={() => handleClick("0")}>0</button>
                <button type="button" className="calc-button" onClick={() => handleClick(".")}>.</button>
                <button type="button" className="calc-button tinted" onClick={() => handleCalculate()}>=</button>
            </div>
        </div>
    );
};