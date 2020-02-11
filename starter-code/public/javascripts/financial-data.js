const key = "demo";
const functionName = "TIME_SERIES_DAILY";
const symbolName = "MSFT";
const timeStartElm = document.querySelector('#start')
const timeEndElm = document.querySelector('#end')
let timeStart, timeEnd

timeStartElm.addEventListener('change', function () {
    timeStart = document.querySelector('#start').value
})
timeEndElm.addEventListener('change', function () {
    timeEnd = document.querySelector('#end').value
})



const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${timeStart}end=${timeEnd}`;
// const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbolName}&apikey=${key}`;




axios
  .get(apiUrl)
  .then(responseFromAPI => {
    printTheChart(responseFromAPI.data); // <== call the function here where you used to console.log() the response
})
  .catch(err => {
    console.log("Error while getting the data: ", err);
  });
  

  
function printTheChart(data) {
  const dataObject = data
  const stockPrices = Object.values(dataObject.bpi)
  const stockDates = Object.keys(dataObject.bpi)

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: stockDates,
      datasets: [
        {
          label: "Negociación en bolsa",
          backgroundColor: "rgb(100, 100, 100)",
          borderColor: "rgb(255, 0, 0)",
          data: stockPrices
        }
      ]
    }
  }); // closes chart = new Chart()
} // closes printTheChart()