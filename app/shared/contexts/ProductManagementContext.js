import React, {createContext, useState, useContext, useEffect} from 'react';
import {firebase} from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';

import {collectIdsAndDocs} from '../utils/helpers.utility';

export const ProductManagementContext = createContext();

export const useProdManageContext = () => useContext(ProductManagementContext);

const ProductManagementProvider = ({children}) => {
  // States
  const [products, setProducts] = useState(null);
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

  const addProduct = (product, image) => {
    return new Promise((resolve, reject) => {
      const productRef = firebase
        .app()
        .database(
          'https://prosperna-dd4dd-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref(`/products`)
        .push();

      const storageReference = storage().ref(`/products/${productRef.key}`);
      // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${image.uri}`;
      console.log('image uri: ', image.uri);
      storageReference.putFile(image.uri).then(async () => {
        const url = await storage()
          .ref(`/products/${productRef.key}`)
          .getDownloadURL();

        let productData = {
          id: productRef.key,
          ...product,
          image: url,
        };
        productRef
          .set(productData)
          .then(() => resolve())
          .catch(err => reject(err));
      });
    });
  };

  const updateProduct = (product, image) => {
    return new Promise((resolve, reject) => {
      const productRef = firebase
        .app()
        .database(
          'https://prosperna-dd4dd-default-rtdb.asia-southeast1.firebasedatabase.app/',
        )
        .ref(`/products/${product.id}`);

      if (image) {
        const storageReference = storage().ref(`/products/${product.id}`);
        storageReference.putFile(image.uri).then(async () => {
          const url = await storage()
            .ref(`/products/${product.id}`)
            .getDownloadURL();

          let productData = {
            ...product,
            image: url,
          };
          productRef
            .set(productData)
            .then(() => resolve())
            .catch(err => reject(err));
        });
      } else {
        productRef
          .update(product)
          .then(() => resolve())
          .catch(err => reject(err));
      }
    });
  };

  //   End Functions

  // Effects
  useEffect(() => {
    getProducts();
  }, []);

  const payload = {
    products,
    addProduct,
    updateProduct,
    products,
  };
  return (
    <ProductManagementContext.Provider value={payload}>
      {children}
    </ProductManagementContext.Provider>
  );
};

export default ProductManagementProvider;
