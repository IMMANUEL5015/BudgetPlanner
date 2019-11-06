//Enter Budget Amount
var budgetAmount = 0;
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
var IndexOfExpenseToBeEdited = 0;
var expenseToBeEdited;
$('#expense button').click(function(e){
    var expenseName = $('#expense input[type="text"]').val();
    var expenseAmount = $('#expense input[type="number"]').val();
    if(expenseName !== '' && expenseAmount > 0){
        if($(this).text() === 'Add Expense'){
            expenses.push({title: expenseName, amount: parseInt(expenseAmount)});
            var newRow = "<tr>" + "<td>" + expenseName + "</td>" + "<td>" + expenseAmount + "</td>" + "<td class='edit'>" + "Edit" + "</td>" + "<td class='delete'>" + "Delete" + "</td>" + "</tr>";
            $('table tbody').append(newRow);
        }else if($(this).text() === 'Update'){
            var newExpense = "<td>" + expenseName + "</td>" + "<td>" + expenseAmount + "</td>" + "<td class='edit'>" + "Edit" + "</td>" + "<td class='delete'>" + "Delete" + "</td>";
           expenseToBeEdited.parent().html(newExpense);
           expenses[IndexOfExpenseToBeEdited] = {title: expenseName, amount: parseInt(expenseAmount)}                      
        }
    }
    $('#expense input[type="text"]').val('');  
    $('#expense input[type="number"]').val('');
    $(this).text('Add Expense');
    calcExpenses();
    e.stopPropagation();
});

//Declare the function to Calculate Expenses
function calcExpenses(){
    expensesSum = 0;
    expenses.forEach(function(expense){
        expensesSum+=expense.amount;
    });
    $('#secondReport #figure2').text(expensesSum);
}

//Calculate Balance
var balance;
$('#calcBalance button').on("click", function(e){
    calcExpenses();
    calcBalance();
    e.stopPropagation();
});

//Declare the function to Calculate Balance
function calcBalance(){
    balance = parseInt(budgetAmount) - expensesSum;
    $('#thirdReport #figure3').text(balance);
}


//Delete Expenses
$('tbody').on('click','.delete', function(){
    deleteExpense($(this)); 
    calcExpenses();
    calcBalance();
});

//Declaring but not calling the function for deleting expenses
function deleteExpense(el){
    for(var i = 0; i < expenses.length; i++){
        if(el.parent().text().indexOf(expenses[i].title) !== -1){
            expenses.splice(i, 1);
            el.parent().remove();
        }
     }
}

//Edit Expenses
$('tbody').on('click', '.edit', function(){
    $('#expense button').text('Update');
    for(var i = 0; i < expenses.length; i++){
        if($(this).parent().text().indexOf(expenses[i].title) !== -1){
            $('#expense input[type="text"]').val(expenses[i].title);  
            $('#expense input[type="number"]').val(expenses[i].amount);
            IndexOfExpenseToBeEdited = i;
            expenseToBeEdited = $(this);
        }
    }
    calcExpenses();
    calcBalance();
});
