import { useState } from "react"
import { useEffect } from "react";
import { query, collection, orderBy, where, onSnapshot } from "firebase/firestore";
import { db } from '../config/firebase-config'
import { useGetUserInfo } from './useGetUserInfo'


export const useGetTransactions = () => {
    useEffect(() => {
        getTransactions();

        // Cleanup the subscription when the component unmounts
        
    },[]);


    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, settransactionTotals] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0
    })

    const transactionCollectionRef = collection(db, "transactions");
    const { userId } = useGetUserInfo();


    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userId", "==", userId),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];
                let totalIncome = 0;
                let totalExpense = 0;

                snapshot.forEach((doc) => {
                    try{
                        const data = doc.data()
                        if (data&&data.createdAt) {
                            const serverTimestamp = data.createdAt
                            // console.log(serverTimestamp);
                            const createdAtDate = serverTimestamp.toDate();
    
                            const id = doc.id
    
    
                            //   console.log("createdAt",createdAtDate)
                            // const createdAtDate = new Date(data.createdAt.seconds * 1000); // Multiply by 1000 to convert seconds to milliseconds
    
                            //Format the date as a human-readable string
                            const formattedDate = createdAtDate.toLocaleDateString('en-US', {
    
                                month: 'long',
                                day: 'numeric',
                            }); // Convert Firestore Timestamp to JavaScript Date
                            const time = formattedDate;
    
                            // console.log("fd",formattedDate)
                            docs.push({ ...data, id, time })
                            if (data.transactionType === "expense") {
                                totalExpense += Number(data.transactionAmount);
    
                            } else {
                                totalIncome += Number(data.transactionAmount);
                            }
                        }
                    ;
                    setTransactions(docs)
                    
                let balance = totalIncome - totalExpense
                settransactionTotals({
                    balance,
                    expenses: totalExpense,
                    income: totalIncome
                })
                    }catch (error) {
                        console.error("Error processing document:", error);
                    }
                })
            })
        } catch (err) {
            console.error(err)
        }
        return () => unsubscribe();
    };
    return { transactions, transactionTotals }
} 