# SmartQ Reservation System

This web application is the term project for the CPS 731 Software Engineering I course at Toronto Metropolitan University for the Fall 2024 semester.

The aim of the web application is to provide a unified interface for restaurant staff to view and manage reservations and track the availability of tables, and for customers to make reservations at their favorite restaurants in as easy a manner as possible.

The web app makes extensive use of Supabase's realtime updates feature to subscribe to database changes for scenarios where a reservation is made for example. A simple in-app notification system was also create to take advantage of the realtime updates. This notification system allows a restaurant to send notifications to their reservees and keep them updated.

A drag-and-drop floor plan creator was also implement which allows managers to intuitively create custom floor plans for restaurants.

Created with: 
- **React + Vite**
- **Node.js**
- **Supabase**
- **PostgreSQL**
- **TailwindCSS**
- **Shadcn/ui**
  
Tested with: 
- **Vitest**
- **React Testing Library**
- **System test cases** derived from the project use case model.


Live deployment
---
https://smartq.onrender.com

###### *It might take a while for the app to load on first visit. The app is hosted on Render's hobby plan, which spins down the app after a period of inactivity. The slow load isn't caused by a lack of performance from the app itself.

To appreciate the realtime functionalities of the web app, consider running the app on two separate browsers, side by side. Log in with a customer account on one instance and either an employee or a manager account on the other instance, then test the app. 

###### *Manager accounts have access to more features than employee accounts.

Local Deployment
---
Before running the application for the first time, please ensure that the neccessary files are installed.


Installation of necessary files: 
```
npm install 
```

To run the application, cd into the reservation-system directory and run the following command: 
```
npm run dev
```

###### *The commands above only work if you have been given the .env file.

Fake credentials for testing
---
The following credentials were arbitrarily created and some were used to manually test the application. 


You may use any of them or create your own fake credentials to try out the app.

```javascript
[
  {  //account created; use for login; customer
    "firstName": "Sarah",
    "lastName": "Mitchell",
    "email": "sarah.mitchell@example.com",
    "phone": "555-123-4567",
    "password": "Kj#9mP2$"
  },
  {  //account created; use for login; manager
    "firstName": "Marcus",
    "lastName": "Rodriguez",
    "email": "m.rodriguez@example.com",
    "phone": "555-987-6543",
    "password": "Nh5$pL8@"
  },
  {  //account created; use for login; employee
    "firstName": "Emily",
    "lastName": "Thompson",
    "email": "emily.t@example.com",
    "phone": "555-456-7890",
    "password": "Wx7&nD9#"
  },
  {
    "firstName": "James",
    "lastName": "Wilson",
    "email": "jwilson@example.com",
    "phone": "555-234-5678",
    "password": "Qb4$mH9!"
  },
  {  //account created; use for login; manager
    "firstName": "Lisa",
    "lastName": "Chen",
    "email": "l.chen@example.com",
    "phone": "555-345-6789",
    "password": "Yd5@jR7*"
  },
  {  //account created; use for login; customer
    "firstName": "Elena",
    "lastName": "Kovacs",
    "email": "elena.kovacs@example.com",
    "phone": "555-678-9012",
    "password": "Rt6#qM3!"
  },
  {
    "firstName": "David",
    "lastName": "Nguyen",
    "email": "d.nguyen@example.com",
    "phone": "555-890-1234",
    "password": "Zx9$fK4@"
  },
  {  //account created; use for login; customer
    "firstName": "Olivia",
    "lastName": "Patel",
    "email": "olivia.patel@example.com",
    "phone": "555-567-8901",
    "password": "Jh7*nL2#"
  },
  {
    "firstName": "Michael",
    "lastName": "Garcia",
    "email": "m.garcia@example.com",
    "phone": "555-345-6789",
    "password": "Bq5%tP8$"
  },
  {
    "firstName": "Rachel",
    "lastName": "Kim",
    "email": "rachel.kim@example.com",
    "phone": "555-234-5678",
    "password": "Ck3@wS6!"
  },
  {
      "firstName": "Alexander",
      "lastName": "Singh",
      "email": "a.singh@example.com",
      "phone": "555-456-7890",
      "password": "Gm9#nK4$"
    },
    {
      "firstName": "Isabella",
      "lastName": "Martinez",
      "email": "isabella.m@example.com",
      "phone": "555-567-8901",
      "password": "Wq7*fL2!"
    },
    {
      "firstName": "Jordan",
      "lastName": "Brown",
      "email": "jordan.brown@example.com",
      "phone": "555-678-9012",
      "password": "Hy5@pT3#"
    },
    {
      "firstName": "Sophie",
      "lastName": "Lee",
      "email": "sophie.lee@example.com",
      "phone": "555-789-0123",
      "password": "Jx6$nR9@"
    },
    {
      "firstName": "Daniel",
      "lastName": "Miller",
      "email": "d.miller@example.com",
      "phone": "555-890-1234",
      "password": "Bk4!mQ7%"
    }
]

```
