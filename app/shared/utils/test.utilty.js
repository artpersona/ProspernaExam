export const addToCart = (product, cart) => {
  let productExists = cart.find(item => item.id === product.id);
  if (productExists) {
    let tempCartData = cart.map(item => {
      if (item.id === product.id) {
        item.quantity = parseInt(item.quantity) + parseInt(product.quantity);
        item.productTotal =
          parseInt(item.productTotal) + parseInt(product.productTotal);
      }
      return item;
    });
    return tempCartData;
  } else {
    return [...cart, product];
  }
};
