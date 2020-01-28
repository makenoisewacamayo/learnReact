
export const removeStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
}

export const setStorage = (token, expirationTime) => {
  localStorage.setItem('token', token);
  localStorage.setItem('expirationTime', expirationTime)
}
