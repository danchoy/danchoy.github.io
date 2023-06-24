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
 * 
 * 
 * In this new implementation, I'm employing jQuery to develop various functions, including slider functionality, 
 * form validation, saving tables, and tab deletion. These are designed to ensure that our website runs smoothly 
 * and provides a robust user experience.
 * 
 * To avoid running into issues while manipulating elements that may not have been created yet, I'm utilizing the 
 * jQuery event method to confirm that the entire document is fully loaded before the enclosed functions are 
 * executed.
 * 
 * The slider functionality is accomplished through two key functions:
 * 1.) initializeSliders(): This function is designed to set up user interface sliders. Although the specific
 * configurations for these sliders are not provided here, the function typically establishes initial values, sets 
 * the minimum/maximum limits, and determines the actions triggered by slider movements.
 * 
 * 2.) linkInputsToSliders(): This function is responsible for connecting sliders to their respective input
 * fields. If a user changes the slider value, the corresponding input field is updated automatically.
 * 
 * 
 * For form validation, I'm using the jQuery Validation plug-in. The formValidation() function sets up validation
 * rules for a form, specifying required fields, acceptable input ranges, and other validation criteria. Once
 * validated, it displays predefined messages related to the specific fields.
 * 
 * 
 * Finally, I've incorporated a tab section that interacts with the saveTable and deleteTab functions:
 * $("#tabs").tabs(): This line of code uses the jQuery UI tabs widget to initialize HTML elements with the id
 * 'tabs'. This facilitates the creation of a tabbed interface, where each tab correlates with a different section
 * of the webpage's content. Upon pressing the 'Save Table' button, the current table is saved to the
 * corresponding tab.
 */

// Initialize navigation variables
var currentColumnPage = 0;
var currentRowPage = 0;
const itemsPerPage = 15;                  // Number of items displayed per page
var minRowValue = 0, maxRowValue = 0, minColumnValue = 0, maxColumnValue = 0;
var colorScheme;                          // Declare colorScheme variable here
var oddButtonState = false;               // initial state
var evenButtonState = false;              // initial state
var num_tabs = 0;

var oddButton = document.getElementById('odd');
var evenButton = document.getElementById('even');

oddButton.disabled = true;
evenButton.disabled = true;

// jQuery event method 
$(document).ready(function () {
  initializeSliders();
  linkInputsToSliders();
  formValidation();
  $("#tabs").tabs();

});

  // Initialize the sliders and link them to their input fields
function initializeSliders() {
  $("#slider-min-column").slider({
    min: -50,
    max: 50,
    step: 1,
    value: 0,
    slide: function(event, ui) {
      $("#min-column").val(ui.value).trigger('input');
      minColumnValue = Number($("#min-column").val());
      $("#user-input-form").valid();
      displayTable();
    }
  });

  $("#slider-max-column").slider({
    min: -50,
    max: 50,
    step: 1,
    value: 0,
    slide: function(event, ui) {
      $("#max-column").val(ui.value).trigger('input');
      maxColumnValue = Number($("#max-column").val());;
      $("#user-input-form").valid();
      displayTable();
    }
  });

  $("#slider-min-row").slider({
    min: -50,
    max: 50,
    step: 1,
    value: 0,
    slide: function(event, ui) {
      $("#min-row").val(ui.value).trigger('input');
      minRowValue = Number($("#min-row").val());;
      $("#user-input-form").valid();
      displayTable();
    }
  });

  $("#slider-max-row").slider({
    min: -50,
    max: 50,
    step: 1,
    value: 0,
    slide: function(event, ui) {
      $("#max-row").val(ui.value).trigger('input');
      maxRowValue = Number($("#max-row").val());; 
      $("#user-input-form").valid();
      displayTable();
    }
  });
}

// Link the input fields to their sliders
function linkInputsToSliders() {
  $("#min-column").on("input", function() {
    $("#slider-min-column").slider("value", this.value);
    displayTable();
  });

  $("#max-column").on("input", function() {
    $("#slider-max-column").slider("value", this.value);
    displayTable();
  });

  $("#min-row").on("input", function() {
    $("#slider-min-row").slider("value", this.value);
    displayTable();
  });

  $("#max-row").on("input", function() {
    $("#slider-max-row").slider("value", this.value);
    displayTable();
  });
}

// Define function by using jQuery validation plug-in 
function formValidation() {
  $.validator.addMethod("lessThanEqual", function(value, element, param) {
    var target = $(param[0]);
    if (this.settings.onfocusout) {
        target.off(".validate-lessThanEqual").on("blur.validate-lessThanEqual", function() {
            $(element).valid();
        });
    }
    return parseInt(value) <= parseInt(target.val());
  }, "Must be less than or equal to {0}");


  $("#user-input-form").validate({
    rules: {
      "min-column": {
        required: true,
        number: true,
        range: [-50, 50],
        lessThanEqual: ['#max-column'],
      },
      "max-column": {
        required: true,
        number: true,
        range: [-50, 50]
      },
      "min-row": {
        required: true,
        number: true,
        range: [-50, 50],
        lessThanEqual: ['#max-row']
      },
      "max-row": {
        required: true,
        number: true,
        range: [-50, 50]
      }
    },
    messages: {
      "min-column": {
        required: "Minimum column value is required.",
        number: "Please enter a valid number.",
        range: "Please enter a number in the range -50 to 50.",
        lessThanEqual: "Minimum column value should be less than or equal to Maximum column value."
      },
      "max-column": {
        required: "Minimum column value is required.",
        number: "Please enter a valid number.",
        range: "Please enter a number in the range -50 to 50.",
      },
      "min-row": {
        required: "Minimum row value is required.",
        number: "Please enter a valid number.",
        range: "Please enter a number in the range -50 to 50.",
        lessThanEqual: "Minimum row value should be less than or equal to Maximum row value."
      },
      "max-row": {
        required: "Minimum column value is required.",
        number: "Please enter a valid number.",
        range: "Please enter a number in the range -50 to 50.",
      }
    },
    errorPlacement: function(error, element) {
      // Adjust the placement of error messages
      error.insertAfter(element);
    }
  });
}

// Listen for form submission to set the min and max values
document.getElementById('user-input-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Extract user-defined values
  minColumnValue = Math.round(Number(document.getElementById('min-column').value));
  maxColumnValue = Math.round(Number(document.getElementById('max-column').value));
  minRowValue = Math.round(Number(document.getElementById('min-row').value));
  maxRowValue = Math.round(Number(document.getElementById('max-row').value));

    if (!$("#user-input-form").valid()) {
      return;
    }

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

    $("#slider-min-column").slider("value", minColumnValue);
    $("#slider-max-column").slider("value", maxColumnValue);
    $("#slider-min-row").slider("value", minRowValue);
    $("#slider-max-row").slider("value", maxRowValue);

    colorScheme = null;                     // Reset color scheme
    currentColumnPage = 0;  
    currentRowPage = 0;  
    displayTable();  

    document.getElementById('error-message').innerText = "";
    
    // Enable the 'odd' and 'even' buttons after form submission
    oddButton.disabled = false;
    evenButton.disabled = false;
  // }
});

// define function to save the current table to the tab
function saveTable() {
  if (!$("#user-input-form").valid()) {
    $('#table-error-message').text('ERROR: Invalid input. Unable to save the current table.');
    return;
  }

  $('#delete-button').removeAttr('disabled')
  
  var tabs = $("#tabs").tabs();
  var ul = tabs.find("#savedTable");
  num_tabs += 1;

  var columnMin = minColumnValue;
  var columnMax = maxColumnValue;
  var rowMin = minRowValue;
  var rowMax = maxRowValue;
  var tabLabel = columnMin + " to " + columnMax + " by " + rowMin + " to " + rowMax;

  var newTab = "<li><a href='#table-" + num_tabs + "'>" + tabLabel + "</a><span class='ui-icon ui-icon-close' role='presentation'></span>" + "<input class='tab-checkbox' type='checkbox' />" + "</li>";
  var data = "<div id='table-" + num_tabs + "'></div>";
  
  $(newTab).appendTo(ul);
  $(data).appendTo(tabs);
  tabs.tabs("refresh");

  $("#tabs").on("click", "span.ui-icon-close", function() {
      var panelId = $(this).closest("li").remove().attr("aria-controls");
      $("#" + panelId).remove();
      tabs.tabs("refresh");
  });

  $('#table-'+num_tabs).append(
    $('#multiplication-table-left').clone()
  )
}
// define function to delete the selected tab(s)
function deleteTabs () {
    

  var selectedTab = document.getElementById("tabs").querySelectorAll("li");


  for(var i=0; i<selectedTab.length; i++){
      
      if(selectedTab[i].children[2].checked) {

          var panelId = selectedTab[i].getAttribute("aria-controls");
          $("#" + panelId).remove();

          selectedTab[i].remove();
      }
  } 
}



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

document.getElementById("save-button").addEventListener("click", saveTable);
document.getElementById("delete-button").addEventListener("click", deleteTabs);


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

  $('#save-button').attr('disabled', false)

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
  
  if(minColumnValue < maxColumnValue || (minColumnValue == 0 && maxColumnValue == 0)){
    for (let i = columnStartValue; i <= columnEndValue; i++) {
      tableHtml += "<td>" + i + "</td>";
    }
  }

  tableHtml += "</tr>";
  
  if(minRowValue < maxRowValue || (minRowValue == 0 && maxRowValue == 0)){
    for (let i = rowStartValue; i <= rowEndValue; i++) {
      tableHtml += "<tr><td>" + i + "</td>";
      for (let j = columnStartValue; j <= columnEndValue; j++) {
        tableHtml += "<td>" + i * j + "</td>";
      }
      tableHtml += "</tr>";
    }
  }

  tableHtml += "</table>";

  // Update the table's HTML
  document.getElementById('multiplication-table-left').innerHTML = tableHtml;
  
  // Call colorCells function after the table is updated
  if (colorScheme) {
    setTimeout(() => {
      colorCells(colorScheme);
    }, 0);
  }
}

// Function to color the cells based on their type
function colorCells(type) {
  var cells = document.getElementById('multiplication-table-left').getElementsByTagName('td');

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
var multiplicationTable = document.getElementById('multiplication-table-left');
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