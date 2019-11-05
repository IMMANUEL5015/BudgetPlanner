//Enter Budget Amount
var budgetAmount;
$('#budget input[type="number"]').keypress(function(event){
    if(event.which === 13){
        if($(this).val() >= 1){
            budgetAmount = $(this).val();
            $('#figure1').text(budgetAmount); 
            $(this).val('');
        }
    }
    event.stopPropagation();
});

//Enter Expenses Details
var expenses = new Array();
$('#expense button').click(function(e){
    var expenseName = $('#expense input[type="text"]').val();
    var expenseAmount = $('#expense input[type="number"]').val();
    if(expenseName !== '' && expenseAmount != 0){
        expenses.push({title: expenseName, amount: parseInt(expenseAmount)});
        var newRow = "<tr>" + "<td>" + expenseName + "</td>" + "<td>" + expenseAmount + "</td>" + "<td>" + "Edit" + "</td>" + "<td>" + "Delete" + "</td>" + "</tr>";
        $('table tbody').append(newRow);
    }
    $('#expense input[type="text"]').val('');  
    $('#expense input[type="number"]').val('');
    e.stopPropagation();
});

//Calculate Balance
var balance;
var expensesSum = 0;
$('#calcBalance button').on("click", function(e){
    expensesSum = 0;
    expenses.forEach(function(expense){
        expensesSum+=expense.amount;
    });
    balance = parseInt(budgetAmount) - expensesSum;
    $('#thirdReport #figure3').text(balance);
    e.stopPropagation();
});