document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const numbers = document.querySelectorAll(".number");
  const operators = document.querySelectorAll(".operatorBtn");
  const evaluation = document.querySelector(".equalBtn");
  let expression = "";

  const handleInput = (value) => {
    if (value === "C") {
      input.value = "";
      expression = "";
    } else if (value === "+/-") {
      expression = -eval(expression);
      expression = isNaN(expression) ? "Error" : expression;
      input.value = expression;
    } else if (value === "CE") {
      expression = expression.slice(0, -1);
      input.value = expression;
    } else if (!isNaN(Number(value)) || value === ".") {
      // Allow numbers and decimal point
      expression += value;
      input.value = expression;
    } else {
      // Handle operators
      const lastChar = expression.slice(-1);
      if (["+", "-", "*", "/"].includes(lastChar)) {
        // If the last character is an operator, replace it
        expression = expression.slice(0, -1);
      }
      expression += value;
      input.value = expression;
    }
  };

  const evaluateExpression = () => {
    try {
      const result = Function('"use strict";return (' + expression + ")")();
      if (!isFinite(result)) {
        throw new Error("Invalid result");
      }
      input.value = result;
      expression = result.toString();
    } catch (error) {
      input.value = "Error";
      expression = "";
    }
  };

  numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
      handleInput(event.target.value);
    });
  });
  operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
      handleInput(event.target.value);
    });
  });
  evaluation.addEventListener("click", (event) => {
    evaluateExpression();
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (
      (key >= "0" && key <= "9") ||
      key === "." ||
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/"
    ) {
      event.preventDefault();
      handleInput(key);
    } else if (key === "Enter") {
      event.preventDefault();
      evaluateExpression();
    } else if (key === "Backspace") {
      event.preventDefault();
      expression = expression.slice(0, -1);
      input.value = expression;
    }
  });
});
