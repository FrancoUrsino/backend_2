import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const isValidPassword = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};