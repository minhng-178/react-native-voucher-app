export const baseURL = 'http://20.243.125.223:3000/api/v1/';

//? auth
export const loginPath = '/login';
export const registerPath = '/signup';
export const refreshTokenPath = '/refresh';

//? role
export const rolesPath = '/roles';

//? qr
export const qrPath = '/qr';
export const qrCustomerPath = '/qr/customer';
export const qrHostCreatePath = '/host/qr';

export const qrHostUpdatePath = id => {
  return `${qrHostCreatePath}/${id}`;
};

export const qrIdPath = id => {
  return `${qrPath}/${id}`;
};

//? cate
export const catePath = '/categories';

//? user
export const usersPath = id => {
  return `/user/${id}`;
};

//? upload
export const uploadPath = '/upload';

//? order
export const orderPath = '/orders';

export const orderIdPath = id => {
  return `${orderPath}/${id}`;
};

export const orderUserPath = id => {
  return `/user/${id}/orders`;
};

//? payment

export const paymentPath = '/payments';
