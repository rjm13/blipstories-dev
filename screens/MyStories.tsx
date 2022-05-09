import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    TouchableOpacity,  
    ActivityIndicator,
    RefreshControl,
    FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {StatusBar} from 'expo-status-bar';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Provider } from 'react-native-paper';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import { updateStory } from '../src/graphql/mutations';


const MyStories = ({navigation} : any) => {

    const [deleteID, setDeleteID] = useState(null);

    const DeleteStory = async () => {

        if (confirm !== true) {
            return;
        } else {
            try {
                const storyData = await API.graphql(graphqlOperation(
                    updateStory, {input: {id: deleteID, hidden: true}}
                ))
                console.log(storyData)
            } catch (e) {
                console.log(e)
            }
        }
        setDidUpdate(!didUpdate);
        hideModal();
        setDeleteID(null);
    }


    const Item = ({id, title, genreName, author, narrator} : any) => {

    //arrow state
    const [optionsVisible, setOptionsVisible] = useState(false)

    return (
        <View>
            <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ width: '78%'}}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
                            <View>
                                <Text style={styles.name}>
                                    {title}
                                </Text> 
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.category]}>
                                        {genreName}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        
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

                    <View style={{alignSelf: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => setOptionsVisible(!optionsVisible)}>
                            <View style={{alignItems: 'center', borderRadius: 20, height: 40,
                                width: 40, justifyContent: 'center',
                            }}>
                                <FontAwesome5 
                                    name={optionsVisible === true ? 'chevron-down' : 'chevron-right'}
                                    color='#ffffff'
                                    size={20}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    
                </View> 
                
                {optionsVisible === true ? (
                    <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                        <TouchableWithoutFeedback onPress={() => {showModal(); setDeleteID(id)}}>
                            <View style={{alignItems: 'center', marginTop: 20, width: 80, paddingVertical: 6, borderRadius: 20, backgroundColor: 'gray'}}>
                                <Text style={{color: '#000'}}>
                                    Delete
                                </Text> 
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('EditAudioStory', {storyID: id})}>
                            <View style={{alignItems: 'center', marginTop: 20, width: 80, paddingVertical: 6, borderRadius: 20, backgroundColor: '#00ffffa5'}}>
                                <Text style={{color: '#000'}}>
                                    Edit
                                </Text> 
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ) : null}
                
            </View>
        </View>
        )
    }

    const renderItem = ({ item }: any) => {

        let icon = ''
        let genreName = ''
        let primary = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
            primary = item.genre.PrimaryColor
        }
        
        return (
        <Item 
          title={item.title}
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
        />
      );}

    
    //update trigger for fetching the stories
    const [didUpdate, setDidUpdate] = useState(false);

    const [Stories, setStories] = useState([])

    //on render, list the stories for that user
    useEffect(() => {

        const fetchStories = async () => {

            let storiesarr = []

            setIsLoading(true);

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const userStories = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub
                }))

                for (let i = 0; i < userStories.data.getUser.authored.items.length; i++) {
                    if (userStories.data.getUser.authored.items[i].hidden === false && userStories.data.getUser.authored.items[i].approved === 'approved') {
                        storiesarr.push(userStories.data.getUser.authored.items[i])
                    }
                }

                setStories(storiesarr);
                
                setIsLoading(false);

            } catch (e) {
            console.log(e);
          }
        }
           fetchStories(); 
      }, [didUpdate])

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

    const [confirm, setConfirm] = useState(false);

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={() => {hideModal(); setConfirm(false); setDeleteID(null)}} contentContainerStyle={containerStyle}>
                    <View style={{paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center' }}>
                        <Text style={{fontSize: 14, marginBottom: 20, textAlign: 'center', color: '#fff'}}>
                            Once confirmed, this action cannot be undone and your story cannot be recovered!
                        </Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#fff', }}>
                            Are you sure you want to permenantly delete this story?
                        </Text>
                        <View style={{marginTop: 40}}>
                            <TouchableOpacity onPress={() => setConfirm(true)} onLongPress={DeleteStory}>
                                <View style={{
                                    borderWidth: 1, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 6, borderRadius: 20, 
                                    borderColor: confirm === true ? '#ff0000' : 'gray', 
                                    backgroundColor: confirm === true ? '#ff0000' : 'transparent',
                                    }}>
                                    <Text style={{fontWeight: 'bold', color: confirm === true ? '#ffffff' : 'gray'}}>
                                        {confirm === true ? 'Hold to Delete' : 'Yes, Delete'}
                                    </Text>
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
                            <View style={{padding: 30, margin: -30}}>
                                <FontAwesome5 
                                    name='chevron-left'
                                    color='#fff'
                                    size={20}
                                    
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
                        
                        <Text style={styles.header}>
                            My Stories
                        </Text>
                    </View>

                    <View style={{height: '86%'}}>
                        <FlatList 
                            data={Stories}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            extraData={Stories}
                            maxToRenderPerBatch={20}
                            refreshControl={
                                <RefreshControl
                                refreshing={isFetching}
                                onRefresh={onRefresh}
                                />
                            }
                            showsVerticalScrollIndicator={false}    
                            ListFooterComponent={ () => {
                                return (
                                    <View style={{ height:  120}}/>
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

});

export default MyStories;