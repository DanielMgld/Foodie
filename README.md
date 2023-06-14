# Foodie

### Ingredient Shopping List Application
This is a simple application that allows you to view a list of ingredients and build a shopping list. 
Recipe functionality is planned, but not yet implemented.

### Prerequisites
Download the latest version of Node.js and npm.

### Installation
- Install the required dependencies with 'npm install'

- Run the JSON server in the background with 'json-server --watch db.json'

- Start the application using 'npm start'

The app should now be running at http://localhost:4200/.
The server should be running at http://localhost:3000/.
## Usage
### Viewing Ingredients
Click on the "Ingredients" tab in the navigation bar. This will present you with a list of ingredients.

### Adding Items to Cart
While viewing an ingredient, click on the image to open a window to select size and add to cart.

### Viewing and Editing Cart
Click on the "Cart" tab in the navigation bar to view the items in your cart. Increase or decrease a number of an item, or remove an item with 'x'.

### Checking Out
When done with your cart, input your data required. Once you're finished, click on the "Checkout" button. The cart will completely empty out, and it should log your items you had in it.

### Please note
Inside checkout.component.ts, I have used a formsubmit.co form setup to send myself all the information in Checkout. If you plan on testing the code, please remove this part as to not swarm me with forms. Thank you!

### Admin
The admin page is used to Add, Update or Delete Ingredients. To access the page, click on the "Admin" button. A form should pop up: <br>
**Username: admin** <br>
**Password: admin** <br>
Pressing Enter or the button "Submit" should take you to the page.

### db.json
This application uses a JSON server as mock backend. Data is stored in the db.json file. Feel free to modify this file to add, remove or update recipes and ingredients. The changes should show up on refresh.
