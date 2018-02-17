# Passpill web app

This is part of the [PassPill project](https://passpill.io/?stay), that aims to share the whole development of a software project. This repo contains the front end for the password manager PassPill.

It's great that you are interested in this app's source code. You are welcome to fork the repo, install it locally and start to play with the code.

## What's inside this repo?
The frontend is a React.js web application. It makes all the encryption and decryption needed to keep the passwords secure, and send the information already encrypted to the backend's API to store it.

## Local installation
The installation is simple and you won't even need to install the backend (at this early stage of the development the server for the real app is not ready, so you actually will need to install the backend yet) to make the web app work in your computer.

First open your terminal and clone the repo
```
$ git clone https://github.com/passpill-io/passpill-app.git
```

The you need to install the dependencies
```
$ cd passpill-app
$ npm install
```

The app ships a development server with hot reloading when the code is modified. To run it:
```
$ npm start
```
Then open your browser and you willl see the app running at `http://localhost:3001`.
