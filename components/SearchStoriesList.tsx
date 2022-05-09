import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    FlatList, 
    Dimensions, 
    RefreshControl, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    Image 
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { AppContext } from '../AppContext';
import StoryTile from '../components/StoryTile';

import { listPinnedStories, listRatings, listStories } from '../src/graphql/queries';
import { deletePinnedStory } from '../src/graphql/mutations';
import {graphqlOperation, API, Auth} from 'aws-amplify';


const SearchStoriesList = ({search} : any) => {

    const { nsfwOn } = useContext(AppContext);

    const Item = ({title, genreName, icon, Primary, summary, imageUri, nsfw, audioUri, author, narrator, time, id} : any) => {
        
        

        const navigation = useNavigation();

    //expanding list component
        const [isVisible, setIsVisible] = useState(false);
    //liking the item
        const [isLiked, setIsLiked] = useState(false);
        
        const onLikePress = () => {
            if ( isLiked === false ) {
                setIsLiked(true);
            }
            if ( isLiked === true ) {
                setIsLiked(false);
            }  
        };

    //queueing the item

        //unpin a story
        const unPinStory = async () => {

            let userInfo = await Auth.currentAuthenticatedUser();
        
            let getPin = await API.graphql(graphqlOperation(
                listPinnedStories, {
                    filter: {
                        userID: {
                            eq: userInfo.attributes.sub
                        },
                        storyID: {
                            eq: id
                        }
                    }
                }
            ))
            console.log(getPin)
            
            let connectionID = getPin.data.listPinnedStories.items[0].id
            console.log(connectionID)

            let deleteConnection = await API.graphql(graphqlOperation(
                deletePinnedStory, {input: {"id": connectionID}}
            ))
            console.log(deleteConnection)

            setDidUpdate(!didUpdate)
        }

        const [isQ, setQd] = useState(true);
        
        const onQPress = () => {
            if ( isQ === false ) {
                setQd(true);
            }
            if ( isQ === true ) {
                setQd(false);
                unPinStory();
            }  
        };


        

        //play the audio story
        const { setStoryID } = useContext(AppContext);

        const onPlay = () => {
            setStoryID(id);
        }

        //calculate the average user rating fora  story
    const [AverageUserRating, setAverageUserRating] = useState(0);

    //rating function
    const [isRated, setIsRated] = useState(false);

    useEffect(() => {

        let Average = []

        const fetchRating = async () => {

            let userInfo = await Auth.currentAuthenticatedUser();

            let Rating = await API.graphql(graphqlOperation(
                listRatings, {filter: {
                    userID: {
                        eq: userInfo.attributes.sub
                    },
                    storyID: {
                        eq: id
                    }
                }}
            ))
            if (Rating.data.listRatings.items.length === 1) {
                //setRatingNum(Rating.data.listRatings.items[0].rating);
                setIsRated(true);
                //setRatingID(Rating.data.listRatings.items[0].id);
            } else {
                //setRatingNum(0);
                setIsRated(false);
            }

            let RatingAvg = await API.graphql(graphqlOperation(
                listRatings, {filter: {
                    storyID: {
                        eq: id
                    }
                }}
            ))

            if (RatingAvg.data.listRatings.items.length > 0) {
                for (let i = 0; i < RatingAvg.data.listRatings.items.length; i++) {
                    Average.push(RatingAvg.data.listRatings.items[i].rating) 
                }
                setAverageUserRating(
                    Math.floor(((Average.reduce((a, b) => {return a + b}))/(RatingAvg?.data.listRatings.items.length))*10)
                )
            }
        }
        fetchRating();
    }, [])

    //convert time to formatted string
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(time / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

        return (
            <View>
                <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
                    <View style={styles.tile}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{ width: '78%'}}>
                                <TouchableOpacity onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
                                    <Text style={styles.name}>
                                        {title}
                                    </Text>
                                </TouchableOpacity>
                                 
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
                            <TouchableOpacity onPress={onPlay}>
                                <View style={{ 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    borderRadius: 30,
                                    paddingVertical: 2,
                                    paddingHorizontal: 8,
                                    backgroundColor: '#ffffff33',
                                    borderColor: '#ffffffCC',
                                }}>
                                    <FontAwesome5 
                                        name='play'
                                        color='#ffffff'
                                        size={10}
                                    />
                                    <Text style={styles.time}>
                                        {millisToMinutesAndSeconds()}
                                    </Text> 
                                </View>
                            </TouchableOpacity>
                        </View> 
                
                { isVisible ? (
                    <View style={styles.popupblock}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <View style={{alignItems: 'center', width: '100%',flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{ marginVertical: 10, alignSelf: 'flex-start', flexDirection: 'row',  }}>
    
                                    <View style={{alignItems: 'center', marginRight: 25,}}>
                                        <AntDesign
                                            name={isQ ? 'pushpin' : 'pushpino'}
                                            size={20}
                                            color={isQ ? 'cyan' : 'white'}
                                            onPress={onQPress}
                                        />
                                    </View>

                                    <View style={{alignItems: 'center'}}>
                                        <FontAwesome
                                            name='share'
                                            size={20}
                                            color='white'
                                            onPress={onLikePress}
                                        />
                                    </View>
                                </View>

                                <View>
                                    <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
                                        <FontAwesome
                                            name={isRated ? 'star' : 'star-o'}
                                            size={17}
                                            color={isRated ? 'gold' : 'white'}
                                            style={{paddingHorizontal: 10}}
                                        />
                                        <Text style={{textAlign: 'center', fontSize: 17, color: '#e0e0e0'}}>
                                            {Story?.ratingAvg}
                                        </Text>
                                    </View>
                                </View>
                        
                            </View>  
                        </View>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
                            <Image 
                                source={{uri: imageUri}}
                                style={{
                                    height: 200,
                                    borderRadius: 15,
                                    marginVertical: 15,
                                    marginHorizontal: -10
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <Text style={styles.paragraph}>
                            {summary}
                        </Text>
                    </View>
                ) : false }  
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }



    //state for the array of pinned stories for that user
    const [searchedStories, setSearchedStories] = useState([])

    //update trigger for fetching the pinned stories
    const [didUpdate, setDidUpdate] = useState(false);

    //on render, get the user and then list the following connections for that user
    useEffect(() => {


        const fetchStories = async () => {

            //const SearchResults = []

            console.log(search)

            try {

                const searchResults = await API.graphql(graphqlOperation(
                    listStories, {
                        filter: {
                            title: {
                                contains: search
                            },
                            hidden: {
                                eq: false,
                            },
                            approved: {
                                eq: 'approved'
                            },
                            genreID: {
                                ne: nsfwOn === true ? '' : '1108a619-1c0e-4064-8fce-41f1f6262070'
                            }
                        }
                }))

                console.log(searchResults.data.listStories.nextToken)

                setSearchedStories(searchResults.data.listStories.items);

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

    const renderItem = ({ item } : any) => {

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
                    data={searchedStories}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                    extraData={searchedStories}
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
                            <View style={{ height:  70, alignItems: 'center'}}/>
                    );}}
                    ListHeaderComponent={ () => {
                        return (
                            <View style={{ height:  20, alignItems: 'center'}}/>
                    );}}
                    ListEmptyComponent={ () => {
                        return (
                            <View style={{ height:  70, alignItems: 'center'}}>
                                <Text style={{ color: 'white', margin: 20,}}>
                                    Sorry, we couldn't find what you were looking for.
                                </Text>
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

export default SearchStoriesList;
