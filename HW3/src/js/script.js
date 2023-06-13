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
var currentColumnPage = 0;
var currentRowPage = 0;
const itemsPerPage = 50;                  // Number of items displayed per page
var minRowValue, maxRowValue, minColumnValue, maxColumnValue;
var colorScheme;                          // Declare colorScheme variable here
var oddButtonState = false;               // initial state
var evenButtonState = false;              // initial state

var oddButton = document.getElementById('odd');
var evenButton = document.getElementById('even');

oddButton.disabled = true;
evenButton.disabled = true;

// Listen for form submission to set the min and max values
document.getElementById('user-input-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Extract user-defined values
  minColumnValue = Math.round(Number(document.getElementById('min-column').value));
  maxColumnValue = Math.round(Number(document.getElementById('max-column').value));
  minRowValue = Math.round(Number(document.getElementById('min-row').value));
  maxRowValue = Math.round(Number(document.getElementById('max-row').value));

  // Validate the input values
  if (isNaN(minColumnValue) || isNaN(maxColumnValue) || isNaN(minRowValue) || isNaN(maxRowValue) ||
    minColumnValue < -1000000 || minColumnValue > 1000000 || 
    maxColumnValue < -1000000 || maxColumnValue > 1000000 || 
    minRowValue < -1000000 || minRowValue > 1000000 || 
    maxRowValue < -1000000 || maxRowValue > 1000000) {
    document.getElementById('error-message').innerText = "Please enter valid integer numbers.";
  } else {
    if (minColumnValue > maxColumnValue) {
      let temp = minColumnValue;
      minColumnValue = maxColumnValue;
      maxColumnValue = temp;
    }
    if (minRowValue > maxRowValue) {
      let temp = minRowValue;
      minRowValue = maxRowValue;
      maxRowValue = temp;
    }

    colorScheme = null;                     // Reset color scheme
    currentColumnPage = 0;  
    currentRowPage = 0;  
    displayTable();  

    document.getElementById('error-message').innerText = "";
    
    // Enable the 'odd' and 'even' buttons after form submission
    oddButton.disabled = false;
    evenButton.disabled = false;
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

document.getElementById('odd').addEventListener('click', function() {
  evenButtonState = false;                  // Always reset the state of the other button
  oddButtonState = !oddButtonState;         // toggle state
  if (oddButtonState) {
    colorScheme = 'odd';
  } else {
    colorScheme = null;                     // reset color scheme
  }
  displayTable();
});

document.getElementById('even').addEventListener('click', function() {
  oddButtonState = false;
  evenButtonState = !evenButtonState;       // toggle state
  if (evenButtonState) {
    colorScheme = 'even';
  } else {
    colorScheme = null;                     // reset color scheme
  }
  displayTable();
});

// Function to generate and display the table
function displayTable() {
  // Determine the start and end values for the current page
  var columnStartValue = minColumnValue + currentColumnPage * itemsPerPage;
  var columnEndValue = Math.min(columnStartValue + itemsPerPage - 1, maxColumnValue);
  var rowStartValue = minRowValue + currentRowPage * itemsPerPage;
  var rowEndValue = Math.min(rowStartValue + itemsPerPage - 1, maxRowValue);

  // Calculate the total number of pages
  var columnPages = Math.ceil((maxColumnValue - minColumnValue + 1) / itemsPerPage);
  var rowPages = Math.ceil((maxRowValue - minRowValue + 1) / itemsPerPage);

  // Enable or disable navigation buttons based on the current page and the total number of pages
  document.getElementById('prev-button').disabled = (currentColumnPage <= 0);
  document.getElementById('next-button').disabled = (currentColumnPage >= columnPages - 1);
  document.getElementById('up-button').disabled = (currentRowPage <= 0);
  document.getElementById('down-button').disabled = (currentRowPage >= rowPages - 1);

  // Generate the table HTML
  var tableHtml = "<table><tr><td></td>";
  for (let i = columnStartValue; i <= columnEndValue; i++) {
    tableHtml += "<td>" + i + "</td>";
  }
  tableHtml += "</tr>";
  for (let i = rowStartValue; i <= rowEndValue; i++) {
    tableHtml += "<tr><td>" + i + "</td>";
    for (let j = columnStartValue; j <= columnEndValue; j++) {
      tableHtml += "<td>" + i * j + "</td>";
    }
    tableHtml += "</tr>";
  }
  tableHtml += "</table>";

  // Update the table's HTML
  document.getElementById('multiplication-table').innerHTML = tableHtml;
  
  // Call colorCells function after the table is updated
  if (colorScheme) {
    setTimeout(() => {
      colorCells(colorScheme);
    }, 0);
  }
}

// Function to color the cells based on their type
function colorCells(type) {
  var cells = document.getElementById('multiplication-table').getElementsByTagName('td');

  // Clear the existing colors
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove('odd');
    cells[i].classList.remove('even');
  }

  // Color the cells based on the type
  if (type === 'odd') {
    for (let i = 0; i < cells.length; i++) {
      if (!isNaN(cells[i].innerText) && cells[i].innerText % 2 !== 0) {
        cells[i].classList.add('odd');
      }
    }
  } else if (type === 'even') {
    for (let i = 0; i < cells.length; i++) {
      if (!isNaN(cells[i].innerText) && cells[i].innerText % 2 === 0) {
        cells[i].classList.add('even');
      }
    }
  }
}

// Listen for mouseover and mouseout events to handle keyboard navigation
var multiplicationTable = document.getElementById('multiplication-table');
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
