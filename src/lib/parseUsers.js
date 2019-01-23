/**
 * We want to return something that looks like this
 * { Ward: Alan, }
 * 
 *  */
Array.prototype.union = function () {
  const a = this.concat()
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (a[i] === a[j]) {
        a.splice(j--, 1)
      }
    }
  }

  return a
}

getAllUsers = (userList) => {
  let users = []
  userList.forEach((line, index) => {
    const relationArray = line.split(' follows ')

    if (relationArray.length !== 2) {
      throw `User list contains a badly formatted line at (line: ${index + 1}) "${line}"`
    }

    users = users.concat([relationArray[0]].concat(relationArray[1].split(', ')))
  })

  return users.union()
}

exports.parseUsers = (userList) => {
  const initialUsers = getAllUsers(userList).reduce((accumulator, currentUser) => {
    accumulator[currentUser] = []
    return accumulator
  }, {})

  return userList.reduce((accumulator, currentLine, index) => {
    const relationArray = currentLine.split(' follows ')
    const follower = relationArray[0]
    const followees = relationArray[1].split(', ')
    const currentFollowees = accumulator[follower] || []
    accumulator[follower] = [ ...currentFollowees, ...followees ].union()
    return accumulator
  }, initialUsers)
}
