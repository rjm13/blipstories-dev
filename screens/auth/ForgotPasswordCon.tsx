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
import {Auth} from '@aws-amplify/auth'
import Feather from 'react-native-vector-icons/Feather';

const ForgotPassword = ({navigation, route} : {navigation : any, route : any}) => {

    const {email} = route.params

    const [newPassVis, setNewPassVis] = useState(false);

    const [conPassVis, setConPassVis] = useState(false);

    const [updatePass, setUpdatePass] = useState({
        username: email,
        code: '',
        password: '',
        confirmPass: '',
    })

    const handleResetPassword = async () => {
        const {username, code, password, confirmPass} = updatePass;

        if(password === confirmPass) {

        try {
            console.log(username, code, password);
            let result = await Auth.forgotPasswordSubmit(username, code, password)

            console.log(result);

            if(result) {
                navigation.navigate('SignIn');
            }
        } catch (e) {
            console.log(Error);
        }} else {
            alert('Passwords do not match')
        }
    }

    const ResendCode = async () => {
        
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
                    <Text style={{marginHorizontal: 20, color: '#fff', textAlign: 'center', marginBottom: 40, fontSize: 12}}>
                        Please check your email for the confirmation code to reset your password.
                    </Text>
                    <View>
                        <Text style={styles.header}>
                            Confirmation Code
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='Check email for code'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={40}
                                autoCapitalize='none'
                                onChangeText={val => setUpdatePass({...updatePass, code: val})}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 0, marginHorizontal: 20}}>
                    <View>
                        <Text style={styles.header}>
                            New Password
                        </Text>
                        <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <TextInput 
                                placeholder='...'
                                placeholderTextColor='#ffffffa5'
                                style={[styles.textInputTitle, {width: '80%'}]}
                                maxLength={30}
                                autoCapitalize='none'
                                secureTextEntry={newPassVis === true ? false : true}
                                onChangeText={val => setUpdatePass({...updatePass, password: val})}
                            />
                            <Feather 
                                name={newPassVis === true ? 'eye' : 'eye-off'}
                                color='#fff'
                                size={18}
                                style={{marginRight: 10, alignSelf: 'center'}}
                                onPress={() => setNewPassVis(!newPassVis)}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 20, marginHorizontal: 20}}>
                    <View>
                        <Text style={styles.header}>
                            Confirm New Password
                        </Text>
                        <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <TextInput 
                                placeholder='...'
                                placeholderTextColor='#ffffffa5'
                                style={[styles.textInputTitle, {width: '80%'}]}
                                maxLength={30}
                                autoCapitalize='none'
                                secureTextEntry={conPassVis === true ? false : true}
                                onChangeText={val => setUpdatePass({...updatePass, confirmPass: val})}
                            />
                            <Feather 
                                name={conPassVis === true ? 'eye' : 'eye-off'}
                                color='#fff'
                                size={18}
                                style={{marginRight: 10, alignSelf: 'center'}}
                                onPress={() => setConPassVis(!conPassVis)}
                            />
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleResetPassword}>
                    <View style={styles.button}>
                        <Text style={styles.buttontext}>
                            Reset Password
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack() }>
                    <Text style={{fontSize: 14, color: '#fff', alignSelf: 'center', margin: 20}}>
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

export default ForgotPassword;