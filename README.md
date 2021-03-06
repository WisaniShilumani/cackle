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
Jest is used as a testing framework
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
This can be found in [linesToArray](./src/lib/linesToArray.js)

1. A readStream of a general file of interest is created using Node's `fs` (file system) package (line 34)
2. The promise returning function `convertLinesFromFileToArray` is invoked. It begins by initializing an empty array and an empty string
3. Three listeners are bound on the inputStream returned from the `fs` package. `on('data'...)`, `on('end'...)` and `on('error'...)`. On end resolves the promise, on error rejects the promise, and on data reads the stream and pushes the lines into the previously initialized array.
4. On end, the promise resolves with the array of lines

##### parseTweets
This can be found in [parseTweets](./src/lib/parseTweets.js)

1. This method takes in an array of strings
2. It uses the [array.reduce() method](https://medium.com/nona-web/understanding-javascript-reduce-and-its-use-cases-49a89d3aaa80) to group tweets by user
3. The logic within the reduce callback expects each string to be delimited by the gt and space characters (`> `), and expects only two strings on either side. Should this check fail, an error is thrown.
4. Furthermore, if a tweet exceeds the 140 character limit, an error is thrown.

##### parseUsers
This can be found in [parseUsers](./src/lib/parseUsers.js)

1. This method takes in an array of strings
2. It uses the [array.reduce() method](https://medium.com/nona-web/understanding-javascript-reduce-and-its-use-cases-49a89d3aaa80) to group a list user followees by user
3. The logic within the reduce callback expects each string to be delimited by the ` follows ` string, and expects only two strings on either side. Should this check fail, an error is thrown.
4. In addition, the right side of the ` follows ` string is expected to be a string of users delimited by a comma and space (`, `). This is split into an array of strings representing users.
5. A `union` method is attached to Array.prototype array, from which other arrays can inherit from. The union method loops over each element in the array, and within each iteration, loops over the array again from the position of (the parent loop + 1) to check for duplicates...which it then removes. Checking from the position after the parents' reduces complexity; but having such a method within the reduce method could be costly for files with a large magnitude lines and a high follower count.
6. The `union` method is used to get all the unique users in the user list, and to prevent duplication of followees in the followees array

##### generateFeed
This can be found in This can be found in [generateFeed](./src/lib/generateFeed.js)

1. This method takes in two objects - namely a users object and a tweets object
2. It uses the [array.reduce() method](https://medium.com/nona-web/understanding-javascript-reduce-and-its-use-cases-49a89d3aaa80) method to iterate over the users list (obtained by evaluating the keys in the users object), fetching the current users' followee list, fetching each of their tweets, and ordering them by their initial position (determined by an index property in the tweets object).
3. The feed object is populated per user and an accumulated object is returned with a feed for all users.

#### Result
Runing `npm run start` runs the `processTweets` method in [src/lib/index.js](./src/lib/index.js). This method parses the text files, creating arrays, which are then reduced to objects that can be later aggregated into a single object representing the user feeds.

This object is finally logged in a desirable way using the [logTweets method](./src/lib/logTweets.js). The first operation of this method is to sort the usernames alphabetically. It then iterates over the aggregated object, logging out the user name, followed by their tabbed out tweets, if any exist.
