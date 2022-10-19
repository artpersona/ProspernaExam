import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {Colors, Themes} from '../../shared/layouts';
import {CustomHeader, AdminProduct} from '../../components';
import {useProdManageContext} from '../../shared/contexts/ProductManagementContext';
import {FAB} from 'react-native-elements';

function ProductLanding({navigation}) {
  const {products} = useProdManageContext();

  const renderItem = ({item}) => {
    return <AdminProduct {...item} />;
  };

  const navigateToCreateProduct = () => {
    navigation.navigate('CreateProduct', {type: 'create'});
  };

  return (
    <>
      <CustomHeader headerName={'Product Management'} />
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={Themes.emptyText}>No Products Found</Text>
          }
          contentContainerStyle={{
            marginTop: '5%',
            paddingHorizontal: '5%',
          }}
        />
        <FAB
          title="New Product"
          placement="right"
          icon={{name: 'add', color: Colors.white}}
          color={Colors.primary}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 20,
          }}
          onPress={navigateToCreateProduct}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default ProductLanding;
