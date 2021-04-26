# matrix

This project renders a matrix of pixels (represented as buttons) and a color control. Each pixel's color can be changed. The color changes are updated over socket-io to a node.js server accessing json-server DB.

## Technologies

- React (Hooks / Context) (Client Front End)
- Node.js (Server Back End)
- json-server (Back End DB)
- Socket-io (Real-time Communication)

[Matrix Client](client/README.md)

[Matrix Server](server/README.md)

## Running The Demo

- Start up the json server
  - cd `<project root>/matrix-react-socket/server`
  - `json-server --watch db/db.json`
- Start up server
  - cd `<project root>/matrix-react-socket/server`
  - npm start
- Start up client
  - cd `<project root>/matrix-react-socket/client`
  - npm start
- Visit `http://localhost:8080`
