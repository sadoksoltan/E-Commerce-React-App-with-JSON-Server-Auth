# E-Commerce-React-App-with-JSON-Server-Auth ++++++++++++
Description:


This project is an e-commerce application developed using React and JSON Server for server-side data management. It includes features such as user authentication, cart management, form validation, and route protection. Here is an overview of the main features:



User Authentication--> Users can sign up and log in to access their profile and make purchases.



Cart Management-->Users can add, update, and remove products from their shopping cart.



Form Validation-->The registration and contact forms have validations to ensure correct data entry.




Contact Management (for administrators)->Administrators can view the list of contacts submitted through the contact form.




Order Overview--> Users can see a summary of their order, enter their address, and choose their payment method before placing an order.



The project is structured using React best development practices, with a modular architecture and reusable components. It is accompanied by detailed documentation and an installation guide to facilitate project setup and understanding.



+To get started with the project, follow these steps:



+Clone the GitHub repository-->git clone https://github.com/sadoksoltan/E-Commerce-React-App-with-JSON-Server-Auth



+Navigate to the project directory --> cd E-Commerce-React-App-with-JSON-Server-Auth



+Install client-side dependencies--> npm install



+Install JSON Server globally (if not already installed)--> npm install -g json-server json-server-auth



+Start JSON Server to simulate a REST API--> json-server --watch db.json --port 3005



+In another terminal, start the React application-->npm start 



-->json-server-auth db.json --port 3005 -r routes.json



+Don't forget to create the db.json and routes.json files before running json-server-auth. These files are used by json-server-auth to store user data and define the API routes. Make sure to include these files in your project and configure them correctly before launching json-server-auth
