import React, {useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    ActivityIndicator, 
    Dimensions, 
    TouchableOpacity, 
    TextInput, 
    ScrollView,
    Platform,
    Keyboard,
    Linking
} from 'react-native';

import PublishingTerms from '../components/PublishingTerms';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { updateUser } from '../src/graphql/mutations';

const PublishingSetup = ({navigation} : any) => {

    //const [userID, setUserID] = useState({})

    const route = useRoute();
    const {User} = route.params

    const [agree, setAgree] = useState(false);

    const [publishing, setPublishing] = useState(false);

    const [data, setData] = useState({
        pseudonym: '',
        publisher: false, 
    });


//function for the text input
    const textInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                pseudonym: val,
            });
        } else {
            setData({
                ... data,
                pseudonym: val,
            });
        }
    }

    const handleUpdateAttributes = async () => {

        if ( data.pseudonym.length !== 0 ) {

        setPublishing(true);

          const userInfo = await Auth.currentAuthenticatedUser();
  
            const updatedUser = { 
                id: userInfo.attributes.sub, 
                pseudonym: data.pseudonym.toLowerCase(), 
                bio: Bio,
                isPublisher: true }
  
          if (userInfo) {
            let result = await API.graphql(
                graphqlOperation(updateUser, { input: updatedUser }
            ))
            
            console.log(result);

          if (result) {navigation.navigate('Publisher', {update: 'pub'})}
          setPublishing(false);
          }
      } else {
          alert ('Please input a pseudonym')
      }
  }

  const updateAsPublisher = async () => {
    if (agree === true) {
        
        handleUpdateAttributes();
    }
    else {
        alert('You must agree to the Publishing Terms and Conditions to continue.')
    }
    
    }

    const [ Bio, setBio ] = useState('');



    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
            <View style={{marginHorizontal: 20, marginTop: 50}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <View style={{padding: 30, margin: -30}}>
                                <FontAwesome5 
                                    name='chevron-left'  
                                    color="#fff"
                                    size={20}
                                    style={{alignSelf: 'center'}}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.header}>
                            Publisher Setup
                        </Text>
                    </View>
                </View>  
            </View>

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Pseudonym
                    </Text>
                    <View style={styles.inputfield}>
                        <TextInput 
                            placeholder='....'
                            placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            maxLength={30}
                            onChangeText={(val) => textInputChange(val)}
                            autoCapitalize='words'
                        />
                    </View>
                </View>

                <View style={{ marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Publisher Blurb
                    </Text>
                    <View style={{ alignSelf: 'center', marginTop: 0, borderWidth: 0.2, borderColor: '#363636a5', width: '90%', alignItems: 'center', borderRadius: 8}}>
                        <View style={styles.statuscontainermodal }> 
                            <TextInput 
                                placeholder={'Say something about yourself'}
                                placeholderTextColor='#ffFFFFa5'
                                style={styles.textInput}
                                maxLength={250}
                                multiline={true}
                                numberOfLines={8}
                                textAlignVertical='top'
                                onChangeText={val => setBio(val)}
                                autoCapitalize='sentences'
                                //defaultValue={user?.bio || ''}
                            />
                        </View>
                    </View>
                </View>

                <View style={{marginTop: 40}}>
                    
                    {/* <PublishingTerms /> */}
                
                    <TouchableWithoutFeedback onPress={() => setAgree(!agree)}>
                        <View style={{flexDirection: 'row', marginTop: 40, alignSelf: 'center', alignItems: 'center'}}>
                            <FontAwesome 
                                name={ agree ? 'check-circle' : 'check-circle-o'}
                                size={20} 
                                color={ agree ? 'cyan' : '#ffffffa5'} 
                            />
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={{color: '#fff', marginLeft: 10, fontSize: 12,}}>
                                    I agree to the 
                                </Text>
                                <TouchableOpacity onPress={() => Linking.openURL('http://www.blipstories.com/terms')}>
                                    <Text style={{color: '#fff', marginLeft: 4, fontSize: 12,}}>
                                        Publishing Terms and Conditions
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableOpacity onPress={updateAsPublisher}>
                        <View style={styles.button}>
                            {publishing === true ? (
                                <ActivityIndicator size="small" color="cyan"/>
                            ) : (
                                <Text style={styles.buttontext}>
                                    Create Publisher Profile
                                </Text>
                            )}
                        </View>
                </TouchableOpacity>
                    
                </View>

        </ScrollView>
        </TouchableWithoutFeedback>
    
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40
    },
    inputheader: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10
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
        margin: 40,
     },
     buttontext: {
         backgroundColor: 'cyan',
         borderRadius: 17,
         paddingVertical: 10,
         paddingHorizontal: 20,
         overflow: 'hidden'
     },
     textInput: {
        //flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#ffffffa5',
        fontSize: 14,
        paddingVertical: 20
     },
     statuscontainermodal: {
        backgroundColor: '#303030',
        padding: 10, 
        width: '100%',
        alignSelf: 'center',
        borderRadius: 15,
    },
});

export default PublishingSetup;