import dayjs from 'dayjs';
import { products } from './products';

const now = dayjs();

export const orders = [
  {
    id: 23123,
    created_at: now.subtract(1, 'hour').toISOString(),
    total: 1000000,
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23123,
        quantity: 2,
        product_id: products[0].id,
        products: products[0],
      },
      {
        id: 2,
        order_id: 23123,
        quantity: 1,
        product_id: products[1].id,
        products: products[1],
      },
    ],
  },
  {
    id: 23133,
    created_at: now.subtract(1, 'hour').toISOString(),
    total: 1000000,
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23123,
        quantity: 2,
        product_id: products[0].id,
        products: products[0],
      },
      {
        id: 2,
        order_id: 23123,
        quantity: 1,
        product_id: products[1].id,
        products: products[1],
      },
    ],
  },
];
