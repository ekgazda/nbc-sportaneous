// Set events from api call to events data
// setEvents();

// Utils Function for truncating a string and appending ...
export const truncate = (string: string) => {
  if (string.length > 40) {
    string = `${string.substring(0, 60)}...`
    return string
  } else {
    return string
  }
}

// Function to format the date and time for now.
// This will be done properly later. Just used currently for layout purposes.
export const getDate = (string: string) => {
  if (string.length > 17) {
    string = string.substring(0, 17)
    return string
  } else {
    return string
  }
}

export const getTime = (string: string) => {
  return string.substring(21, 31)
}

export const makeNameIdReference = (allUsers) => {
  const newRef = {}
  allUsers.forEach((user) => {
    newRef[user.id] = `${user.first_name} ${user.last_name}`
  })
  return newRef
}
