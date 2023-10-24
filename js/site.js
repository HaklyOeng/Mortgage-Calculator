function getValues() {
    let loanAmount = document.getElementById('loanAmount').value;
    let months = document.getElementById('months').value;
    let interestRate = document.getElementById('interestRate').value;

    loanAmount = parseInt(loanAmount);
    months = parseInt(months);
    interestRate = parseFloat(interestRate);

    //Total Principle
    document.querySelector('#card-principal').textContent = `$ ${loanAmount.toFixed(2)}`;
    let input = {
        loanAmount: loanAmount,
        term: months,
        rate: interestRate
    }
    /*
    if (isNan(priniciple)) {
        return an error
    } */

    if (Number.isInteger(loanAmount) && Number.isInteger(months) && Number.isInteger(interestRate)) {

        let results = loanCalculate(input);
        displayResults(results);      
    } else if (loanAmount <= 0 && months <= 0 && interestRate <= 0) {
        return Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: "Every entrie can't be 0 or less"
        });
    } else if (loanAmount <= 0 && months > 0 && interestRate > 0) {
        return Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: 'Please check the Loan Amount and enter an amount that is more than $0'
        });
    } else if (months <= 0 && loanAmount > 0 && interestRate > 0) {
        return Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: 'Please check the Term and enter an a time period that is more than 0'
        });
    } else if (interestRate <= 0 && months > 0 && loanAmount > 0) {
        return Swal.fire({
            icon: 'error',
            backdrop: false,
            title: 'Attention',
            text: 'Please check the Interest Rate and enter an a Rate that is more than 0'
        });
    } else {        
        Swal.fire({
            icon: 'error',
            title: 'Attention',
            text: 'Please enter valid numbers.'
        });
    }




}

function loanCalculate(input) {
    let loan = input.loanAmount;
    let months = input.term;
    let rate = input.rate;

    let tableData = document.getElementById('tableBody');
    tableData.innerHTML = '';
    let monthlyPayment = 0;
    let remainingBalance = loan;
    let addingInterest = 0;
    let totalCost = 0;


    for (i = 0; i < months; i++) {

        monthlyPayment = (loan * (rate / 1200) / (1 - Math.pow((1 + rate / 1200), (- months))));
        let interestPayment = (remainingBalance * rate / 1200);
        let principalPayment = (monthlyPayment - interestPayment);

        if (remainingBalance == loan || addingInterest < interestPayment || totalCost < monthlyPayment) {
            remainingBalance = (loan - principalPayment);
            addingInterest = interestPayment;
            totalCost = monthlyPayment;
        } else {
            (remainingBalance - principalPayment);
            addingInterest += interestPayment;
            totalCost += monthlyPayment;
        }



        let tableRow = document.createElement('tr');

        let month = document.createElement('td');
        month.innerText = i + 1;
        tableRow.appendChild(month);

        let payment = document.createElement('td');
        payment.innerText = monthlyPayment.toFixed(2);
        tableRow.appendChild(payment);

        let principal = document.createElement('td');
        principal.innerText = principalPayment.toFixed(2);
        tableRow.appendChild(principal);

        let interest = document.createElement('td');
        interest.innerText = interestPayment.toFixed(2);
        tableRow.appendChild(interest);

        let totalInterest = document.createElement('td');
        totalInterest.innerText = addingInterest.toFixed(2);
        tableRow.appendChild(totalInterest);

        let balance = document.createElement('td');
        balance.innerText = (remainingBalance -= principalPayment).toFixed(2);
        tableRow.appendChild(balance);

        tableData.appendChild(tableRow);

    }
    let results = {
        addingInterest, monthlyPayment, totalCost
    }

    return results;

}

function displayResults(input) {
    let monthlyPayment = input.monthlyPayment.toFixed(2);
    let totalInterest = input.addingInterest.toFixed(2);
    let totalCost = input.totalCost.toFixed(2);
    document.querySelector('#card-monthlyPayment').textContent = `$ ${monthlyPayment}`;
    document.querySelector('#card-totalInterest').textContent = `$ ${totalInterest}`;
    document.querySelector('#card-total').textContent = `$ ${totalCost}`;
}

/*
function displayPayment(paymentsArr) {

    const formatOptions = {
        style = 'currency',
        currency = 'USD'
    };
    const tableRowTemplate = document.getElementById('monthlyPaymentTemplate');

    paymentsArr.forEach(paynebt => {
        let tableRow = tableRowTemplate.content.cloneNode(true);

        let tableCells = tableRow.querrySelectorAll('td'); // give you an array of element

        tableCell[0].textContent = payment.month;
        tableCell[1].textContent = payment.monthlyPayment.toLocalStrong('en-US', formatOptions);
        tableCell[2].textContent = payment.principal;
        tableCell[3].textContent = payment.interest;
        tableCell[4].textContent = payment.totalInterest;
        tableCell[5].textContent = Math.abs(payment.balance);

    })
}
*/