let currentColumnPage = 0;
let currentRowPage = 0;
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
    currentColumnPage = 0;
    currentRowPage = 0;
    displayTable();
  }
});

document.getElementById('next-button').addEventListener('click', function() {
  currentColumnPage++;
  displayTable();
});

document.getElementById('prev-button').addEventListener('click', function() {
  currentColumnPage--;
  displayTable();
});

document.getElementById('up-button').addEventListener('click', function() {
  currentRowPage--;
  displayTable();
});

document.getElementById('down-button').addEventListener('click', function() {
  currentRowPage++;
  displayTable();
});

function displayTable() {
  let columnStartValue = minColumnValue + currentColumnPage * itemsPerPage;
  let columnEndValue = Math.min(columnStartValue + itemsPerPage, maxColumnValue + 1);
  
  let rowStartValue = minRowValue + currentRowPage * itemsPerPage;
  let rowEndValue = Math.min(rowStartValue + itemsPerPage, maxRowValue + 1);

  let tableHtml = '<tr><td class="first-row"></td>';
  for (let j = columnStartValue; j < columnEndValue; j++) {
    tableHtml += '<td class="first-row">' + j + '</td>';
  }
  tableHtml += '</tr>';

  for(let i = rowStartValue; i < rowEndValue; i++) {
    tableHtml += '<tr><td class="first-column">' + i + '</td>';
    for(let j = columnStartValue; j < columnEndValue; j++) {
      tableHtml += '<td>' + (i * j) + '</td>';
    }
    tableHtml += '</tr>';
  }

  document.getElementById('multiplication-table').innerHTML = tableHtml;

  document.getElementById('prev-button').disabled = currentColumnPage <= 0;
  document.getElementById('next-button').disabled = columnEndValue >= maxColumnValue;
  document.getElementById('up-button').disabled = currentRowPage <= 0;
  document.getElementById('down-button').disabled = rowEndValue >= maxRowValue;
}
