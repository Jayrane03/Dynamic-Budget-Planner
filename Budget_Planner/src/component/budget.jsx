import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import "../css/cont.css";
import "boxicons";

const BudgetTable = ({ totalIncome, totalBudget, totalExp, balance, currencySymbol }) => {
    let remainIncome = totalIncome - totalBudget;
    switch (currencySymbol) {
        case 'Rs':
            currencySymbol = '₹';
            break;
        case 'USD':
            currencySymbol = '$';
            break;
        case 'EURO':
            currencySymbol = '€';
            break;
        default:
            currencySymbol = '₹';
            break;
    }
    return (
        <div className="output flex">
            <h2>Budget Table</h2>
            <div className="out_put">
                <p>Income</p>
                <span id="income_amt">{currencySymbol} {totalIncome}</span>
            </div>
            <div className="out_put">
                <p>Income Remain</p>
                <span id="remain_incom">{currencySymbol} {Math.abs(remainIncome)}</span>
            </div>
            <div className="out_put budget_span">
                <p className='budget_table_name'>Total Budget</p>
                <span className="budget-amount" id="amount">{currencySymbol} {totalBudget}</span>
            </div>
            <div className="out_put">
                <p>Expenses</p>
                <span id="exp_amt">{currencySymbol} {totalExp}</span>
            </div>
            <div className="out_put">
                <p>Budget Balance</p>
                <span id="bal_amount">{currencySymbol} {balance}</span>
            </div>
        </div>
    );
};

const Budget = ({ currencySymbol }) => {
    const [incomeName, setIncomeName] = useState('');
    const [incomeAmount, setIncomeAmount] = useState('');
    const [totalIncome, setTotalIncome] = useState(0);
    const [incomeList, setIncomeList] = useState([]);
    const [expName, setExpName] = useState('');
    const [expAmount, setExpAmount] = useState('');
    const [totalExp, setTotalExp] = useState(0);
    const [expList, setExpList] = useState([]);
    const [totalBudget, setTotalBudget] = useState(0);
    const [budgetValue, setBudgetValue] = useState('');
    const [budgetErrVisible, setBudgetErrVisible] = useState(false);
    const [emptyBud, setEmptyBud] = useState(false);
    const [emptyIncome, setemptyIncome] = useState(false);
    const [budgetEmpty, setbudgetEmpty] = useState(false);

    useEffect(() => {
        const storedTotalIncome = localStorage.getItem("totalIncome");
        if (storedTotalIncome !== null) {
            setTotalIncome(parseFloat(storedTotalIncome));
        }

        const storedTotalBudget = localStorage.getItem("totalBudget");
        if (storedTotalBudget !== null) {
            setTotalBudget(parseFloat(storedTotalBudget));
        }

        const storedTotalExp = localStorage.getItem("totalExpenses");
        if (storedTotalExp !== null) {
            setTotalExp(parseFloat(storedTotalExp));
        }

        const storedIncomeList = JSON.parse(localStorage.getItem("incomeList")) || [];
        setIncomeList(storedIncomeList);

        const storedExpList = JSON.parse(localStorage.getItem("expenseList")) || [];
        setExpList(storedExpList);

        // localStorage.clear()
    }, []);

    const setIncome = () => {
      if (incomeName === "" || incomeAmount === "") {
          setEmptyBud(true);
          setTimeout(() => {
              setEmptyBud(false);
          }, 5000);
      } else {
          if (incomeName && incomeAmount) {
              const newIncomeItem = { name: incomeName, amount: incomeAmount };
              setIncomeList(prevIncomeList => [...prevIncomeList, newIncomeItem]);
              localStorage.setItem("incomeList", JSON.stringify([...incomeList, newIncomeItem])); // Update local storage
              setIncomeName('');
              setIncomeAmount('');
              let data = totalIncome + parseFloat(incomeAmount);
              setTotalIncome(prevTotalIncome => (parseFloat(prevTotalIncome) + parseFloat(incomeAmount)).toFixed(2)); // Functional update
              localStorage.setItem("totalIncome", parseFloat(data).toFixed(2));
          }
      }
  };

    const setBudget = () => {
        if (budgetValue.trim() === "") {
            setEmptyBud(true);
            setTimeout(() => {
                setEmptyBud(false);
            }, 5000);
        } else if (!totalIncome) {
            setemptyIncome(true);
            setTimeout(() => {
                setemptyIncome(false);
            }, 5000);
        } else if (parseFloat(budgetValue) > parseFloat(totalIncome)) {
            setBudgetErrVisible(true);
            setTimeout(() => {
                setBudgetErrVisible(false);
            }, 5000);
        } else if (parseFloat(totalIncome - totalBudget) === 0) {
            setBudgetErrVisible(true);
            setTimeout(() => {
                setBudgetErrVisible(false);
            }, 5000);
        } else if (isNaN(parseFloat(budgetValue)) || parseFloat(budgetValue) <= 0) {
            setEmptyBud(true);
            setTimeout(() => {
                setEmptyBud(false);
            }, 5000);
        } else {
            let newTotalBudget = totalBudget + parseFloat(budgetValue);
            setTotalBudget(newTotalBudget);
            setBudgetValue("");
            localStorage.setItem("totalBudget", newTotalBudget.toFixed(2));
            setEmptyBud(false);
        }
    };

    const expenses = () => {
      if (expName === "" || expAmount === "") {
          setEmptyBud(true);
          setTimeout(() => {
              setEmptyBud(false);
          }, 5000);
      } else if (!totalIncome || budgetValue === " ") {
          setBudgetEmpty(true);
          setTimeout(() => {
              setBudgetEmpty(false);
          }, 5000);
      } else if (parseFloat(totalExp) > parseFloat(totalIncome)) {
          setBudgetErrVisible(true);
          setTimeout(() => {
              setBudgetErrVisible(false);
          }, 5000);
      } else if (parseFloat(totalIncome - totalBudget) === 0) {
          setBudgetErrVisible(true);
          setTimeout(() => {
              setBudgetErrVisible(false);
          }, 5000);
      } else {
          if (expName && expAmount) {
              const newExpItem = { name1: expName, amount1: expAmount };
              setExpList(prevExpList => [...prevExpList, newExpItem]);
              localStorage.setItem("expenseList", JSON.stringify([...expList, newExpItem])); // Update local storage
              setExpName('');
              setExpAmount('');
              let exp_data = totalExp + parseFloat(expAmount);
              setTotalExp(prevTotalExp => (parseFloat(prevTotalExp) + parseFloat(expAmount)).toFixed(2)); // Functional update
              localStorage.setItem("totalExpenses", parseFloat(exp_data).toFixed(2));
              
          }
      }
  };
    return (
        <>
            <div className="container">
                <div className="error_budget">
                    {budgetErrVisible && (
                        <Alert variant="warning" className='custom-alert'>
                            Budget Amount cannot be greater than Income Amount.
                        </Alert>
                    )}
                    {emptyBud && (
                        <Alert variant="warning" className='custom-alert'>
                            Values cannot be empty!
                        </Alert>
                    )}
                    {emptyIncome && (
                        <Alert variant="warning" className='custom-alert'>
                            Enter the Income Value first.
                        </Alert>
                    )}
                    {budgetEmpty && (
                        <Alert variant="warning" className='custom-alert'>
                            Set the Budget first.
                        </Alert>
                    )}
                </div>
                <div className="card-container">
                    <div className="income_con con">
                        <h2>Income</h2>
                        <br />
                        <p className={`hide error budget-error ${budgetErrVisible ? "" : "visible"}`} id="budget_err">
                            Value can't be empty or in negative.
                        </p>
                        <input
                            type="text"
                            id="income_tit"
                            value={incomeName}
                            onChange={(e) => { setIncomeName(e.target.value) }}
                            placeholder="Income Name"
                        />
                        <br />
                        <input
                            type="number"
                            id="income_amount"
                            value={incomeAmount}
                            onChange={(e) => { setIncomeAmount(e.target.value) }}
                            placeholder="Income Amount"
                        />
                        <br />
                        <button onClick={setIncome} className="submit text-dark" id="total_amount_button">
                            Submit
                        </button>
                    </div>
                    <div className="total_amount con">
                        <h2>Budget</h2>
                        <br />
                        <p className="hide error budget-error" id="budget_err">
                            Value can't be empty
                        </p>
                        <input
                            type="text"
                            name=""
                            value={budgetValue}
                            onChange={(e) => { setBudgetValue(e.target.value) }}
                            id="total_amount"
                            placeholder="Enter the Total Amount you have."
                        />
                        <br />
                        <button onClick={setBudget} className="submit text-dark m-3" id="total_amount_button">Set Budget</button>
                        <div className="edit_icon">
                        </div>
                    </div>
                    <div className="user_amount_container con">
                        <h2>Expenses</h2>
                        <br />
                        <p className="hide error budget-error" id="product_tit_err">
                            Values can't be empty!
                        </p>
                        <input
                            type="text"
                            className="product_tit"
                            name=""
                            value={expName}
                            onChange={(e) => { setExpName(e.target.value) }}
                            id="exp_tit"
                            placeholder="Enter the title of the product"
                        />
                        <br />
                        <input
                            type="number"
                            name=""
                            id="exp_amount"
                            value={expAmount}
                            onChange={(e) => { setExpAmount(e.target.value) }}
                            placeholder="Enter the cost of the product"
                        />
                        <br />
                        <button onClick={expenses} className="submit text-dark" id="check_amount">Submit</button>
                    </div>
                </div>
            </div>
            <BudgetTable className="bud-table"
                totalIncome={totalIncome}
                totalBudget={totalBudget}
                totalExp={parseFloat(totalExp)}
                balance={parseFloat(totalBudget) - parseFloat(totalExp)}
                currencySymbol={currencySymbol}
            />
            <div className="exp_list">
                <h2>Income List</h2>
                <div className="list_cont">
                    <h6 className="d-flex justify-content-end me-3 ">Total Income : {totalIncome}  {currencySymbol} </h6>
                    <ul id="list_one">
                        {incomeList.map((item, index) => (
                            <React.Fragment key={index}>
                                <li className='fw-bold'>{item.name} - {item.amount}</li>
                                <br />
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="exp_list">
                <h2>Expense List</h2>
                <div className="list_cont">
                    <h6 className="d-flex justify-content-end me-3">Total Expenses: {totalExp}  {currencySymbol} </h6>
                    <ul id="list">
                        {expList.map((item, index) => (
                            <React.Fragment key={index}>
                                <li className="fw-bold">{item.name1} - {item.amount1}</li>
                                <br />
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Budget;
