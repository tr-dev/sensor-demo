### sensor-demo
An application that simulates sensors that periodically sends data to a server
- Uses Node.JS/mySQL on the backend
- React on the frontend
- Frontend backend communicate using websockets


### Starting the Database
- Install [docker](https://www.docker.com/)
- Navigate to `./ops/mysql`
- Build the docker image `docker build -t mysqldev .`
- Launch a database container  - `docker run -p 3306:3306 -t mysqldev`

### Start the application
- Install [Node.JS version 6](https://nodejs.org/en/download/)
- Navigate to root directory
- Install node the modules `npm install`
- Build the assets with `./node_modules/webpack/bin/webpack.js`
- Run `node app.js`
- Navigate to http://localhost:3000 in your browser

### TODO
- Update graphs to show thresholds values
- Add alerting when thresholds go over events
- Setup docker compose
- Make Dockerfile for frontend application
- General code cleanup and organization
