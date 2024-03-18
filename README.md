# Identify_rare_animals
This is a website that helps identify rare animals. In this application, we using Python, ReactJS.

## Set up enviroment 
### nodeJs
1. install Node Version Manager

- Visit the Node.js download home page at: nodejs.org.
- On the homepage, you will see two versions: "LTS" and "Current". If you want to use a more stable version, select "LTS" (Long-Term Support). Click the "Download LTS" or "Download" button depending on the version you choose.
- Once the download is complete, open the Node.js installation file (.msi) and follow the on-screen instructions.

2. check nvm installation (check node version)
open cmd
```bash
npm --version
```
If the terminal print out the version of node (v20), installation is success

## Getting Started

To run the server locally, follow these steps:

1. Clone and open the repository:
    ```bash
    git clone https://github.com/LuniuLun/Identify_rare_animals.git
    cd Identify_rare_animals/frontend
    ```
2. Install required packages for frontend.
    ```bash
    npm i
    ```
3. Navigate to root folder and install required packages for backend server.
    ```bash
    cd ../..
    cd backend/API
    ```
4. Run the server
    ```bash
    python app.py
    ```
5. Open another terminal tab in root folder and navigate to server folder
    ```bash
    cd frontend/src
    ```
5. Run server folder
    ```bash
    npm start
    ```
6. When the website appears, you have succeeded
