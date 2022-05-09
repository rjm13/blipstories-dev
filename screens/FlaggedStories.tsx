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
import { listFlags } from '../src/graphql/queries';
import { updateStory, createMessage, updateFlag } from '../src/graphql/mutations';
import TimeConversion from '../components/functions/TimeConversion';
import { setNotificationChannelGroupAsync } from 'expo-notifications';

const FlaggedStories = ({navigation} : any) => {

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

    const [flags, setFlags] = useState([])

    //fetch the stories that are not approved
    useEffect(() => {

        //const arr = []

        const getStories = async () => {
            let response = await API.graphql(graphqlOperation(
                listFlags, {
                    filter: {
                        Status: {
                            eq: 'active'
                        }
                    }
                }
            ))
            setFlags(response.data.listFlags.items)
        }
        getStories();
    }, [didUpdate])

    const [pending, setPending] = useState(false)


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
                        status: null

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

    

 

    const Flag = ({flag, title, flag2, flag3, flag4, id, storyID} : any) => {

        const DeleteFlag = async () => {
            try {
                await API.graphql(graphqlOperation(
                    updateFlag, {input: {
                        id: id,
                        Status: 'dismissed'
                    }}
                ))
                setDidUpdate(!didUpdate)
            } catch {
                alert ('Could not delete. Try again.')
            }
        }

        const MarkForReview = async () => {
            try {
                await API.graphql(graphqlOperation(
                    updateStory, {input: {
                        id: storyID,
                        approved: 'pending'
                    }}
                ))
                await API.graphql(graphqlOperation(
                    updateFlag, {input: {
                        id: id,
                        Status: 'dismissed'
                    }}
                ))
                setDidUpdate(!didUpdate)
            } catch {
                alert('Could not update. Try again.')
            }
        }

        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, backgroundColor: '#363636', borderRadius: 15, padding: 20}}>
                <TouchableOpacity onPress={() => navigation.navigate('StoryScreen', {storyID: storyID})}>
                    <View>
                        <Text style={{color: '#fff', textTransform: 'capitalize', fontWeight: 'bold'}}>
                        {title}
                        </Text>
                        <Text style={{color: '#00ffffa5'}}>
                            {flag}
                        </Text>
                        {flag2 ? (
                            <Text style={{color: '#00ffffa5'}}>
                            {flag2}
                        </Text>
                        ) : null}
                        {flag3 ? (
                            <Text style={{color: '#00ffffa5'}}>
                            {flag2}
                        </Text>
                        ) : null}
                        {flag4 ? (
                            <Text style={{color: '#00ffffa5'}}>
                            {flag2}
                        </Text>
                        ) : null}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={DeleteFlag} onLongPress={MarkForReview}>
                    <FontAwesome5 
                        name='poo-storm'
                        color='#fff'
                        size={20}
                    />
                </TouchableOpacity>
                
                
            </View>

        )
    }

    const renderFlag = ({item} : any) => {

       
        let flag1 = item.flagTypes[0]
        let flag2 = item.flagTypes[1]
        let flag3 = item.flagTypes[2]
        let flag4 = item.flagTypes[3]

        return (
            <Flag 
                flag={flag1}
                flag2={flag2}
                flag3={flag3}
                flag4={flag4}
                title={item.story.title}
                id={item.id}
                storyID={item.storyID}
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
                    Flagged Stories
                </Text>
                <Text style={{color: '#fff', marginLeft: 20}}>
                    ({flags.length})
                </Text>
            </View>

            <View style={{height: '84%'}}>
                <FlatList 
                    data={flags}
                    keyExtractor={item => item.id}
                    extraData={flags}
                    renderItem={renderFlag}
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
                                        No flagged stories.
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

export default FlaggedStories;