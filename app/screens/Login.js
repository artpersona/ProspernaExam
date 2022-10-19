import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import {CustomInput} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuthContext} from '../shared/contexts/AuthContext';
import {Colors, Themes} from '../shared/layouts';
import {deviceHeight, deviceWidth} from '../shared/utils/device.utility';
import {RFValue} from 'react-native-responsive-fontsize';
import {Button} from 'react-native-elements';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

function Login() {
  const {loginViaEmail} = useAuthContext();
  // States
  const [icon, setIcon] = useState('eye-off-outline');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  //  Library Hooks
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  //  End Library Hooks

  // Functions
  const iconChange = () => {
    setHidePassword(hidePassword => !hidePassword);
    setIcon(icon =>
      icon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline',
    );
  };

  const submitForm = data => {
    const {email, password} = data;
    setLoading(true);

    loginViaEmail(email, password)
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        alert('Error Encountered: ' + err.message);
      });
  };

  // End Functions

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://assets-global.website-files.com/60585b03d6e6e9a1ac739495/62ccf0cf7db412d6a52ebe50_Prosperna-logo.png',
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.greetingsContainer}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.subText}>Sign in to continue</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.form__container}>
          <CustomInput
            placeholder="E-MAIL"
            style={styles.placeholder__text}
            inputContainerStyle={
              errors?.email
                ? [styles.inputContainerStyle, {borderColor: 'red'}]
                : styles.inputContainerStyle
            }
            containerStyle={styles.containerStyle}
            control={control}
            name="email"
            errorMessage={errors.email?.message}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: EMAIL_REGEX,
                message: 'Invalid email format',
              },
            }}
            errorStyle={styles.errorStyle}
            leftIcon={
              <Ionicons name="mail-outline" size={RFValue(20)} color="black" />
            }
          />

          <CustomInput
            placeholder="PASSWORD"
            style={styles.placeholder__text}
            inputContainerStyle={
              errors?.password
                ? [styles.inputContainerStyle, {borderColor: 'red'}]
                : styles.inputContainerStyle
            }
            secureTextEntry={hidePassword}
            errorMessage={errors.password?.message}
            control={control}
            name="password"
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
            containerStyle={styles.containerStyle}
            errorStyle={styles.errorStyle}
            leftIcon={
              <Ionicons
                name="lock-closed-outline"
                size={RFValue(20)}
                color="black"
              />
            }
            rightIcon={
              <MaterialCommunityIcons
                name={icon}
                size={25}
                color={'black'}
                onPress={iconChange}
              />
            }
          />
        </View>

        <Button
          buttonStyle={[
            Themes.buttonPrimary,
            {
              backgroundColor: Colors.green,
              borderWidth: 1,
              borderColor: 'whitesmoke',
              width: '90%',
              alignSelf: 'center',
              marginTop: '5%',
            },
          ]}
          title="LOGIN"
          titleStyle={[Themes.buttonTextPrimary, {color: Colors.white}]}
          onPress={handleSubmit(submitForm)}
          loading={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: Colors.white,
    width: deviceWidth,
    height: deviceHeight * 0.64,
    elevation: 5,
    borderTopRightRadius: RFValue(30),
    borderTopLeftRadius: RFValue(30),
    marginTop: RFValue(25),
    borderWidth: 15,
    borderColor: Colors.primary,
  },
  placeholder__text: {
    color: 'black',
    fontSize: RFValue(13),
    fontFamily: 'Poppins-Regular',
  },

  containerStyle: {
    // backgroundColor: 'white',
    paddingHorizontal: 0,
  },
  inputContainerStyle: {
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    paddingHorizontal: RFValue(10),
    borderRadius: RFValue(10),
    backgroundColor: Colors.white,
  },
  form__container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFValue(50),
  },
  subText: {
    fontSize: RFValue(13),
    color: Colors.grey,
    fontFamily: 'Poppins-Regular',
    opacity: 0.7,
  },
  welcomeText: {
    fontSize: RFValue(25),
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  greetingsContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: -deviceHeight * 0.07,
  },
  imageContainer: {
    width: deviceWidth * 0.7,
    height: deviceHeight * 0.3,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default Login;
