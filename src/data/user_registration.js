
const REGISTRATION_LOCAL_KEY = 'user_registration'

const delay = (ms) => new Promise(r => setTimeout(r, ms));

export const getAll = async () => {
  await delay(3000)
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem(REGISTRATION_LOCAL_KEY))
    resolve(users ? users : [])
  })
}

export const getOneByEmail = async (email) => {
  const users = await getAll()
  return new Promise((resolve, reject) => {
    resolve(users.find((user) => user.email === email))
  })
}

export const createOne = async (registrationData) => {
  const users = await getAll()
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.email === registrationData.email)
    const newUser = user ? null : { ...registrationData }
    if (newUser) {
      const usersAfterCreate = [...users, newUser]
      localStorage.setItem(REGISTRATION_LOCAL_KEY, JSON.stringify(usersAfterCreate))
    }
    resolve(newUser)
  })
}

export const updateOne = async (email, updatedData) => {
  const users = await getAll()
  return new Promise((resolve, reject) => {
    let updatedUser = null
    const usersAfterUpdate = users.map((user) => {
      if (user.email === email) {
        updatedUser = { ...user, ...updatedData }
        return updatedUser
      }
      return user
    })
    localStorage.setItem(REGISTRATION_LOCAL_KEY, JSON.stringify(usersAfterUpdate))
    resolve(updatedUser)
  })
}