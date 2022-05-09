import React, {useState, useContext, useEffect} from 'react';

import {
    View, 
    Text, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Image,
    Dimensions,
    StyleSheet,
    ImageBackground
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

import { AppContext } from '../AppContext';

const HorzStoryTile = ({
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

// //expanding list item
//     const [isVisible, setIsVisible] = useState(false);

//liking the item state
    // const [isLiked, setIsLiked] = useState(false);
    
    // const onLikePress = () => {
    //     if ( isLiked === false ) {
    //         setIsLiked(true);
    //     }
    //     if ( isLiked === true ) {
    //         setIsLiked(false);
    //     }  
    // };

//queueing the item state when pressed
// const [isQ, setQd] = useState(false);
        
// const onQPress = () => {
//     if ( isQ === false ) {
//         setQd(true);
//         PinStory({storyID: id})
//     }
//     if ( isQ === true ) {
//         setQd(false);
//         unPinStory({storyID: id});
//     }  
// };

//on render, determine if the story in alraedy pinned or not
// useEffect(() => {
//     const fetchPin = async () => {

//         const userInfo = await Auth.currentAuthenticatedUser();

//         try {
//             let getPin = await API.graphql(graphqlOperation(
//                 listPinnedStories, {
//                     filter: {
//                         userID: {
//                             eq: userInfo.attributes.sub
//                         },
//                         storyID: {
//                             eq: id
//                         }
//                     }
//                 }
//             ))

//             if (getPin.data.listPinnedStories.items.length === 1) {
//                 setQd(true);
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     fetchPin();
// }, [])

//play the audio story by setting the global context to the story id
    //const { setStoryID } = useContext(AppContext);
    //const onPlay = () => {setStoryID(id);}

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
        <View style={styles.container}>
  
        <View style={{ position: 'absolute', left: 80, top: 40, backgroundColor: 'transparent'}}>
            <FontAwesome5 
                name={icon}
                color='#ffffff'
                size={50}
            />
        </View>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('StoryScreen', {storyID: id})}>
            <ImageBackground
                source={{uri: imageU}}
                style={{marginBottom: 12, backgroundColor: '#ffffffa5', width: 200, height: 180, justifyContent: 'flex-end', borderRadius: 15}}
                imageStyle={{borderRadius: 15,}}
            >
                <View style={{ flexDirection: genreName !== null ? 'column' : 'row', justifyContent: genreName !== null ? 'flex-start' : 'space-between', backgroundColor: '#000000a5', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, paddingHorizontal: 10, paddingVertical: 6}}> 
                    <View style={{marginBottom: 0}}>
                        <Text style={{width: 140, color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
                            {title}
                        </Text>
                    </View>
                    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        {genreName !== null ? (
                            <View>
                                <Text style={{color: '#ffffffa5', fontSize: 12, textTransform: 'capitalize'}}>
                                {genreName}
                                </Text>
                            </View> 
                        ) : null    
                        }
                       
                        <View style={{ alignItems: 'center', flexDirection: 'row'}}>
                            <FontAwesome 
                                name={isRated === true ? 'star' : 'star-o'}
                                size={12}
                                color={isRated === true || isFinished === true ? 'gold' : 'white'}
                                style={{marginRight: 6 }}
                            />
                            <Text style={{color: '#fff', fontSize: 12}}>
                                {(ratingAvg/10).toFixed(1)}
                            </Text>
                        </View>
                        
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
        
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginLeft: 20,
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

export default HorzStoryTile;