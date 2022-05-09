import React, {useState, useEffect, useRef} from 'react';
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
    Linking,
    Image,
    Platform,
    Keyboard
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { updateUser, createImageAsset } from '../src/graphql/mutations';

import { Modal, Portal, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

import PublishingTerms from '../components/PublishingTerms';

const ArtistSetup = ({navigation} : any) => {

    //on render, request permission for camera roll
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    //const [userID, setUserID] = useState({})

    const route = useRoute();
    const {User} = route.params

    const [agree, setAgree] = useState(false);

    const [publishing, setPublishing] = useState(false);

    const [imageState, setImageState] = useState();
    const [imageTitleState, setImageTitleState] = useState();
    const [imageIndex, setImageIndex] = useState(0)

    const [data, setData] = useState({
        artistPseudo: '',
        isArtist: false,
        styles: [],
        artistText: ''
    });

    const [imageData, setImageData] = useState([])

    //art styles modal
    const [visible, setVisible] = useState(false);
    const showArtistModal = () => setVisible(true);
    const hideArtistModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

        //art styles modal
        const [visible2, setVisible2] = useState(false);
        const showImageModal = ({item, index} : any) => {
            setImageState(item.imageUri);
            setImageTitleState(item.imageTitle);
            setImageIndex(index)
            setVisible2(true);
        }
        const hideImageModal = () => setVisible2(false);


//function for the text input
    const textInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                artistPseudo: val,
            });
        } else {
            setData({
                ... data,
                artistPseudo: val,
            });
        }
    }

    //function for the text input
    const aboutInputChange = (val : any) => {
        if( val.length !== 0 ) {
            setData({
                ... data,
                artistText: val,
            });
        } else {
            setData({
                ... data,
                artistText: val,
            });
        }
    }

    const [textChange, setTextChange] = useState()

     //function for the text input
     const titleInputChange = (val : any) => {

        if( val.length !== 0 ) {
            setTextChange(val);
        } else {
            setTextChange(val);
        }
    }

    const UpdateStates = () => {
        let newState = [...imageData];

        newState[imageIndex].imageTitle = textChange;
        setImageData(newState);
        hideImageModal();
    }

    const handleUpdateAttributes = async () => {

        if ( data.artistPseudo.length !== 0 ) {
            setPublishing(true);
          const userInfo = await Auth.currentAuthenticatedUser();
  
            const updatedUser = { 
                id: userInfo.attributes.sub, 
                artistPseudo: data.artistPseudo.toLowerCase(), 
                isArtist: true,
                artistText: data.artistText,
                artStyles: data.styles,
            }
  
          if (userInfo) {
            let result = await API.graphql(
                graphqlOperation(updateUser, { input: updatedUser }
            ))

        if (imageData.length > 0) {
            for (let i = 0; i < imageData.length; i++) {
                if (imageData[i].imageUri) {
                    const response = await fetch(imageData[i].imageUri);
                    const blob = await response.blob();
                    const filename =  uuid.v4().toString();
                    const s3Response = await Storage.put(filename, blob);

                    let imageResult = await API.graphql(graphqlOperation(
                        createImageAsset, {input: {
                            userID: userInfo.attributes.sub,
                            imageUri: s3Response.key,
                            title: imageData[i].imageTitle,
                            isSample: true,
                            type: 'ImageAsset'
                        }}
                    ))
                    console.log(imageResult)
                }
                
            }
        }
            
        console.log(result);

          if (result) {navigation.navigate('Publisher', {update: 'art'})}
          setPublishing(false);
          }
      } else {
          alert('Please input a pseudonym')
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

    //styles list
    const artStyles = [
        {id: 0, style: 'Tempera'},
        {id: 1, style: 'Oil Paint'},
        {id: 2, style: 'Acrylic Paint'},
        {id: 3, style: 'Watercolors'},
        {id: 4, style: 'Charcoal'},
        {id: 5, style: 'Pastels'},
        {id: 6, style: 'Chalk'},
        {id: 7, style: 'Graphite Pencils'},
        {id: 8, style: 'Color Pencils'},
        {id: 9, style: 'Ink and Pen'},
        {id: 10, style: 'Collage'},
        {id: 11, style: '2D Digital Graphics'},
        {id: 12, style: '3D Digital Graphics'},
        {id: 13, style: 'Pixel Art'},
        {id: 14, style: 'Photgraphy'},
        {id: 15, style: 'Anime'},
        {id: 16, style: 'Caricature'},
        {id: 17, style: 'Cartoon'},
        {id: 18, style: 'Comic'},
        {id: 19, style: 'Line'},
        {id: 20, style: 'Realism'},
    ];

    const textRef = useRef();

    const FocusInput = () => { textRef.current.focus();}

    //pick the image from the camera roll
    const PickImage = async () => {

        if (imageData.length < 4) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled && imageData.length < 4) {
                    setImageData([
                        ...imageData,
                        {
                            imageIndex: imageData.length,
                            imageTitle: null,
                            imageUri: result.uri
                        }
                    ]);
                    }

            console.log(result);
        } else {
            alert ('You are only allowed a maximum of 4 images. To remove an image for upload, press and hold it for 3 seconds.')
        }
      };



    return(
        <Provider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <Portal>
                <Modal visible={visible} onDismiss={hideArtistModal} contentContainerStyle={containerStyle}>
                    <View style={{height: 500}}>
                        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>
                            Select Styles
                        </Text>
                        <ScrollView style={{marginTop: 40}} showsVerticalScrollIndicator={false}>
                            {artStyles.map(item => {

                                const [isChecked, setIsChecked] = useState(false);

                                const AddStyle = ({style} : any) => {

                                    setIsChecked(!isChecked);
                        
                                    if (data.styles.includes(style)) {
                                        setData({...data, styles: data.styles.filter(item => item !== style)})
                                     
                                    } else {
                                        setData({...data, styles: [...data.styles, style]})
                                    }
                                }

                                return (
                                    <TouchableWithoutFeedback onPress={() => AddStyle({style: item.style})}>
                                        <View style={{flexDirection: 'row', paddingVertical: 15, alignItems: 'center'}}>
                                            <FontAwesome5 
                                                name={isChecked === true ? 'check-square' : 'square'}
                                                size={17}
                                                color={isChecked === true ? 'cyan' : 'gray'}
                                                style={{paddingRight: 30}}
                                            />
                                            <Text style={{color: 'white'}}>
                                                {item.style}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }
                            )
                        }
                        </ScrollView>
                        <TouchableWithoutFeedback onPress={hideArtistModal}>
                            <View style={{marginTop: 10, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 20, alignSelf: 'center', backgroundColor: 'cyan'}}>
                                <Text style={{color: '#000'}}>
                                    Done
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                    </View>
                </Modal>

                <Modal visible={visible2} onDismiss={hideImageModal} contentContainerStyle={containerStyle}>
                    <View style={{alignItems: 'center'}}>
                        <Image 
                            source={{uri: imageState}}
                            style={{width: Dimensions.get('window').width - 40, height: 260}}
                        />
                        
                        <TextInput 
                            placeholder={imageTitleState ? imageTitleState : "Add Title"}
                            placeholderTextColor='#ffffff'
                            style={{color: '#fff', marginTop: 20, }}
                            maxLength={30}
                            onChangeText={(val) => titleInputChange(val)}
                            autoCapitalize='words'
                        />
                        <View style={{margin: 20}}>
                            <TouchableWithoutFeedback onPress={UpdateStates}>
                                <Text style={{borderRadius: 20, color: '#000', backgroundColor: 'cyan', paddingHorizontal: 20, paddingVertical: 6}}>
                                    Update
                                </Text>
                            </TouchableWithoutFeedback>
                            
                        </View>
                    </View>
                </Modal>
            </Portal>

            <ScrollView>
            <View style={{marginHorizontal: 20, marginTop: 50}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <View style={{alignSelf: 'center', padding: 30, margin: -30}}>
                                <FontAwesome5 
                                    name='chevron-left'  
                                    color="#fff"
                                    size={20}
                                    style={{alignSelf: 'center'}}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.header}>
                            Illustrator Setup
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

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Styles
                    </Text>
                    <TouchableWithoutFeedback onPress={showArtistModal}>
                        <View style={styles.inputfield}>
                            <Text style={{color: '#ffffffa5'}}>
                                Select styles
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView horizontal={true} scrollEnabled={false} contentContainerStyle={{flex: 1, flexDirection: "row", flexWrap: "wrap"}} style={{width: Dimensions.get('window').width}}>
                       {data.styles.map(item => {
                           return (
                                <Text style={{textTransform: 'capitalize', marginHorizontal: 20, marginTop: 20, color: '#00ffffa5', marginRight: 10}}>
                                    {item}
                                </Text>
                           )})
                        } 
                    </ScrollView>
                </View>
                              

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Blurb
                    </Text>
                    <TouchableWithoutFeedback onPress={FocusInput}>
                        <View style={[styles.inputfield, {height: 120}]}>
                            <TextInput 
                                placeholder='Say something about yourself'
                                placeholderTextColor='#ffffffa5'
                                style={styles.textInputTitle}
                                maxLength={250}
                                onChangeText={(val) => aboutInputChange(val)}
                                autoCapitalize='none'
                                ref={textRef}
                                multiline={true}
                                numberOfLines={8}
                                textAlignVertical='top'
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                

                <View style={{marginTop: 40}}>
                    <Text style={styles.inputheader}>
                        Add Portfolio
                    </Text>
                    <TouchableWithoutFeedback onPress={PickImage}>
                        <View style={styles.inputfield}>
                            <Text style={{color: '#ffffffa5'}}>
                                Select Artwork
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <ScrollView scrollEnabled={false} contentContainerStyle={{justifyContent: 'center', marginTop: 0, flexDirection: 'row', flexWrap: 'wrap',}} style={{width: Dimensions.get('window').width}}>
                       {imageData.map((item, index) => {

                            // let imageUri = item.imageUri
                            // let imageTitle = item.imageTitle
                            // let imageIndex = index

                           return (
                               <View>
                                   
                                    <TouchableOpacity 
                                        onPress={() => showImageModal({item, index})}
                                        onLongPress={() => {
                                            imageData.splice(index)
                                        }}
                                    >
                                   <Image 
                                        source={{uri: item.imageUri}}
                                        style={{ width: 160, height: 120, marginHorizontal: 5, borderRadius: 8, marginBottom: 10, marginTop: 30}}
                                    />
                                    <Text style={{color: '#fff', marginLeft: 10}}>
                                        {item.imageTitle}
                                    </Text>

                               </TouchableOpacity> 
                               </View>
                               
                               
                                
                           )})
                        } 
                    </ScrollView>
                </View>
                

                <View style={{marginVertical: 40}}>
                    
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
                                    Create Illustrator Profile
                                </Text>
                            )}
                        </View>
                </TouchableOpacity>
                    
                </View>
                </ScrollView>

        </View>
        </TouchableWithoutFeedback>
        </Provider>
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
});

export default ArtistSetup;