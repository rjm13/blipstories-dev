import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback, 
    TouchableOpacity,  
    Image,
    ActivityIndicator,
    RefreshControl,
    FlatList,
    TextInput,
    Platform,
    ScrollView,
    Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';
import uuid from 'react-native-uuid';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
import { format, parseISO } from "date-fns";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import { updateAudioAsset, createAudioAsset, deleteAudioAsset, createMessage, updateMessage } from '../src/graphql/mutations';





const SharedAssets = ({navigation} : any) => {

    //request permission to access camera roll
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

      const [updateAssetState, setUpdateAssetState] = useState();


    const Item = ({id, title, time, userID, sharedUserID, audioUri, isSample, createdAt, pseudonym} : any) => {

    //convert the time to show in the modal
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(time / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);  
    }  

    return (
        <View>
            <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={styles.name}>
                            {title}
                        </Text>
                        <Text style={{color: '#ffffffa5', marginTop: 2}}>
                            {millisToMinutesAndSeconds()}
                        </Text>
                    </View>
                    
                    <View style={{ flexDirection: 'row', }}>
                        <TouchableWithoutFeedback onPress={() => {showDeleteModal(); setDeleteId(id)}}>
                            <View style={{alignItems: 'center', paddingRight: 10}}>
                                <FontAwesome5 
                                    name='trash'
                                    size={18}
                                    color='#fff'
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableOpacity onPress={() => navigation.navigate('SimpleAudioPlayer', {item: null, cloudItem: id})}>
                            <View style={{alignItems: 'center', paddingHorizontal: 20}}>
                                <FontAwesome5 
                                    name='play'
                                    size={18}
                                    color='#fff'
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> 
                
                <View style={{flexDirection: 'row', width: '100%', marginTop: 4}}>
                    {sharedUserID ? (
                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: sharedUserID})}>
                            <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color: 'gray', }}>
                                    Shared with
                                </Text>
                                <Text style={{marginLeft: 4, color: 'gray', textTransform: 'capitalize'}}>
                                    {pseudonym}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        
                    ) : (
                        <TouchableWithoutFeedback onPress={() => {showShareModal(); setUpdateAssetState(id)}}>
                            <View style={{alignItems: 'center', marginTop: 12, width: 72, paddingVertical: 4, borderRadius: 20, backgroundColor: '#00ffffa5'}}>
                                <Text style={{color: '#000'}}>
                                    Share
                                </Text> 
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
            </View>
        </View>
        )
    }

    const SampleItem = ({id, title, audioUri, time, isSample, userID, createdAt} : any) => {

        //convert the time to show in the modal
            function millisToMinutesAndSeconds () {
                let minutes = Math.floor(time / 60000);
                let seconds = Math.floor((time % 60000) / 1000);
                return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);  
            }  

        return (
            <View>
                <View style={styles.tile}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.name}>
                                {title}
                            </Text>
                            <Text style={{color: '#ffffffa5'}}>
                                {millisToMinutesAndSeconds()}
                            </Text>
                        </View>
                        
                        <View style={{flexDirection: 'row', marginRight: 20, alignSelf: 'center'}}>
                            <TouchableWithoutFeedback onPress={() => {showDeleteModal(); setDeleteId(id)}}>
                                <View style={{alignItems: 'center', paddingRight: 10}}>
                                    <FontAwesome5 
                                        name='trash'
                                        size={18}
                                        color='#fff'
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableOpacity onPress={() => navigation.navigate('SimpleAudioPlayer', {item: null, cloudItem: id})}>
                                <View style={{alignItems: 'center', paddingHorizontal: 20}}>
                                    <FontAwesome5 
                                        name='play'
                                        size={18}
                                        color='#fff'
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                    </View> 
                    
                    
                </View>
            </View>
        )
    }

    const renderSampleItem = ({ item }: any) => {

        let pseudonym = ''

        if (item.sharedUser) {
            pseudonym = item.sharedUser.pseudonym
        }
        
        return (
        <SampleItem 
            id={item.id}
            title={item.title}
            audioUri={item.audioUri}
            time={item.time}
            isSample={item.isSample}
            userID={item.userID}
            sharedUserID={item.sharedUserID}
            createdAt={item.createdAt}
            pseudonym={pseudonym}
        />
      );}

    const renderItem = ({ item }: any) => {

        let pseudonym = ''

        if (item.sharedUser) {
            pseudonym = item.sharedUser.pseudonym
        }
        
        return (
        <Item 
            id={item.id}
            title={item.title}
            audioUri={item.audioUri}
            time={item.time}
            isSample={item.isSample}
            userID={item.userID}
            sharedUserID={item.sharedUserID}
            createdAt={item.createdAt}
            pseudonym={pseudonym}
        />
      );}

    
    //update trigger for fetching the stories
    const [didUpdate, setDidUpdate] = useState(false);

    const [audioAssets, setAudioAssets] = useState([])

    const [audioSamples, setAudioSamples] = useState([]);

    //on render, list the sample audios for that user
    // useEffect(() => {

    //     const fetchAssets = async () => {

    //         let samplearr = []

    //         setIsLoading(true);

    //         const userInfo = await Auth.currentAuthenticatedUser();

    //         if (!userInfo) {return;}

    //         try {

    //             const userAssets = await API.graphql(graphqlOperation(
    //                 getUser, {id: userInfo.attributes.sub
    //             }))

    //             for (let i = 0; i < userAssets.data.getUser.sharedAssets.items.length; i++) {
    //                 if (userAssets.data.getUser.sharedAssets.items[i].isSample === true) {
    //                     samplearr.push(userAssets.data.getUser.sharedAssets.items[i])
    //                 }
    //             }
    //             setAudioSamples(samplearr);


                
    //             setIsLoading(false);

    //         } catch (e) {
    //         console.log(e);
    //         }
    //     }
    //         fetchAssets(); 
    //     }, [didUpdate]);

    //on render, list the stories for that user
    useEffect(() => {

        const fetchAssets = async () => {

            let arr = []

            let samplearr = []

            let requests = []

            setIsLoading(true);

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const userAssets = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub
                }))

                for (let i = 0; i < userAssets.data.getUser.sharedAssets.items.length; i++) {
                    if (userAssets.data.getUser.sharedAssets.items[i].isSample === false) {
                        arr.push(userAssets.data.getUser.sharedAssets.items[i])
                    }
                    if (userAssets.data.getUser.sharedAssets.items[i].isSample === true) {
                        samplearr.push(userAssets.data.getUser.sharedAssets.items[i])
                    }
                }

                setAudioSamples(samplearr);

                setAudioAssets(arr);

                for (let i = 0; i < userAssets.data.getUser.messageRec.items.length; i++) {
                    if (userAssets.data.getUser.messageRec.items[i].status === 'accepted' && userAssets.data.getUser.messageRec.items[i].subtitle === 'narrator') {
                        requests.push(userAssets.data.getUser.messageRec.items[i])
                    }
                }

                setPublishers(requests);
                
                setIsLoading(false);

            } catch (e) {
            console.log(e);
          }
        }
           fetchAssets(); 
      }, [didUpdate]);

    const [data, setData] = useState({
        title: '',
        time: 0,
        sharedUserID: null,
        sharedUserName: '',
        createdAt: new Date(),
        messageid: null,
})

//audio picker
    const [audioName, setAudioName] = useState('');

    const pickAudio = async () => {
        let result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: false,
        });

        console.log(result.size < 80000000);

        if (result) {
        setLocalAudioUri(result.uri);
        setAudioName(result.name);
        let { sound } = await Audio.Sound.createAsync(
            {uri: result.uri},
            {shouldPlay: false}
        );
        let duration = await sound.getStatusAsync();
        setData({...data, time: duration.durationMillis});
        console.log(duration);
        } else {
            alert ('This file exeeds our size limit for upload. Please select an audio file that is less than 80MB.')
        }
    };

    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    const [isLoading, setIsLoading] = useState(false);

//Modal
    const [visible, setVisible] = useState(false);
  
    const showModal = () => setVisible(true);

    const hideModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        margin: 20,
        borderRadius: 15
    };

//Modal
    const [visible2, setVisible2] = useState(false);
  
    const showUploadModal = () => setVisible2(true);

    const hideUploadModal = () => setVisible2(false);

//Modal
    const [visible4, setVisible4] = useState(false);
    
    const showUploadSampledModal = () => {setVisible4(true); setIsSample(true);}

    const hideUploadSampleModal = () => {setVisible4(false); setIsSample(false);}

//Modal
    const [visible3, setVisible3] = useState(false);
  
    const showShareModal = () => setVisible3(true);

    const hideShareModal = () => setVisible3(false);

//Modal
    const [visible5, setVisible5] = useState(false);
  
    const showDeleteModal = () => setVisible5(true);

    const hideDeleteModal = () => setVisible5(false);

    //local audio picking

    const [localAudioVisible, setLocalAudioVisible] = useState(false);

    const showLocalAudioModal = () => {setLocalAudioVisible(true)}

    const hideLocalAudioModal = () => {setLocalAudioVisible(false)}

    const LocalAudioContainerStyle = {
        backgroundColor: 'transparent', 
        padding: 15,
    }; 

    const [localAudioArray, setLocalAudioArray] = useState([])

    useEffect(() => {
        const PickLocalAudio = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();

            let saved = await AsyncStorage.getAllKeys();
        
            if (saved != null) {
                let result = saved.filter((item) => item.includes("recording" + userInfo.attributes.sub));
            setLocalAudioArray(result)
            } 
        }
        PickLocalAudio();
    }, [])


    const [publishers, setPublishers] = useState([]);

    // useEffect(() => {
    //     const fetchPublishers = async () => {

    //         let requests = []

    //         const userInfo = await Auth.currentAuthenticatedUser();

    //         const response = await API.graphql(graphqlOperation(
    //             messagesByUpdatedDate, {
    //                 type: 'Message',
    //                 sortDirection: 'DESC',
    //                 filter: {
    //                     otherUserID: {
    //                         eq: userInfo.attributes.sub
    //                     },
    //                     status: {
    //                         eq: 'accepted'
    //                     },
    //                     subtitle: {
    //                         eq: 'narrator'
    //                     }
    //                 }
    //             }
    //         ))

    //         for (let i = 0; i < response.data.messagesByUpdatedDate.items.length; i++) {
    //             requests.push(response.data.messagesByUpdatedDate.items[i])
    //         }
    //         setPublishers(requests)
    //     }
    //     fetchPublishers();
    // }, []);

    const PublishItem = ({id, pseudonym, imageUri, createdAt, messageid} : any) => {

        const [imageU, setImageU] = useState('')
        
        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri);
                setImageU(response);
            }
            fetchImage()
        }, [])


        return (
            <TouchableWithoutFeedback onPress={() => {setData({...data, sharedUserID: id, sharedUserName: pseudonym, messageid: messageid}); hideModal();}}>
                <View style={{marginBottom: 20, width: Dimensions.get('window').width - 60}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image 
                            source={{uri: imageU}}
                            style={{width: 50, height: 50, borderRadius: 25, backgroundColor: 'gray'}}
                        />
                        <View>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 6}}>
                                <FontAwesome5 
                                    name='book-open'
                                    color='#ffffffa5'
                                    style={{alignSelf: 'center'}}
                                />
                                <Text style={{fontWeight: 'bold', color: '#fff', marginLeft: 10, textTransform: 'capitalize'}}>
                                    {pseudonym}
                                </Text>
                            </View>
                            <View>
                                <Text style={{color: '#00ffffa5', marginLeft: 10, fontSize: 12}}>
                                    Narration requested on {format(parseISO(createdAt), "MMM do")}
                                </Text>
                            </View>
                        </View>
                        
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
            
        )
    }

//get the list of publishers to share with
    const renderPublishers = ({item} : any) => {



        return(
            <PublishItem 
                messageid={item.id}
                id={item.user.id}
                createdAt={item.createdAt}
                pseudonym={item.user.pseudonym}
                imageUri={item.user.imageUri}
            />
        )
    }

//progress of upload
    const [progressText, setProgressText] = useState(0);

    const [localAudioUri, setLocalAudioUri] = useState('')

    const [isPublishing, setIsPublishing] = useState(false);

    const [isSample, setIsSample] = useState(false);

    const UploadAsset = async () => {

        setIsPublishing(true);

        try {
            const userInfo = await Auth.currentAuthenticatedUser();

            const responseAudio = await fetch(localAudioUri);
            const blob = await responseAudio.blob();
            const filename = uuid.v4().toString();
            //let extension = "audio/" + localAudioUri.split('.').pop()
            const s3ResponseAudio = await Storage.put(filename, blob, {
                progressCallback(uploadProgress) {
                    setProgressText(
                        Math.round((uploadProgress.loaded / uploadProgress.total) * 100)
                    );
                },
                contentType: 'audio/mp3'
            })

            const asset = await API.graphql(graphqlOperation(
                createAudioAsset, {input: {
                    type: 'AudioAsset',
                    title: data.title,
                    audioUri: s3ResponseAudio.key,
                    isSample: isSample,
                    time: data.time,
                    userID: userInfo.attributes.sub,
                    //sharedUserID: data.sharedUserID,
                    createdAt: new Date(),

                }}
            ))
            console.log(asset);
            setDidUpdate(!didUpdate);
            setIsPublishing(false);
            hideUploadModal();
            hideUploadSampleModal();
            setData({ 
                title: '',
                time: 0,
                sharedUserID: null,
                sharedUserName: '',
                createdAt: new Date(),
                messageid: null,
            })
        } catch (e) {
            console.log(e)
        }        
    }

    const UpdateAsset = async () => {

        setIsPublishing(true);

        let response = await API.graphql(graphqlOperation(
            updateAudioAsset, {input: {
                id: updateAssetState,
                sharedUserID: data.sharedUserID
            }}
        ))


        if (response) {

            const userInfo = await Auth.currentAuthenticatedUser();

            const user = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))

            let message = await API.graphql(graphqlOperation(
                createMessage, {input: {
                    type: 'Message',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userID: data.sharedUserID,
                    otherUserID: user.data.getUser.id,
                    content: 'You have a new shared narration for your short story. \n\nThis audio is to be used for this purpose only and any other use will be considered copywrite infringement in which you may be held liable. \n\nTo view this narration, open the Shared Assets list from your Publisher account.\n\nTo add this narration to your story, select from Shared Audio on the Publish a Story Screen',
                    title: user.data.getUser.narratorPseudo.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) + ' shared a narration with you!',
                    subtitle: 'narrator',
                    isReadbyUser: false,
                    isReadByOtherUser: true,
                    docID: null,
                    request: null,
                }}
            ));
            console.log(message)

            let messup = await API.graphql(graphqlOperation(
                updateMessage, {
                    input: {
                        id: data.messageid,
                        status: 'complete'
                    }
                }
            ))
            console.log(messup);
        }

        setIsPublishing(false);
        setDidUpdate(!didUpdate);
        setUpdateAssetState(null);
        setData({...data, messageid: null})
        hideShareModal();
    }

    const [selected, setIsSelected] = useState('shared');

    const RecordingItem = ({item} : any) => {

        let [itemState, setItemState] = useState({
            title: '',
            time: 0,
            created: new Date(),
            id: null,
            audio: '',
        })

        const SetAudio = () => {
            setLocalAudioUri(itemState.audio);
            setAudioName(itemState.title);
            setData({...data, time: itemState.time})
            //setIsLocalAudio(true);
            hideLocalAudioModal();
        }

            //convert the time to show in the modal
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(itemState.time / 60000);
        let seconds = Math.floor((itemState.time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds); 
    }  

        //get the item from async storage
        useEffect(() => {
            let componentMounted = true;
            const fetchData = async () => {
                try {
                    console.log('whats going on here')
                    let object = await AsyncStorage.getItem(item);
                    let objs = object ? JSON.parse(object) : null
                    if(componentMounted) {
                        setItemState({
                            title: objs.title,
                            time: objs.time,
                            created: parseISO(objs.created),
                            id: objs.id,
                            audio: objs.audioUri
                        })
                }
                } catch(e) {
                    // read error
                }
                
            };
            fetchData();
            return () => {
            componentMounted = false;
            }
        }, []);

        console.log(itemState.time)

        return (
            <View style={{marginBottom: 10, padding: 10, width: '100%', backgroundColor: '#232323', alignSelf: 'center', borderRadius: 10}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={SetAudio}>
                            <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                   <Text style={{color: '#fff', fontWeight: 'bold', marginBottom: 2}}>
                                        {itemState.title}
                                    </Text>
                                    <Text style={{color: '#ffffffa5', marginBottom: 6, fontSize: 12}}>
                                        {format(itemState.created, "MMM do yyyy")}
                                    </Text> 
                                </View>
                                <Text style={{color: '#fff', fontSize: 12}}>
                                    {millisToMinutesAndSeconds()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
            </View> 
        )
    }

    const renderBlipRecording = ({ item } : any) => (

        <RecordingItem 
          item={item}
        />
    );

    const [deleteId, setDeleteId] = useState('')

    const DeleteSample = async () => {
        await API.graphql(graphqlOperation(
            deleteAudioAsset, {input: {
                id: deleteId}}
        ))
        setDidUpdate(!didUpdate);
        setDeleteId('');
        hideDeleteModal();
    }

    return (
        <Provider>
            <Portal>
                
                <Modal visible={visible2} onDismiss={() => {hideUploadModal();}} contentContainerStyle={containerStyle}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{marginHorizontal: 20, height: '90%'}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                            Create an Audio Asset
                        </Text>
                        <View style={{justifyContent: 'space-between', height: '100%'}}>
                            <View style={{marginTop: 40, }}>
                                <View>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        Title
                                    </Text>
                                    <TextInput 
                                        placeholder='...'
                                        placeholderTextColor='#fff'
                                        style={styles.textinput}
                                        onChangeText={val => setData({...data, title: val})}
                                        maxLength={50}
                                    />
                                </View>

                                <View style={{marginTop: 20}}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        Select Audio
                                    </Text>
                                    <TouchableWithoutFeedback onPress={pickAudio}>
                                        <View style={[styles.textinput, {justifyContent: 'center'}]}>
                                            <Text style={{color: '#fff'}}>
                                                Select Local Audio
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={showLocalAudioModal}>
                                        <View style={[styles.textinput, {justifyContent: 'center'}]}>
                                            <Text style={{color: '#fff'}}>
                                                Select Blip Recording
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                    {audioName !== '' ? (
                                        <Text style={{marginTop: 10, textAlign: 'center', color: '#00ffffa5'}}>
                                            {audioName}
                                        </Text>
                                    ) : null}
                                </View>
                            </View>
                            {isPublishing === true ?  (
                                <View style={{marginBottom: 20}}>
                                    <ActivityIndicator size='large' color='cyan'/>
                                    <Text style={{color: '#fff', marginTop: 10, textAlign: 'center'}}>
                                        {progressText} %
                                    </Text>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={UploadAsset}>
                                    <View style={{alignSelf: 'center', margin: 20}}>
                                        <Text style={{overflow: 'hidden', backgroundColor: 'cyan', color: '#000', paddingHorizontal: 20, paddingVertical: 6, borderRadius: 13}}>
                                            Upload
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            
                            
                        </View>
                        
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Modal visible={visible4} onDismiss={() => {hideUploadSampleModal();}} contentContainerStyle={containerStyle}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{marginHorizontal: 20, height: '90%'}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                            Upload Sample Audio to Profile
                        </Text>
                        <View style={{justifyContent: 'space-between', height: '100%'}}>
                            <View style={{marginTop: 40, }}>
                                <View>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        Title
                                    </Text>
                                    <TextInput 
                                        placeholder='...'
                                        placeholderTextColor='#fff'
                                        style={styles.textinput}
                                        onChangeText={val => setData({...data, title: val})}
                                        maxLength={50}
                                    />
                                </View>

                                <View style={{marginTop: 20}}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        Select Audio
                                    </Text>
                                    <TouchableWithoutFeedback onPress={pickAudio}>
                                        <View style={[styles.textinput, {justifyContent: 'center'}]}>
                                            <Text style={{color: '#fff'}}>
                                                Select Local File
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={showLocalAudioModal}>
                                        <View style={[styles.textinput, {justifyContent: 'center'}]}>
                                            <Text style={{color: '#fff'}}>
                                                Select Blip Recording
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    
                                    {audioName !== '' ? (
                                        <Text style={{marginTop: 10, textAlign: 'center', color: '#00ffffa5'}}>
                                            {audioName}
                                        </Text>
                                    ) : null}
                                </View>

                                
                            </View>
                            {isPublishing === true ?  (
                                <View style={{marginBottom: 20}}>
                                    <ActivityIndicator size='large' color='cyan'/>
                                    <Text style={{color: '#fff', marginTop: 10, textAlign: 'center'}}>
                                        {progressText} %
                                    </Text>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={UploadAsset}>
                                    <View style={{alignSelf: 'center', margin: 20}}>
                                        <Text style={{overflow: 'hidden', backgroundColor: 'cyan', color: '#000', paddingHorizontal: 20, paddingVertical: 6, borderRadius: 13}}>
                                            Upload
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            
                            
                        </View>
                        
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>

{/* local audio list modal */}
                <Modal visible={localAudioVisible} onDismiss={hideLocalAudioModal} contentContainerStyle={LocalAudioContainerStyle}>
                    <ScrollView style={{ padding: 20, backgroundColor: '#363636', borderRadius: 15,}}>
                        <View>
                            <FlatList 
                                data={localAudioArray}
                                renderItem={renderBlipRecording}
                                keyExtractor={item => item}
                                style={{}}
                                initialNumToRender={20}
                                ListEmptyComponent={() => {
                                    return(
                                        <View style={{alignItems: 'center', margin: 30}}>
                                            <Text style={{color: '#fff'}}>
                                                There is nothing here.
                                            </Text>
                                        </View>
                                    )
                                }}
                                showsVerticalScrollIndicator={false}    
                                ListFooterComponent={ () => {
                                    return (
                                    <View style={{ height:  60}}>
                                    </View>
                                );}}
                                ListHeaderComponent={ () => {
                                    return (
                                    <View style={{ height:  60}}>
                                        <Text style={{textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                                            My Recordings
                                        </Text>
                                    </View>
                                );}}
                            />
                        </View>
                    </ScrollView>
                </Modal>

                <Modal visible={visible3} onDismiss={() => {hideShareModal()}} contentContainerStyle={containerStyle}>
                    <View style={{paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' }}>
                        <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 20, textAlign: 'center', color: '#fff'}}>
                            Share Asset
                        </Text>
                        <TouchableWithoutFeedback onPress={() => {showModal(); setData({...data, sharedUserID: null})}}>
                            <View style={[styles.textinput, {justifyContent: 'center', paddingHorizontal: 20}]}>
                                <Text style={{color: '#fff'}}>
                                    Select a Publisher
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{marginTop: 20}}>
                            {data.sharedUserID ? (
                                <View>
                                    <Text style={{textAlign: 'center', color: '#00ffffa5', textTransform: 'capitalize'}}>
                                        {data.sharedUserName}
                                    </Text>
                                    {isPublishing === true ? (
                                        <ActivityIndicator size='small' color='cyan'/>
                                    ) : (
                                        <TouchableOpacity onPress={() => UpdateAsset()}>
                                            <View style={{ marginTop: 20, borderRadius: 15, backgroundColor: 'cyan', paddingVertical: 6, paddingHorizontal: 20}}>
                                                <Text>
                                                Confirm Share 
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                
                            ) : null}
                        </View>
                    </View>
                </Modal>

                <Modal visible={visible5} onDismiss={() => {hideDeleteModal()}} contentContainerStyle={containerStyle}>
                    <View style={{paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' }}>
                        <Text style={{fontWeight: 'bold', fontSize: 14, marginBottom: 20, textAlign: 'center', color: '#fff'}}>
                            Delete from Profile?
                        </Text>
                        <TouchableOpacity onPress={DeleteSample}>
                            <View style={[styles.textinput, {justifyContent: 'center', backgroundColor: '#ff0000a5', paddingHorizontal: 20}]}>
                                <Text style={{color: '#fff'}}>
                                    Confirm Delete
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal visible={visible} onDismiss={() => {hideModal()}} contentContainerStyle={containerStyle}>
                    <View style={{height: 600, paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' }}>
                        <Text style={{fontWeight: 'bold', fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#fff'}}>
                            Find a Publisher
                        </Text>
                        <View style={{marginTop: 40}}>
                            <FlatList 
                                data={publishers}
                                keyExtractor={item => item.id}
                                renderItem={renderPublishers}
                                showsVerticalScrollIndicator={false}
                            />
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
                            <View style={{padding: 30, margin: -30}}>
                                <FontAwesome5 
                                    name='chevron-left'
                                    color='#fff'
                                    size={20}
                                    
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <Text style={styles.header}>
                            My Narrations
                        </Text>
                    </View>

                    <TouchableOpacity onPress={showUploadModal}>
                        <View style={{alignSelf: 'center', backgroundColor: 'cyan', borderRadius: 15, justifyContent: 'center', marginBottom: 20, marginTop: 10, width: '90%', height: 70, alignItems: 'center'}}>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>
                                Upload Audio
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
                        <TouchableWithoutFeedback onPress={() => setIsSelected('shared')}>
                                <Text style={{fontSize: selected === 'shared' ? 18 : 16, paddingHorizontal: 20, color: selected === 'shared' ? '#fff' : 'gray', fontWeight: selected === 'shared' ? 'bold' : 'normal'}}>
                                    To Share
                                </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {setIsSelected('samples')}}>
                                <Text style={{fontSize: selected === 'samples' ? 18 : 16, color: selected === 'samples' ? '#fff' : 'gray', fontWeight: selected === 'samples' ? 'bold' : 'normal', paddingHorizontal: 20,}}>
                                    Samples
                                </Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{height: '64%'}}>
                        {selected === 'shared' ? (
                            <FlatList 
                                data={audioAssets}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                extraData={audioAssets}
                                refreshControl={
                                    <RefreshControl
                                    refreshing={isFetching}
                                    onRefresh={onRefresh}
                                    />
                                }
                                showsVerticalScrollIndicator={false}    
                                
                                ListFooterComponent={ () => {
                                    return (
                                        <View style={{ height:  120}}>
                                            
                                        </View>
                                );}}
                                ListEmptyComponent={ () => {
                                    return (
                                        <View style={{ height:  90, alignItems: 'center'}}>
                                            {isLoading === true ? (
                                            <View style={{margin: 30}}>
                                                <ActivityIndicator size='small' color='cyan' />
                                            </View>
                                            ) : (
                                            <Text style={{ color: 'white', margin: 20,}}>
                                                There is nothing here! You have no uploaded any stories.
                                            </Text>
                                            )}
                                        </View>
                                );}}
                            />
                        ) : selected === 'samples' ? (
                            <FlatList 
                                data={audioSamples}
                                renderItem={renderSampleItem}
                                keyExtractor={item => item.id}
                                extraData={audioSamples}
                                refreshControl={
                                    <RefreshControl
                                    refreshing={isFetching}
                                    onRefresh={onRefresh}
                                    />
                                }
                                showsVerticalScrollIndicator={false}    
                                ListHeaderComponent={ () => {
                                    return (
                                        <TouchableOpacity onPress={showUploadSampledModal}>
                                            <View style={{alignItems: 'flex-start', marginHorizontal: 20, marginVertical: 20}}>
                                                <Text style={{ overflow: 'hidden', borderRadius: 13, color: '#fff', backgroundColor: 'gray', paddingHorizontal: 20, paddingVertical: 6, textAlign: 'center'}}>
                                                    + Add Sample Audio
                                                </Text>
                                            </View>
                                        </TouchableOpacity> 
                                        
                                );}}
                                
                                ListFooterComponent={ () => {
                                    return (
                                        <View style={{ height:  120}} />
                                );}}
                                ListEmptyComponent={ () => {
                                    return (
                                        <View style={{ height:  300, alignItems: 'center', justifyContent: 'center'}}>
                                            {isLoading === true ? (
                                            <View style={{margin: 30}}>
                                                <ActivityIndicator size='small' color='cyan' />
                                            </View>
                                            ) : (
                                            <Text style={{ color: 'white', margin: 20,}}>
                                                
                                            </Text>
                                            )}
                                        </View>
                                );}}
                            />
                        ) : null}
                        
                    </View>
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
    subparagraph: {
        fontSize: 12,
        color: '#ffffffa5'
    },
    subblock: {
        width: '75%',
    },
    tile: {
        backgroundColor: '#363636a5',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 20,
        borderRadius: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flexWrap: 'wrap',
        width: 225,
    },
    userId: {
        fontSize: 12,
        color: '#ffffffa5',
        marginRight: 15,
        marginLeft: 5,
    },
    icontext: {
        fontSize: 10,
        color: '#ffffffa5',
        marginTop: 5,
    },
    popupblock: {
        marginTop: 10,
    },
    paragraph: {
        color: '#ffffffB3'
    },
    playbutton: {
        borderWidth: 0.5,
        paddingHorizontal: 15,
        paddingVertical: 3,
        borderRadius: 15,
        borderColor: '#ffffffa5',
        color: '#ffffffa5',
    },
    time: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#ffffffa5',
        marginHorizontal: 5,
    },
    category: {
        fontSize: 14,
        color: 'gray',
        //fontStyle: 'italic',
        marginVertical: 3,
        textTransform: 'capitalize'

    },
    textinput: {
        backgroundColor: '#000000a5', 
        borderRadius: 10,
        marginTop: 10,
        height: 40,
        paddingHorizontal: 10,
        color: '#fff'
    },

});

export default SharedAssets;