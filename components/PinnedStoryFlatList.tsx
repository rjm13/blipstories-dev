import React, {useState, useEffect} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    FlatList, 
    Dimensions, 
    RefreshControl,
    ActivityIndicator 
} from 'react-native';

import { pinnedStoryByDate, getUser } from '../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import StoryTile from './StoryTile';

const AudioStoryList = () => {

    //state for the array of pinned stories for that user
    const [pinnedStories, setPinnedStories] = useState([])

    //update trigger for fetching the pinned stories
    const [didUpdate, setDidUpdate] = useState(false);

    useEffect(() => {

        const fetchStories = async () => {

            setIsLoading(true);

            const Pinned = []

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const pinnedData = await API.graphql(graphqlOperation(

                    getUser, {id: userInfo.attributes.sub}
                ))

                if (pinnedData.data.getUser.Pinned.items.length > 0) {
                    for (let i = 0; i < pinnedData.data.getUser.Pinned.items.length; i++) {
                        if (pinnedData.data.getUser.Pinned.items[i].story.hidden === false && pinnedData.data.getUser.Pinned.items[i].story.approved === 'approved') {
                            Pinned.push(pinnedData.data.getUser.Pinned.items[i].story)
                        } else {return;}
                    }
                }
                     
                setPinnedStories(Pinned);
                
                setIsLoading(false);
               
            } catch (e) {
            console.log(e);
          }
        }
        fetchStories(); 
      }, [didUpdate])

    //on render, get the user and then list the following connections for that user
    // useEffect(() => {

    //     const fetchStories = async () => {

    //         setIsLoading(true);

    //         const Pinned = []

    //         const userInfo = await Auth.currentAuthenticatedUser();

    //         if (!userInfo) {return;}

    //         try {

    //             const pinnedData = await API.graphql(graphqlOperation(

    //                 pinnedStoryByDate, {
    //                     type: 'PinnedStory',
    //                     sortDirection: 'DESC',
    //                     filter: {
    //                         userID: {
    //                             eq: userInfo.attributes.sub
    //                         },
    //                     }
    //                 }
    //             ))

    //             if (pinnedData.data.PinnedStoryByDate.items.length > 0) {
    //                 for (let i = 0; i < pinnedData.data.PinnedStoryByDate.items.length; i++) {
    //                     if (pinnedData.data.PinnedStoryByDate.items[i].story.hidden === false && pinnedData.data.PinnedStoryByDate.items[i].story.approved === 'approved') {
    //                         Pinned.push(pinnedData.data.PinnedStoryByDate.items[i].story)
    //                     } else {return;}
    //                 }
    //             }
                     
    //             setPinnedStories(Pinned);
                
    //             setIsLoading(false);
               
    //         } catch (e) {
    //         console.log(e);
    //       }
    //     }
    //     fetchStories(); 
    //   }, [didUpdate])

    //refresh state of the flatlist
    const [isFetching, setIsFetching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
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
        <StoryTile 
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

    return (
            <View style={styles.container}>
               
                <FlatList 
                    data={pinnedStories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={pinnedStories}
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
                            <View style={{ height:  100}} />
                    );}}
                    ListEmptyComponent={ () => {
                        return (
                            <View style={{ alignItems: 'center'}}>
                                {isLoading === true ? (
                                <View style={{margin: 30}}>
                                    <ActivityIndicator size='small' color='cyan' />
                                </View>
                                ) : (
                                <View>
                                    <Text style={{ color: 'white', margin: 20,}}>
                                        There is nothing here! Tap the pin icon to add a story to your playlist.
                                    </Text>

                                    <Text style={{ textAlign: 'center', color: 'gray', margin: 20,}}>
                                        (pull to refresh)
                                    </Text>
                                </View>
                                )}
                            </View>
                    );}}
                />
            
            </View>
    );
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

export default AudioStoryList;
