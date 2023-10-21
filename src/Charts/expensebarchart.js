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
  
  const ExpenseBarChart = () => {
  
    const { transactions } = useGetTransactions();
    
    const date = []
    const expenseamount = []
    
    transactions.forEach((transaction) => {
      const { time, transactionType, transactionAmount } = transaction
      // console.log(time)

      if (transactionType === 'expense') {
                date.push(time);
                expenseamount.push(transactionAmount);
            }
    // if (time && time.seconds) {
    //   // Handle time formatting or other processing here if needed
    //   // For example, convert time to a formatted date string:
    //   const formattedDate = new Date(time.seconds*1000).toLocaleDateString('en-US', {
    //       month: 'long',
    //       day: 'numeric',
    //   });
  })
      // console.log(formattedDate)

  //     if (transactionType === 'expense') {
  //         date.push(formattedDate);
  //         expenseamount.push(transactionAmount);
  //     }
  // } else {
  //     // Handle the case when 'time' is null, undefined, or not a valid date
  //     // For example, you can push an empty string or handle it differently
  //     date.push("");
  //     expenseamount.push("");
  // }
      // }})


    // transactions.forEach((transaction) => {
    //   const { time, transactionType, transactionAmount } = transaction
     
    
    //     if(time){
             
    // //   const formattedDate = time.toLocaleDateString('en-US', {
    // //     month: 'long',
    // //     day: 'numeric',
    // // });
    //         if (transactionType === 'expense') {
    //             date.push(time)
    //             expenseamount.push(transactionAmount)
    //           }
    //     }
    //     else{
    //         date.push("")
    //         expenseamount.push("")
    //     }
        
      
      
      
    // })
  
    const data = {
      labels: date,
      datasets: [
        {
          label: "expense",
          data: expenseamount,
          backgroundColor: " #2980b9",
          borderColor: 'black',
          borderWidth: 1,
        },
        
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
  
  export default ExpenseBarChart;