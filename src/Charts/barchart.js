import {
  Chart as ChartJSBar,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  
} from "chart.js";

import { useGetTransactions } from "../hooks/useGetTransactions";
import { Bar } from "react-chartjs-2";
// import 'chartjs-adapte-date-fns';




ChartJSBar.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const BarChart = () => {

  const { transactions } = useGetTransactions();
  
  const date = []
  const expenseamount = []
  const incomeamount = []

  transactions.forEach((transaction) => {
    const { time, transactionType, transactionAmount } = transaction
    
   
      if(time){
        // const formattedDate = time.toLocaleDateString('en-US', {
        //   month: 'long',
        //   day: 'numeric',
        // });
        if (transactionType === 'income') {
        
      
          date.push(time)
          incomeamount.push(transactionAmount)
        }
      }else{
        date.push("")
        incomeamount.push("")
      }
      
    
    
    
  })

  const data = {
    labels: date,
    datasets: [
      
      {
        label: "income",
        data: incomeamount,
        backgroundColor: '#ff6f61',
        borderColor: 'black',
        borderWidth: 1,
        color:"white"
      }
    ],
   
  }


  const options = {
    scales: {
      x: {
        grid: {
          
          color:'white'
        },
        
       ticks : {
        color : 'white'
       }
      },
      y: {
        grid: {
          
          color:'white'
        },
        ticks : {
         color : 'white'
        }
       }
    }

  }

  return (
    <Bar data={data} options={options} />
  )
}

export default BarChart;