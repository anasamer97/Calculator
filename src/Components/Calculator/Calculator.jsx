import React, { useState } from "react";
import styled from "styled-components";

const CalculatorContainer = styled.div`
  width: 320px;
  background: #2a2a2a;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const Display = styled.div`
  background: #1e1e1e;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: right;
  font-size: 2em;
  color: #ffffff;
  min-height: 60px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Button = styled.button`
  padding: 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.operator ? "#ff9500" : props.special ? "#a6a6a6" : "#4a4a4a"};
  color: ${(props) =>
    props.operator || props.special ? "#000000" : "#ffffff"};

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [previousNum, setPreviousNum] = useState(null);
  const [operator, setOperator] = useState(null);
  const [isNewCalculation, setIsNewCalculation] = useState(true);

  const handleNumber = (number) => {
    if (isNewCalculation) {
      setDisplay(number.toString());
      setEquation(number.toString());
      setIsNewCalculation(false);
    } else {
      setDisplay(
        display === "0" ? number.toString() : display + number.toString()
      );
      setEquation(equation + number.toString());
    }
  };

  const handleOperator = (op) => {
    if (!isNewCalculation) {
      setEquation(display + ` ${op} `);
      setPreviousNum(parseFloat(display));
      setOperator(op);
      setIsNewCalculation(true);
    }
  };

  const calculate = () => {
    if (!operator) return;
    const current = parseFloat(display);
    let result = 0;

    switch (operator) {
      case "+":
        result = previousNum + current;
        break;
      case "-":
        result = previousNum - current;
        break;
      case "*":
        result = previousNum * current;
        break;
      case "/":
        result = previousNum / current;
        break;
      default:
        return;
    }

    setEquation(equation + ` = `);
    setDisplay(result.toString());
    setOperator(null);
    setPreviousNum(result);
    setIsNewCalculation(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setPreviousNum(null);
    setOperator(null);
    setIsNewCalculation(true);
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
      setEquation(equation + ".");
    }
  };

  return (
    <CalculatorContainer>
      <Display>
        <div style={{ fontSize: "0.8em", color: "#888", minHeight: "20px" }}>
          {equation}
        </div>
        {display}
      </Display>
      <ButtonGrid>
        <Button special onClick={handleClear}>
          AC
        </Button>
        <Button special>±</Button>
        <Button special>%</Button>
        <Button operator onClick={() => handleOperator("/")}>
          ÷
        </Button>

        <Button onClick={() => handleNumber(7)}>7</Button>
        <Button onClick={() => handleNumber(8)}>8</Button>
        <Button onClick={() => handleNumber(9)}>9</Button>
        <Button operator onClick={() => handleOperator("*")}>
          ×
        </Button>

        <Button onClick={() => handleNumber(4)}>4</Button>
        <Button onClick={() => handleNumber(5)}>5</Button>
        <Button onClick={() => handleNumber(6)}>6</Button>
        <Button operator onClick={() => handleOperator("-")}>
          -
        </Button>

        <Button onClick={() => handleNumber(1)}>1</Button>
        <Button onClick={() => handleNumber(2)}>2</Button>
        <Button onClick={() => handleNumber(3)}>3</Button>
        <Button operator onClick={() => handleOperator("+")}>
          +
        </Button>

        <Button
          onClick={() => handleNumber(0)}
          style={{ gridColumn: "span 2" }}
        >
          0
        </Button>
        <Button onClick={handleDecimal}>.</Button>
        <Button operator onClick={calculate}>
          =
        </Button>
      </ButtonGrid>
    </CalculatorContainer>
  );
};

export default Calculator;
