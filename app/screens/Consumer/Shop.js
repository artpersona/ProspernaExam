import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useShopContext} from '../../shared/contexts/ShopContext';
import {ConsumerProduct, CustomHeader} from '../../components';
function ConsumerStack() {
  const {products} = useShopContext();

  console.log('products are: ', products);

  const renderItem = ({item}) => {
    return <ConsumerProduct {...item} />;
  };
  return (
    <>
      <CustomHeader />
      <View style={styles.container}>
        <FlatList data={products} renderItem={renderItem} numColumns={2} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ConsumerStack;
