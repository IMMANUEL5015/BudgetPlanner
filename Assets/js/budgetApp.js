//Enter Budget Amount
var budgetAmount = 0;

//Calculate Balance
var balance;
$('#calcBalance button').on("click", function(e){
    var budgetEntry = $('#budget input[type="number"]').val();
    if(budgetEntry >= 1){
        budgetAmount = budgetEntry
        $('#figure1').text(budgetAmount); 
        $('#budget input[type="number"]').val('');
    }
    calcExpenses();
    calcBalance();
    e.stopPropagation();
});

//Declare the function to Calculate Balance
function calcBalance(){
    balance = parseInt(budgetAmount) - expensesSum;
    $('#thirdReport #figure3').text(balance);
}


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
            var newRow = "<tr>" + "<td>" + expenseName + "</td>" + "<td>" + expenseAmount + "</td>" + "<td class='edit'>" + "<i class='fa fa-pencil-square-o' aria-hidden=\"true\"></i>" + "</td>" + "<td class='delete'>" + "<i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>" + "</td>" + "</tr>";
            $('table tbody').append(newRow);
        }else if($(this).text() === 'Update'){
            if(expenseToBeEdited){
                var newExpense = "<td>" + expenseName + "</td>" + "<td>" + expenseAmount + "</td>" + "<td class='edit'>" + "<i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>" + "</td>" + "<td class='delete'>" + "<i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>" + "</td>";
                expenseToBeEdited.parent().html(newExpense);
                expenses[IndexOfExpenseToBeEdited] = {title: expenseName, amount: parseInt(expenseAmount)}; 
            }                     
        }
    }
    $('#expense input[type="text"]').val('');  
    $('#expense input[type="number"]').val('');
    $(this).text('Add Expense');
    calcExpenses();
    calcBalance();
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
     IndexOfExpenseToBeEdited = null;
     expenseToBeEdited = undefined;
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
