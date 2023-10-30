function getLoanValue() {

    let loanAmount = document.getElementById('loanAmount').value;
    let months = document.getElementById('months').value;
    let interestRate = document.getElementById('interestRate').value;

    amount = parseInt(loanAmount);
    term = parseInt(months);
    rate = parseFloat(interestRate);

    let tableBody = document.getElementById('tableBody');
    let tableRow = tableBody.querySelectorAll('tr');

    if (tableRow.length > 0) {
        deleteRow(tableBody, tableRow);
    }
    
    if (isNaN(amount) || isNaN(term) || isNaN(rate)){
        let entry = false;
        return error(entry);
    } else if (amount < 0 || term < 0 || rate < 0) {
        let entry = true;
        return error(entry);
    }
    let loanTotal = calcLoanTotal(amount, term, rate);
    displayLoanTotal(loanTotal);

    let loanMonthly = calcLoanMonthly(loanTotal.monthlyPayment, term, amount, rate);
    displayLoanMonthly(loanMonthly);

}

function calcLoanTotal(amount, term, rate) {
    /*Total Monthly Payment = (amount loaned) * (rate / 1200) / ( 1 - (1 + rate/1200)^(-Number of Months) )*/
    let monthlyPayment = amount * (rate / 1200) / (1 - Math.pow(1 + rate / 1200, -term));
    let totalCost = monthlyPayment * term;
    let totalInterest = totalCost - amount;

    let total = {
        monthlyPayment, totalCost, totalInterest, amount
    }

    return total;
}

function displayLoanTotal(loanTotal) {

    const formatOptions = {
        style: 'currency',
        currency: 'USD',
    };
    document.querySelector('#card-monthlyPayment').textContent = loanTotal.monthlyPayment.toLocaleString('en-US', formatOptions);
    document.querySelector('#card-principal').textContent = loanTotal.amount.toLocaleString('en-US', formatOptions);
    document.querySelector('#card-totalInterest').textContent = loanTotal.totalInterest.toLocaleString('en-US', formatOptions);
    document.querySelector('#card-totalCost').textContent = loanTotal.totalCost.toLocaleString('en-US', formatOptions);

}

function calcLoanMonthly(monthlyPayment, term, amount, rate) {

    let remainingBalance = amount;
    let totalInterest = 0;
    let loanMonthly = [];

    for (let n = 1; n <= term; n++) {

        let interestPayment = remainingBalance * (rate / 1200);
        let principalPayment = monthlyPayment - interestPayment;

        remainingBalance -= principalPayment;
        totalInterest += interestPayment;

        let results = {
            month: n,
            payment: monthlyPayment,
            principal: principalPayment,
            interest: interestPayment,
            totalInterest: totalInterest,
            balance: remainingBalance,
        };
        loanMonthly.push(results)
    }
    return loanMonthly;

}

function displayLoanMonthly(LoanMonthly) {

    const formatOptions = {
        style: 'currency',
        currency: 'USD'
    };
    const tableRowTemplate = document.getElementById('table-template');
    let tableBody = document.getElementById('tableBody');    

    for (let i = 0; i < LoanMonthly.length; i++) {
        let tableRow = tableRowTemplate.content.cloneNode(true);
        let tableCell = tableRow.querySelectorAll('td');

        tableCell[0].textContent = LoanMonthly[i].month;
        tableCell[1].textContent = LoanMonthly[i].payment.toLocaleString('en-US', formatOptions);
        tableCell[2].textContent = LoanMonthly[i].principal.toLocaleString('en-US', formatOptions);
        tableCell[3].textContent = LoanMonthly[i].interest.toLocaleString('en-US', formatOptions);
        tableCell[4].textContent = LoanMonthly[i].totalInterest.toLocaleString('en-US', formatOptions);
        tableCell[5].textContent = Math.abs(LoanMonthly[i].balance).toLocaleString('en-US', formatOptions);
        tableBody.appendChild(tableRow);
    };
}

function deleteRow(table, row) {
    for(let i = 0; i < row.length; i++)
    table.deleteRow(0);
  }

function error(entry) {

    const formatOptions = {
        style: 'currency',
        currency: 'USD',
    };

    document.querySelector('#card-monthlyPayment').textContent = 0.00.toLocaleString('en-US', formatOptions);
    document.querySelector('#card-principal').textContent = 0.00.toLocaleString('en-US', formatOptions);
    document.querySelector('#card-totalInterest').textContent = 0.00.toLocaleString('en-US', formatOptions);
    document.querySelector('#card-totalCost').textContent = 0.00.toLocaleString('en-US', formatOptions);
    if (entry = false) {
        Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: "Make sure that all entries is fill up Properly"
        });
    } else if (entry = true) {
        return Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: "Make sure that none of entries is less than zero"
        });
    }
}