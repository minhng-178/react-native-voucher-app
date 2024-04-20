export const baseURL = 'http://20.243.125.223:3000/api/v1/';

//? auth
export const loginPath = '/login';

export const refreshTokenPath = '/refresh';

//? role
export const rolesPath = '/roles';

//? user
export const usersPath = id => {
  return `/user/${id}`;
};
