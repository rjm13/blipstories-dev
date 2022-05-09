import React, {useState, useContext} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Dimensions, 
    TextInput, 
    Linking,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '../../AppContext';
import Feather from 'react-native-vector-icons/Feather';
import { StatusBar } from 'expo-status-bar';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';



const SignIn = ({navigation} : any) => {

    const [seePass, setSeePass] = useState(false);

    const [isErr, setIsErr] = useState(false);

    const [signingIn, setSigningIn] = useState(false);

    const { userID, setUserID } = useContext(AppContext);

    const [trigger, setTrigger] = useState(false);


    const CreateUser = async () => {
    
        const userInfo = await Auth.currentAuthenticatedUser(
            { bypassCache: true }
          );
    
          if (userInfo === 'The user is not authenticated') {
            return;
          }
    
          else if (userInfo) {
          //get the user from Backend with the user SUB from Auth
            const userData = await API.graphql(
              graphqlOperation(
                getUser, 
                { id: userInfo.attributes.sub,
                }
              )
            )
    
            if (userData.data.getUser) {
                //console.log("User is already registered in database");
                setUserID(userData.data.getUser);
                setIsErr(false);
                setTrigger(!trigger);
                navigation.navigate('Redirect', {trigger: Math.random()});
                return;
            };
          }
        }

    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const handlePassword = (val : any) => {
        setData({
            ... data,
            password: val
        });
    }

    const handleUsername = (val : any) => {
        setData({
            ... data,
            username: val
        });
    }

    async function signIn() {
        setSigningIn(true);
        const {username, password} = data;
        try {
            await Auth.signIn(username.replace(/ /g, ''), password)
            .then (CreateUser)
        } 
        catch (error) {
            console.log('error signing in', error)
            setIsErr(true)
        }
        setSigningIn(false);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <LinearGradient
                colors={['#00ffffa5','#000', '#000', '#000']}
                style={styles.container}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <View style={{ margin: 20}}>
                    {isErr ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10}}>
                        <Text style={{borderRadius: 15, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, color: 'red', fontSize: 13, }}>
                            Error signing in. Please try again.
                        </Text>
                    </View>
                    ) : null}
                    <View>
                        <Text style={styles.header}>
                            Email
                        </Text>
                        <View style={styles.inputfield}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={40}
                                onChangeText={handleUsername}
                                autoCapitalize='none'
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.header}>
                            Password
                        </Text>
                        <View style={[styles.inputfield, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                            <TextInput 
                                placeholder='....'
                                placeholderTextColor='#ffffffa5'
                                style={[styles.textInputTitle, {width: '80%'}]}
                                maxLength={30}
                                secureTextEntry={seePass === true ? false : true}
                                onChangeText={handlePassword}
                                autoCapitalize='none'
                            />
                            <Feather 
                                name={seePass === true ? 'eye' : 'eye-off'}
                                color='#fff'
                                size={18}
                                style={{marginRight: 10, alignSelf: 'center'}}
                                onPress={() => setSeePass(!seePass)}
                            />
                        </View>
                    </View>

                    <View style={{width: Dimensions.get('window').width - 60, alignSelf: 'center', marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row', marginTop: 30}}>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <View style={{  }}>
                                <Text style={{ fontSize: 14, color: '#ffffffa5', alignSelf: 'center'}}>
                                    Forgot password
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Linking.openURL('mailto:martianspidermedia@gmail.com') }>
                            <View style={{ }}>
                                <Text style={{ fontSize: 14, color: '#ffffffa5', alignSelf: 'center'}}>
                                    Contact us
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{alignSelf: 'center', width: Dimensions.get('window').width - 60, borderTopWidth: 1, borderColor: '#ffffffa5',}}>

                    </View>
                    

                </View>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp') }>
                    <Text style={{ fontSize: 14, color: '#fff', alignSelf: 'center', margin: 20}}>
                        Create an account
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={signIn}>
                    <View style={styles.button}>
                        {signingIn === true ? (
                            <ActivityIndicator size="small" color="cyan"/>
                        ) : (
                            <Text style={styles.buttontext}>
                                Sign In
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </LinearGradient>
            <StatusBar style="light" backgroundColor ='transparent' />
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create ({
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

export default SignIn;