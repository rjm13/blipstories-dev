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

import { getUser } from '../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';
import StoryTile from './StoryTile';


const AudioStoryList = () => {

    //state for the array of pinned stories for that user
    const [favedStories, setFavedStories] = useState([])

    //update trigger for fetching the pinned stories
    const [didUpdate, setDidUpdate] = useState(false);

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

        const fetchStories = async () => {

            setIsLoading(true);

            const Faved = []

            const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

            try {

                const favedData = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub
                }))

                if (favedData.data.getUser.Rated.items.length > 0) {
                    for (let i = 0; i < favedData.data.getUser.Rated.items.length; i++) {
                        if (favedData.data.getUser.Rated.items[i].rating > 7 && favedData.data.getUser.Rated.items[i].story.hidden === false && favedData.data.getUser.Rated.items[i].story.approved === 'approved') {
                            Faved.push(favedData.data.getUser.Rated.items[i].story) 
                        } else {return;}
                    } 
                }
                
                setFavedStories(Faved);
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

      const [isLoading, setIsLoading] = useState(false)

    return (
            <View style={styles.container}>

                <FlatList 
                    data={favedStories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={favedStories}
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
                            <View style={{ height:  100,}}/>
                    );}}
                    ListEmptyComponent={ () => {
                        return (
                            <View style={{alignItems: 'center'}}>
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
