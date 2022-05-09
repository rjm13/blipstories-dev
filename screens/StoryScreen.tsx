import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    ImageBackground, 
    ScrollView, 
    TouchableOpacity, 
    Animated,
    TouchableWithoutFeedback,
    FlatList,
    Image,
    TextInput,
    ActivityIndicator,
    Platform,
    KeyboardAvoidingView
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Modal, Portal, Provider } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as Animatable from 'react-native-animatable';
import { formatRelative, parseISO } from "date-fns";
import ShareStory from '../components/functions/ShareStory';

import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';
import { getStory, getUser } from '../src/graphql/queries';
import { createComment, createFlag, createRating, updateRating, updateStory } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';
import PinStory from '../components/functions/PinStory';
import unPinStory from '../components/functions/UnPinStory';


const StoryScreen  = ({navigation} : any) => {

//recieve story ID as props
    const route = useRoute();
    const {storyID, path} = route.params;

//ref to scroll to comment section
    const scrollRef = useRef();
    const [viewPosition, setViewPosition] = useState(0);

    //focus to the comment box
    const focus = useRef(null)



    //anchor to comments section
    const scrollToView = () => {
        scrollRef.current?.scrollTo({y: viewPosition + 1400, animated: true});
        focus.current.focus()
        
      }

      const [commentUpdated, setCommentUpdated] = useState(false);

//use storyID to retrieve Story from AWS
    const [Story, setStory] = useState();

//set the position of the audio player if the screen is full page
    const { setIsRootScreen } = useContext(AppContext);

    useEffect(() => {
        setIsRootScreen(true)
    },[])

//send context to audio player
    const { setStoryID } = useContext(AppContext);

//set global state context to the storyID to play the story
    const onPlay = () => {setStoryID(storyID);}

//get the story attributes using the storyID
    useEffect(() => {
        const fetchStory = async () => {
            
            let tagarr = []

            try {
                const storyData = await API.graphql(graphqlOperation(getStory, {id: storyID}))

                for(let i = 0; i < storyData.data.getStory.tags.items.length; i++) {
                    tagarr.push({id: storyData.data.getStory.tags.items[i].tag.id, tagName: storyData.data.getStory.tags.items[i].tag.tagName})
                }
                setTags(tagarr)

                if (storyData) {
                    setStory(storyData.data.getStory);
                    let response = await Storage.get(storyData.data.getStory.imageUri);
                    setImageU(response);
                }

                setCommentList(storyData.data.getStory.comments.items)

            } catch (e) {
                console.log(e);
            }}
        fetchStory();
    }, [storyID, commentUpdated])

    const [imageU, setImageU] = useState()
        

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

//scrolling annimation
    const animation = useRef(new Animated.Value(0)).current;

    const animatedColor = animation.interpolate({
        inputRange: [0, 500],
        outputRange: ['transparent', '#363636'],
        extrapolate: 'clamp',
        });

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 500],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

//convert time to string
    function millisToMinutesAndSeconds () {
        let minutes = Math.floor(Story?.time / 60000);
        let seconds = Math.floor((Story?.time % 60000) / 1000);
        return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    } 

      const [Tags, setTags] = useState([])

    
      const Tag = ({id, tag}: any) => {
        return (
          <View style={{marginTop: 14}}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('TagSearchScreen', {mainTag: id, tagName: tag})}>
                <View style={[styles.tagbox]}>
                    <Text style={styles.tagtext}>
                        #{tag}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
          </View>
        )
      }
    
      const renderTag = ({ item } : any) => (
    
        <Tag 
            id={item.id}
            tag={item.tagName}
        />
      );

//queueing the item state when pressed
    const [isQ, setQd] = useState(false);
        
    const onQPress = () => {
        if ( isQ === false ) {
            setQd(true);
            PinStory({storyID: storyID})
        }
        if ( isQ === true ) {
            setQd(false);
            unPinStory({storyID: storyID});
        }  
    };


//Ratings Modal
    const [visible, setVisible] = useState(false);
    const showRatingModal = () => setVisible(true);
    const hideRatingModal = () => setVisible(false);
    const containerStyle = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

//Flag Modal
    const [visibleFlag, setVisibleFlag] = useState(false);
    const showFlagModal = () => setVisibleFlag(true);
    const hideFlagModal = () => setVisibleFlag(false);
    const containerStyleFlag = {
        backgroundColor: '#363636', 
        padding: 20,
        margin: 20,
        borderRadius: 15,
    };

//rating functions

    //check if the story is rated or not
    const [isRated, setIsRated] = useState(false);

    //the rating average
    const [ratingNum, setRatingNum] = useState(0);

    //the rating id for the AWS
    const [ratingID, setRatingID] = useState();

    //updating state
    const [isUpdating, setIsUpdating] = useState(false);

    //submitting a new rating to AWS
    const SubmitRating = async () => {

        setIsUpdating(true);

        let userInfo = await Auth.currentAuthenticatedUser();

        if (isRated === true) {
            await API.graphql(graphqlOperation(
                updateRating, {input: {
                    id: ratingID,
                    rating: ratingNum,
                }}
            ))
        } else {
            await API.graphql(graphqlOperation(
                createRating, {input: {
                    userID: userInfo.attributes.sub, 
                    storyID: storyID,
                    rating: ratingNum,
                    genreID: Story?.genreID,
                    type: 'Rating',
                    createdAt: new Date(),
                }}
            ))
        }

        //determine the new average and update the story

        let Average = []

        let RatingAvg = await API.graphql(graphqlOperation(
            getStory, {id: storyID}
        ))

        if (RatingAvg.data.getStory.rated.items.length > 0) {
            for (let i = 0; i < RatingAvg.data.getStory.rated.items.length; i++) {
                Average.push(RatingAvg.data.getStory.rated.items[i].rating) 
            }
            
            let newRating =  Math.floor(((Average.reduce((a, b) => {return a + b}))/(RatingAvg?.data.getStory.rated.items.length))*10)
            let newLength = RatingAvg.data.getStory.rated.items.length

        await API.graphql(graphqlOperation(
                updateStory, {input: {
                    id: storyID, ratingAvg: newRating, ratingAmt: newLength}}
            ))
        }


        hideRatingModal();
        setIsUpdating(false);
    }

//if item is finished state
    const [isFinished, setIsFinished] = useState(false);

//report states
    const [offensiveContent, setOffensiveContent] = useState(false);
    const [poorQuality, setPoorQuality] = useState(false);
    const [poorNarrator, setPoorNarrator] = useState(false);
    const [noPlay, setNoPlay] = useState(false);
    const [other, setOther] = useState(false);

//report the story
    const [isReported, setIsReported] = useState(false);

    //const [flags, setFlags] = useState([])

    const ReportStory = async () => {

        let flags = [];

        if (offensiveContent) {flags.push('OffensiveContent')};
        if (poorQuality) {flags.push('PoorQuality')};
        if (poorNarrator) {flags.push('PoorNarrator')};
        if (noPlay) {flags.push('NoPlay')};
        if (other) {flags.push('Other')};

        try {

            let userInfo = await Auth.currentAuthenticatedUser();

            await API.graphql(graphqlOperation(
                createFlag, {input: {
                    storyID: storyID,
                    userID: userInfo.attributes.sub,
                    flagTypes: flags,
                    Status: 'active',
                }}
          ))
        } catch (e) {
            console.log(e)
        }
        setIsReported(true);
        //hideFlagModal();

    }

    //comment item
    const Item = ({content, createdAt, userName, userImageUri}: any) => {

        const [imageU, setImageU] = useState('');

        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(userImageUri)
                if (response) {
                    setImageU(response)
                }

            }
            fetchImage();
        }, [])

        return (
            <View style={{ marginVertical: 10, backgroundColor: '#132F35', borderRadius: 15}}>
    
                <View style={{ margin: 10, flexDirection: 'row'}}>
                    <View>
                       <Image 
                                source={ userImageUri ? { uri: imageU} : require('../assets/images/blankprofile.png')}
                                style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'lightgray'}}
                        /> 
                    </View>
                    <View style={{marginHorizontal: 20, alignSelf: 'center'}}>
                        <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold', textTransform: 'capitalize'}}>
                            {userName}
                        </Text>
                        <Text style={{color: '#ffffffa5', fontSize: 12, textTransform: 'capitalize'}}>
                            {formatRelative(parseISO(createdAt), new Date())}
                        </Text>
                    </View>
                </View>
    
                <View>
                    <Text style={{ color: '#ffffff', marginBottom: 20, marginTop: 10, marginHorizontal: 20}}>
                        {content}
                    </Text>
                </View>
            </View>
        );
    }
    
        const [commentList, setCommentList ] = useState([]);
    
    
        const [user, setUser] = useState();
        const [userImage, setUserImage] = useState('')
    
        useEffect(() => {
            const fetchUser = async () => {
    
                const userInfo = await Auth.currentAuthenticatedUser(
                    { bypassCache: true }
                  );
    
                const userData = await API.graphql(
                    graphqlOperation(
                    getUser, { id: userInfo.attributes.sub}
                ))

                setUser(userData.data.getUser);

                for (let i = 0; i < userData.data.getUser.Pinned.items.length; i++) {
                    if (userData.data.getUser.Pinned.items[i].storyID === storyID) {
                        setQd(true);
                    }
                }

                for (let i = 0; i < userData.data.getUser.Finished.items.length; i++) {
                    if (userData.data.getUser.Finished.items[i].storyID === storyID) {
                        setIsFinished(true);
                    }
                }

                for (let i = 0; i < userData.data.getUser.Rated.items.length; i++) {
                    if (userData.data.getUser.Rated.items[i].storyID === storyID) {
                        setIsRated(true);
                        setRatingID(userData.data.getUser.Rated.items[i].id);
                        setRatingNum(userData.data.getUser.Rated.items[i].rating);
                    }
                }

                if (isRated === false && isFinished === true ) {
                    showRatingModal();
                }
                
                const UserImage = await Storage.get(userData.data.getUser.imageUri)
                setUserImage(UserImage)
            }
        fetchUser();
        
        }, [])
        
        const renderItem = ({ item } : any) => (
    
            <Item 
                //id={item.id}
                content={item.content}
                createdAt={item.createdAt}
                userName={item.user && item.user.name}
                userImageUri={item.user && item.user.imageUri}
            />
          );
        
        const [comment, setComment] = useState('');
    
        const handlePostComment = async () => {
    
            const poster = await Auth.currentAuthenticatedUser()
    
            if (comment.length > 0) {
                try {
                    await API.graphql(
                            graphqlOperation(createComment, { input: 
                                {
                                    type: 'Comment',
                                    createdAt: new Date(),
                                    storyID: storyID,
                                    content: comment,
                                    userID: poster.attributes.sub,
                                    approved: false
                                }
                            }))
                        } catch (e) {
                                console.error(e);
                }
                setComment('');
                setCommentUpdated(!commentUpdated)
            }
        }

      

    return (
        <Provider>
            <View style={styles.container}>
                <Portal>
{/* Rate the story modal */}
                    <Modal visible={visible} onDismiss={hideRatingModal} contentContainerStyle={containerStyle}>
                        <View style={{alignItems: 'center'}}>
                            <View style={{}}>
                                <Text style={{margin: 20, fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                                    Leave a Rating
                                </Text>
                                <Text style={{margin: 20, textAlign: 'center', fontSize: 20, color: '#fff'}}>
                                    {ratingNum}/10
                                </Text>
                            </View>
                            <View style={{marginBottom: 20, flexDirection: 'row'}}>
                                <FontAwesome onPress={() => setRatingNum(1)} style={{marginHorizontal: 4 }} name={ratingNum < 1 ? 'star-o' : 'star'} size={22} color={ratingNum < 1 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(2)} style={{marginHorizontal: 4 }} name={ratingNum < 2 ? 'star-o' : 'star'} size={22} color={ratingNum < 2 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(3)} style={{marginHorizontal: 4 }} name={ratingNum < 3 ? 'star-o' : 'star'} size={22} color={ratingNum < 3 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(4)} style={{marginHorizontal: 4 }} name={ratingNum < 4 ? 'star-o' : 'star'} size={22} color={ratingNum < 4 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(5)} style={{marginHorizontal: 4 }} name={ratingNum < 5 ? 'star-o' : 'star'} size={22} color={ratingNum < 5 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(6)} style={{marginHorizontal: 4 }} name={ratingNum < 6 ? 'star-o' : 'star'} size={22} color={ratingNum < 6 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(7)} style={{marginHorizontal: 4 }} name={ratingNum < 7 ? 'star-o' : 'star'} size={22} color={ratingNum < 7 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(8)} style={{marginHorizontal: 4 }} name={ratingNum < 8 ? 'star-o' : 'star'} size={22} color={ratingNum < 8 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(9)} style={{marginHorizontal: 4 }} name={ratingNum < 9 ? 'star-o' : 'star'} size={22} color={ratingNum < 9 ? 'white' : 'gold'}/>
                                <FontAwesome onPress={() => setRatingNum(10)} style={{marginHorizontal: 4 }} name={ratingNum < 10 ? 'star-o' : 'star'} size={22} color={ratingNum < 10 ? 'white' : 'gold'}/>                                
                            </View>
                            {isUpdating === true ? (
                                <ActivityIndicator size='large' color='cyan '/>
                            ) :
                            <TouchableOpacity onPress={SubmitRating}>
                                <View style={{marginTop: 40, paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                        <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                            Submit
                                        </Text>
                                </View>
                            </TouchableOpacity>
                            }
                        </View>
                    </Modal>
{/* flag this story modal */}
                    <Modal visible={visibleFlag} onDismiss={hideFlagModal} contentContainerStyle={containerStyleFlag}>
                        <View style={{alignItems: 'center'}}>
                            {isReported === false ? (
                            <View style={{}}>
                                <Text style={{margin: 20, fontSize: 20, fontWeight: 'bold', color: '#fff'}}>
                                    Report this Story
                                </Text>

                                <TouchableWithoutFeedback onPress={() => setOffensiveContent(!offensiveContent)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={offensiveContent === true ? 'check-square-o' : 'square-o'}
                                            color={offensiveContent === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Offensive Content
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setPoorQuality(!poorQuality)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={poorQuality === true ? 'check-square-o' : 'square-o'}
                                            color={poorQuality === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Poor Audio Quality
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setPoorNarrator(!poorNarrator)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={poorNarrator === true ? 'check-square-o' : 'square-o'}
                                            color={poorNarrator === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Poor Narration
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setNoPlay(!noPlay)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={noPlay === true ? 'check-square-o' : 'square-o'}
                                            color={noPlay === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Could Not Play
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => setOther(!other)}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome 
                                            name={other === true ? 'check-square-o' : 'square-o'}
                                            color={other === true ? 'cyan' : 'gray'}
                                            size={20}
                                            style={{paddingHorizontal: 10}}
                                        />
                                    <Text style={{margin: 10, textAlign: 'center', fontSize: 16, color: '#fff'}}>
                                            Other
                                        </Text> 
                                    </View>
                                </TouchableWithoutFeedback>
                                
                                
                            </View>
                            ) : null}

                            {isReported ? (
                                <View style={{marginVertical: 40}}>
                                <Text style={{textAlign: 'center', color: '#fff'}}>
                                    Thank you for reporting this story. It will be placed under review.
                                </Text>
                                
                                </View>
                            ) : (
                                <TouchableOpacity onPress={ReportStory}>
                                    <View style={{marginTop: 40, paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                            <Text style={{color: '#000000', fontSize: 16}}>
                                                Report
                                            </Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            
                            
                        </View>
                    </Modal>
                </Portal>

                <ImageBackground 
                    source={{uri: imageU}}
                    style={{  backgroundColor: '#363636', width: Dimensions.get('window').width, height: 330,  position: 'absolute'  }}
                >
                    
                    
                    {Story?.imageUri ? (null) : (
                        <View style={{ alignSelf: 'center', marginTop: 140}}>
                            <FontAwesome5 
                                name={Story?.genre?.icon}
                                color='#ffffffa5'
                                size={50}
                            />
                        </View>
                    )}
                     
                </ImageBackground>

                <Animated.View style={{ alignItems: 'center', backgroundColor: animatedColor, flexDirection: 'row', paddingTop: 40, paddingBottom: 20, width: Dimensions.get('window').width, justifyContent: 'space-between'}}>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableWithoutFeedback onPress={() => {navigation.goBack(); setIsRootScreen(false)}}>
                            <View style={ [styles.button, {backgroundColor: '#363636a5', flexDirection: 'row'}]}>
                                <AntDesign 
                                    name='close'
                                    size={22}
                                    color='#fff'
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <Animated.Text numberOfLines={1} style={{ width: '80%', marginRight: -30, fontSize: 18, color: '#fff', fontWeight: 'bold', opacity: animatedOpacity}}>
                            {Story?.title}
                        </Animated.Text>
                    </View>

                    <TouchableOpacity onPress={onPlay}>
                        <Animated.View style={{marginRight: 20,  height: 30, width: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00ffff', borderRadius: 15, opacity: animatedOpacity}}>
                            <FontAwesome5 
                                name='play'
                                size={16}
                                color='#363636'
                                style={{marginLeft: 2}}
                            />
                        </Animated.View>
                    </TouchableOpacity>
                    
                </Animated.View>

                <Animatable.View animation='bounceInUp' style={{}}>
                    <ScrollView 
                        style={{}}
                        ref={scrollRef}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: animation } } }],
                            { useNativeDriver: false })}
                        scrollEventThrottle={1}
                        showsVerticalScrollIndicator={false}
                    >
                        
                        <View style={{ height: 220, backgroundColor: 'transparent', alignItems: 'flex-start'}}>
                            {Story?.imageUri ? (
                                <View style={{width: Dimensions.get('window').width - 20, marginTop: 186, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: Story?.artistID, status: 'artist'})}>
                                        <View style={{alignItems: 'center', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#363636a5', flexDirection: 'row'}}>
                                            <FontAwesome5 
                                                name='palette'
                                                size={14}
                                                color='#fff'
                                                style={{marginRight: 10}}
                                            />
                                            <Text style={{color: '#fff', textTransform: 'capitalize'}}>
                                                {Story?.artist.artistPseudo}
                                            </Text>
                                        </View> 
                                    </TouchableOpacity>
                                    <View>
                                        {Story?.nsfw === true ? (
                                            <Text style={{color: 'red', borderRadius: 15, paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#363636', }}>
                                                Explicit
                                            </Text>
                                        ) : null}
                                    </View>
                                </View>
                            ) : null}
                        </View>
                        <LinearGradient 
                            colors={['#202020', '#282828', '#000', '#000']}
                            style={{ overflow: 'hidden', borderRadius: 20, paddingVertical: 5, paddingHorizontal: 0}}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View style={{}}>
                                <View style={{ margin: 20, alignItems: 'center'}}>
                                    <Text style={[styles.name, {textAlign: 'center'}]}>
                                        {Story?.title}
                                    </Text>

                                    <View style={{ width: '100%', flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between'}}>
                                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: Story?.userID, status: 'publisher'})}>
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
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: Story?.narratorID, status: 'narrator'})}>
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
                                        </TouchableOpacity>
                                    </View>

                                <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={ styles.icon}>
                                            <AntDesign 
                                                name={isQ ? 'pushpin' : 'pushpino'}
                                                size={20}
                                                color={isQ ? 'cyan' : 'white'}
                                                onPress={onQPress}
                                                style={{ }}
                                            />
                                        </View>
                                        <View style={ styles.icon}>
                                            <FontAwesome 
                                                name='commenting-o'
                                                size={20}
                                                color='white'
                                                onPress={scrollToView}
                                                style={{ }}
                                            />
                                        </View>
                                        <View style={ styles.icon}>
                                            <FontAwesome 
                                                name='share'
                                                size={20}
                                                color='white'
                                                onPress={() => ShareStory({id: Story?.id, title: Story?.title})}
                                                style={{ }}
                                            />
                                        </View>
                                    </View>

                                    <TouchableWithoutFeedback onPress={showRatingModal}>
                                        <View style={{justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{textAlign: 'center', color: '#e0e0e0a5', fontSize: 12}}>
                                                ({Story?.ratingAmt})
                                            </Text>
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
                                    </TouchableWithoutFeedback>
                                    
                                </View>

                                <View>
                                    <Text style={{textAlign: 'center', color: '#fff', fontSize: 14, marginTop: 32, marginBottom: 16}}>
                                        {Story?.summary}
                                    </Text>
                                </View>

                                <View style={{height: 80}}>

                                    <FlatList
                                        data={Tags}
                                        extraData={Tags}
                                        renderItem={renderTag}
                                        horizontal={true}
                                        style={{width:  Dimensions.get('window').width, backgroundColor: 'transparent', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}
                                        keyExtractor={(item) => item.id}
                                        initialNumToRender={8}
                                        showsHorizontalScrollIndicator={false}
                                        maxToRenderPerBatch={8}
                                        showsVerticalScrollIndicator={false}
                                        ListHeaderComponent={() => {
                                            return (
                                                <View style={{marginHorizontal: 20, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text style={{fontSize: 15, textTransform: 'capitalize', textAlign: 'center', color: '#fff'}}>
                                                        {Story?.genre?.genre}
                                                    </Text>
                                                </View>
                                            )
                                        }}
                                        ListEmptyComponent={() => {
                                            return (
                                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                    
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                                
                                <View>
                                    <TouchableOpacity onPress={onPlay}>
                                        <View style={{paddingVertical: 6, paddingHorizontal: 30, backgroundColor: '#00ffff', margin: 10, borderRadius: 30}}>
                                                <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold', }}>
                                                    Play
                                                </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <Text style={{color: '#ffffff', fontSize: 18}}>
                                        {millisToMinutesAndSeconds()}
                                    </Text>
                                </View>

                                <View style={{marginVertical: 20, marginHorizontal: 4, flex: 1 }}>
                                    <Text style={{color: '#fff', flexWrap: 'wrap', marginBottom: 10}}>
                                        {Story?.description}
                                    </Text>
                                </View> 

                                <View style={{width: '100%', marginTop: 20}} >
                                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                                                Discussion
                                            </Text>
                                            <Text style={{color: '#fff', marginLeft: 10}}>
                                                ({commentList.length})
                                            </Text>
                                        </View>
                                        
                                        <FontAwesome 
                                            name='flag'
                                            size={20}
                                            color='gray'
                                            onPress={showFlagModal}
                                        />
                                    </View>
                                    
                                    <View onLayout={e => setViewPosition(e.nativeEvent.layout.y)}>
                                        {/* <Comments storyId={Story?.id} /> */}
                                        <KeyboardAvoidingView
                                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                                            style={{flex: 1}}
                                        >
                                            <View style={{backgroundColor: '#363636', padding: 20, marginVertical: 10, borderRadius: 15, }}>
                                                <View style={{ flexDirection: 'row', }}>
                                                    <Image 
                                                        source={ user?.imageUri ? { uri: userImage} : require('../assets/images/blankprofile.png')}
                                                        style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'gray'}}
                                                    />
                                                <TextInput 
                                                    placeholder='Leave a comment'
                                                    placeholderTextColor='#ffFFFFa5'
                                                    style={{
                                                        color: '#ffffff',
                                                        fontSize: 14,
                                                        marginLeft: 20,
                                                        marginRight: 30,    
                                                        width: '75%',
                                                        alignSelf: 'center'
                                                    }}
                                                    maxLength={250}
                                                    multiline={true}
                                                    numberOfLines={2}
                                                    onChangeText={comment => setComment(comment)}
                                                    value={comment}
                                                    ref={focus}
                                                />
                                            </View>
                                                {comment.length > 0 ? (
                                                    <View>
                                                        <View style={{marginTop: 20, alignSelf: 'center', width: '70%', height: 1, borderWidth: 0.5, borderColor: '#ffffffa5'}}>
                                                        </View>
                                                        <TouchableOpacity onPress={handlePostComment}>
                                                            <View style={{ marginTop: 20, alignItems: 'center'}}>
                                                                <Text style={{overflow: 'hidden', backgroundColor: 'cyan', width: 80, padding: 5, borderRadius: 13, color: '#000', borderWidth: 0.5, borderColor: '#00ffff', textAlign: 'center'}}>
                                                                    Post
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : null}
                                        </View>
                                        </KeyboardAvoidingView>

                                        <FlatList 
                                            data={commentList}
                                            renderItem={renderItem}
                                            keyExtractor={item => item.id}
                                            showsVerticalScrollIndicator={false}
                                            scrollEnabled={false}
                                            extraData={commentList}
                                            initialNumToRender={10}
                                            maxToRenderPerBatch={20}
                                            ListFooterComponent={ () => {
                                                return (
                                                    <View style={{height:  Platform.OS === 'ios' ? 500 : 300}}>
                                                    </View>
                                                );
                                            }}
                                        />
                                    </View>
                                </View>

                            </View>
                        </View>
                    </LinearGradient> 
                </ScrollView>
            </Animatable.View>
            <StatusBar style='light' backgroundColor='#0000004D' />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create ({
    container: {
    },
    name: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    username: {
        color: '#ffffffCC',
        fontSize: 14,
        marginVertical: 5,
        textTransform: 'capitalize'
    },
    footer: {
        marginVertical: 0,
    },
    highlight: { 
        marginHorizontal: -10,
        color: '#ffffffCC',
        fontSize: 14,
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 50,
        width: 36,
        height: 36,
        marginHorizontal: 10,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginRight: 30,
    },
    tagbox: {
        marginRight: 10   
      },
      tagtext: {
        color: 'cyan',
        fontSize: 14,
        backgroundColor: '#1A4851a5',
        borderColor: '#00ffffa5',
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 14,
        overflow: 'hidden'
    },
   
});

export default StoryScreen;
