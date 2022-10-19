import React, {createContext, useState, useContext, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';

import {collectIdsAndDocs} from '../utils/helpers.utility';

export const ShopContext = createContext();

export const useShopContext = () => useContext(ShopContext);

const ShopProvider = ({children}) => {
  // States
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);

  console.log('cart is: ', cart);
  //   End States

  // Functions

  const getProducts = () => {
    const reference = firebase
      .app()
      .database(
        'https://prosperna-dd4dd-default-rtdb.asia-southeast1.firebasedatabase.app/',
      )
      .ref(`/products`);

    reference.on(
      'value',
      snapshot => {
        if (snapshot.val()) setProducts(collectIdsAndDocs(snapshot.val()));
      },
      err => {
        console.log('Error: ', err);
      },
    );
  };

  const addToCart = product => {
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
      setCart(tempCartData);
    } else {
      setCart([...cart, product]);
    }
  };

  // Effects
  useEffect(() => {
    getProducts();
  }, []);

  const payload = {
    products,
    addToCart,
    cart,
  };
  return (
    <ShopContext.Provider value={payload}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
