import React, {useState, useContext, useEffect} from 'react';

import {
    View, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    StyleSheet
} from'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser, listPinnedStories, listRatings, listFinishedStories } from '../src/graphql/queries';
import { updateStory } from '../src/graphql/mutations';

import {useNavigation} from '@react-navigation/native';

import PinStory from '../components/functions/PinStory';
import unPinStory from '../components/functions/UnPinStory';
import ShareStory from '../components/functions/ShareStory';

import { AppContext } from '../AppContext';
import TimeConversion from './functions/TimeConversion';

const StoryTile = ({
    title, 
    genreName, 
    summary, 
    imageUri, 
    nsfw, 
    audioUri, 
    author, 
    narrator, 
    time, 
    id,
    ratingAvg,
    ratingAmt,
    icon
} : any) => {
        
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

//liking the item state
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

//queueing the item state when pressed
const [isQ, setQd] = useState(false);
        
const onQPress = () => {
    if ( isQ === false ) {
        setQd(true);
        PinStory({storyID: id})
    }
    if ( isQ === true ) {
        setQd(false);
        unPinStory({storyID: id});
    }  
};

//on render, determine if the story in alraedy pinned or not
useEffect(() => {
    const fetchPin = async () => {

        const userInfo = await Auth.currentAuthenticatedUser();

        try {
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

            if (getPin.data.listPinnedStories.items.length === 1) {
                setQd(true);
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchPin();
}, [])

//play the audio story by setting the global context to the story id
    const { setStoryID } = useContext(AppContext);
    const onPlay = () => {setStoryID(id);}

    //determine if this user has rated this story or not. If rated, the star will appear gold
    const [isRated, setIsRated] = useState(false);

    //if item is finished state
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {

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

            let storyCheck = await API.graphql(graphqlOperation(
                listFinishedStories, {filter: {
                    userID: {
                        eq: userInfo.attributes.sub
                        },
                    storyID: {
                        eq: id
                    }
                    }
                }
            ));

            if (storyCheck.data.listFinishedStories.items.length === 1) {
                setIsFinished(true);
            }
            if (Rating.data.listRatings.items.length === 1) {
                setIsRated(true);
            } else {
                setIsRated(false);
            }

        }
        fetchRating();
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
                            <TouchableOpacity onPress={onPlay}>
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
                                        onPress={() => ShareStory({id: id, title: title})}
                                    />
                                </View>
                            </View>

                            <View>
                                <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{color: '#ffffffa5', fontSize: 15, alignSelf: 'center'}}>
                                            ({ratingAmt})
                                        </Text>
                                       <FontAwesome
                                            name={isRated ? 'star' : 'star-o'}
                                            size={17}
                                            color={isRated === true || isFinished === true ? 'gold' : 'white'}
                                            style={{paddingHorizontal: 10}}
                                        /> 
                                        
                                    </View>
                                    <Text style={{textAlign: 'center', fontSize: 17, color: '#e0e0e0'}}>
                                        {(ratingAvg/10).toFixed(1)}
                                    </Text>
                                </View>
                            </View>
                    
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
                </View>
            ) : false }  
                </View>
            </TouchableWithoutFeedback>
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

export default StoryTile;