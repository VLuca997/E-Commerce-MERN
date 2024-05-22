# Creazione E-Commerce con stack MERN.

# STEP 1:
Inizializzazione Progetto front-end, back-end, DB.

# VITE+REACT
npm create vite@latest frontend -- --template react


# Per Creare package.json fuori dai folder frontend e backend:
npm init -y

# Sempre fuori dai folder installeremo le dipendenze necessarie per tutta l'app lato backend.:
npm i nodemon multer mongoose jsonwebtoken express-formidable express-async-handler express dotenv cors cookie-parser concurrently bcrypts

#



# DIPENDENZE FRONT-END
- npm i slick-carousel react-slick react-toastify react-router react-router-dom react-redux react-icons apexcharts react-apexcharts moment flowbite axios @reduxjs/toolkit @paypal/react-paypal-js


# Aprire il file package.json fuori dai folder:
  "type": "module",
 "scripts": {
    "backend": "nodemon backend/index.js",
    "frontend": "npm run dev --prefix frontend",
    "dev": "concurrently \"npm run frontend\"\"npm run backend\""
  },

  per avviare il backend abbiamo fatto una prova con il file index.js nella folder backend, immettendogli un console.log, in console nella folder di base usando il comando npm run backend si avviera il server e stampa il console.log.



# POSTMAN ED API 



# FRONTEND STYLE CON TAIWINDCSS
- cd frontend
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p

- on tailwind.config.js:     content: ["./src/**/*.{html,js,jsx,ts,tsx}"],

- on App.css:  
            @tailwind base;
            @tailwind components;
            @tailwind utilities;



# DEFINIAMO " USER " POSTMAN:
creare file per user: userModel, userController, userRoutes
POSTMAN: -> POST http://localhost:5000/api/users
                  {
                      "username" : "Luca",
                      "email" : "email@gmail.com",
                      "password": "password123"

                  }



# FLOWBITE componentistica Tailwindcss



#



#



#




