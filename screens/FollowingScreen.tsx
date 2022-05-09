import React, {useState, useEffect} from 'react';
import { 
    View,
    Text,
    StyleSheet, 
    Dimensions, 
    Image, 
    TouchableWithoutFeedback, 
    FlatList, RefreshControl, 
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {LinearGradient} from 'expo-linear-gradient';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { getUser } from '../src/graphql/queries';
import { listFollowingConns } from '../src/graphql/queries';


const FollowingScreen = ({navigation} : any) => {

    const [ users, setUsers ] = useState([]);

    const [user, setUser] = useState({})

    const [didUpdate, setDidUpdate] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    //refresh function, does not work yet
    const onRefresh = () => {
        setIsFetching(true);
        //fetchUsers();
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

//on render, get the user and then list the following connections for that user
    useEffect(() => {

        const fetchUser = async () => {

            let Following = []

            const userInfo = await Auth.currentAuthenticatedUser();

                if (!userInfo) {return;}

            try {
                const userData = await API.graphql(graphqlOperation(
                    getUser, {id: userInfo.attributes.sub}
                ))

                if (userData) {setUser(userData.data.getUser);}

                for (let i = 0; i < userData.data.getUser.following.items.length; i++) {
                    Following.push(userData.data.getUser.following.items[i].author) 

                setUsers(Following);
              } 
            } catch (e) {
            console.log(e);
          }
        }
        fetchUser();
      }, [didUpdate])

    //legacy function for selected the state toggle between followers and following
    const [SelectedId, setSelectedId] = useState(1);

    //title item for the flatlist that displays the authors the user following
    const Item = ({ numAuthored, pseudonym, imageUri, id, bio } : any) => {

        const [imageU, setImageU] = useState('')

        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri);
                if (response) {
                    setImageU(response)
                }
            }
            fetchImage();
        }, [])

    
        return (
            <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('UserScreen', {userID: id, status: 'publisher'})}>
                        <View style={{ flexDirection: 'row'}}>
                            <Image 
                                source={ imageUri ? { uri: imageU} : require('../assets/images/blankprofile.png')}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'cyan'
                                }}
                            />
                        
                            <View style={{ marginHorizontal: 10}}>
                                <Text style={styles.name}>
                                    {pseudonym}
                                </Text> 
                                
                                
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='book-reader'
                                        size={12}
                                        color='#ffffffa5'
                                        style={{ marginRight: 5}}
                                    />
                                    <Text style={styles.userId}>
                                        {numAuthored === null ? 0 : numAuthored}
                                    </Text> 
                                </View> 
                            </View>
                        </View>
                    </TouchableWithoutFeedback>    
                </View>    
    
                <View style={{marginTop: 10, marginHorizontal: 5}}>
                    <Text style={{color: "#fff", fontSize: 12, }}>
                        {bio}
                    </Text>
                </View>
               
            </View>
        );
    }
    
    const renderItem = ({ item } : any) => (
    
        <Item 
            author={item}
            name={item.name}
            id={item.id}
            pseudonym={item.pseudonym}
            imageUri={item.imageUri}
            authored={item.authored}
            bio={item.bio}
            following={item.following}
            isPublisher={item.isPublisher}
            numAuthored={item.numAuthored}
        />
      );

    return (
    <View >
        <LinearGradient
        colors={['#363636', 'black', 'black']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 60, marginHorizontal: 20}}>
                  <TouchableWithoutFeedback onPress={ () => navigation.goBack()}>
                      <View style={{padding: 30, margin: -30}}>
                        <FontAwesome5 
                            name='chevron-left'
                            color='#fff'
                            size={20}
                        />
                    </View>
                  </TouchableWithoutFeedback>
                  
                  

              
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'flex-start', 
                width: '100%', 
                alignItems: 'flex-end',
                marginHorizontal: 20,
                //height: 50,
                }}>
        
                <TouchableWithoutFeedback onPress={() => setSelectedId(1)}>
                    <Text style={{ 
                        color: SelectedId ===  1 ? '#fff' : '#ffffffa5',
                        marginHorizontal: 15, 
                        fontSize: SelectedId ===  1 ? 22 : 17,
                        fontWeight: SelectedId === 1 ? 'bold' : 'normal',
                        borderBottomColor: '#fff',
                        //borderBottomWidth: SelectedId ===  1 ? 1 : 0,
                    }}>
                        Following
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            </View>
            
          </View>
                <View style={{ alignItems: 'center', marginTop: 20, height: '86%'}}>
                    <FlatList
                        style={{ width: '100%' }}
                        data={users}
                        extraData={users}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        maxToRenderPerBatch={20}
                        initialNumToRender={20}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={onRefresh}
                            />
                        }
                        ListFooterComponent={() => {
                            return (
                                <View style={{height: 120}}/>
                            )
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: '#fff'}}>
                                        There is nothing here.
                                    </Text>
                                </View>
                            )
                        }}
                    />
                </View>
        </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width, 
     },
     tile: {
         backgroundColor: '#383838a5',
         marginHorizontal: 20,
         marginVertical: 10,
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
     },
     popupblock: {
         marginTop: 10,
     },
     paragraph: {
         color: '#ffffffa5'
     },
     playbutton: {
         borderWidth: 0.3,
         paddingHorizontal: 15,
         paddingVertical: 3,
         borderRadius: 15,
         borderColor: '#fff',
         color: '#fff',
     },
     time: {
         fontSize: 16,
         fontWeight: 'normal',
         color: '#ffffffa5',
     },
     category: {
         fontSize: 12,
         color: 'cyan',
         fontStyle: 'italic',
         marginVertical: 3,
 
     },
});

export default FollowingScreen;
