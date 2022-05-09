import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    Dimensions,
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    Image, 
    Animated 
} from 'react-native';

import {useNavigation} from '@react-navigation/native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';


import {useRoute} from '@react-navigation/native'

import { AppContext } from '../AppContext';


import {graphqlOperation, API, Auth, Storage} from 'aws-amplify';
import { getUser } from '../src/graphql/queries';
import { createFollowingConn, deleteFollowingConn } from '../src/graphql/mutations';

import StoryTile from '../components/StoryTile';



const AudioListByAuthor = ({user, status} : any) => {

    const { nsfwOn } = useContext(AppContext);
    const { ADon } = useContext(AppContext);

    const navigation = useNavigation();

    const [publisher, setPublisher] = useState(false);
    const [narrator, setNarrator] = useState(false);
    const [artist, setArtist] = useState(false);

    const [followingConnID, setFollowingConnID] = useState()

    const [Storys, setStorys] = useState([]);
    const [Narrations, setNarrations] = useState([]);
    const [Arts, setArts] = useState([]);

    const [artSamples, setArtSamples] = useState([]);
    const [audioSamples, setAudioSamples] = useState([]);

    const [sampleState, setSampleState] = useState(false);

    useEffect(() => {
        if (status === 'publisher'){setPublisher(true);}
        if (status === 'narrator'){setNarrator(true);}
        if (status === 'artist'){setArtist(true);}
    }, [])


    useEffect( () => {

        const fetchStorys = async () => {

                let stories = []

                let samples = []

                let audiosam = []

                let narrstories = [];

                let artstories = []

                try {

                    let userInfo = await Auth.currentAuthenticatedUser();

                    const response = await API.graphql(
                        graphqlOperation(
                            getUser, {id: user }
                        )
                    )

                    const currentuser = await API.graphql(
                        graphqlOperation(
                            getUser, {id: userInfo.attributes.sub }
                        )
                    )

                    setCurrentUser(currentuser.data.getUser);
                    setUser(response.data.getUser);
                    let responseBuk = await Storage.get(response.data.getUser.imageUri)
                    setImageU(responseBuk);

                    for (let i = 0; i < response.data.getUser.authored.items.length; i++) {
                        if (response.data.getUser.authored.items[i].hidden === false && 
                            response.data.getUser.authored.items[i].approved === 'approved' &&
                            response.data.getUser.authored.items[i].genreID !== (ADon === true ? '1108a619-1c0e-4064-8fce-41f1f6262070' : null) &&
                            response.data.getUser.authored.items[i].genreID !== (nsfwOn === true ? true : null)
                            ) {
                            stories.push(response.data.getUser.authored.items[i])
                        }
                    }
                    setStorys(stories);

                    for (let i = 0; i < response.data.getUser.sharedImageAssets.items.length; i++) {
                        if (response.data.getUser.sharedImageAssets.items[i].isSample === true) {
                            samples.push(response.data.getUser.sharedImageAssets.items[i])
                        }
                    } 
                    setArtSamples(samples);

                    for (let i = 0; i < response.data.getUser.sharedAssets.items.length; i++) {
                        if (response.data.getUser.sharedAssets.items[i].isSample === true) {
                            audiosam.push(response.data.getUser.sharedAssets.items[i])
                        }
                    } 
                    setAudioSamples(audiosam);

                    for (let i = 0; i < currentuser.data.getUser.following.items.length; i++) {
                        if (currentuser.data.getUser.following.items[i].authorID === response.data.getUser.id ) {
                            setFollowing(true);
                            setFollowingConnID(currentuser.data.getUser.following.items[i].id)
                        }
                    }

                    for (let i = 0; i < response.data.getUser.narrated.items.length; i++) {
                        if (response.data.getUser.narrated.items[i].hidden === false && 
                            response.data.getUser.narrated.items[i].approved === 'approved' &&
                            response.data.getUser.narrated.items[i].genreID !== (ADon === true ? '1108a619-1c0e-4064-8fce-41f1f6262070' : null) &&
                            response.data.getUser.narrated.items[i].genreID !== (nsfwOn === true ? true : null)
                            ) {
                            narrstories.push(response.data.getUser.narrated.items[i])
                        }
                    }
                    setNarrations(narrstories);

                    for (let i = 0; i < response.data.getUser.art.items.length; i++) {
                        if (response.data.getUser.art.items[i].hidden === false && 
                            response.data.getUser.art.items[i].approved === 'approved' &&
                            response.data.getUser.art.items[i].genreID !== (ADon === true ? '1108a619-1c0e-4064-8fce-41f1f6262070' : null) &&
                            response.data.getUser.art.items[i].genreID !== (nsfwOn === true ? true : null)
                            ) {
                            artstories.push(response.data.getUser.art.items[i])
                        }
                    }
                    setArts(artstories);

                } catch (e) {
                    console.log(e);}
        }
        fetchStorys();
        
    },[])

    const ArtItem = ({id, title, imageUri} : any) => {

        const [imageLink, setImageLink] = useState('')

        useEffect(() => {
            const fetchUrl = async () => {
                let response = await Storage.get(imageUri)
                setImageLink(response)
            }
            fetchUrl();
        }, [])

        return (
            <TouchableWithoutFeedback>
                <View style={{marginVertical: 10, alignItems: 'center'}}>
                    <Image 
                        source={{uri: imageLink}} 
                        style={{
                            borderRadius: 10, 
                            width: (Dimensions.get('window').width)-40,
                            height: ((Dimensions.get('window').width)-40)*0.75
                        }}
                    />
                    <Text style={{marginLeft: 40, marginTop: 10, color: '#fff', fontWeight: 'bold', alignSelf: 'flex-start'}}>
                        {title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            
        );
    }

    const renderArtItem = ({item} : any) => {
        return (
            <ArtItem 
                id={item.id}
                title={item.title}
                imageUri={item.imageUri}

            />
        );
    }

    const AudioSampleItem = ({title, id, time} : any) => {

        //convert the time to show in the modal
        function millisToMinutesAndSeconds () {
            let minutes = Math.floor(time / 60000);
            let seconds = Math.floor((time % 60000) / 1000);
            return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
        }  

        return (
            <View style={{borderRadius: 15, marginVertical: 10, marginHorizontal:20, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#363636', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {title}
                    </Text>
                    <Text style={{marginTop: 4, color: 'gray'}}>
                        {millisToMinutesAndSeconds()}
                    </Text>
                </View>
                <TouchableOpacity>
                    <View style={{justifyContent: 'center'}}>
                        <FontAwesome 
                            name='play'
                            color='#fff'
                            size={20}  
                            style={{padding: 10}}
                            onPress={() => navigation.navigate('SimpleAudioPlayer', {item: null, cloudItem: id})}
                        />
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }

    const renderAudioSampleItem = ({item} : any) => {
        return (
            <AudioSampleItem 
                title={item.title}
                id={item.id}
                time={item.time}
                audioUri={item.audioUri}
            />
        );
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
            ratingAvg={item.ratingAvg}
            id={item.id}
            ratingAmt={item.ratingAmt}

        />
      );}

    

      const animation = useRef(new Animated.Value(0)).current;

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 50],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedOpacitySlow = animation.interpolate({
        inputRange: [0, 220],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    const animatedAppearOpacity = animation.interpolate({
        inputRange: [0, 450],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });

    const animatedHeaderHeight = animation.interpolate({
        inputRange: [0, 350],
        outputRange: [450, 80],
        extrapolate: 'clamp',
        });

    const animatedColor = animation.interpolate({
        inputRange: [250, 800],
        outputRange: ['#000000', '#363636'],
        extrapolate: 'clamp',
        });

    const [User, setUser] = useState(null);

    const route = useRoute();
    const {userID} = route.params


      const [currentUser, setCurrentUser] = useState(null)

      const [Following, setFollowing] = useState(false);

      const [imageU, setImageU] = useState()


    const FollowUser = async () => {

        let response = await API.graphql(graphqlOperation(
            createFollowingConn, {input: {followerID: currentUser.id, authorID: User.id}}
        ))
        setFollowingConnID(response.data.createFollowingConn.id)
    }

    const unFollowUser = async () => {
        await API.graphql(graphqlOperation(
            deleteFollowingConn, {input: {"id": followingConnID}}
        ))
    }

    

    function FollowButton () {
        if (Following === true) {
            unFollowUser();
            setFollowing(false);
        }
        if (Following === false) {
            FollowUser();
            setFollowing(true)
            
        }
    }

    

    return (

        <View style={[styles.container]}>

{/* display published stories */}
            {publisher ? (
                <Animated.FlatList 
                    data={Storys}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  120}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}

{/* display narrated samples */}
            {narrator && sampleState ? (
                <Animated.FlatList 
                    data={audioSamples}
                    renderItem={renderAudioSampleItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  120}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}

{/* display narrated stories */}
            {narrator && !sampleState ? (
                <Animated.FlatList 
                    data={Narrations}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  120}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}

{/* display artist samples */}
            {artist && sampleState ? (
                <Animated.FlatList 
                    data={artSamples}
                    renderItem={renderArtItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  120}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}

{/* display artist stories */}
            {artist && !sampleState ? (
                <Animated.FlatList 
                    data={Arts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    //extraData={Following}
                    //stickyHeaderIndices={[0]}
                    //onScroll={event => {setScrollOffset(event.nativeEvent.contentOffset.y);}}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: animation } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                    showsVerticalScrollIndicator={false}    
                    ListFooterComponent={ () => {
                        return (
                        <View style={{ height:  120}}/>
                        );}
                    }
                    ListHeaderComponent={ () => {

                        return (
                                <View>
                                    <View style={{ height: 500}}/>

                                    {narrator || artist ? (
                                        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => setSampleState(false)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                        color: !sampleState ? '#fff' : '#ffffffa5', 
                                                        fontWeight: !sampleState ? 'bold' : 'normal', 
                                                        fontSize: !sampleState ? 18 : 16, 
                                                    }}>
                                                        Stories
                                                </Text>
                                            </TouchableWithoutFeedback>
                                            
                                            <TouchableWithoutFeedback onPress={() => setSampleState(true)}>
                                                <Text style={{paddingHorizontal: 20, 
                                                    color: sampleState ? '#fff' : '#ffffffa5',
                                                    fontWeight: sampleState ? 'bold' : 'normal', 
                                                    fontSize: sampleState ? 18 : 16, 
                                                }}>
                                                    Samples
                                                </Text> 
                                            </TouchableWithoutFeedback>  
                                        </View>   
                                    ) : null}
                                    
                                    
                                </View>
                                            
                                        );
                                    }}
                />
            ) : null}
            

        <Animated.View style={[ {backgroundColor: animatedColor, height: animatedHeaderHeight, width: Dimensions.get('window').width, position: 'absolute', flex: 1}]}>              
            <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-between',  width: Dimensions.get('window').width -40, marginHorizontal: 20, alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
                    <AntDesign 
                        name='close'
                        size={25}
                        color='#fff'
                        style={{paddingTop: 0, paddingRight: 10}}
                        onPress={() => navigation.goBack() }
                    />
                    <Animated.Text numberOfLines={1} style={[styles.name, { opacity: animatedAppearOpacity, width: '78%'}]}>
                        {publisher === true ? User?.pseudonym : narrator === true ? User?.narratorPseudo : artist === true ? User?.artistPseudo : null}
                    </Animated.Text>
                </View>

                {narrator === true && currentUser?.isPublisher === true ? (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateMessage', {otherUserID: userID, type: 'narrator'})}>  
                            <Text style={{color: 'cyan', backgroundColor: 'transparent', borderRadius: 13, paddingHorizontal: 20, paddingVertical: 5, borderWidth: 0.5, borderColor: 'cyan',}}>
                                Request Narration
                            </Text>
                    </TouchableOpacity>        
                </View>
                
                ) : artist === true && currentUser?.isPublisher === true ? (
                    <TouchableOpacity onPress={() => navigation.navigate('CreateMessage', {otherUserID: userID, type: 'artist'})}>
                        <View>
                            <Text style={{color: 'cyan', borderRadius: 13, paddingHorizontal: 20, paddingVertical: 5, borderWidth: 0.5, borderColor: 'cyan',}}>
                                Request Cover Art
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : publisher === true ? (
                    <TouchableOpacity onPress={FollowButton}>
                        <View>
                            <Text style={{
                                color: Following === true ? '#000' : 'cyan',
                                backgroundColor: Following === true ? 'cyan' : 'transparent',
                                borderRadius: 13,
                                paddingHorizontal: 20,
                                paddingVertical: 5,
                                borderWidth: Following === true ? 0 : 0.5,
                                borderColor: 'cyan',
                            }}>
                                {Following === true ? 'Following' : 'Follow'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : null}
            </View>

            <Animated.View style={{opacity: animatedOpacitySlow}}>
                    <View style={{ alignItems: 'center'}}>
                        <Image 
                            source={{ uri: imageU}}
                            style={{width: 120, height: 120, backgroundColor: '#363636',borderRadius: 60, marginTop: 20,}}
                        />
                    </View>

                <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                    {publisher ? (
                        <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
                            {User?.pseudonym}
                        </Text>
                    ) : null}
                    {narrator ? (
                        <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
                            {User?.narratorPseudo}
                        </Text>
                    ) : null}
                    {artist ? (
                        <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
                            {User?.artistPseudo}
                        </Text>
                    ) : null}
                </View>

                <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center',}}>
                    {User?.isPublisher === true ? (
                        <TouchableWithoutFeedback onPress={() => {setPublisher(true); setNarrator(false); setArtist(false)}}>
                            <View style={{ paddingVertical: 10, marginVertical: -10, alignContent: 'center', flexDirection: 'row', marginBottom: 10, alignSelf: 'center'}}>                                             
                                <FontAwesome5 
                                    name='book-open'
                                    size={publisher ? 14 : 12}
                                    color={publisher ? '#fff' : '#ffffffa5'}
                                    style={{ marginHorizontal: 5, alignSelf: 'center'}}
                                />
                                <Text style={styles.userId}>
                                    {User?.authored.items ? User?.authored.items.length : 0}
                                </Text> 
                            </View> 
                        </TouchableWithoutFeedback>
                        
                    ) : null}
                                        
                    {User?.isNarrator === true ? (
                        <TouchableWithoutFeedback onPress={() => {setPublisher(false); setNarrator(true); setArtist(false)}}>
                            <View style={{ paddingVertical: 10, marginVertical: -10, alignContent: 'center', flexDirection: 'row', marginBottom: 10, alignSelf: 'center'}}>                                             
                                <FontAwesome5 
                                    name='book-reader'
                                    size={narrator ? 14 : 12}
                                    color={narrator ? '#fff' : '#ffffffa5'}
                                    style={{ marginHorizontal: 3, alignSelf: 'center'}}
                                />
                                <Text style={styles.userId}>
                                    {User?.narrated.items ? User?.narrated.items.length : 0}
                                </Text> 
                            </View> 
                        </TouchableWithoutFeedback>
                    ) : null}

                    {User?.isArtist === true ? (
                        <TouchableWithoutFeedback onPress={() => {setPublisher(false); setNarrator(false); setArtist(true)}}>
                            <View style={{ paddingVertical: 10, marginVertical: -10, alignContent: 'center', flexDirection: 'row', marginBottom: 10, alignSelf: 'center'}}>                                             
                                <FontAwesome5 
                                    name='palette'
                                    size={artist ? 14 : 12}
                                    color={artist ? '#fff' : '#ffffffa5'}
                                    style={{ marginHorizontal: 3, alignSelf: 'center'}}
                                />
                                <Text style={styles.userId}>
                                    {User?.art.items ? User?.art.items.length : 0}
                                </Text> 
                            </View> 
                        </TouchableWithoutFeedback>
                    ) : null}
                </View>
            </Animated.View>

            <Animated.View style={{opacity: animatedOpacity}}>
                <View style={{ alignItems: 'center', marginHorizontal: 20, marginVertical: 10}}>
                    {publisher ? (
                        <Text style={{ color: '#ffffffa5', fontSize: 14, textAlign: 'center'}}>
                            {User?.bio}
                        </Text>
                    ) : null}
                    {narrator ? (
                        <Text style={{ color: '#ffffffa5', fontSize: 14, textAlign: 'center'}}>
                            {User?.narratorText}
                        </Text>
                    ) : null}
                    {artist ? (
                        <Text style={{ color: '#ffffffa5', fontSize: 14, textAlign: 'center'}}>
                            {User?.artistText}
                        </Text>
                    ) : null}             
                </View>
            </Animated.View>
        </Animated.View>
    </View>
);}

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
        textTransform: 'capitalize'
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

export default AudioListByAuthor;
