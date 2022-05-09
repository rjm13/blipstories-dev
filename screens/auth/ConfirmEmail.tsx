import React, {useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TextInput, 
    TouchableOpacity, 
    Keyboard, 
    TouchableWithoutFeedback
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';


import { Auth, graphqlOperation, API } from 'aws-amplify';
import { createUser } from '../../src/graphql/mutations';
import { ActivityIndicator } from 'react-native-paper';

const ConfirmEmail = ({navigation, route} : {navigation: any, route : any}) => {

    const [loggingIn, setLoggingIn] = useState(false);

    const {username, password} = route.params

    const [data, setData] = useState({
        username: username,
        code: '',
        password: password,
    });

    async function confirmSignUp() {

        const {username, code, password} = data;

        setLoggingIn(true);
        
        try {

            let result = await Auth.confirmSignUp(username, code);

            if (result) {
                let signin = await Auth.signIn (username, password)

                if (signin) {
                    const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })

                    if (userInfo) {

                        const newUser = {
                            id: userInfo.attributes.sub,
                            type: 'User',
                            name: userInfo.attributes.name,
                            birthdate: userInfo.attributes.birthdate,
                            plan: 'basic'
                        }

                        const createdUser = await API.graphql(
                            graphqlOperation(
                            createUser,
                            { input: newUser }
                            )
                        )
                        if (createdUser) {
                            navigation.navigate('Welcome')
                        }
                    }
                }
            }
        } catch (error) {
            console.log('error confirming sign up', error);
            alert('Error confirming account. Please try again.')
        }
        setLoggingIn(false);
    }

    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(username);
            alert('Confirmation code resent. Please check your email.');
        } catch (err) {
            console.log('error resending code: ', err);
            alert('Error sending code.')
        }
    }

    const handleCode = (val : any) => {
        setData({
            ... data,
            code: val
        });
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <LinearGradient
                colors={['#00ffffa5','#000', '#000']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                
                <View style={{ margin: 20}}>
                    <View>
                        <Text style={styles.header}>
                            Confirmation Code
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='Check email for code'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={30}
                                onChangeText={(val) => handleCode(val)}
                                autoCapitalize='none'
                                
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={confirmSignUp}>
                    <View style={styles.button}>
                        {loggingIn === true ? (
                            <ActivityIndicator size='small' color='cyan'/>
                        ) : (
                            <Text style={styles.buttontext}>
                                Confirm Account
                            </Text> 
                            )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={resendConfirmationCode}>
                    <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center', marginTop: 40}}>
                        Resend code
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center', margin: 20}}>
                        Go Back
                    </Text>
                </TouchableOpacity>

            </LinearGradient>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        //alignItems: 'center',
        flex: 1,
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    textInputTitle: {
        color: '#fff',
        fontWeight: 'normal',
    },
    inputfield: {
        width: '90%',
        height: 40,
        backgroundColor: '#363636',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
       alignItems: 'center',
       margin: 20,
    },
    buttontext: {
        backgroundColor: 'cyan',
        borderRadius: 17,
        paddingVertical: 10,
        paddingHorizontal: 20,
        overflow: 'hidden'
    },
});

export default ConfirmEmail;