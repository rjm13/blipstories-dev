import React, { useEffect, useState, useRef } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableWithoutFeedback,  
    Image,
    FlatList,
    Dimensions,
    TextInput,
    Keyboard,
    TouchableOpacity,
    Platform,
    ActivityIndicator
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { StorageAccessFramework } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library';
import { format, formatRelative, parseISO } from "date-fns";
import { Modal, Portal, Provider } from 'react-native-paper';
import uuid from 'react-native-uuid';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getMessage } from '../src/graphql/queries';
import { updateMessage, createReply, createDocumentAsset } from '../src/graphql/mutations';
import * as Notifications from 'expo-notifications';
import {
    AndroidImportance,
    AndroidNotificationVisibility,
    NotificationChannel,
    NotificationChannelInput,
    NotificationContentInput,
  } from "expo-notifications";

import { DarkTheme, useRoute } from '@react-navigation/native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const channelId = "DownloadInfo";

const ViewMessage = ({navigation} : any) => {

    let clear = useRef(null)

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true); // or some other action
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false); // or some other action
        }
        );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

    const route = useRoute();
    const { messageid } = route.params;

    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const [message, setMessage] = useState({});
    const [imageU, setImageU] = useState('');
    const [messageDate, setMessageDate] = useState('');

    const [isExpanded, setIsExpanded] = useState(true);

    const SCREEN_WIDTH = Dimensions.get('window').width;

    const [reply, setReply] = useState('')

    const [user, setUser] = useState('')

    const [didUpdate, setDidUpdate] = useState(false);

    const [didMessageUpdate, setDidMessageUpdate] = useState(false);

    const [didPDFupdate, setDidPDFupdate] = useState(false);

    useEffect(() => {
        const markRead = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();
            setUser(userInfo.attributes.sub);
            

            let messageresponse = await API.graphql(graphqlOperation(
                getMessage, {id: messageid}
            ))

            if (messageresponse.data.getMessage.userID === userInfo.attributes.sub) {
                let imageresponse = await Storage.get(messageresponse.data.getMessage.otherUser?.imageUri)
                setImageU(imageresponse)
            }

            if (messageresponse.data.getMessage?.otherUserID === userInfo.attributes.sub) {
                let imageresponse = await Storage.get(messageresponse.data.getMessage.user?.imageUri)
                setImageU(imageresponse)
            }
            
            setMessage(messageresponse.data.getMessage);
            setMessageDate(formatRelative(parseISO(messageresponse.data.getMessage.createdAt), new Date()))

            if (messageresponse.data.getMessage.userID === userInfo.attributes.sub) {
               await API.graphql(graphqlOperation(
                    updateMessage, {input: {
                        id: messageid,
                        isReadbyUser: true,
                    }}
                ))
            }

            if (messageresponse.data.getMessage.otherUserID === userInfo.attributes.sub) {
                await API.graphql(graphqlOperation(
                     updateMessage, {input: {
                         id: messageid,
                         isReadByOtherUser: true,
                     }}
                 ))
             }
            
            
        }
        markRead();
    }, [didPDFupdate, didMessageUpdate])

    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const fetchReplies = async () => {
            let response = await API.graphql(graphqlOperation(
                getMessage, {id: messageid}
            ))
            setReplies(response.data.getMessage.replies.items)
            if (response.data.getMessage.replies.items.length > 0) {
                setIsExpanded(false);
            }
        }
        fetchReplies();
    },[didUpdate, messageid]);

    const Reply = ({id, content, createdAt, isRead, userID, userName, otherUserName} : any) => {


        return (
            <View style={{backgroundColor: userID === user ? '#132F35' : '#000', width: SCREEN_WIDTH*0.8, borderRadius: 8, margin: 10, alignSelf: userID === user ? 'flex-end' : 'flex-start'}}>
                <Text style={{padding: 10, color: '#fff'}}>
                    {content}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                    <Text style={{color: '#ffffffa5', fontSize: 10, textTransform: 'capitalize'}}>
                        {userID === user ? userName : otherUserName}
                    </Text>
                    <Text style={{color: '#ffffffa5', fontSize: 10, textTransform: 'capitalize'}}>
                        {formatRelative(parseISO(createdAt), new Date())}
                    </Text>
                </View>
            </View>
        );
    }

    const renderReplies = ({item}: any) => {
        return (
            <Reply 
                id={item.id}
                content={item.content}
                createdAt={item.createdAt}
                isRead={item.isRead}
                userID={item.userID}
                userName={
                    message?.subtitle === 'artist' && message?.userID !== user ? item.user.artistPseudo : 
                    message?.subtitle === 'narrator' && message?.userID !== user ? item.user.narratorPseudo : 
                    item.user.pseudonym}
                otherUserName={
                    message?.subtitle === 'artist' && message?.userID !== user ? item.user.artistPseudo : 
                    message?.subtitle === 'artist' && message?.userID === user ? item.user.artistPseudo : 
                    message?.subtitle === 'narrator' && message?.userID !== user ? item.user.narratorPseudo : 
                    message?.subtitle === 'narrator' && message?.userID === user ? item.user.narratorPseudo : 
                    item.user.pseudonym}
            />
        )
    }

    const SubmitReply = async () => {

        if (reply !== '') {
            await API.graphql(graphqlOperation(
                createReply, {input: {
                    content: reply,
                    createdAt: new Date(),
                    isRead: false,
                    type: 'Reply',
                    messageID: message?.id,
                    userID: user
                }}
            ))
            await API.graphql(graphqlOperation(
                updateMessage, {input: {
                    id: message?.id,
                    updatedAt: new Date (),
                    isReadbyUser: message?.userID === user ? true : false,
                    isReadByOtherUser: message?.otherUserID === user ? true : false,
                }}
            ))
            setDidUpdate(!didUpdate);
            setReply('');
            clear.current.clear()
        }
    }

    const [downloadProgress, setDownloadProgress] = useState("0%");

      async function setNotificationChannel() {
        const loadingChannel: NotificationChannel | null = await Notifications.getNotificationChannelAsync(
          channelId
        );
    
        // if we didn't find a notification channel set how we like it, then we create one
        if (loadingChannel == null) {
          const channelOptions: NotificationChannelInput = {
            name: channelId,
            importance: AndroidImportance.HIGH,
            lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
            sound: "default",
            vibrationPattern: [250],
            enableVibrate: true,
          };
          await Notifications.setNotificationChannelAsync(
            channelId,
            channelOptions
          );
        }
      }
    
      useEffect(() => {
        setNotificationChannel();
      });

        // IMPORTANT: You MUST obtain MEDIA_LIBRARY permissions for the file download to succeed
  // If you don't the downloads will fail
  async function getMediaLibraryPermissions() {
    //await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    await MediaLibrary.requestPermissionsAsync();
  }

  // You also MUST obtain NOTIFICATIONS permissions to show any notification
  // to the user. Please read the docs for more on permissions for notifications
  // https://docs.expo.io/versions/latest/sdk/notifications/#fetching-information-about-notifications-related-permissions
  async function getNotificationPermissions() {
    //await Permissions.askAsync(Permissions.NOTIFICATIONS);
    await Notifications.requestPermissionsAsync();
  }

  const downloadProgressUpdater = ({
    totalBytesWritten,
    totalBytesExpectedToWrite,
  }: {
    totalBytesWritten: number;
    totalBytesExpectedToWrite: number;
  }) => {
    const pctg = 100 * (totalBytesWritten / totalBytesExpectedToWrite);
    setDownloadProgress(`${pctg.toFixed(0)}%`);
  };

  useEffect(() => {
    getMediaLibraryPermissions();
  });

  useEffect(() => {
    getNotificationPermissions();
  });

      async function scheduleNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Download Complete!',
              body: message?.doc.title,
            },
            trigger: null,
          });
      }

      async function downloadingNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
              title: '...downloading',
              body: message?.doc.title,
            },
            trigger: null,
          });
      }

      const [isDownloading, setIsDownloading] = useState(false);

      //shareModal
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

    const [document, setDocument] = useState('');
    const [documentName, setDocumentName] = useState('')

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: false,
        });


        if (result) {
        setDocument(result.uri);
        setDocumentName(result.name);
        showModal();
        }
    };

    const UploadPDF = async () => {
        setIsDownloading(true);
        if (document !== '') {
            const docresponse = await fetch(document);
            const blob = await docresponse.blob();
            const filename = uuid.v4().toString();
            const s3Response = await Storage.put(filename, blob);

            let documentasset = await API.graphql(graphqlOperation(
                createDocumentAsset, {input: {
                    type: 'Document',
                    createdAt: new Date(),
                    userID: message?.userID,
                    sharedUserID: message?.otherUserID,
                    title: documentName,
                    docUri: s3Response.key,
                }}
            ))

            if (documentasset) {
                await API.graphql(graphqlOperation(
                    updateMessage, {input: {
                        id: message?.id,
                        updatedAt: new Date(),
                        docID: documentasset.data.createDocumentAsset.id,
                        isReadByOtherUser: false,
                    }}
                ))
                setDidPDFupdate(!didPDFupdate);
            }
        }
        setIsDownloading(false);
        hideModal();
    }
      

    const DownloadDocument2 = async () => {

        setIsDownloading(true);

        let response = await Storage.get(message?.doc.docUri);

        const targetUri = FileSystem.documentDirectory + message?.doc.title

        const downloadedFile = await FileSystem.downloadAsync(response, targetUri)

        if (downloadedFile.status === 200) {
            if (Platform.OS === 'android') {

                const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
                if (!permissions.granted) {
                    return;
                }

                downloadingNotification();

                const base64Data = await FileSystem.readAsStringAsync(downloadedFile.uri, { encoding: FileSystem.EncodingType.Base64 })

                try {
                    await StorageAccessFramework.createFileAsync(permissions.directoryUri, message?.doc.title, 'application/pdf')
                        .then(async(uri) => {
                            await FileSystem.writeAsStringAsync(uri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
                        })
                        .then(scheduleNotification)
                        .then(() => setIsDownloading(false))
                        .catch((e) => {
                            console.log(e);
                            setIsDownloading(false);
                        });
                } catch (e) {
                    throw new Error(e);
                }    
            }
            if (Platform.OS === 'ios') {

                FileSystem.downloadAsync(response, targetUri)
                .then(({ uri }) => {
                    Sharing.shareAsync(uri)
                })
            }
        }
    }

    const AcceptRequest = async () => {
        let response = await API.graphql(graphqlOperation(
            updateMessage, {
                input: {
                    id: message?.id,
                    status: 'accepted',
                    isReadbyUser: false,
                    updatedAt: new Date(),
                }
            }
        ))
        if (response) {
            await API.graphql(graphqlOperation(
                createReply, {
                    input: {
                        content: 'Your request has been accepted!',
                        createdAt: new Date(),
                        isRead: false,
                        type: 'Reply',
                        messageID: message?.id,
                        userID: user
                    }
                }
            ))
        }
        setDidUpdate(!didUpdate)
        setDidMessageUpdate(!didMessageUpdate)
    }

    const DeclineRequest = async () => {
        let response = await API.graphql(graphqlOperation(
            updateMessage, {
                input: {
                    id: message?.id,
                    status: 'declined',
                    isReadbyUser: false,
                    updatedAt: new Date(),
                }
            }
        ))
        if (response) {
            await API.graphql(graphqlOperation(
                createReply, {
                    input: {
                        content: 'Your request has been declined.',
                        createdAt: new Date(),
                        isRead: false,
                        type: 'Reply',
                        messageID: message?.id,
                        userID: user
                    }
                }
            ))
        }
        setDidUpdate(!didUpdate)
        setDidMessageUpdate(!didMessageUpdate)
    }



    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ alignItems: 'center'}}>
                        <Text style={{
                            fontSize: 16,
                            paddingVertical: 16,
                            color: '#fff'
                        }}>
                            Share {documentName}?
                        </Text>
                        
                        <View style={styles.button}>
                            <TouchableOpacity onPress={UploadPDF}>
                                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                                    {isDownloading ? (
                                        <ActivityIndicator size="small" color="cyan"/>
                                    ) : 
                                        <Text style={{overflow: 'hidden', borderRadius: 13, backgroundColor: 'cyan', color: '#000', paddingVertical: 5, paddingHorizontal: 20}}>Share PDF</Text> 
                                    } 
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Portal>
        <View >
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{}}
            >
                <View style={{justifyContent: 'space-between', height: Dimensions.get('window').height}}>
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 20, alignItems: 'center'}}>
                            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                <View style={{padding: 30, margin: -30}}>
                                    <FontAwesome5 
                                        name='chevron-left'
                                        color='#fff'
                                        size={20}
                                    />
                                </View>
                            </TouchableWithoutFeedback>

                            {message?.status === 'noreply' ? null : (
                                <Image 
                                    source={{uri: imageU}}
                                    style={{height: 40, width: 40, borderRadius: 25, marginLeft: 40}}
                                />
                            )}
                            {message?.status === 'noreply' ? (
                                <Text style={[styles.header, {marginLeft: 20}]}>
                                    Blip Stories
                                </Text>
                            ) :
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('UserScreen', {userID: message?.user?.id === user && message?.subtitle === 'artist' ? message?.otherUser?.id : message?.user?.id === user && message?.subtitle === 'narrator' ? message?.otherUser?.id : message?.user?.id})}>
                                <Text style={styles.header}>
                                    {message?.user?.id === user && message?.subtitle === 'artist' ? message?.otherUser?.artistPseudo : message?.user?.id === user && message?.subtitle === 'narrator' ? message?.otherUser?.narratorPseudo : message?.user?.pseudonym}
                                </Text>
                            </TouchableWithoutFeedback> 
                            }
                            
                        </View>

                        

                    </View>

                    <View style={{marginBottom: 140, height: '59%'}}>
                        <FlatList 
                            data={replies}
                            keyExtractor={item => item.id}
                            renderItem={renderReplies}
                            showsVerticalScrollIndicator={false}
                            maxToRenderPerBatch={20}
                            extraData={replies}
                            inverted
                            ListFooterComponent={() => {
                                return(
                                    <View style={{height: 20}}/>
                                )
                                
                            }}
                        />
                    </View>



{/* Footer */}
                {message?.status === 'noreply' ? null : (
                    <View style={{position: 'absolute', bottom: isKeyboardVisible ? (Platform.OS === 'android' ? 300 : Platform.OS === 'ios' ? 210 : 300) : 0, flexDirection: 'row', justifyContent: 'space-between', marginBottom: Platform.OS === 'ios' ? 50 : 30, width: SCREEN_WIDTH, height: 80, backgroundColor: '#303030'}}>
                        <TextInput
                            placeholder={'Reply to ' + (
                                message?.userID === user && message?.subtitle === 'artist' ? 
                                message?.otherUser?.artistPseudo.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) : 
                                message?.userID === user && message?.subtitle === 'narrator' ?
                                message?.otherUser?.narratorPseudo.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) : 
                                message?.user?.pseudonym.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))))}
                            placeholderTextColor='#ffffffa5'
                            style={{color: '#fff', padding: 10, width: SCREEN_WIDTH - 60}}
                            maxLength={1000}
                            multiline={true}
                            onChangeText={val => setReply(val)}
                            textAlignVertical='top'
                            ref={clear}
                        />
                       
                            <View style={{justifyContent: 'center'}}>
                                <TouchableOpacity onPress={SubmitReply}>
                                    <FontAwesome5 
                                        name='arrow-right'
                                        color='#fff'
                                        size={20}
                                        style={{paddingHorizontal: 20}}
                                    />
                                </TouchableOpacity>
                            </View>
                    </View>
                )}

                </View>

                <View style={{alignSelf: 'center', position: 'absolute', top: 120, borderRadius: 15, alignSelf: 'center', backgroundColor: '#303030', padding: 20, width: Dimensions.get('window').width - 40}}>
                                                
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{width: '84%'}}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                        {message?.title}
                                    </Text>
                                    <Text style={{color: 'gold', textTransform: 'capitalize', fontSize: 12}}>
                                        {message?.status === 'noreply' ? null : message?.status}
                                    </Text>
                                </View>
                                
                              
                                <FontAwesome5 
                                    name={isExpanded === true ? 'chevron-up' : 'chevron-down'}
                                    size={17}
                                    color='#fff'
                                    style={{padding: 20, margin: -20}}
                                    onPress={() => setIsExpanded(!isExpanded)}
                                />
                            </View>
                            
                            {isExpanded === true ? (
                                <View>
                                    <Text style={{fontSize: 13, color: '#fff', marginTop: 14}}>
                                        {message?.content}
                                    </Text>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                        <Text style={{color: '#00ffffa5', fontSize: 12, marginTop: 20, textTransform: 'capitalize'}}>
                                            {messageDate}
                                        </Text>
                                        {message?.status === 'noreply' ? null : message?.docID !== null && isDownloading === false ? (
                                            <TouchableWithoutFeedback onPress={DownloadDocument2}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        <FontAwesome5 
                                                            name='download'
                                                            size={14}
                                                            color='#00ffff'
                                                            style={{paddingRight: 6}}
                                                        />
                                                        <Text style={{color: '#00ffff', }}>
                                                            PDF
                                                        </Text>
                                                    </View>
                                            </TouchableWithoutFeedback>
                                        ) : message?.docID !== null && isDownloading === true ? (
                                            <ActivityIndicator size='small' color='cyan'/>
                                        ) : message?.userID === user && message?.docID === null ? (
                                                <TouchableWithoutFeedback onPress={pickDocument}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        <FontAwesome5 
                                                            name='upload'
                                                            size={14}
                                                            color='#00ffff'
                                                            style={{paddingRight: 6}}
                                                        />
                                                        <Text style={{color: '#00ffff', }}>
                                                            PDF
                                                        </Text>
                                                    </View>
                                            </TouchableWithoutFeedback>
                                            ) : null}
                                    </View>
                                    
                                </View>
                            ) : null}
                            
                            {message?.status === 'new' && user === message?.otherUserID ? (
                                <View style={{alignSelf: 'center',  width: Dimensions.get('window').width - 40, marginTop: 20}}>
                                            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                <TouchableOpacity onPress={AcceptRequest}>
                                                    <Text style={{overflow: 'hidden', backgroundColor: '#00ffff', color: '#000', borderRadius: 15, borderWidth: 0.5, borderColor: 'cyan', paddingVertical: 6, paddingHorizontal: 20}}>
                                                        Accept
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={DeclineRequest}>
                                                    <Text style={{color: 'cyan', borderRadius: 15, borderWidth: 0.5, borderColor: 'cyan', paddingVertical: 6, paddingHorizontal: 20}}>
                                                        Decline
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                            ) : null}
                        </View>
                
                 
                
            </LinearGradient>
        </View>
        </Provider>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        height: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 20,
        textTransform: 'capitalize'
    },
    tile: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 40, 
        marginVertical: 20
    },
    button: {
        alignItems: 'center',
        marginVertical: 30,
    },
   
});

export default ViewMessage;