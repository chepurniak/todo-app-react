# To-Do React App :bookmark_tabs:

This project is an To-Do Application.

## Deployment

The app is deployed on [Heroku](https://to-do-applic.herokuapp.com/) :octocat:

## Run the project

Install [Node.js](https://nodejs.org/en/download/). 
Open the project directory in terminal and run:

```npm i```

This will install all dependencies.

In `src/App/js` change `const JSON_API` on `'http://localhost:8000'` (def. is `'https://to-do-applic.herokuapp.com'`)

```npm start```

Starts a json-server on port 8000, that watchs a file ./db.json.

- [http://localhost:8000/lists](http://localhost:8000/lists)
- [http://localhost:8000/tasks](http://localhost:8000/tasks)
- [http://localhost:8000/colors](http://localhost:8000/colors)

In secons terminal run:

```npm run react-start```

Runs the app on port 3000 in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Functionality

The app is fixed and not mobile responsive.

The application uses 8-color pallet and default to-do values, that stored in "DB". You can create/rename/delete the lists. You can add or delete tasks, also toggle them as un/completed. All changing would be stored on the server.

## Design

Layout: [Figma](https://www.figma.com/file/OP7oFTNqV8tPZyh2zSgCaX/Todo-ReactJS?node-id=0%3A1)