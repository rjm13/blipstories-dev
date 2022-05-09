import React, { useEffect, useState } from 'react';
import { 
    View, 
    ScrollView,
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    TextInput, 
    Platform, 
    ActivityIndicator,
    Keyboard 
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { updateUser } from '../src/graphql/mutations';
import { getUser } from '../src/graphql/queries';

import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import ImageCompress from '../components/functions/CompressImage'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Modal, Portal, Provider } from 'react-native-paper';
import uuid from 'react-native-uuid';


const EditProfile = ({navigation} : any) => {


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

//pick the image from the camera roll
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        let height = result.height
        let width = result.width
        let image = result.uri
    
        if (!result.cancelled) {
            let im = await ImageCompress(image, {width, height})
            setImage(im);
        }
      };

    //set the current user's id via route params
    const route = useRoute();
    const {User} = route.params

    //the current authenticated user object
    const [user, setUser] = useState(User)

    const [imageU, setImageU] = useState('');

    //determines if the user object updated. If it did, pull the info
    const [update, didUpdate] = useState(false);

//when didUpdate is called, pull the user attributes from AWS
    useEffect(() => {
        const fetchUser = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {
                const userData = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub}
                ))

                if (userData) {
                    setUser(userData.data.getUser);
                    let imageresponse = await Storage.get(userData.data.getUser.imageUri)
                    setImageU(imageresponse)
                    setVoiceState(userData.data.getUser.voice);
                }

                console.log(userData.data.getUser);

            } catch (e) {
                console.log(e);
            }
        }
        fetchUser();
      }, [update])

//PhotoModal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

//VoiceModal
const [visible3, setVisible3] = useState(false);
const showVoiceModal = () => setVisible3(true);
const hideVoiceModal = () => setVisible3(false);

//BioModal
const [visible5, setVisible5] = useState(false);
const showBioModal = () => setVisible5(true);
const hideBioModal = () => setVisible5(false);

//Narrator BioModal
const [visible6, setVisible6] = useState(false);
const showNarratorBioModal = () => setVisible6(true);
const hideNarratorBioModal = () => setVisible6(false);

//Artist BioModal
const [visible4, setVisible4] = useState(false);
const showArtistBioModal = () => setVisible4(true);
const hideArtistBioModal = () => setVisible4(false);


//pseudonym Modal
const [visible7, setVisible7] = useState(false);
const showPseudModal = () => setVisible7(true);
const hidePseudModal = () => setVisible7(false);

//narrator pseudonym Modal
const [visible11, setVisible11] = useState(false);
const showNarratorPseudModal = () => setVisible11(true);
const hideNarratorPseudModal = () => setVisible11(false);

//artist pseudonym Modal
const [visible10, setVisible10] = useState(false);
const showArtistPseudModal = () => setVisible10(true);
const hideArtistPseudModal = () => setVisible10(false);

//pseudonym Modal
const [visible8, setVisible8] = useState(false);
const showAccentsModal = () => {setVisible8(true); setAccentsData(user?.accents)}
const hideAccentsModal = () => setVisible8(false);

//pseudonym Modal
const [visible9, setVisible9] = useState(false);
const showStylesModal = () => {setVisible9(true); setStylesData(user?.artStyles)}
const hideStylesModal = () => setVisible9(false);

//Attribute states
const [ voiceState, setVoiceState ] = useState('');
const [ Bio, setBio ] = useState('');
const [ narratorBio, setNarratorBio ] = useState('');
const [ artistBio, setArtistBio ] = useState('');
const [image, setImage] = useState('');
const [Pseudonym, setPseudonym] = useState('');
const [ArtistPseudonym, setArtistPseudonym] = useState('');
const [NarratorPseudonym, setNarratorPseudonym] = useState('');

//if true, s3 is performing an action. also used to determine if anything is updating
const [isUploading, setIsUploading ] = useState(false);


//using the avatar key, get and update the imageuri for the user
const PublishAvatar = async () => {

    setIsUploading(true);

    const response = await fetch(image);

        const blob = await response.blob();

        const filename =  uuid.v4().toString();

        const s3Response = await Storage.put(filename, blob);
  
        const updatedUser = { id: user.id, imageUri: s3Response.key }
  
        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
            ))
        console.log(result);

    setIsUploading(false);
    hideModal();
};


//update the author's pseudonym
const handleUpdatePseudonym = async () => {

    setIsUploading(true);

    if ( Pseudonym.length !== 0 ) {

        const updatedUser = { id: user?.id, pseudonym: Pseudonym.toLowerCase() }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
        
            ))
        console.log(result);

    setIsUploading(false);
    hidePseudModal();
    }
}

//update the narrator's pseudonym
const handleUpdateNarratorPseudonym = async () => {

    setIsUploading(true);

    if ( NarratorPseudonym.length !== 0 ) {

        const updatedUser = { id: user?.id, artistPseudo: NarratorPseudonym.toLowerCase() }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
        
            ))
        console.log(result);

    setIsUploading(false);
    hideNarratorPseudModal();
    }
}

//update the artist's pseudonym
const handleUpdateArtistPseudonym = async () => {

    setIsUploading(true);

    if ( ArtistPseudonym.length !== 0 ) {

        const updatedUser = { id: user?.id, narratorPseudo: ArtistPseudonym.toLowerCase() }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
        
            ))
        console.log(result);

    setIsUploading(false);
    hideArtistPseudModal();
    }
}

//update the users bio text
const handleUpdateBio = async () => {

    setIsUploading(true);

    if ( Bio.length !== 0 ) {

        const updatedUser = { id: user.id, bio: Bio }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
        
        ))

      console.log(result);
      
      setIsUploading(false);
      hideBioModal();
      didUpdate(!update);
  }
}

//update the users narrator bio text
const handleUpdateNarratorBio = async () => {

    setIsUploading(true);

    if ( narratorBio.length !== 0 ) {

        const updatedUser = { id: user.id, narratorText: narratorBio }

        let result = await API.graphql(graphqlOperation(
            updateUser, { input: updatedUser }
        
        ))

      console.log(result);
      
      setIsUploading(false);
      hideNarratorBioModal();
      didUpdate(!update);
  }
}

//update the users narrator bio text
    const handleUpdateArtistBio = async () => {

        setIsUploading(true);

        if ( artistBio.length !== 0 ) {

            const updatedUser = { id: user.id, artistText: artistBio }

            let result = await API.graphql(graphqlOperation(
                updateUser, { input: updatedUser }
            
            ))

        console.log(result);
        
        setIsUploading(false);
        hideArtistBioModal();
        didUpdate(!update);
    }
    }


    //accent list
    const accents = [
        {id: 0, accent: 'Aristocratic'},
        {id: 1, accent: 'Scottish'},
        {id: 2, accent: 'Cockney'},
        {id: 3, accent: 'Irish'},
        {id: 4, accent: 'American'},
        {id: 5, accent: 'Southern'},
        {id: 6, accent: 'New York'},
        {id: 7, accent: 'Australian'},
        {id: 8, accent: 'Canadian'},
        {id: 9, accent: 'Minnesota'},
        {id: 10, accent: 'Boston'},
        {id: 11, accent: 'Arabic'},
        {id: 12, accent: 'Latin'},
        {id: 13, accent: 'Asian'},
        {id: 14, accent: 'African'},
        {id: 15, accent: 'Russian'},
        {id: 16, accent: 'German'},
        {id: 17, accent: 'Spanish'},
        {id: 18, accent: 'Indian'},
        {id: 19, accent: 'Italian'},
        {id: 20, accent: 'Other'},
    ];

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

    const [accentsData, setAccentsData] = useState([]);
    const [stylesData, setStylesData] = useState([]);

    const SubmitAccents = async () => {
        setIsUploading(true);
        let response = await API.graphql(graphqlOperation(
            updateUser, {input: {
                id: user?.id,
                accents: accentsData
            }}
        ))
        console.log(response);
        setIsUploading(false);
        hideAccentsModal();
    }

    const SubmitStyles = async () => {
        setIsUploading(true);

        let response = await API.graphql(graphqlOperation(
            updateUser, {input: {
                id: user?.id,
                artStyles: stylesData
            }}
        ))
        console.log(response);
        setIsUploading(false);
        hideStylesModal();
    }

    const SubmitVoice = async () => {
        setIsUploading(true)
        let response = await API.graphql(graphqlOperation(
            updateUser, {input: {
                id: user?.id,
                voice: voiceState
            }}
        ))
        console.log(response);
        didUpdate(!update);
        setIsUploading(false);
        hideVoiceModal();
    }

//render the page
    return (

    <Provider>   
    <View style={styles.container } >
        <Portal>

{/* //Update voice type  */}
            <Modal visible={visible3} onDismiss={hideVoiceModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>
                        Select Voice Type
                    </Text>
                    <View style={{backgroundColor: '#fff', height: 1, width: '90%', borderRadius: 10}}/>
                    <View style={{ marginTop: 30, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableWithoutFeedback onPress={() => {setVoiceState('feminine')}}>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesome5 
                                    name={voiceState === 'feminine' ? 'check-square' : 'square'}
                                    color={voiceState === 'feminine' ? 'cyan' : 'gray'}
                                    size={17}
                                />
                                <Text style={{paddingLeft: 20, color: "#fff"}}>
                                    Feminine
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <TouchableWithoutFeedback onPress={() => {setVoiceState('masculine')}}>
                            <View style={{flexDirection: 'row'}}>
                                <FontAwesome5 
                                    name={voiceState === 'masculine' ? 'check-square' : 'square'}
                                    color={voiceState === 'masculine' ? 'cyan' : 'gray'}
                                    size={17}
                                />
                                <Text style={{paddingLeft: 20, color: "#fff"}}>
                                    Masculine
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={SubmitVoice}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                     <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <Text style={{overflow: 'hidden', backgroundColor: 'cyan', borderRadius: 13, color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>   
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

{/* //Update artist pseudonym  */}
            <Modal visible={visible10} onDismiss={hideArtistPseudModal} contentContainerStyle={containerStyle}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter a new pseudonym
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder={user?.artistPseudo}
                            placeholderTextColor='gray'
                            style={[styles.nametext, {textTransform: 'capitalize'}]}
                            maxLength={20}
                            multiline={false}
                            onChangeText={val => setArtistPseudonym(val)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={handleUpdateArtistPseudonym}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                     <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <Text style={{overflow: 'hidden', backgroundColor: 'cyan', borderRadius: 13, color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>   
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>

{/* //Update narrator pseudonym  */}
            <Modal visible={visible11} onDismiss={hideNarratorPseudModal} contentContainerStyle={containerStyle}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter a new pseudonym
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder={user?.narratorPseudo}
                            placeholderTextColor='gray'
                            style={styles.nametext}
                            maxLength={20}
                            multiline={false}
                            onChangeText={val => setNarratorPseudonym(val)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={handleUpdateNarratorPseudonym}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                     <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <Text style={{overflow: 'hidden', backgroundColor: 'cyan', borderRadius: 13, color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>   
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>

{/* //Update pseudonym  */}
            <Modal visible={visible7} onDismiss={hidePseudModal} contentContainerStyle={containerStyle}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Enter a new pseudonym
                    </Text>
                    <View style={{ borderWidth: 0.3, borderColor: '#ffffffa5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <TextInput
                            placeholder={user?.pseudonym}
                            placeholderTextColor='gray'
                            style={styles.nametext}
                            maxLength={20}
                            multiline={false}
                            onChangeText={val => setPseudonym(val)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity
                            onPress={handleUpdatePseudonym}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                     <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <Text style={{overflow: 'hidden', backgroundColor: 'cyan', borderRadius: 13, color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>   
                                } 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>

{/* //Update about me blurb */}
            <Modal visible={visible5} onDismiss={hideBioModal} contentContainerStyle={containerStyle}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff'
                    }}>
                        Update Bio
                    </Text>
                    <View style={{ marginTop: 10, borderWidth: 0.2, borderColor: '#363636a5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <View style={styles.statuscontainermodal }> 
                            <TextInput 
                                placeholder={user?.bio || 'Say something about yourself'}
                                placeholderTextColor='#ffFFFFa5'
                                style={styles.textInput}
                                maxLength={250}
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={val => setBio(val)}
                                defaultValue={user?.bio || ''}
                            />
                        </View>
                    </View>

                    <View style={styles.button}>
                        <TouchableWithoutFeedback
                            onPress={handleUpdateBio}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <Text style={{overflow: 'hidden', backgroundColor: 'cyan', borderRadius: 13, color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                                } 
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>

{/* //Update narrator blurb */}
            <Modal visible={visible6} onDismiss={hideNarratorBioModal} contentContainerStyle={containerStyle}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff'
                    }}>
                        Update Narrator Bio
                    </Text>
                    <View style={{ marginTop: 10, borderWidth: 0.2, borderColor: '#363636a5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <View style={styles.statuscontainermodal }> 
                            <TextInput 
                                placeholder={user?.narratorText || 'Say something about yourself'}
                                placeholderTextColor='#ffFFFFa5'
                                style={styles.textInput}
                                maxLength={250}
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={val => setNarratorBio(val)}
                                defaultValue={user?.narratorText || ''}
                            />
                        </View>
                    </View>

                    <View style={styles.button}>
                        <TouchableWithoutFeedback
                            onPress={handleUpdateNarratorBio}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <Text style={{overflow: 'hidden', backgroundColor: 'cyan', borderRadius: 13, color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                                } 
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>

{/* //Update artist blurb */}
            <Modal visible={visible4} onDismiss={hideArtistBioModal} contentContainerStyle={containerStyle}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 16,
                        color: '#fff'
                    }}>
                        Update Arist Bio
                    </Text>
                    <View style={{ marginTop: 10, borderWidth: 0.2, borderColor: '#363636a5', width: '100%', alignItems: 'center', borderRadius: 8}}>
                        <View style={styles.statuscontainermodal }> 
                            <TextInput 
                                placeholder={user?.artistText || 'Say something about yourself'}
                                placeholderTextColor='#ffFFFFa5'
                                style={styles.textInput}
                                maxLength={250}
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={val => setArtistBio(val)}
                                defaultValue={user?.artistText || ''}
                            />
                        </View>
                    </View>

                    <View style={styles.button}>
                        <TouchableWithoutFeedback
                            onPress={handleUpdateArtistBio}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <Text style={{overflow:'hidden', backgroundColor: 'cyan', borderRadius: 13, color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Submit</Text>
                                } 
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>

{/* //Update Image modal */}
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity onPress={pickImage}>
                    <Image 
                        source={{ uri: image || imageU}} 
                        style={styles.modalavatar} 
                    />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 16,
                        paddingVertical: 16,
                        color: '#fff'
                    }}>
                        Select a new profile image
                    </Text>
                    <View style={styles.button}>
                            <View style={styles.savebutton} >
                                {isUploading ? (
                                    <ActivityIndicator size="small" color="#00ffff"/>
                                ) : 
                                    <TouchableOpacity onPress={PublishAvatar}>
                                        <Text style={{overflow: 'hidden', backgroundColor: 'cyan', borderRadius: 14, color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>
                                            Submit
                                        </Text>
                                    </TouchableOpacity> 
                                }   
                            </View>
                    </View>
                </View>
            </Modal>

{/* //Accents modal */}
            <Modal visible={visible8} onDismiss={hideAccentsModal} contentContainerStyle={containerStyle}>
                <View style={{height: 500}}>
                        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>
                            Select Proficient Accents
                        </Text>
                        <ScrollView style={{marginTop: 40}} showsVerticalScrollIndicator={false}>
                            {accents.map((item, index) => {

                                const [isChecked, setIsChecked] = useState();

                                useEffect(() => {
                                    if (accentsData.includes(item.accent)) {
                                        setIsChecked(true)
                                    }
                                })
                              
                                const AddAccent = ({accent} : any) => {

                                    setIsChecked(!isChecked);
                        
                                    if (accentsData.includes(accent)) {
                                        setAccentsData(accentsData.filter(item => item !== accent))
                                     
                                    } else {
                                        setAccentsData([...accentsData, accent])
                                    }
                                }

                                return (
                                    <TouchableWithoutFeedback onPress={() => AddAccent({accent: item.accent})}>
                                        <View style={{flexDirection: 'row', paddingVertical: 15, alignItems: 'center'}}>
                                            <FontAwesome5 
                                                name={isChecked === true ? 'check-square' : 'square'}
                                                size={17}
                                                color={isChecked === true ? 'cyan' : 'gray'}
                                                style={{paddingRight: 30}}
                                            />
                                            <Text style={{color: 'white'}}>
                                                {item.accent}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }
                            )
                        }
                        </ScrollView>
                        
                            {isUploading === true ? (
                                <ActivityIndicator size='small' color='cyan'/>
                            ) : (
                                <TouchableWithoutFeedback onPress={SubmitAccents}>
                                    <View style={{marginTop: 10, borderRadius: 20, paddingVertical: 6, paddingHorizontal: 20, alignSelf: 'center', backgroundColor: 'cyan'}}>
                                        <Text style={{color: '#000'}}>
                                            Done
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>    
                            )}
                    </View> 
            </Modal>
{/* //Styles modal */}
            <Modal visible={visible9} onDismiss={hideStylesModal} contentContainerStyle={containerStyle}>
                <View style={{height: 500}}>
                        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold', alignSelf: 'center'}}>
                            Select Art Styles
                        </Text>
                        <ScrollView style={{marginTop: 40}} showsVerticalScrollIndicator={false}>
                            {artStyles.map(item => {

                                const [isChecked, setIsChecked] = useState(false);

                                useEffect(() => {
                                    if (stylesData.includes(item.style)) {
                                        setIsChecked(true)
                                    }
                                })

                                const AddStyle = ({style} : any) => {

                                    setIsChecked(!isChecked);
                        
                                    if (stylesData.includes(style)) {
                                        setStylesData(stylesData.filter(item => item !== style))
                                     
                                    } else {
                                        setStylesData([...stylesData, style])
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
                        {isUploading === true ? (
                                <ActivityIndicator size='small' color='cyan'/>
                            ) : (
                                <TouchableWithoutFeedback onPress={SubmitStyles}>
                                    <View style={{overflow: 'hidden', marginTop: 10, borderRadius: 13, paddingVertical: 6, paddingHorizontal: 20, alignSelf: 'center', backgroundColor: 'cyan'}}>
                                        <Text style={{color: '#000'}}>
                                            Done
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>    
                            )}
                        
                    </View>
                </Modal>
    
        </Portal>

{/* primary visible content */}
            <ScrollView>
                <View style={{  alignItems: 'center', flexDirection: 'row', marginTop: 50, marginBottom: 20, marginHorizontal: 20,}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    
                    <Text style={{color: '#fff', fontSize: 22, fontWeight: 'bold', marginHorizontal: 40}}>
                        Edit Profile
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={showModal}>
                    <View style={styles.photocontainer }>
                        <Text style={ styles.words }>Photo</Text>
                        <Image 
                            source={user?.imageUri ? { uri: imageU} : require('../assets/images/blankprofile.png')} 
                            style={styles.avatar} 
                        />
                    </View>
                </TouchableWithoutFeedback>

                {user?.isPublisher === true ? (
                    <TouchableWithoutFeedback onPress={showPseudModal}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
                            <View>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Pseudonym
                                </Text>
                                <Text style={{ color: 'gray', fontSize: 12}}>
                                    Author
                                </Text>
                            </View>
                            <Text style={{color: '#ffffffa5', fontSize: 16, fontWeight: 'normal', textTransform: 'capitalize'}}>
                                {user?.pseudonym}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>    
                    ) : null}

                {user?.isNarrator === true ? (
                    <TouchableWithoutFeedback onPress={showNarratorPseudModal}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
                            <View>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Pseudonym
                                </Text>
                                <Text style={{ color: 'gray', fontSize: 12}}>
                                    Narrator
                                </Text>
                            </View>
                            <Text style={{color: '#ffffffa5', fontSize: 16, fontWeight: 'normal', textTransform: 'capitalize'}}>
                                {user?.narratorPseudo}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>    
                    ) : null}

                {user?.isArtist === true ? (
                    <TouchableWithoutFeedback onPress={showArtistPseudModal}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20}}>
                            <View>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Pseudonym
                                </Text>
                                <Text style={{ color: 'gray', fontSize: 12}}>
                                    Artist
                                </Text>
                            </View>
                            <Text style={{color: '#ffffffa5', fontSize: 16, fontWeight: 'normal', textTransform: 'capitalize'}}>
                                {user?.artistPseudo}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>    
                    ) : null}

                {user?.isPublisher === true ? (
                <View>
                    <Text style={{ marginTop: 20, marginLeft: 20, color: '#fff', fontSize: 16}}>
                        Publisher Bio
                    </Text>
                    
                    <TouchableWithoutFeedback onPress={showBioModal}>
                        <View style={styles.statuscontainer}> 
                            <Text style={{fontSize: 14, color: '#ffffffa5', padding: 10}}>
                                {user?.bio || 'Say something about yourself'}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                ) : null}

                {user?.isNarrator === true ? (
                    <View>
                        <Text style={{ marginTop: 20, marginLeft: 20, color: '#fff', fontSize: 16}}>
                            Narrator Bio
                        </Text>
                        
                        <TouchableWithoutFeedback onPress={showNarratorBioModal}>
                            <View style={styles.statuscontainer}> 
                                <Text style={{fontSize: 14, color: '#ffffffa5', padding: 10}}>
                                    {user?.narratorText || 'Say something about yourself'}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ) : null}

                {user?.isArtist === true ? (
                <View>
                    <Text style={{ marginTop: 20, marginLeft: 20, color: '#fff', fontSize: 16}}>
                        Artist Bio
                    </Text>
                    
                    <TouchableWithoutFeedback onPress={showArtistBioModal}>
                        <View style={styles.statuscontainer}> 
                            <Text style={{fontSize: 14, color: '#ffffffa5', padding: 10}}>
                                {user?.artistText || 'Say something about yourself'}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                ) : null}

                {user?.isArtist === true ? (
                    <TouchableWithoutFeedback onPress={showStylesModal}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingRight: 40}}>
                            <Text style={{fontSize: 16, color: '#fff'}}>
                                Art Styles
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                size={18}
                                color='#fff'
                            />
                        </View>
                    </TouchableWithoutFeedback>
                ) : null}

                {user?.isNarrator === true ? (
                    <TouchableWithoutFeedback onPress={showAccentsModal}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingRight: 40}}>
                            <Text style={{fontSize: 16, color: '#fff'}}>
                                Accents
                            </Text>
                            <FontAwesome5 
                                name='chevron-right'
                                size={18}
                                color='#fff'
                            />
                        </View>
                    </TouchableWithoutFeedback>
                ) : null}

                {user?.isNarrator === true ? (
                    <TouchableWithoutFeedback onPress={showVoiceModal}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingRight: 40}}>
                            <Text style={{fontSize: 16, color: '#fff'}}>
                                Voice Type
                            </Text>
                            <Text style={{textTransform: 'capitalize', color: '#ffffffa5'}}>
                                {user?.voice}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ) : null}


               

                <View style={{height: 100}}/>
            </ScrollView>
            <StatusBar style="light" />
        </View>            
    </Provider> 
);}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#363636a5',
        flex: 1,
        justifyContent: 'space-between',
    },
    photocontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    namecontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    statuscontainer: {
        backgroundColor: '#363636a5',
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 10,
        //height: 140
    },
    statuscontainermodal: {
        backgroundColor: '#303030',
        padding: 10, 
        width: '100%',
        alignSelf: 'center',
        borderRadius: 15,
        marginVertical: 10,
    },
    emailcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    smallcontainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignSelf: 'center',
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
    },
    nametext: {
        fontSize: 16,
        color: '#00FFFF',
        textAlign: 'right',
        paddingVertical: 4
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
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        margin: 16,
      },
      modalavatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        margin: 16,
        backgroundColor: 'gray'
        
      },
      textInput: {
        //flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        color: '#ffffffa5',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginVertical: 30,
    },
    savebutton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    savewords: {
        fontSize: 14,
        paddingVertical: 5,
        paddingHorizontal: 20,
        color: '#fff',
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 15,

    },
    deletecontainer: {
        margin: 50,
        alignItems: 'center',    
    },
    deletewords: {
        fontSize: 18,
        padding: 16,
        color: 'gray',
        //alignSelf: 'center',
    },
})