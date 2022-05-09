import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableWithoutFeedback, 
    TouchableOpacity,  
    TextInput,
    ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';

import { Modal, Portal, Provider } from 'react-native-paper';

const AccountScreen = ({navigation} : any) => {


//Attribute states
    const [ Name, setName ] = useState('');
    const [ Email, setEmail ] = useState('');
    const [ confirmCode, setConfirmCode] = useState('');
    const [ Password, setPassword] = useState('');
    const [ oldPassword, setOldPassword] = useState('');



    const [passVisible, setPassVisible] = useState(true);
    const [oldPassVisible, setOldPassVisible] = useState(true);

    //uploading state
    const [isUploading, setIsUploading ] = useState(false);

//update the users name
const handleUpdateName = async () => {

    setIsUploading(true);

    if ( Name.length !== 0 ) {

        const updatedUser = { id: user?.id, name: Name }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
        
            ))
        console.log(result);

    setIsUploading(false);
    hideNameModal();
    }
}

//the current authenticated user object
    const [user, setUser] = useState()
    const [authUser, setAuthUser] = useState()

//determines if the user object updated. If it did, pull the info
    const [update, didUpdate] = useState(false);

//when didUpdate is called, pull the user attributes from AWS
    useEffect(() => {
        const fetchUser = async () => {
        
            const userInfo = await Auth.currentAuthenticatedUser();

            console.log(userInfo.attributes)

            setAuthUser(userInfo);

            if (!userInfo) {return;}

            try {
                const userData = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub}
                ))

                if (userData) {
                    setUser(userData.data.getUser);
                }


            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();
    }, [update])


//NameModal
    const [visible, setVisible] = useState(false);
    const showNameModal = () => setVisible(true);
    const hideNameModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

//EmailModal
    const [visible4, setVisible4] = useState(false);
    const showEmailModal = () => setVisible4(true);
    const hideEmailModal = () => setVisible4(false);

//PassModal
    const [visible6, setVisible6] = useState(false);
    const showPassModal = () => setVisible6(true);
    const hidePassModal = () => setVisible6(false);


//SignOutModal
    const [visible2, setVisible2] = useState(false);
    const showSignOutModal = () => setVisible2(true);
    const hideSignOutModal = () => setVisible2(false);

//update the users email address as a user attribute in cognito
    const handleUpdateEmail = async () => {

        setIsUploading(true);

        if ( Email.length !== 0 ) {

            let emailaddress = Email.replace(/ /g,'')
            
            const userInfo = await Auth.currentAuthenticatedUser();

            if (userInfo) {
                let result = await Auth.updateUserAttributes(userInfo, {'email': emailaddress})
                console.log(result);
            } else {
                alert('Error: Please enter a different email or try again later.')
            }
        }
        didUpdate(!update);
        setIsUploading(false);
    }

//update the users password
    const handleUpdatePassword = async () => {

        setIsUploading(true);
        const userInfo = await Auth.currentAuthenticatedUser();

        let result = await Auth.changePassword(userInfo, oldPassword, Password);
        console.log(result); // SUCCESS  
        setIsUploading(false); 
        hidePassModal();
    }

//verify with a confirmation code
    const handleConfirmCode = async () => {

        setIsUploading(true);

        let result = await Auth.verifyCurrentUserAttributeSubmit(
            'email',
            confirmCode,
            );
        console.log(result); // SUCCESS  

        setIsUploading(false);
        hideEmailModal();
    }

//sign out function
    async function signOut() {
        try {
            await Auth.signOut()
            .then(() => navigation.replace('SignIn'))
        } catch (error) {
            console.log('error signing out: ', error);
            alert("error signing out")
        }
    }

    return (
        <Provider>
            <Portal>
{/* //Update name  */}
                <Modal visible={visible} onDismiss={hideNameModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                        }}>
                            Enter a new name
                        </Text>
                        <View style={{ borderWidth: 0.3, paddingVertical: 4, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                            <TextInput
                                placeholder={user?.name}
                                placeholderTextColor='gray'
                                style={[styles.nametext, {textTransform: 'capitalize'}]}
                                maxLength={30}
                                multiline={false}
                                onChangeText={val => setName(val)}
                                //defaultValue={user?.name}
                            />
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={handleUpdateName}>
                                <View style={styles.savebutton} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                    ) : 
                                        <Text style={{overflow: 'hidden', borderRadius: 13, backgroundColor: 'cyan', color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text> 
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

{/* //Update Email Address */}
                <Modal visible={visible4} onDismiss={hideEmailModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                        }}>
                                Enter a new email
                        </Text>
                        <View style={{paddingVertical: 4, borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                            <TextInput
                                placeholder={authUser?.attributes.email}
                                placeholderTextColor='gray'
                                style={styles.nametext}
                                maxLength={40}
                                multiline={false}
                                onChangeText={val => setEmail(val)}
                            />
                        </View>
                        
                        <View style={styles.button}>
                            <TouchableOpacity onPress={handleUpdateEmail} >
                                <View style={styles.savebutton} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                    ) : 
                                        <Text style={{overflow: 'hidden', borderRadius: 13, backgroundColor: 'cyan', color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Send Code</Text>
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                        }}>
                            Enter confirmation code
                        </Text>

                        <View style={{ paddingVertical: 4, borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                            <TextInput
                                placeholder='- - - - - -'
                                placeholderTextColor='#00ffffa5'
                                style={styles.nametext}
                                maxLength={6}
                                onChangeText={val => setConfirmCode(val)}
                            />
                        </View>   

                        <View style={styles.button}>
                            <TouchableOpacity onPress={handleConfirmCode} >
                                <View style={styles.savebutton} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                    ) : 
                                        <Text style={{overflow: 'hidden', borderRadius: 13, backgroundColor: 'cyan', color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

{/* //Sign Out modal */}
                <Modal visible={visible2} onDismiss={hideSignOutModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                        }}>
                            Are you sure you want to log out?
                        </Text>
                        
                        <View style={styles.button}>
                            <TouchableOpacity onPress={signOut}>
                                <View style={styles.savebutton} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                    ) : 
                                        <Text style={{overflow: 'hidden', borderRadius: 13, backgroundColor: 'cyan', color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Log Out</Text> 
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

{/* //Reset password modal */}
                <Modal visible={visible6} onDismiss={hidePassModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                        }}>
                            Enter new password
                        </Text>

                        <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8, borderWidth: 0.3, paddingVertical: 4}}>  
                            <TextInput
                                placeholder=''
                                placeholderTextColor='#00ffffa5'
                                style={[styles.nametext, {width: '80%', paddingVertical: 4}]}
                                maxLength={18}
                                onChangeText={val => setPassword(val)}
                                secureTextEntry={passVisible === true ? true : false}
                            />
                            <FontAwesome5 
                                name={passVisible === true ? 'eye-slash' : 'eye'}
                                color='#fff'
                                size={14}
                                onPress={() => setPassVisible(!passVisible)}
                            />
                        </View>

                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                        }}>
                            Enter old password
                        </Text>

                        <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>  
                            <TextInput
                                placeholder=''
                                placeholderTextColor='gray'
                                style={[styles.nametext, {width: '80%', paddingVertical: 4}]}
                                maxLength={18}
                                onChangeText={val => setOldPassword(val)}
                                secureTextEntry={oldPassVisible === true ? true : false}
                            />
                            <FontAwesome5 
                                name={oldPassVisible === true ? 'eye-slash' : 'eye'}
                                color='#fff'
                                size={14}
                                onPress={() => setOldPassVisible(!oldPassVisible)}
                            />
                        </View>

                        <View style={styles.button}>
                            <TouchableOpacity onPress={handleUpdatePassword}>
                                <View style={styles.savebutton} >
                                    {isUploading ? (
                                        <ActivityIndicator size="small" color="#00ffff"/>
                                    ) :
                                        <Text style={{overflow: 'hidden', borderRadius: 13, backgroundColor: 'cyan',color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>                               
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </Portal>
            <View>
                
                <LinearGradient
                    colors={['#363636a5', '#363636a5', 'black']}
                    //style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    
                    <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <View style={{padding: 30, margin:-30}}>
                                <FontAwesome5 
                                    name='chevron-left'
                                    color='#fff'
                                    size={20}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
                        
                        <Text style={styles.header}>
                            Account
                        </Text>
                    </View>
                    
                    <ScrollView style={{ height: '86%'}}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
                            <View style={styles.subblock}>
                                <Text style={[styles.paragraph, {textTransform: 'capitalize'}]}>
                                   {user?.plan}
                                </Text>
                                <Text style={styles.subparagraph}>
                                    Change your plan
                                </Text>
                            </View>
                        </View>

                        <TouchableWithoutFeedback onPress={showNameModal}>
                            <View style={styles.emailcontainer }> 
                                <Text style={ styles.words }>Name</Text>
                                <Text style={ [styles.placeholdertext, {textTransform: 'capitalize'}] }>{user?.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={showEmailModal}>
                            <View style={styles.emailcontainer }> 
                                <Text style={ styles.words }>Email</Text>
                                <Text style={ styles.placeholdertext }>{authUser?.attributes.email}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={showPassModal}>
                            <View style={styles.smallcontainer }>
                                <Text style={ styles.words }>Reset Password</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={showSignOutModal}>
                            <View style={styles.smallcontainer }>
                                <Text style={ styles.words }>Log Out</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                
                            </View>
                        </TouchableWithoutFeedback>
                    
                        
                    </ScrollView>  
                </LinearGradient>
                <StatusBar style="light" />
            </View>
        </Provider>
        
    );
}

const styles = StyleSheet.create ({
    container: {
        //flex: 1
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
    },
    paragraph: {
        fontSize: 16,
        color: '#ffffff'
    },
    subparagraph: {
        fontSize: 12,
        color: '#ffffffa5'
    },
    subblock: {
        width: '75%',
    },
    emailcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    placeholdertext: {
        fontSize: 16,
        color: '#ffffffa5',
        textAlign: 'right',
    },
    words: {
        fontSize: 16,
        marginVertical: 20,
        color: '#fff',
    },
    button: {
        alignItems: 'center',
        marginVertical: 30,
    },
    savebutton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    nametext: {
        fontSize: 16,
        color: '#00FFFF',
        //textAlign: 'center',
    },
    smallcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
});

export default AccountScreen;