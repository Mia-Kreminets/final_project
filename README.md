## Overview

This project is a web application designed to detect and assess stress levels based on textual data. The application is built using Angular for the frontend and Flask for the backend. It incorporates a machine learning model to analyze text inputs and determine stress levels.

## Key Components

### Frontend
Framework: Angular
Description: The frontend of the application provides a user-friendly interface for inputting text data and viewing stress analysis results.
For logged-in users I've created a personal cabinet with more features. But feel free to use the application without registration.

### Backend
Framework: Flask
Description: The backend handles the processing of text data, interaction with the machine learning model, and communication with the database.

### Database

Type: MySQL
Migration Tool: Alembic
Description: The database stores text data and analysis results. Database migrations can be performed using Alembic to ensure the schema is up to date.

### Model

Location: `src/back/best_model`
Description: The model is used for stress detection in text. It can be executed without running the entire application by using the provided `execute.py` script.

## Development server
To run the app, first install all dependencies for frontend, backend and change the configurations to your own database. 
Then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Instractions for thee backend along with other useful commands you can find in `src/back/commands.txt` file.