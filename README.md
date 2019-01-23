# Cackle
A twitter-like feed

## Project Setup

### Prerequisites
- `npm v5`
- `node v8`

### Getting started
- Clone the repo
- Make sure you have node and npm installed globally
- Run `npm install`
- Run `npm run start`

### Testing
Jest is used as a test suite
- Run `npm run test` to ensure all tests pass

## Documentation
- The entry point for the project is `/src/index.js`
- The seed data is stored in `/src/data`
- Tests are located in `/test`

### How the code works
The code takes in two ascii text files. 

#### The Data
##### File 1 - Users
The first contains a list of users and their followers, the second contains a list of tweets by users. The first file has lines delimited by a ` follows ` string, detailing who a user follows. E.g. `User1 follows User2`. Furthermore, a single user can follow other users, delimited by a comma and a space `, `. E.g. `User1 follows User2, User3, User8`

##### File 2 - Tweets
The second file contains a list of tweets by users. These lines are delimited by a greater than `>`character, followed by an empty space ` `. E.g. `User1> Some tweet of length less or equal to 140`

#### Functions
##### Lines to array
This can be found in `/src/lib/linesToArray.js`

1. A readStream of a general file of interest is created using Node's `fs` (file system) package (line 34)
2. The promise returning function `convertLinesFromFileToArray` is invoked. It begins by initializing an empty array and an empty string
3. Three listeners are bound on the inputStream returned from the `fs` package. `on('data'...)`, `on('end'...)` and `on('error'...)`. On end resolves the promise, on error rejects the promise, and on data reads the stream and pushes the lines into the previously initialized array.
4. On end, the promise resolves with the array of lines
