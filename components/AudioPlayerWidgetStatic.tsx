import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    ImageBackground, 
    Animated, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Platform
} from 'react-native';

import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {graphqlOperation, API, Storage, Auth} from 'aws-amplify';
import { getStory, getUser } from '../src/graphql/queries';
import { deletePinnedStory, createFinishedStory, updateStory } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';
import * as RootNavigation from '../navigation/RootNavigation';
import ShareStory from '../components/functions/ShareStory';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

//custom hook for setting the time on the slider
    function useInterval(callback, delay) {
        const savedCallback = useRef();
        
        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        
        // Set up the interval.
        useEffect(() => {
            let id = setInterval(() => {
            savedCallback.current();
            }, delay);
            return () => clearInterval(id);
        }, [delay]);
    }


const AudioPlayer  = () => {



//get the global page state for the audio player
    const { isRootScreen } = useContext(AppContext);

//get context for storyID
    const { storyID } = useContext(AppContext);
    const { setStoryID } = useContext(AppContext);

//minimize the player with animations
    const [isExpanded, setIsExpanded] = useState(true);

    const animation = useRef(new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 90 })).current;

    const onChangeHandler = () => {
        if (isExpanded) {
            setIsExpanded(false);
            Animated.spring(animation.y, {
                toValue: -SCREEN_HEIGHT + 120,
                tension: 1,
                //duration: 200,
                useNativeDriver: false,
            }).start();
        } else if (!isExpanded) {
            setIsExpanded(true);
            Animated.spring(animation.y, {
                toValue: SCREEN_HEIGHT - 90,
                tension: 1,
                //duration: 200,
                useNativeDriver: false,
            }).start();
        } 
    }

    const animatedHeight = {
        transform: animation.getTranslateTransform(),
    };
  
    const animatedImageHeight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH/1.2, 0],
        extrapolate: 'clamp',
        });
        
    const animatedImageWidth = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH, 0],
        extrapolate: 'clamp',
        });

    const animatedSongTitleOpacity = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
    });

    const animatedImageMarginLeft = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_WIDTH / 2 - 100, 10],
        extrapolate: 'clamp',
    });

    const animatedHeaderHeightMinimized = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_HEIGHT, 0],
        extrapolate: 'clamp',
    });

    const animatedButtonLeft = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, -80],
        extrapolate: 'clamp',
    });

    const animatedButtonRight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, -300],
        extrapolate: 'clamp',
    });

    const animatedHeaderHeightSmall = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [0, 60],
        extrapolate: 'clamp',
    });

    const animatedBoxHeight = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: [SCREEN_HEIGHT - (Platform.OS === 'ios' ? 240 : 240), 60],
        extrapolate: 'clamp',
      });

    const animatedBottom = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - (isRootScreen === true ? (Platform.OS === 'ios' ? 34 : 60 ) : (Platform.OS === 'ios' ? 60 : 90 ))],
        outputRange: [-610, 690],
        extrapolate: 'clamp',
      });

    const animatedSongDetailsOpacity = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 90],
        outputRange: [1, 0.5, 0.5],
        extrapolate: 'clamp',
    });

    const animatedBackgroundColor = animation.y.interpolate({
        inputRange: [0, SCREEN_HEIGHT - 90],
        outputRange: ['rgba(0,0,0,0.5)', 'white'],
        extrapolate: 'clamp',
    });

//use storyID to retrieve Story from AWS
    const [Story, setStory] = useState(null);
    const [AudioUri, setAudioUri] = useState('');
    const [imageU, setImageU] = useState('')
    const [user, setUser] = useState({})

//fetch the story attributes and audioUri from the s3 bucket
    useEffect(() => {

        const fetchStory = async () => {
        
            try {
                const storyData = await API.graphql(graphqlOperation(getStory, {id: storyID}))

                if (storyData) {
                    setStory(storyData.data.getStory);
                    const response = await Storage.get(storyData.data.getStory.audioUri, {download: false, 
                        //expiration: 604800
                    });
                    const imageresponse = await Storage.get(storyData.data.getStory.imageUri)
                    setAudioUri(response);
                    setImageU(imageresponse);
                    setPosition(0);
                }
            } catch (e) {
                console.log(e);
            }
        }

        const fetchUser = async () => {

            let userInfo = await Auth.currentAuthenticatedUser();

            let UserData = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))
            setUser(UserData.data.getUser)

            for (let i = 0; i < UserData.data.getUser.Rated.items.length; i++) {
                if (UserData.data.getUser.Rated.items[i].storyID === storyID) {
                    setIsRated(true);
                }
            }

            for (let i = 0; i < UserData.data.getUser.Finished.items.length; i++) {
                if (UserData.data.getUser.Finished.items[i].storyID === storyID) {
                    setIsFinished(true);
                }
            }

        }

        fetchStory();
        fetchUser();

    }, [storyID])



//audio player
    const [sound, setSound] = useState();

    const [isPlaying, setIsPlaying] = useState(false);

    const [position, setPosition] = useState(0); //position in milliseconds

    const [slideLength, setSlideLength] = useState(0); //slide length

    const onClose = () => {
        setStoryID(null);
        setStory(null);
    }

//unpin a story
    const unPinStory = async () => {

        for (let i = 0; i < user.Pinned.items.length; i++) {
            if (user.Pinned.items[i] === storyID) {
                await API.graphql(graphqlOperation(
                    deletePinnedStory, {id: user.Pinned.items[i].id}
                ))

            }
        }
    }
  

//rating state (if rated or not)
    const [isLiked, setIsLiked] = useState(false);
    
    const onLikePress = () => {
        if ( isLiked === false ) {
            setIsLiked(true);
        }
        if ( isLiked === true ) {
            setIsLiked(false);
        }  
    };

//check if the story is rated or not
    const [isRated, setIsRated] = useState(false);

    //if item is finished state
    const [isFinished, setIsFinished] = useState(false);


//add the story to the history list when finished by creating a new history item
const AddToHistory = async () => {
    //check if the story is already in the history
    let userInfo = await Auth.currentAuthenticatedUser();

    //if item is not in history then...
    if (isFinished === false) {
        //create the history object
        await API.graphql(graphqlOperation(
                createFinishedStory, {input: {
                    userID: userInfo.attributes.sub, 
                    storyID: storyID, 
                    type: 'FinishedStory', 
                    createdAt: new Date(),
                    genreID: Story?.genreID,
                    nsfw: Story?.nsfw
                }}
            ))

        await API.graphql(graphqlOperation(
            updateStory, {input: {id: storyID, numListens: Story?.numListens + 1}}
        ))

        //unpin the story, if pinned
        unPinStory();

        //navigate to the story page and open the ratings modal, if not already rated
            RootNavigation.navigate('StoryScreen', { storyID: storyID });
            onClose();
    } else {
        await API.graphql(graphqlOperation(
            updateStory, {input: {id: storyID, numListens: Story?.numListens + 1}}
        ))
        RootNavigation.navigate('StoryScreen', { storyID: storyID });
        onClose();
    }
    
   
}


//slider functions
    function SetPosition(value) {
        setPosition(value)
    }

    async function StoryPosition (value) { 
        await sound.setPositionAsync(value);
        setPosition(value);
    }

    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(position / 60000);
        let seconds = ((position % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

    function convertToTime () {
        let minutes = Math.floor(slideLength / 60000);
        let seconds = Math.floor((slideLength % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }  

//audio play and pause control
    async function PlayPause() {

        console.log('Loading Sound');
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: false,
            playThroughEarpieceAndroid: false,
            allowsRecordingIOS: false,
            //interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            
          });
          console.log(AudioUri)
        const { sound } = await Audio.Sound.createAsync(
            
            {uri: AudioUri},
            //require('../assets/zelda.mp3'),
            {
                shouldPlay: true,
                rate: 1.0,
                shouldCorrectPitch: false,
                volume: 1.0,
                isMuted: false,
                isLooping: false,
            },
        );
        setSound(sound);

        let time = await sound.getStatusAsync();
        setSlideLength(time.durationMillis);

        if (isPlaying === false) {
            console.log('Playing Sound');
            await sound.playAsync(); 
            setIsPlaying(true);
            await sound.setPositionAsync(position);
        }
        if (isPlaying === true) {
            await sound.pauseAsync();
            setIsPlaying (false);     
        }    
    }

    useInterval(() => {
        if (isPlaying === true && position < slideLength) {
        setPosition(position + 1000);
        }
        if (isPlaying === true && position >= slideLength) {
            setPosition(0);
            setIsPlaying(false);
            AddToHistory();
        }
      }, 1000);
    
    useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
        }
            
        : undefined;
    }, [sound]);

    if (!Story) {
        return null;
    }



    return (

        <View>
            <Animated.View style={{height: animatedImageHeight, width: animatedImageWidth, position: 'absolute', bottom: Platform.OS === 'ios' ? 360 : 460,}}>
                <ImageBackground
                    style={{
                        flex: 1,
                        width: null,
                        height: null,
                        backgroundColor: '#363636',
                    }}
                    source={{uri: imageU}}
                >
                { isExpanded === false ? (
                    <Animated.View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-between', marginHorizontal: 20}}>
                        {Story.imageUri ? (null) : (
                            <View style={{ position: 'absolute', left: Dimensions.get('window').width/2 - 40, top: 80, backgroundColor: 'transparent'}}>
                                <FontAwesome5 
                                    name={Story?.genre?.icon}
                                    color='#ffffffa5'
                                    size={50}
                                />
                            </View>
                        )}
                        
                        <View>
                           <TouchableOpacity onPress={onClose}>
                                <Animated.View style={ [styles.button, {left: -20}]}>
                                    <AntDesign 
                                        name='close'
                                        size={22}
                                        color='#fff'
                                    />
                                </Animated.View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onChangeHandler}>
                                <Animated.View style={ [styles.button, {left: -20}]}>
                                    <FontAwesome5 
                                        name='chevron-down'
                                        size={22}
                                        color='#fff'
                                    />
                                </Animated.View>
                            </TouchableOpacity> 
                        </View>
                        
                        
                        <View>
                            
                            <Animated.View style={ [styles.button, {right: -20}]}>
                                <FontAwesome 
                                    name='commenting-o'
                                    size={22}
                                    color='#fff'
                                    onPress={() => {RootNavigation.navigate('StoryScreen', { storyID: storyID, path: 'commenting' });
                                        onChangeHandler();}
                                    }
                                    style={{ }}
                                />
                            </Animated.View>
                            
                            <Animated.View style={ [styles.button, {right: -20}]}>
                                <FontAwesome 
                                    name='share'
                                    size={22}
                                    color='white'
                                    onPress={() => ShareStory({id: Story?.id, title: Story?.title})}
                                    style={{ }}
                                />
                            </Animated.View>
                        </View>  
                    </Animated.View>
                ) : null } 
                </ImageBackground>
            </Animated.View>

            <Animated.View
                style={[
                    animatedHeight, {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: animatedBottom,
                        //zIndex: 10,
                        height: animatedBoxHeight,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        overflow: 'hidden'
                    },
                ]}>
                    <LinearGradient 
                        colors={[isExpanded ? '#165C5C' : '#3B6980', isExpanded ? '#165C5C' : '#000', isExpanded ? '#165C5C' : '#000']}
                        style={{ borderTopRightRadius: 15, borderTopLeftRadius: 15, flex: 1}}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <Animated.View style={{ height: animatedHeaderHeightSmall, flexDirection: 'row', alignItems: 'center', }}>
                            { isExpanded === true ? (
                                <TouchableWithoutFeedback onPress={onChangeHandler}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                    
                                        <Animated.Text
                                            numberOfLines={1}
                                            style={{
                                                opacity: animatedSongTitleOpacity,
                                                fontSize: 18,
                                                paddingLeft: 20,
                                                color: '#fff',
                                                width: '75%'
                                        }}>
                                            {Story?.title}
                                        </Animated.Text>
                                    
                                        <TouchableOpacity onPress={PlayPause}>
                                            <Animated.View style={{opacity: animatedSongTitleOpacity, }}>
                                                <FontAwesome5 
                                                    name={isPlaying === true ? 'pause' : 'play'}
                                                    color='#ffffffCC'
                                                    size={20}
                                                    style={{ paddingHorizontal: 40,}}
                                                />
                                        </Animated.View>
                                        </TouchableOpacity>
                                        
                                    </View> 
                                </TouchableWithoutFeedback>
                            ) : null } 
                        </Animated.View>
                        
    {/* Expanded View elements */}
                <Animated.View
                    style={{
                        height: animatedHeaderHeightMinimized,
                        opacity: animatedSongDetailsOpacity,
                    }}>
                    { isExpanded === false ? (
                        <View style={{ justifyContent: 'space-between', height: '50%'}}>
                            <View>
                                <TouchableWithoutFeedback 
                                    onPress={
                                        () => {RootNavigation.navigate('StoryScreen', { storyID: storyID });
                                        onChangeHandler();}
                                    }>
                                    <View style={{ alignItems: 'center',  marginHorizontal: 40, marginVertical: 20, }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#fff', textAlign: 'center' }}>
                                            {Story?.title}
                                        </Text>

                                        <View style={{ width: Dimensions.get('window').width - 40, flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-open'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.author}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name='book-reader'
                                                    color='#ffffffCC'
                                                    size={15}
                                                    style={{ marginRight: 10}}
                                                />
                                                <Text style={styles.username}>
                                                    {Story?.narrator}
                                                </Text>
                                            </View>
                                    </View>
                                    </View>  
                                </TouchableWithoutFeedback>

                                <View style={{ alignItems: 'center', marginHorizontal: 20}}>
                                    <View style={{marginTop: -10,}}>
                                        <View style={[{flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width - 80}]}>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome5 
                                                    name={Story?.genre?.icon}
                                                    color='#ffffffa5'
                                                    size={15}
                                                    style={{marginRight: 10}}
                                                />
                                                <Text style={[ { color: Story?.genre?.PrimaryColor, fontSize: 16, textTransform: 'capitalize' }]}>
                                                    {Story?.genre?.genre} 
                                                </Text>
                                            </View>
                                            
                                            <View style={{justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                                                <FontAwesome 
                                                    name={isRated === true ? 'star' : 'star-o'}
                                                    size={17}
                                                    color={isRated === true || isFinished === true ? 'gold' : 'white'}
                                                    onPress={onLikePress}
                                                    style={{marginHorizontal: 6 }}
                                                />
                                                <Text style={{textAlign: 'center', color: '#e0e0e0', fontSize: 17}}>
                                                    {(Story?.ratingAvg/10).toFixed(1)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    {Platform.OS === 'android' ? (
                                        <View style={{ height: 110, marginTop: 20, marginHorizontal: -20 }}>
                                        <Text style={[styles.highlight, {textAlign: 'center'}]}>
                                            {Story?.summary}
                                        </Text>
                                    </View>
                                    ) : null}
                                    
                                </View>
                            </View>
                            
                            <View style={{}}>
                                <TouchableOpacity onPress={PlayPause}>
                                    <View style={{alignSelf: 'center' }}>
                                        <FontAwesome5 
                                            name={isPlaying === true ? 'pause' : 'play'}
                                            color='#ffffffCC'
                                            size={50}
                                        />
                                    </View>
                                </TouchableOpacity>
                                

                                <View style={{ marginTop: 20, width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',}}>
                                    <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                        {millisToMinutesAndSeconds()}
                                    </Text>
                                    <Text style={{ fontSize: 18, marginBottom: 5, textAlign: 'center', color: 'white'}}>
                                        {convertToTime()}
                                    </Text>
                                </View>

                                <View style={{ alignItems: 'center', marginTop: Platform.OS === 'ios' ? 20 : 0}}>
                                    <Slider
                                        style={{width: 320, height: 10}}
                                        minimumTrackTintColor="cyan"
                                        maximumTrackTintColor="#ffffffa5"
                                        thumbTintColor='#fff'
                                        //tapToSeek={true}
                                        value={position}
                                        step={1000}

                                        minimumValue={0}
                                        maximumValue={slideLength} //function set to the length of the audio file
                                        onValueChange={SetPosition} //function: when slider changes, slider value = SetPosition
                                        onSlidingComplete={StoryPosition}
                                    />
                                </View>
                            </View>
                        </View>
                    ) : null } 
                </Animated.View>
            </LinearGradient>
        </Animated.View>
    </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#363636a5',
        borderRadius: 50,
        width: 36,
        height: 36,
        margin: 10,
    },
    username: {
        color: '#ffffffCC',
        fontSize: 16,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    highlight: { 
        color: '#ffffffCC',
        fontSize: 14,
        borderRadius: 15,
        padding: 10,
        //backgroundColor: '#363636CC',
    },
   
});

export default AudioPlayer;
