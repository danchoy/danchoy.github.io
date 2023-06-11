let currentPage = 0;
const itemsPerPage = 50; 
let minRowValue, maxRowValue, minColumnValue, maxColumnValue;

document.getElementById('user-input-form').addEventListener('submit', function(e) {
    e.preventDefault();

    minColumnValue = Number(document.getElementById('min-column').value);
    maxColumnValue = Number(document.getElementById('max-column').value);
    minRowValue = Number(document.getElementById('min-row').value);
    maxRowValue = Number(document.getElementById('max-row').value);

    if (isNaN(minColumnValue) || isNaN(maxColumnValue) || isNaN(minRowValue) || isNaN(maxRowValue)) {
        document.getElementById('error-message').innerText = "Please enter valid integer numbers.";
    } else {
        document.getElementById('error-message').innerText = "";
        currentPage = 0;
        displayTable();
    }
});

document.getElementById('next-button').addEventListener('click', function() {
    currentPage++;
    displayTable();
});

document.getElementById('prev-button').addEventListener('click', function() {
    currentPage--;
    displayTable();
});

function displayTable() {
    let startValue = minRowValue + currentPage * itemsPerPage;
    let endValue = Math.min(startValue + itemsPerPage, Math.max(maxRowValue, maxColumnValue) + 1);

    let tableHtml = '<tr><td class="first-row"></td>';
    for (let j = startValue; j < endValue; j++) {
        tableHtml += '<td class="first-row">' + j + '</td>';
    }
    tableHtml += '</tr>';

    for(let i = startValue; i < endValue; i++) {
        tableHtml += '<tr><td class="first-column">' + i + '</td>';
        for(let j = startValue; j < endValue; j++) {
            tableHtml += '<td>' + (i * j) + '</td>';
        }
        tableHtml += '</tr>';
    }

    document.getElementById('multiplication-table').innerHTML = tableHtml;

    document.getElementById('prev-button').disabled = currentPage <= 0;
    document.getElementById('next-button').disabled = endValue >= Math.max(maxRowValue, maxColumnValue);
}
