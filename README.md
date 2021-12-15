# To-Do React App :bookmark_tabs:

This project is an To-Do Application.

## Deployment

The app is deployed on *in future*

## Run the project

Install [Node.js](https://nodejs.org/en/download/)
Open the project directory in terminal and run:

`npm i`
This will install all dependencies.

`npm run j-server`
Starts a json-server on port 3001, that watchs a file ./src/assets/db.json.
- [http://localhost:3001/lists](http://localhost:3001/lists)
- [http://localhost:3001/tasks](http://localhost:3001/tasks)
- [http://localhost:3001/colors](http://localhost:3001/colors)

`npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Functionality

**The app works on displays 1024px width or bigger!**
The app is not mobile adaptive.

The application uses 8-color pallet and default to-do values, that stored in "DB". You can create/rename/delete the lists. You can add or delete tasks, also toggle them as un/completed. All changing would be stored on the server.

## Design

Layout: [Figma](https://www.figma.com/file/OP7oFTNqV8tPZyh2zSgCaX/Todo-ReactJS?node-id=0%3A1)