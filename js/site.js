// Get values from page
function getValues(){
    let loanAmount = document.getElementById("loanAmount").value;
    let months = document.getElementById("loanMonths").value;
    let rate = document.getElementById("loanRate").value;

    if (loanAmount == ""){
        loanAmount = parseFloat(15000);
    } else {
        loanAmount = parseFloat(loanAmount);
    }

    if (months == ""){
        months = parseFloat(60);
    } else {
        months = parseFloat(months);
    }

    if (rate == ""){
        rate = parseFloat(3);
    } else {
        rate = parseFloat(rate);
    }
    
    // do loan calculations
    let resultsHTML = loanCalculations(loanAmount, rate, months);

    // display the html to screen
    displayResults(resultsHTML);
}

// Calculations
function loanCalculations(loanAmount, rate, months){

    let resultsObject = {};

    let totalInterest = 0;
    let balance = loanAmount;
    let interestPayment = 0;
    let principalPayment;
   
    // Calculate the total monthly payment
    let monthExponent = -Math.abs(months);
    let monthlyPayment = (loanAmount * (rate/1200)) / (1-(1+(rate/1200))**(monthExponent));
    monthlyPayment = parseFloat(monthlyPayment);
    
    let html = "";
    
    for (let i = 1; i <= months; i++){
        let month = i;
        interestPayment = parseFloat(balance*(rate/1200));
        principalPayment = parseFloat(monthlyPayment - (balance * (rate/1200)));
        totalInterest = parseFloat((totalInterest + interestPayment));
        totalInterest = parseFloat(totalInterest);
        balance -= principalPayment;
        balance = Math.abs(parseFloat(balance));

        html += `<tr><td>${month}</td><td>${monthlyPayment.toFixed(2)}</td><td>${principalPayment.toFixed(2)}</td><td>${interestPayment.toFixed(2)}</td><td>${totalInterest.toFixed(2)}</td><td>${balance.toFixed(2)}</td></tr>`
    }
    
    let totalCost = loanAmount + totalInterest;

    // display calculated variables to proper positions while inside function
    // use the .toLocaleString to convert to USD format 
    resultsObject.monthlyPayment = monthlyPayment.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    resultsObject.totalPrincipal = loanAmount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    
    resultsObject.totalInterest = totalInterest.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    });

    resultsObject.totalCost = totalCost.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });

    resultsObject.html = html;

    return resultsObject;
}

// Display results
function displayResults(resultsObject){
    document.getElementById("monthPaymentsOutput").innerHTML =  resultsObject.monthlyPayment;
    document.getElementById("totalPrincipalOutput").innerHTML = resultsObject.totalPrincipal;
    document.getElementById("totalInterestOutput").innerHTML = resultsObject.totalInterest;
    document.getElementById("totalCostOutput").innerHTML =  resultsObject.totalCost
    document.getElementById("results").innerHTML = resultsObject.html;
}

// Reset page
function resetPage(){
    loanAmount = document.getElementById("loanAmountInput").value = "";
    months = document.getElementById("totalMonthsInput").value = "";
    rate = document.getElementById("rateInput").value = "";
    document.getElementById("monthPaymentsOutput").innerHTML = "";
    document.getElementById("totalPrincipalOutput").innerHTML = "";
    document.getElementById("totalInterestOutput").innerHTML = "";
    document.getElementById("totalCostOutput").innerHTML = "";
    document.getElementById("results").innerHTML = "";
}

// // get values - controller function
// function getValues(){
//     let loanAmount = document.getElementById("loanAmount").value;
//     let term = document.getElementById("loanMonths").value;
//     let rate = document.getElementById("loanRate").value;
//     loanAmount = parseFloat(loanAmount);

//     term = parseFloat(term);
//     rate = parseFloat(rate);
    
//     let loanResult = loanCalc(loanAmount, term, rate);
//     displayResults(loanResult);

  
// }
// // loan calculator - logic function
// function loanCalc(loanAmount, term, rate){
//     let resultsObj = {};
//     let totalInterest = 0;
//     let balance = loanAmount;
//     let interestAmt = 0;
//     let tMP;
//     let amTable = `<tr><td>${month}</td><td>${tMP.toFixed(2)}</td><td>${interestAmt.toFixed(2)}</td><td>${totalInterest.toFixed(2)}</td><td>${balance.toFixed(2)}</td></tr>`;
//     rate = rate/1200;
//     let a = 1 + rate;
//     let b = ((a**term))-1;
//     let c = rate*(a ** term);
//     let totalMonthlyPayment = loanAmount / ((b/c));
//     tMP = Number.parseFloat(totalMonthlyPayment).toFixed(2);
//     let totalCost = loanAmount + totalInterest;
    
// }


// //display results - view function
// function displayResults(months, tMP){
//     let displayItem = "";
//     let displaytMP = document.getElementById("displayMonthlyPayment");
//     for (let index = 0; index < months.length; index++) {
//         let month = months[index];
//         displayItem += `<tr><td>${month}</td></tr>`;
//     }

//     document.getElementById("results").innerHTML = displayItem;
//     displaytMP.innerHTML = `$${tMP}`;
    
// }