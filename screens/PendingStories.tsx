import React, {useState, useEffect, useContext} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Dimensions, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    Image,
    RefreshControl,
    ActivityIndicator,
    TextInput
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Provider } from 'react-native-paper';

import {useNavigation} from '@react-navigation/native'

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { storiesByDate, getStory } from '../src/graphql/queries';
import { updateStory, createMessage, deleteStory, updateTag } from '../src/graphql/mutations';
import TimeConversion from '../components/functions/TimeConversion';

const PendingStories = ({navigation} : any) => {


    const [didUpdate, setDidUpdate] = useState(false)

    const [stories, setStories] = useState([])

    const [userID, setUserID] = useState('')

    const [reason, setReason] = useState('')

    const [reasonsArr, setReasonsArr] = useState([])

    //refresh state of the flatlist
    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
            setIsFetching(false);
        }, 2000);
        }

    //make sure the user is the admin account
    useEffect(() => {
        const getUser = async () => {
            let response = await Auth.currentAuthenticatedUser();
            if (response.attributes.email === 'martianspidermedia@gmail.com') {
                setUserID(response.attributes.sub)
            } else {
                navigation.navigate('HomeScreen');
            }
        }
        getUser();
    }, [])

    //fetch the stories that are not approved
    useEffect(() => {
        const getStories = async () => {
            let response = await API.graphql(graphqlOperation(
                storiesByDate, {
                    sortDirection: 'DESC',
                    type: 'Story',
                    filter: {
                        approved: {
                            eq: 'pending'
                        }
                    }
                }
            ))
            setStories(response.data.storiesByDate.items)
        }
        getStories();
    }, [didUpdate])

    const [pending, setPending] = useState(false)

    const ApproveStory = async ({id, authorID, title, NSFW, nsfw} : any) => {

        setPending(true)

        try {

            
            let response = await API.graphql(graphqlOperation(
                updateStory, {input: {
                    id: id,
                    approved: 'approved',
                    nsfw: NSFW === nsfw ? nsfw : NSFW
                }}
            ))

            let storyresponse = await API.graphql(graphqlOperation(
                getStory, {id : id}
            ))

            for (let i = 0; i < storyresponse.data.getStory.tags.items.length; i++) {
                await API.graphql(graphqlOperation(
                    updateTag, {input: {
                        id: storyresponse.data.getStory.tags.items[i].tag.id,
                        count: storyresponse.data.getStory.tags.items[i].tag.count + 1,
                        updatedAt: new Date()
                    }}
                ))
            }

            if (response) {
                let sendmessage = await API.graphql(graphqlOperation(
                    createMessage, {input: {
                        type: 'Message',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userID: userID,
                        otherUserID: authorID,
                        content: 'Your story has been approved and is now live in the app!\n\nTo view your story, go to Publisher Home >> Published Stories',
                        title: 'Your story, ' + title + ' has been approved!',
                        subtitle: 'approval',
                        isReadbyUser: true,
                        isReadByOtherUser: false,
                        docID: null, 
                        request: null,
                        status: 'noreply'

                    }}
                ))
                if (sendmessage) {
                    setPending(false)
                    alert ('Story approved!')
                    setDidUpdate(!didUpdate)
                    
                }
            }
        } catch {
            alert ('Error')
            setPending(false)
        }
        
    }

    const [rejectedAuthor, setRejectedAuthor] = useState('');
    const [rejectedID, setRejectedID] = useState('');
    const [rejectedTitle, setRejectedTitle] = useState('');

    //Reject Modal
        const [visible, setVisible] = useState(false);
        const showModal = ({id, title, authorID} : any) => {
            setVisible(true);
            setRejectedAuthor(authorID);
            setRejectedID(id);
            setRejectedTitle(title);
        }
        const hideModal = () => {
            setVisible(false); 
            setRejectedAuthor('');
            setRejectedID('');
            setRejectedTitle('');
            setReasonsArr([]);
            setReason('');
        }
        
        const containerStyle = {
            backgroundColor: '#363636', 
            padding: 20,
            margin: 20,
            borderRadius: 15,
        };

    const RejectStory = async () => {
        setPending(true)

        try {

            console.log(rejectedAuthor)
            let response = await API.graphql(graphqlOperation(
                updateStory, {input: {
                    id: rejectedID,
                    approved: 'rejected'

                }}
            ))
            if (response) {
                let sendmessage = await API.graphql(graphqlOperation(
                    createMessage, {input: {
                        type: 'Message',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        userID: userID,
                        otherUserID: rejectedAuthor,
                        content: 'Your story is not approved.\n\nReason:\n\n' + reasonsArr + '\n\n' + reason + '\nPlease correct and resubmit your story.',
                        title: 'Your story, ' + rejectedTitle + ' has been rejected.',
                        subtitle: 'approval',
                        isReadbyUser: true,
                        isReadByOtherUser: false,
                        docID: null, 
                        request: null,
                        status: 'noreply'

                    }}
                ))
                console.log(sendmessage)
                if (sendmessage) {
                    setPending(false)
                    alert ('Story rejected!')
                    setDidUpdate(!didUpdate)
                    hideModal();
                }
            }
        } catch {
            alert ('Error')
            setPending(false)
        }
    }

    

    const Item = ({title, genreName, summary, imageUri, nsfw, audioUri, author, authorID, narrator, time, id,ratingAvg,ratingAmt,icon} : any) => {

        //temporary signed image uri
        const [imageU, setImageU] = useState('')
      
        //push the s3 image key to get the signed uri
        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri);
                setImageU(response);
            }
            fetchImage()
        }, [])    
    
    //navigation hook
        const navigation = useNavigation();
    
    //expanding list item
        const [isVisible, setIsVisible] = useState(false);

        const [NSFW, setNSFW] = useState(false);

        useEffect(() => {
            if (nsfw === true) {
                setNSFW(true);
            }
        }, [])

    
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
                    <View style={styles.tile}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ width: '78%'}}>
                                    <Text style={styles.name}>
                                        {title}
                                    </Text> 
                                
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.category]}>
                                        {genreName}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='book-open'
                                        size={12}
                                        color='#ffffffa5'
                                    />
                                    <Text style={styles.userId}>
                                        {author}
                                    </Text>  
                                    <FontAwesome5 
                                        name='book-reader'
                                        size={12}
                                        color='#ffffffa5'
                                    />
                                    <Text style={styles.userId}>
                                        {narrator}
                                    </Text> 
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('SimpleAudioPlayer', {item: null, clouditem: null, storyID: id,})}>
                                    <View style={{ 
                                        flexDirection: 'row', 
                                        alignItems: 'center', 
                                        borderRadius: 30,
                                        paddingVertical: 2,
                                        paddingHorizontal: 8,
                                        backgroundColor: '#ffffff33',
                                    }}>
                                        <FontAwesome5 
                                            name='play'
                                            color='#ffffff'
                                            size={10}
                                        />
                                        <Text style={styles.time}>
                                            {TimeConversion(time)}
                                        </Text> 
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                        </View> 
                
                { isVisible ? (
                    <View style={styles.popupblock}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <View style={{alignItems: 'center', width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}>
                                
                        
                            </View>  
                        </View>
    
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
                            <View>
                                <View style={{ position: 'absolute', alignSelf: 'center', top: 80}}>
                                    <FontAwesome5 
                                        name={icon}
                                        color='#ffffff'
                                        size={50}
                                    />
                                </View>
                                <Image 
                                    source={{uri: imageU}}
                                    style={{
                                        height: imageU ? 200 : 0,
                                        borderRadius: 15,
                                        marginVertical: 15,
                                        marginHorizontal: -10,
                                        backgroundColor: '#ffffffa5'
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={styles.paragraph}>
                            {summary}
                        </Text>
                        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: '#fff'}}>
                                Flags:
                            </Text>
                            <Text style={{color: '#fff'}}>
                                {flags}
                            </Text>
                        </View> */}
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                            {pending===true ? (
                                <ActivityIndicator size='small' color='cyan'/>
                            ) : (
                                <TouchableOpacity onLongPress={() => ApproveStory({id, title, authorID, NSFW, nsfw})}>
                                    <Text style={{color: '#000', backgroundColor: 'cyan', borderRadius: 15, paddingHorizontal: 20, paddingVertical: 6}}>
                                        Approve
                                    </Text>
                                </TouchableOpacity>
                            )}
                            
                            {pending === true ? (
                                <ActivityIndicator color='cyan' size='small'/>
                            ) :(
                                <TouchableOpacity onPress={() => showModal({id, title, authorID})}>
                                    <Text style={{color: 'cyan', backgroundColor: 'transparent', borderWidth: 0.5, borderColor: 'cyan', borderRadius: 15, paddingHorizontal: 20, paddingVertical: 6}}>
                                        Reject
                                    </Text>
                                </TouchableOpacity>
                            )}
                            
                            
                        </View>
                        <View style={{marginTop:40, width: 90,}}>
                            <TouchableOpacity onPress={() => setNSFW(!NSFW)}>
                                <Text style={{paddingVertical: 4, paddingHorizontal: 20, borderWidth: 0.5, textAlign: 'center',
                                    color: NSFW === true ? 'red' : 'gray', 
                                    borderColor: NSFW === true ? 'red' : 'gray',
                                    }}>
                                        Explicit
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                ) : false }  
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    const renderItem = ({item} : any) => {

        let icon = ''
        let genreName = ''
        let primary = ''
        //let flags = item.flag?.items.length

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.PrimaryColor
        }

        return  (
            <Item 
                title={item.title}
                authorID={item.userID}
                imageUri={item.imageUri}
                genreName={genreName}
                icon={icon}
                primary={primary}
                audioUri={item.audioUri}
                summary={item.summary}
                author={item.author}
                narrator={item.narrator}
                time={item.time}
                id={item.id}
                ratingAvg={item.ratingAvg}
                ratingAmt={item.ratingAmt}
                //flags={flags}
            />
        )
    }

    const reasons = [
        {id: 0, reason: 'Insufficent Audio Quality. \n'},
        {id: 1, reason: 'Story Exceeds Time Limit. \n'},
        {id: 2, reason: 'Story Contains Inappropriate/Banned Content.\n'},
        {id: 3, reason: 'Story Violates Copyright Laws.\n'},
        {id: 4, reason: 'Technical Issue.\n'},
        {id: 5, reason: 'Story Does Not Meet Quality Standards.\n'},
        {id: 6, reason: 'Narration Does Not Meet Quality Standards.\n'},
        {id: 7, reason: 'Inappropriate Cover Art.\n'},
    ]

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                            Reason for Rejection
                        </Text>
                        <ScrollView style={{marginTop : 20}}>
                            {reasons.map(({id, reason}, index) => {

                                const AddToReasons = ({reason} : any) => {

                                    if (reasonsArr.includes(reason)) {
                                        setReasonsArr(reasonsArr.filter(item => item !== reason))
                                    
                                    } 
                                    else {
                                        setReasonsArr([...reasonsArr, reason])
                                    }
                                }

                            return (
                                <TouchableWithoutFeedback onPress={() => AddToReasons({reason: reason})}>
                                    <Text style={{textAlign: 'center', paddingVertical: 0, color: reasonsArr.includes(reason) === true ? 'cyan' : '#fff',}}>
                                        {reason}
                                    </Text> 
                                </TouchableWithoutFeedback>
                            )})}
                        </ScrollView>
                        <TextInput
                            placeholder='....'
                            placeholderTextColor='#ffffffa5'
                            style={styles.textInputTitle}
                            multiline={true}
                            onChangeText={val => setReason(val)}
                        />
                        <TouchableOpacity onLongPress={() => RejectStory()}>
                            <Text style={{marginTop: 20, paddingVertical: 6, paddingHorizontal: 20, backgroundColor: 'cyan', borderRadius: 15, color: '#000', textAlign: 'center'}}>
                                Reject
                            </Text>
                        </TouchableOpacity>
                        
                    </View>
                </Modal>
            </Portal>
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 60, marginBottom: 30, marginLeft: 20 }}>
                <FontAwesome5 
                    name='chevron-left'
                    size={20}
                    color='#fff'
                    style={{padding: 30, margin: -30}}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18, marginLeft: 40}}>
                    Pending Stories
                </Text>
                <Text style={{color: '#fff', marginLeft: 20}}>
                    ({stories.length})
                </Text>
            </View>

            <View style={{height: '84%'}}>
                <FlatList 
                    data={stories}
                    keyExtractor={item => item.id}
                    extraData={stories}
                    renderItem={renderItem}
                    maxToRenderPerBatch={20}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    ListEmptyComponent={ () => {
                        return (
                            <View style={{ alignItems: 'center'}}>
                                    <Text style={{ color: 'white', margin: 20,}}>
                                        No pending stories.
                                    </Text>
                            </View>
                    );}}
                    ListFooterComponent={ () => {
                        return (
                            <View style={{ height: 100}}>
                            </View>
                    );}}
                />
            </View>
            
        </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
       width: Dimensions.get('window').width, 
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
        textTransform: 'capitalize'
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
    textInputTitle: {
        color: '#fff',
        width: '90%',
        backgroundColor: '#000',
        borderRadius: 8,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 140
    },

});

export default PendingStories;