import { useAddTransaction } from '../../hooks/UseAddtransaction'
import { useState } from 'react';
import { useGetTransactions } from "../../hooks/useGetTransactions"
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import './style.css'
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import BarChart from '../../Charts/barchart';
import ExpenseBarChart from '../../Charts/expensebarchart';





export const ExpenseTracker = () => {

    const navigate = useNavigate()
    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotals } = useGetTransactions();
    const { username, profilePhoto } = useGetUserInfo();
    const [description, setDescription] = useState("")
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const [AddStyle, setAddStyle] = useState({
        visibility: "hidden"
    })

    const { balance, expenses, income } = transactionTotals

    const [show, setShow] = useState({
        button1: false,
        button2: false,
        button3: false
    });

    const handleDisplay = () => {
        setAddStyle((prevData) => ({
            ...prevData,
            visibility: "visible"
        }))
    }

    const handleDisplayCLose = () => {
        setAddStyle((prevData) => ({
            ...prevData,
            visibility: "hidden"
        }))
    }


    const handleClose = () => setShow(false);

    const handleShow = (option) => {
        setShow((prevdata) => ({
            ...prevdata,
            [option]: !prevdata[option]
        }));
    }


    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount,
            transactionType
        });

        setDescription("")
        setTransactionAmount("")
    }

    const signUserOut = async () => {
        try {

            await signOut(auth)
            localStorage.clear();
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }



    return (
        <>
            <div className='d-flex flex-row expense-trackerBody'>
                {profilePhoto && <div className='profile'>
                    <img className='profile-photo' src={profilePhoto} />
                    <h5>{username}</h5>
                    <div className='formContainer'>
                        <Button className="modalButton" onClick={handleDisplay}>Add a Transaction</Button>
                        <div className='d-flex flex-column AddTransactionContainer' style={AddStyle}>
                            <form className="d-flex flex-column align-items-start add-transaction" onSubmit={onSubmit}>
                                <TextField className="mt-1 mb-3" id="outlined-basic" label="Description" variant="outlined" value={description} required onChange={(e) => setDescription(e.target.value)} />
                                <TextField id="outlined-basic" label="Amount" variant="outlined" value={transactionAmount} required onChange={(e) => setTransactionAmount(e.target.value)} />

                                <div className='d-flex flex-row mt-3 '>
                                    <input className='ms-2' type="radio" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                                    <label className='ms-2' htmlFor="expense">Expense</label>
                                    <input className='ms-5' type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)} />
                                    <label className='ms-2' htmlFor="income">Income</label>
                                </div>
                                <div className='d-flex flex-row align-self-center '>
                                    <Button className="modalButton mt-4 me-2 " size='md' type='submit'>Add</Button>
                                    <Button className="modalButton mt-4  " size='md' type='button' onClick={handleDisplayCLose}>Close</Button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>}

                <div className=" d-flex flex-column expense-tracker">
                    <div className="container d-flex flex-column">
                        <div className="name-model show toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                            <div className="d-flex">
                                <div className="toast-body">
                                    Welcome to React Js Expense Tracker!
                                </div>
                                <div className='me-4 m-auto'>
                                    <FontAwesomeIcon icon={faRightFromBracket} onClick={signUserOut} />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-row cardContainer justify-content-evenly'>
                            <div className="card Card-CSS me-4" >
                                <div className="card-body">
                                    <h5 className="card-title">Your Balance :</h5>
                                    <div className="card-subtitle mb-2 text-body-secondary">{balance >= 0 ?
                                        <h2>Rs. {balance} </h2> : <h2>-Rs.{balance * -1}</h2>
                                    }</div>
                                    <p className="card-text"></p>
                                    <Button className='modalButton' variant="primary" onClick={() => handleShow('button1')} >
                                        Trace your Transactions
                                    </Button>

                                    {show['button1'] && <Modal show={() => show('button1')} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Transactions</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="transactions">
                                                <h3>List of complete transactions :</h3>

                                                <ul>
                                                    {transactions.map((transaction) => {
                                                        const { description, transactionAmount, transactionType, time } = transaction;
                                                        return (
                                                            <li>
                                                                <h4>
                                                                    {description}
                                                                </h4>
                                                                <p>{" "}
                                                                    Rs. {transactionAmount} - <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType === "expense" ? "Expense" : "Income"}</label><span style={{ "float": "right" }}>{time}</span></p>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>

                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    }

                                </div>
                            </div>
                            <div className="card Card-CSS mx-4 me-5" >
                                <div className="card-body">
                                    <h5 className="card-title">Your Income : </h5>
                                    <div className="card-subtitle mb-2 text-body-secondary"><h2>Rs. {income}</h2></div>
                                    <p className="card-text"></p>
                                    <Button className='modalButton' variant="primary" onClick={() => handleShow('button2')}>
                                        Trace your Income
                                    </Button>
                                    {show['button2']
                                        &&

                                        <Modal show={() => show('button2')} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Income Details </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="transactions">
                                                    <h3>List of complete transactions : </h3>
                                                    <ul>
                                                        {transactions.map((transaction) => {
                                                            const { description, transactionAmount, transactionType, time } = transaction;

                                                            if (transactionType === 'income') {
                                                                return (
                                                                    <li>
                                                                        <h4>{description}</h4>
                                                                        <p>
                                                                            Rs. {transactionAmount} - <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType === "expense" ? "Expense" : "Income"}</label>
                                                                            <span style={{ "float": "right" }}>{time}</span>
                                                                        </p>
                                                                    </li>
                                                                );
                                                            }
                                                            return null; // or you can use another component if needed
                                                        })}

                                                    </ul>

                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                    }
                                </div>
                            </div>
                            <div className="card Card-CSS" >
                                <div className="card-body">
                                    <h5 className="card-title">Your Expense :</h5>
                                    <div className="card-subtitle mb-2 text-body-secondary"><h2>Rs. {expenses}</h2></div>
                                    <p className="card-text"></p>
                                    <Button className='modalButton' variant="primary" onClick={() => handleShow('button3')}>
                                        Trace your Expense
                                    </Button>
                                    {show['button3']
                                        &&

                                        <Modal show={() => show('button3')} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Expense Details</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <h3>List of complete expenditure:</h3>
                                                <ul>
                                                    {transactions.map((transaction) => {
                                                        const { description, transactionAmount, transactionType, time } = transaction;

                                                        if (transactionType === 'expense') {
                                                            return (
                                                                <li>
                                                                    <h4>{description}</h4>
                                                                    <p>
                                                                        Rs. {transactionAmount} - <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType === "expense" ? "Expense" : "Income"}</label>
                                                                        <span style={{ "float": "right" }}>{time}</span>
                                                                    </p>
                                                                </li>
                                                            );
                                                        }
                                                        return null; // or you can use another component if needed
                                                    })}

                                                </ul>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>

                                            </Modal.Footer>
                                        </Modal>

                                    }
                                </div>

                            </div>

                        </div>
                        <div className='chart-container d-flex' >
                            <div className='incomeChart'>
                            <BarChart />
                            </div>
                            <div className='expenseChart'>
                                <ExpenseBarChart/>
                            </div>
                            

                        </div>
                    </div>
                </div>

            </div >
        </>
    );
}