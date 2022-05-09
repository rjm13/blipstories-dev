import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback, 
    TouchableOpacity,  
    Image,
    ActivityIndicator,
    RefreshControl,
    FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Modal, Portal, Provider } from 'react-native-paper';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser } from '../src/graphql/queries';


const AllSharedAssets = ({navigation} : any) => {

    const [isSelected, setIsSelected] = useState('art');

    const [isLoading, setIsLoading] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const [didUpdate, setDidUpdate] = useState(false);

    const SCREEN_WIDTH = Dimensions.get('window').width;

    const [data, setData] = useState({
        imageUri: '',
        title: '',
        index: '',
        id: '',
        sharedUserID: '',
        sharedUserName: '',
    })

        //art styles modal
        const [visible, setVisible] = useState(false);
        const showImageModal = ({title, imageUri, id, index, sharedUserID, sharedUserName} : any) => {
            setVisible(true);
            setData({...data, imageUri: imageUri, title: title, index: index, id: id, sharedUserID: sharedUserID, sharedUserName: sharedUserName})
    
        }
        const hideImageModal = () => setVisible(false);
        const containerStyle = {
            backgroundColor: '#363636', 
            borderRadius: 15,
            paddingVertical: 40
        };

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
    }

    //data states
    const [audioAssets, setAudioAssets] = useState();
    const [imageAssets, setImageAssets] = useState();



    useEffect(() => {
        const fetchData = async () => {

            setIsLoading(true);

            const userInfo = await Auth.currentAuthenticatedUser();

            let result = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))

            let newArr = result.data.getUser.sharedWithImageAssets.items.filter((item : any) => item.isSample === false);

            for (let i = 0; i < newArr.length; i++) {
            
                const getUri = await Storage.get(newArr[i].imageUri);

                newArr[i].imageUri = getUri
            }
            setImageAssets(newArr)
            setAudioAssets(result.data.getUser.sharedWithAssets.items);
            setIsLoading(false);
        }

        fetchData();
    }, [didUpdate])

    const ImageItem = ({title, imageUri, id, index, sharedUserID, sharedUserName} : any) => {

        return (
            <TouchableWithoutFeedback onPress={() => showImageModal({title, imageUri, id, index, sharedUserID, sharedUserName})}>
                <View style={{marginTop: 20, alignItems: 'center'}}>
                    <Image 
                        source={{uri: imageUri}}
                        style={{borderRadius: 8, margin: 10, width: SCREEN_WIDTH - 40, height: (SCREEN_WIDTH - 40)*0.75}}
                    />
                    <Text style={{marginLeft: 10, color: '#fff'}}>
                        {title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const AudioItem = ({title, time, id, sharedUserName, sharedUserID} : any) => {

        //convert the time to show in the modal
        function millisToMinutesAndSeconds () {
            let minutes = Math.floor(time / 60000);
            let seconds = Math.floor((time % 60000) / 1000);
            return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);  
        } 

        return (
            <View>
                <View style={styles.tile}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.name}>
                                {title}
                            </Text>
                            <Text style={{color: '#ffffffa5'}}>
                                {millisToMinutesAndSeconds()}
                            </Text>
                        </View>
                        
                        <View style={{flexDirection: 'row', marginRight: 20, alignSelf: 'center'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('SimpleAudioPlayer', {item: null, cloudItem: id})}>
                                <View style={{alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='play'
                                        size={18}
                                        color='#fff'
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                    </View> 
                    
                    
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 20}}>
                    <Text style={{color: '#00ffffa5'}}>
                        Shared by
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: sharedUserID, status: 'narrator' })}>
                        <Text style={{color: '#00ffffa5', marginLeft: 4, textTransform: 'capitalize'}}>
                            {sharedUserName}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        )
    }

    const renderImageItem = ({item, index} : any) => {

        return (
            <ImageItem 
                title={item.title}
                imageUri={item.imageUri}
                id={item.id}
                index={index}
                sharedUserID={item.userID}
                sharedUserName={item.user?.artistPseudo}
            />
        )
        
    }

    const renderAudioItem = ({item} : any) => {

        let pseudonym = ''

        if (item.sharedUser) {
            pseudonym = item.sharedUser.pseudonym
        }

        return (
            <AudioItem 
                id={item.id}
                title={item.title}
                audioUri={item.audioUri}
                time={item.time}
                isSample={item.isSample}
                userID={item.userID}
                sharedUserID={item.userID}
                createdAt={item.createdAt}
                pseudonym={pseudonym}
                sharedUserName={item.user?.narratorPseudo}
            />
        )

        
    }


    return (
        <Provider>
            <Portal>
{/* image modal */}
                <Modal visible={visible} onDismiss={hideImageModal} contentContainerStyle={containerStyle}>
                    <View>
                        <Image 
                            source={{uri: data.imageUri}}
                            style={{alignSelf: 'center', width: SCREEN_WIDTH, height: SCREEN_WIDTH*0.75}}
                        />

                        <View style={{marginTop: 20, marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                            
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{color: '#00ffffa5'}}>
                                        Shared by
                                    </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: data.sharedUserID, status: 'artist'})}>
                                        <Text style={{color: '#00ffffa5', textTransform: 'capitalize', marginLeft: 4}}>
                                            {data.sharedUserName}
                                        </Text>
                                    </TouchableOpacity>
                                    
                                </View>
                        </View>
                        
                        
                            <View style={{alignSelf: 'center', marginTop: 20}}>
                                <Text style={{fontSize: 16, textAlign: 'center', color: '#fff', marginTop: 20, alignSelf: 'center'}}>
                                    {data.title}
                                </Text>
                                
                            </View>
                        
                        
                    </View>
                </Modal>
            </Portal>
        <View>
            <LinearGradient colors={['#363636a5', '#363636a5', 'black']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
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
                        Shared With Me
                    </Text>
                </View>

                    <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
                        <TouchableWithoutFeedback onPress={() => setIsSelected('art')}>
                                <Text style={{fontSize: isSelected === 'art' ? 18 : 16, paddingHorizontal: 20, color: isSelected === 'art' ? '#fff' : 'gray', fontWeight: isSelected === 'art' ? 'bold' : 'normal'}}>
                                    Illustrations
                                </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => {setIsSelected('narration')}}>
                                <Text style={{fontSize: isSelected === 'narration' ? 18 : 16, color: isSelected === 'narration' ? '#fff' : 'gray', fontWeight: isSelected === 'narration' ? 'bold' : 'normal', paddingHorizontal: 20,}}>
                                    Narrations
                                </Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{height: '70%'}}>
                        {isSelected === 'art' ? (
                            <FlatList 
                                data={imageAssets}
                                renderItem={renderImageItem}
                                keyExtractor={item => item.id}
                                extraData={imageAssets}
                                maxToRenderPerBatch={10}
                                refreshControl={
                                    <RefreshControl
                                    refreshing={isFetching}
                                    onRefresh={onRefresh}
                                    />
                                }
                                showsVerticalScrollIndicator={false}    
                                
                                ListFooterComponent={ () => {
                                    return (
                                        <View style={{ height:  120}} />
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
                                                There is nothing here! No illustrations have been shared with you.
                                            </Text>
                                            )}
                                        </View>
                                );}}
                            />
                        ) : isSelected === 'narration' ? (
                            <FlatList 
                                data={audioAssets}
                                renderItem={renderAudioItem}
                                keyExtractor={item => item.id}
                                extraData={audioAssets}
                                maxToRenderPerBatch={10}
                                refreshControl={
                                    <RefreshControl
                                    refreshing={isFetching}
                                    onRefresh={onRefresh}
                                    />
                                }
                                showsVerticalScrollIndicator={false}    
                                
                                ListFooterComponent={ () => {
                                    return (
                                        <View style={{ height:  120}} />
                                );}}
                                ListEmptyComponent={ () => {
                                    return (
                                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                                            {isLoading === true ? (
                                            <View style={{margin: 30}}>
                                                <ActivityIndicator size='small' color='cyan' />
                                            </View>
                                            ) : (
                                            <Text style={{ color: 'white', margin: 20,}}>
                                                There is nothing here. No narrations have been shared with you.
                                            </Text>
                                            )}
                                        </View>
                                );}}
                            />
                        ) : null}
                        
                    </View>
                    

                    <View style={{height: 100}}/>
                
            </LinearGradient>
        </View>
        </Provider>
    )
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
})

export default AllSharedAssets;