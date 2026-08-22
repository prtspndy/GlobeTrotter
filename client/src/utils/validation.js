export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};
