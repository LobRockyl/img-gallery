Deployed at: https://lobrockyl-test.herokuapp.com/
Also deployed at: https://thawing-ravine-48628.herokuapp.com/
## Technologies
* MongoDB & Mongoose
* Express
* React
* Node.js

### Version
2.0.0

## Clone Repo and put env variables
```
git clone https://github.com/LobRockyl/img-gallery.git
cd img-gallery
touch .env
```
Then open .env file in a text editor
and put in
```
MONGODB_URI = mongodb+srv:<ur url>
```
OR you can use my test db
```
MONGODB_URI = mongodb+srv://purnashis:purnashis@cluster0.lhecz.mongodb.net/test?retryWrites=true&w=majority
```

### Server Installation --> starts at localhost:5000

Install the dependencies

```sh
$ npm install
```
Run app

```sh
$ npm start
```
### Client Installation --> starts at localhost:3000

Install the dependencies

```sh
$ cd simple-node-crud-client
$ npm install
```
Run app

```sh
$ npm start
```

This should automatically localhost:3000 in your browser. If not, you can open http://localhost:3000 in your browser

Finally if you want to run the unit tests
For server:
Go to the server folder (that is /img-gallery)

```sh
$ cd ..
$ npm run test
```

For Client:
Go to client directory
```sh
$ cd simple-node-crud-client
$ npm run test
```
