
const LOGIN_LOCAL_KEY = 'user_login'
const delay = (ms) => new Promise(r => setTimeout(r, ms));

export const getUserLogin = async () => {
  await delay(100)
  return new Promise((resolve, reject) => {
    const user = JSON.parse(localStorage.getItem(LOGIN_LOCAL_KEY));
    resolve(user)
  })
}

export const setUserLogin = async (userLogin) => {
  await delay(100)
  return new Promise((resolve, reject) => {
    localStorage.setItem(LOGIN_LOCAL_KEY, JSON.stringify(userLogin));
    resolve()
  })
}
