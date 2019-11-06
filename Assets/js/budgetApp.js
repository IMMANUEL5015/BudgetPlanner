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
var expensesSum = 0;
var expenses = new Array();
$('#expense button').click(function(e){
    expensesSum = 0;
    var expenseName = $('#expense input[type="text"]').val();
    var expenseAmount = $('#expense input[type="number"]').val();
    if(expenseName !== '' && expenseAmount != 0){
        expenses.push({title: expenseName, amount: parseInt(expenseAmount)});
        var newRow = "<tr>" + "<td>" + expenseName + "</td>" + "<td>" + expenseAmount + "</td>" + "<td class='edit'>" + "Edit" + "</td>" + "<td class='delete'>" + "Delete" + "</td>" + "</tr>";
        $('table tbody').append(newRow);
        $('#expense input[type="text"]').val('');  
        $('#expense input[type="number"]').val('');
    }
    calcExpenses();
    e.stopPropagation();
});

//Declare the function to Calculate Expenses
function calcExpenses(){
    expenses.forEach(function(expense){
        expensesSum+=expense.amount;
    });
    $('#secondReport #figure2').text(expensesSum);
}

//Calculate Balance
var balance;
$('#calcBalance button').on("click", function(e){
    expensesSum = 0;
    calcExpenses();
    calcBalance();
    e.stopPropagation();
});

//Declare the function to Calculate Balance
function calcBalance(){
    balance = parseInt(budgetAmount) - expensesSum;
    $('#thirdReport #figure3').text(balance);
}

//Edit Expenses
$('.edit').click(function(){
    $(this).parent()
});


//Delete Expenses
$('tbody').on('click','.delete', function(){
    expensesSum = 0;
     for(var i = 0; i < expenses.length; i++){
        if($(this).parent().text().indexOf(expenses[i].title) !== -1){
            expenses.splice(i, 1);
            $(this).parent().remove();
        }
     } 
    calcExpenses();
    calcBalance();
});
