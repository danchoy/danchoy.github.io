# Dynamic Multiplication Table
This application is a web-based tool for generating and displaying a dynamic multiplication table. The main functionality is provided through a JavaScript file (script.js) and the user interface is styled with a CSS file (main.css).

## Features

# User-Input Configuration
The application accommodates user inputs for the minimum and maximum values for both rows and columns. The user can define the scope of the multiplication table, with the freedom to choose any range of real numbers.

# Dynamic Table Generation
Upon receiving user inputs, the application generates a multiplication table that reflects the specified range. This dynamic feature allows users to view and understand multiplication concepts at their own pace and level.

# Efficient Handling of Large Inputs
The application is designed to handle large number inputs efficiently. It divides the multiplication table into pages, with each page containing up to 2500 cells (50 rows * 50 columns). This compartmentalization prevents potential browser crashes from trying to render an overwhelming amount of data simultaneously.

# Input Validation
The application includes a comprehensive validation feature that maintains the quality of user inputs. While it's engineered to generate the multiplication table based on integer values, it is flexible enough to accommodate decimal number inputs. In the event of a decimal number input, the application smartly rounds it to the nearest whole number, thus ensuring the generation of a consistent and accurate multiplication table. There's no disruption to the user experience since the application manages this internally without displaying an error message.

# Keyboard Navigation
The application supports keyboard navigation for user-friendly interaction. The "previous" and "next" buttons can be used to navigate through the columns, while the "up" and "down" buttons allow vertical navigation through the rows. To further enhance usability, these functionalities are also mapped to the left, right, up, and down arrow keys respectively.

## How to Use
1. Input the minimum and maximum values for both rows and columns in the provided fields.
2. Click on the "Generate" button to display the multiplication table.
3. Use the "previous", "next", "up", and "down" buttons (or the respective arrow keys) to navigate through the table.
4. Enjoy exploring the multiplication landscape with the Dynamic Multiplication Table application!

## GitHub Repository  
Application URL: https://danchoy.github.io/HW3/pages  
GitHub Repository: [link to my Github repository](https://danchoy.github.io/HW3/pages/)
