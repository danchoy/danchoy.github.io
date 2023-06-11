/*
 * Author: Dan Choy
 * Contact: yatshing_choy@student.uml.edu
 * Source: 
 * https://www.youtube.com/watch?v=vEROU2XtPR8
 * https://www.dropbox.com/s/9k0r4cqv5kdsu8u/hw6_grader_lecture.m4v?dl=0
 * 
 * 
 * This script allows users to navigate through a dynamic multiplication table
 * with settable boundaries and pagination.
 */

// Initialize navigation variables
let currentColumnPage = 0;
let currentRowPage = 0;
const itemsPerPage = 50; // Number of items displayed per page
let minRowValue, maxRowValue, minColumnValue, maxColumnValue;

// Listen for form submission to set the min and max values
document.getElementById('user-input-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Extract user-defined values
  minColumnValue = Number(document.getElementById('min-column').value);
  maxColumnValue = Number(document.getElementById('max-column').value);
  minRowValue = Number(document.getElementById('min-row').value);
  maxRowValue = Number(document.getElementById('max-row').value);

  // Validate the input values
  if (isNaN(minColumnValue) || isNaN(maxColumnValue) || isNaN(minRowValue) || isNaN(maxRowValue)) {
    document.getElementById('error-message').innerText = "Please enter valid integer numbers.";
  } else {
    document.getElementById('error-message').innerText = "";
    currentColumnPage = 0;
    currentRowPage = 0;
    displayTable(); // Display the initial table after setting boundaries
  }
});

// Listen for button clicks to navigate through the table
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

// Function to generate and display the table
function displayTable() {
  // Determine the start and end values for the current page
  let columnStartValue = minColumnValue + currentColumnPage * itemsPerPage;
  let columnEndValue = Math.min(columnStartValue + itemsPerPage, maxColumnValue + 1);
  
  let rowStartValue = minRowValue + currentRowPage * itemsPerPage;
  let rowEndValue = Math.min(rowStartValue + itemsPerPage, maxRowValue + 1);

  // Generate the HTML for the table
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

  // Update the table's HTML
  document.getElementById('multiplication-table').innerHTML = tableHtml;

  // Disable or enable navigation buttons based on current page
  document.getElementById('prev-button').disabled = currentColumnPage <= 0;
  document.getElementById('next-button').disabled = columnEndValue >= maxColumnValue;
  document.getElementById('up-button').disabled = currentRowPage <= 0;
  document.getElementById('down-button').disabled = rowEndValue >= maxRowValue;
}

// Listen for mouseover and mouseout events to handle keyboard navigation
let multiplicationTable = document.getElementById('multiplication-table');
multiplicationTable.addEventListener('mouseover', function() {
  window.addEventListener('keydown', handleKeydown); // Enable keyboard navigation
});
multiplicationTable.addEventListener('mouseout', function() {
  window.removeEventListener('keydown', handleKeydown); // Disable keyboard navigation
});

// Function to handle keyboard navigation
function handleKeydown(e) {
  // Navigate based on the arrow key pressed
  switch(e.key) {
    case 'ArrowRight':
      document.getElementById('next-button').click();
      break;
    case 'ArrowLeft':
      document.getElementById('prev-button').click();
      break;
    case 'ArrowUp':
      document.getElementById('up-button').click();
      break;
    case 'ArrowDown':
      document.getElementById('down-button').click();
      break;
  }
}
