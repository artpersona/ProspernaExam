import {addToCart} from '../app/shared/utils/test.utilty';
test('addToCartDuplicate', () => {
  let product = {
    id: '1',
    quantity: 1,
    productTotal: 100,
  };

  let cart = [
    {
      id: '1',
      quantity: 1,
      productTotal: 100,
    },
    {
      id: '2',
      quantity: 1,
      productTotal: 100,
    },
  ];
  expect(addToCart(product, cart)).toEqual([
    {
      id: '1',
      quantity: 2,
      productTotal: 200,
    },
    {
      id: '2',
      quantity: 1,
      productTotal: 100,
    },
  ]);
});

test('addToCartNew', () => {
  let product = {
    id: '3',
    quantity: 1,
    productTotal: 100,
  };

  let cart = [
    {
      id: '1',
      quantity: 1,
      productTotal: 100,
    },
    {
      id: '2',
      quantity: 1,
      productTotal: 100,
    },
  ];
  expect(addToCart(product, cart)).toEqual([
    {
      id: '1',
      quantity: 1,
      productTotal: 100,
    },
    {
      id: '2',
      quantity: 1,
      productTotal: 100,
    },
    {
      id: '3',
      quantity: 1,
      productTotal: 100,
    },
  ]);
});
