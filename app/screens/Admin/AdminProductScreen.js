import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {CustomHeader, CustomInput} from '../../components';
import {Colors, Themes} from '../../shared/layouts';
import {launchImageLibrary} from 'react-native-image-picker';
import {deviceWidth, deviceHeight} from '../../shared/utils/device.utility';
import {RFValue} from 'react-native-responsive-fontsize';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-elements';
import {useProdManageContext} from '../../shared/contexts/ProductManagementContext';

function AdminProductScreen({route, navigation}) {
  console.log('params are: ', route.params);
  const {type} = route.params;
  const {addProduct, updateProduct} = useProdManageContext();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const options = {
    maxWidth: 2000,
    maxHeight: 2000,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setImage(result?.assets[0]);
  };

  const submitProduct = data => {
    if (type === 'create') {
      processAddProduct(data);
    } else {
      let updatedData = {...data, id: route.params.id};
      processUpdateProduct(updatedData);
    }
  };

  let processAddProduct = data => {
    if (!image) {
      ToastAndroid.show('Please select an image', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    addProduct(data, image)
      .then(() => {
        setLoading(false);
        ToastAndroid.show('Product successfully added', ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch(err => {
        setLoading(false);
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      });
  };

  let processUpdateProduct = data => {
    setLoading(true);
    updateProduct(data, image)
      .then(() => {
        setLoading(false);
        ToastAndroid.show('Product successfully updated', ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch(err => {
        setLoading(false);
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      });
  };

  return (
    <>
      <CustomHeader
        headerName={type === 'create' ? 'Create Product' : 'Update Product'}
        showBackButton
      />
      <ScrollView style={styles.container}>
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.imagePicker} onPress={openGallery}>
            {image || route.params?.image ? (
              <Image
                source={{uri: image?.uri ?? route.params?.image}}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.selectionText}>Select Image</Text>
            )}
          </TouchableOpacity>

          <View style={styles.form}>
            <View style={styles.row}>
              <Text style={styles.labelText}>Product Name</Text>
              <CustomInput
                placeholder="Eg. Apple"
                style={styles.placeholder__text}
                inputContainerStyle={
                  errors?.name
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                containerStyle={styles.containerStyle}
                control={control}
                name="name"
                errorMessage={errors.name?.message}
                rules={{
                  required: {
                    value: true,
                    message: 'Product name is required',
                  },
                }}
                errorStyle={styles.errorStyle}
                defaultValue={route.params?.name ?? ''}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelText}>Description</Text>
              <CustomInput
                placeholder="Eg. Very sweet"
                style={[styles.placeholder__text, {textAlignVertical: 'top'}]}
                inputContainerStyle={
                  errors?.description
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                containerStyle={styles.containerStyle}
                control={control}
                name="description"
                errorMessage={errors.description?.message}
                rules={{
                  required: {
                    value: true,
                    message: 'Product description is required',
                  },
                }}
                errorStyle={styles.errorStyle}
                multiline={true}
                numberOfLines={4}
                defaultValue={route.params?.description ?? ''}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.labelText}>Price</Text>
              <CustomInput
                placeholder="Eg. 10.00"
                style={styles.placeholder__text}
                inputContainerStyle={
                  errors?.price
                    ? [styles.inputContainerStyle, {borderColor: 'red'}]
                    : styles.inputContainerStyle
                }
                containerStyle={styles.containerStyle}
                control={control}
                name="price"
                errorMessage={errors.name?.message}
                rules={{
                  required: {
                    value: true,
                    message: 'Price  is required',
                  },
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Invalid price',
                  },
                }}
                errorStyle={styles.errorStyle}
                defaultValue={route.params?.price ?? ''}
              />
            </View>

            <Button
              buttonStyle={[
                Themes.buttonPrimary,
                {
                  backgroundColor: Colors.primary,
                  borderWidth: 1,
                  borderColor: 'whitesmoke',
                  width: '100%',
                  alignSelf: 'center',
                  marginTop: '15%',
                },
              ]}
              title="Complete"
              titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
              onPress={handleSubmit(submitProduct)}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  errorStyle: {
    height: 0,
  },
  form: {
    marginTop: '10%',
  },

  labelText: {
    fontSize: RFValue(13),
    marginBottom: RFValue(5),
    fontFamily: 'Poppins-Regular',
  },
  placeholder__text: {
    color: 'black',
    fontSize: RFValue(12),
    fontFamily: 'Poppins-Regular',
  },

  inputContainerStyle: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(10),
    backgroundColor: Colors.white,
  },

  containerStyle: {
    // backgroundColor: 'white',
    paddingHorizontal: 0,
  },

  image: {
    width: '100%',
    height: '100%',
  },
  selectionText: {
    color: Colors.primary,
    fontSize: RFValue(14),
    fontFamily: 'Poppins-Regular',
  },
  wrapper: {
    width: '80%',
    alignSelf: 'center',
    marginTop: '10%',
  },

  imagePicker: {
    width: deviceWidth * 0.53,
    height: deviceHeight * 0.23,
    backgroundColor: '#DCDCDC',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default AdminProductScreen;
