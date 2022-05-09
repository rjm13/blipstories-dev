import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Dimensions, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Linking
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal, Portal, Provider } from 'react-native-paper';
import { format, parseISO } from "date-fns";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';

const Publisher = ({navigation} : any) => {

    const [user, setUser] = useState({})

    const route = useRoute();
    const {update} = route.params

    const [narActive, setNarActive] = useState('0%');
    const [artActive, setArtActive] = useState('0%');

    const [SavedAudio, setSavedAudio] = useState([''])

    const [didUpdate, setDidUpdate] = useState(false);

    //load the keys from async storage
    useEffect(() => {
        const LoadKeys = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            let saved = await AsyncStorage.getAllKeys();
    
            if (saved != null) {
                let result = saved.filter((item) => item.includes("recording" + userInfo.attributes.sub));
                setSavedAudio(result);
            } 
        }
        LoadKeys();
    }, [])

//get the current user and list their followings and followers
    useEffect(() => {
        const fetchUser = async () => {

            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            
        
            //const c = new Date(year + 1, month, day).toISOString() // PLUS 1 YEAR
            //const newdate = new Date(year, month - 1, day).toISOString() // PLUS 1 MONTH
            const newdate1 = new Date(year, month, day  - 1).toISOString() // PLUS 1 DAY
            const newdate2 = new Date(year, month, day  - 2).toISOString() // PLUS 2 DAY
            const newdate3 = new Date(year, month, day  - 3).toISOString() // PLUS 3 DAY
            const newdate4 = new Date(year, month, day  - 4).toISOString() // PLUS 4 DAY
            const newdate5 = new Date(year, month, day  - 5).toISOString() // PLUS 5 DAY
            const newdate6 = new Date(year, month, day  - 6).toISOString() // PLUS 6 DAY
            const newdate7 = new Date(year, month, day  - 7).toISOString() // PLUS 7 DAY


          const userInfo = await Auth.currentAuthenticatedUser();

            if (!userInfo) {return;}

          try {
            const userData = await API.graphql(graphqlOperation(
              getUser, {id: userInfo.attributes.sub}
            ))

            if (userData) {
                setUser(userData.data.getUser);
                if(userData.data.getUser.isPublisher === true) {setIsPublisher(true);}
                if(userData.data.getUser.isNarrator === true) {setIsNarrator(true);}
                if(userData.data.getUser.isArtist === true) {setIsArtist(true);}

                if(userData.data.getUser.narratorActiveAt > newdate1 ) {setNarActive('70%')}
                else if(userData.data.getUser.narratorActiveAt > newdate2 ) {setNarActive('60%')}
                else if(userData.data.getUser.narratorActiveAt > newdate3 ) {setNarActive('50%')}
                else if(userData.data.getUser.narratorActiveAt > newdate4 ) {setNarActive('40%')}
                else if(userData.data.getUser.narratorActiveAt > newdate5 ) {setNarActive('30%')}
                else if(userData.data.getUser.narratorActiveAt > newdate6 ) {setNarActive('20%')}
                else if(userData.data.getUser.narratorActiveAt > newdate7) {setNarActive('10%')}
                

                if(userData.data.getUser.artistActiveAt > newdate1 ) {setArtActive('70%')}
                else if(userData.data.getUser.artistActiveAt > newdate2 ) {setArtActive('60%')}
                else if(userData.data.getUser.artistActiveAt > newdate3 ) {setArtActive('50%')}
                else if(userData.data.getUser.artistActiveAt > newdate4 ) {setArtActive('40%')}
                else if(userData.data.getUser.artistActiveAt > newdate5 ) {setArtActive('30%')}
                else if(userData.data.getUser.artistActiveAt > newdate6 ) {setArtActive('20%')}
                else if(userData.data.getUser.artistActiveAt > newdate7) {setArtActive('10%')}
            
            }

          } catch (e) {
            console.log(e);
          }
        }
        fetchUser();
      }, [didUpdate, update])

      const [isNarrator, setIsNarrator] = useState(false);

      const [isArtist, setIsArtist] = useState(false);

      const [isPublisher, setIsPublisher] = useState(false);

      const [statusRoute, setStatusRoute] = useState('');

      const UpdateNarratorStatus = async () => {
        let response = await API.graphql(graphqlOperation(
            updateUser, {
                input: {
                    id: user?.id,
                    narratorActiveAt: new Date(),

                }
            }
        ))
        setDidUpdate(!didUpdate)
        hideModal();
        console.log(response)
      }

      const UpdateArtistStatus = async () => {
        let response = await API.graphql(graphqlOperation(
            updateUser, {
                input: {
                    id: user?.id,
                    artistActiveAt: new Date(),

                }
            }
        ))
        setDidUpdate(!didUpdate);
        hideModal();
        console.log(response);
      }


      const BecomePublisher = () => {
          if (user?.isPublisher === true) {
            setIsPublisher(true);
          } else {
            setIsPublisher(false);
            navigation.navigate('Publishing', {user: user});
          }
      }

      const BecomeNarrator = () => {
        if (user?.isNarrator === true) {
          setIsNarrator(true);
          setStatusRoute('narrator');
          console.log(user?.narratorActiveAt)
          showModal();
        } else {
          setIsNarrator(false);
          navigation.navigate('NarratorMain', {user: user});
        }
    }

    const BecomeArtist = () => {
        if (isArtist === true) {
          setIsArtist(true);
          setStatusRoute('artist');
          showModal();
        } else {
          setIsArtist(false);
          navigation.navigate('ArtistMain', {user: user});
        }
    }


    //reset active status modal
       const [visible, setVisible] = useState(false);
       const showModal = () => {setVisible(true);}
       const hideModal = () => setVisible(false);
       const containerStyle = {
           backgroundColor: '#000000a5',
           height: Dimensions.get('window').height
        //borderRadius: 15,
        //paddingVertical: 0,
        //paddingHorizontal: 20
    };

    const ModSection = () => {

            const [isMod, setIsMod] = useState()

            useEffect(() => {
                const response = async () => {
                    let user = await Auth.currentAuthenticatedUser();
                    if (user) {setIsMod(user)}
                }
                response()
            }, [])

            return (
                <View>
                  {isMod?.attributes.email === 'martianspidermedia@gmail.com' ? (
                     <FontAwesome5 
                        name='toilet-paper'
                        color='#fff'
                        size={17}
                        style={{padding: 20, margin: -20}}
                        onPress={() => navigation.navigate('ModSection')}
                    /> 
                  ) : null}  
                </View>
            )
        }

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <TouchableWithoutFeedback onPress={hideModal}>
                        <View style={{height: Dimensions.get('window').height, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{width: Dimensions.get('window').width, padding: 20, fontSize: 20, marginTop: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff'}}>
                                Recharge Active Status
                            </Text>
                            <Text style={{padding: 20, fontSize: 14, marginTop: 20, textAlign: 'center', color: '#fff'}}>
                                Looking to connect with a publisher? Charge your status to temporarily boost your visibility.
                            </Text>
                            <TouchableOpacity onPress={() => {statusRoute === 'narrator' ? UpdateNarratorStatus() : statusRoute === 'artist' ? UpdateArtistStatus() : null}}>
                                <View style={{height: 120, width: 120, backgroundColor: 'gold', marginTop: 60, padding: 40, alignItems: 'center', borderRadius: 60}}>
                                    <FontAwesome5 
                                        name='bolt'
                                        color='#000'
                                        size={40}
                                    />
                                </View>
                            </TouchableOpacity>

                            {statusRoute === 'narrator' && user?.narratorActiveAt === null || statusRoute === 'artist' && user?.artistActiveAt === null ? null : (
                                <Text style={{width: Dimensions.get('window').width, padding: 10, fontSize: 16, marginTop: 20, fontWeight: 'bold', textAlign: 'center', color: '#fff'}}>
                                    {statusRoute === 'narrator' ? 'Narrator' : statusRoute === 'artist' ? 'Artist' : null} Status
                                </Text>
                            ) }

                            {statusRoute === 'narrator' && user?.narratorActiveAt === null || statusRoute === 'artist' && user?.artistActiveAt === null ? null : (
                                <Text style={{width: Dimensions.get('window').width, padding: 20, fontSize: 16, marginTop: 0, fontWeight: 'bold', textAlign: 'center', color: '#fff'}}>
                                    Last Charged on {statusRoute === 'narrator' ? format(parseISO(user?.narratorActiveAt), "MMM do yyyy") : statusRoute === 'artist' ? format(parseISO(user?.artistActiveAt), "MMM do yyyy") : null}
                                </Text>
                            ) }
                            
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </Portal>
        <View style={styles.container}>
            
            <LinearGradient
                colors={['black', '#363636a5', 'black']}
                style={{height: Dimensions.get('window').height,justifyContent: 'space-between'}}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{marginHorizontal: 20, marginTop: 50}}>
                        <View style={{ alignItems:'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen')}>
                                    <View style={{padding: 30, margin: -30}}>
                                        <FontAwesome5 
                                            name='chevron-left'
                                            color="#fff"
                                            size={20}
                                            style={{alignSelf: 'center'}}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                                
                                <Text style={styles.header}>
                                    Publisher Home
                                </Text>
                                
                            </View>
                            <ModSection />
                            
                        </View>  
                    </View>

                <ScrollView>
                    
                <View style={styles.container}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                        <TouchableWithoutFeedback onPress={BecomeNarrator}>
                            <View>
                                <FontAwesome5 
                                    name='book-reader'
                                    color={isNarrator === true ? '#fff' : 'gray'}
                                    size={isNarrator === true ? 30 : 22}
                                    style={{paddingTop: 40, paddingHorizontal: 20, }}
                                />
                                <View style={{alignSelf: 'center', width: narActive, borderRadius: 4, backgroundColor: '#946c00', height: 2, marginTop: 10, marginBottom: 30}}/>
                            </View>
                        </TouchableWithoutFeedback>
                        
                        <TouchableWithoutFeedback onPress={BecomePublisher}>
                            <FontAwesome5 
                                name='book-open'
                                color={isPublisher === true ? '#fff' : 'gray'}
                                size={isPublisher === true ? 30 : 22}
                                style={{paddingVertical: 40, paddingHorizontal: 20, }}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={BecomeArtist}>
                            <View>
                                <FontAwesome5 
                                    name='palette'
                                    color={isArtist === true ? '#fff' : 'gray'}
                                    size={isArtist === true ? 30 : 22}
                                    style={{paddingTop: 40, paddingHorizontal: 20, }}
                                />
                                <View style={{alignSelf: 'center', width: artActive, borderRadius: 4, backgroundColor: '#946c00', height: 2, marginTop: 10, marginBottom: 30}}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {isPublisher === true ? (
                        <View>
                            <TouchableWithoutFeedback >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                    <Text style={{ color: '#fff', fontSize: 16}}>
                                        Followers
                                    </Text>
                                    <Text style={styles.textcounter}>
                                        {user?.followers.items.length}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        
                        
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('MyStories')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Published Stories
                                </Text>
                                <Text style={styles.textcounter}>
                                    {user?.authored?.items.length}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    ) : null}

                    {isArtist === true ? (
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('CoverArt')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Illustrated Stories
                                </Text>
                                <Text style={styles.textcounter}>
                                    {user?.art?.items.length}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null}

                    {isNarrator === true ? (
                        <View>
                            <TouchableWithoutFeedback onPress={ () => navigation.navigate('Narrations')}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                    <Text style={{ color: '#fff', fontSize: 16}}>
                                        Narrated Stories
                                    </Text>
                                    <Text style={styles.textcounter}>
                                        {user?.narrated?.items.length}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={ () => navigation.navigate('Recordings', {user: user})}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                    <Text style={{ color: '#fff', fontSize: 16}}>
                                        Recording Studio
                                    </Text>
                                    <Text style={styles.textcounter}>
                                        {SavedAudio.length}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ) : null}   
                        
                    {isArtist === true ? (
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('MyArt')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    My Artwork
                                </Text>
                                <Text style={styles.textcounter}>
                                    {user?.sharedImageAssets?.items.length}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null}

                    {isNarrator === true ? (
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('SharedAssets')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    My Narrations
                                </Text>
                                <Text style={styles.textcounter}>
                                {user?.sharedAssets?.items.length}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null}

                    {isPublisher === true ? (
                        <TouchableWithoutFeedback onPress={ () => navigation.navigate('AllSharedAssets')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, marginVertical: 20}}>
                                <Text style={{ color: '#fff', fontSize: 16}}>
                                    Shared Assets
                                </Text>
                                <Text style={styles.textcounter}>
                                {user?.sharedWithAssets?.items.length + user?.sharedWithImageAssets?.items.length}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null}

{/* line break */}
                    <View style={{marginVertical: 20, alignSelf: 'center', width: '80%', height: 1, borderColor: '#fff', borderWidth: 0.5}}>
                    </View>

                    {isPublisher === true ? (
                        <View>
                            <TouchableWithoutFeedback onPress={() => {navigation.navigate('UploadAudio')}}>
                                <View style={[styles.button, {backgroundColor: 'cyan'}]}>
                                    <Text style={styles.buttontext}>
                                        Publish a Story
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => navigation.navigate('FindNarrator')}>
                                <View style={[styles.button, {backgroundColor: 'pink'}]}>
                                    <Text style={styles.buttontext}>
                                        Find a Narrator
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => navigation.navigate('FindArtist')}>
                                <View style={[styles.button, {backgroundColor: '#27d995'}]}>
                                    <Text style={styles.buttontext}>
                                        Find a Cover Artist
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ) : null}
                    
                    
  
                </View>

                <View style={{marginVertical: 40, marginBottom: 120}}>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL('http://www.blipstories.com/terms')}>
                        <View style={{ justifyContent: 'center', marginHorizontal: 40, marginVertical: 20}}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 14}}>
                                Terms and Conditions
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
            </LinearGradient>
            
        </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        width: Dimensions.get('window').width,
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 40,
    },
    textcounter: {
        color: '#fff', 
        fontSize: 16, 
        fontWeight: 'bold'
    }, button: {
        marginVertical: 10, 
        alignSelf: 'center', 
        width: '80%', 
        height: 60, 
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttontext: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default Publisher;