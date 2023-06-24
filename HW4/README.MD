# Dynamic Multiplication Table Update Documentation
This update to the application introduces new functionalities and improves existing ones, thereby enhancing user interaction and efficiency. The additional features include the implementation of jQuery functions like a slider interface, form validation, a tabbed interface for saving tables, and tab deletion.

## New Features

# Slider Interface
The update implements a slider interface to provide users with an interactive and intuitive way of setting the minimum and maximum values for both rows and columns. The slider functionality is facilitated by two key functions:

1. initializeSliders(): This function is designed to set up user interface sliders. It establishes initial values, sets the minimum/maximum limits, and determines the actions triggered by slider movements.

2. linkInputsToSliders(): This function connects sliders to their respective input fields. If a user changes the slider value, the corresponding input field is automatically updated.

# Enhanced Form Validation
Building on the existing input validation, the update employs the jQuery Validation plug-in to enhance the form validation process. The formValidation() function sets up validation rules for a form, specifying required fields, acceptable input ranges, and other validation criteria. Once validated, it displays predefined messages related to the specific fields, ensuring a consistent user experience.

# Tabbed Interface
In this update, a tab section has been incorporated which interacts with the save and delete table functionalities:

'$("#tabs").tabs(): This jQuery UI tabs widget is used to initialize HTML elements with the ID 'tabs', creating a tabbed interface where each tab corresponds to a different saved multiplication table. Upon pressing the 'Save Table' button, the current table is saved to the corresponding tab.

# Deletion of Saved Tables
For added flexibility and to manage the storage, users are now allowed to delete saved multiplication tables from their respective tabs. This deletion function ensures users have full control over the saved tables.

## Updated Usage Instructions

1. Set the minimum and maximum values for both rows and columns using the sliders or by typing into the provided fields.
2. Click on the "Generate" button to display the multiplication table.
3. To save the current table, press the 'Save Table' button. The table will be saved to a new tab.
4. Navigate through the saved tables using the tabs.
5. To delete a saved table, navigate to the corresponding tab and click the 'Delete Table' button.
6. Use the "previous", "next", "up", and "down" buttons (or the respective arrow keys) to navigate through the table.
7. Enjoy exploring the multiplication landscape with the enhanced Dynamic Multiplication Table application!


## GitHub Repository  
Application URL: https://danchoy.github.io/HW4/pages  
GitHub Repository: [link to my Github repository](https://danchoy.github.io/HW4/pages/)
