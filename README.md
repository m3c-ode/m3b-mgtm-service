# m3b brewery management system

This app is for now intended to be a personal project showcasing some web development skills as part of my portfolio.

It's a CRUD app using :

- NextJS Meta framework
  - based on ReactJS
- Coded in TypeScript
- Connected to a MongoDB Database.

It's still under progress, as many features could be added.
It has the potential to be a dedicated end-to-end solution for this type of industry.

## Screenshots

- Products table
  ![Products-table](https://github.com/m3c-ode/m3b-mgtm-service/blob/main/documents/screenshots/m3b-bms-1.png)
- New product creation - step form
  ![New-product-form](https://github.com/m3c-ode/m3b-mgtm-service/blob/main/documents/screenshots/m3b-bms-2.png)
- Delivery instructions with Google Maps API integration
  ![Delivery-page](https://github.com/m3c-ode/m3b-mgtm-service/blob/main/documents/screenshots/m3b-bms-3.png)
- Client management table
  ![Clients-table](https://github.com/m3c-ode/m3b-mgtm-service/blob/main/documents/screenshots/m3b-bms-4.png)

## Deployment

---

This app will be deployed thanks to the vercel platform, clicking on this link:
[https://m3b-mgtm-service.vercel.app/](https://m3b-mgtm-service.vercel.app/)

## Installation

---

To run this app locally, you would need to clone the project then run those commands:

> `npm install`

- To install the dependencies

> `npm run dev`

- Then run the project

The project will run on `localhost:3000/`

However, currently, you would not have access to the database's data. Using the deployment link, you'll be able to interact with the database. We recommend usign the deployed link for now.

## Current Features

---

- Authentication and Authorization with Users management
  - You may start the application as the app Administrator to have access to all the app's features. From the Admin's access, you may create a new User tenant or domain, with an associated account, and then use the app being another type of user (Business Owner).
  - If you've created a new Business Owner, you may log out of the Admin access then login in with your newly created Account. You will have the perspective of a Business owner, being able to interact with the whole application, and creating and managing Business Users (Users attached to the business who are not Owners).
  - On the third level, you may create a Business User who will be able to interact with its domain's app, but not manage the Users under the same domain.
- Create and manage products and inventory (beers only for now) - create, edit, read and delete
  - Display of database data in tables, with sorted options
  - Manipulate data dynamically
  - Routing and redirection
- Go through the process of creating the product and the recipe
  - Step form for the creation of product
- Manage Domain's client base and manage Deliveries
  - Create and manage clients and deliveries, interacting with the user's inventory in database.
  - This app is connected to the Google Places, Maps and Autofill API. When creating addresses, the API helps auto-filling the forms.
  - When starting a delivery between user's origin address to client's delivery address, a map is generated with directions instructions.
  - This could be further improved and connected to a mobile application for this purpose.

## Potential Features To Add or In Progress

---

- _Develop a version supporting a local DB with seed data???_
- Recipe management
- Orders and Invoices management
  - With personalized page generation for clients
- Public and personalized "shopping" page for each tenant

## Contact

Feel free to get in touch for me for more details or to discuss about it. You can see my contact information on my [github's homepage](https://github.com/m3c-ode)
