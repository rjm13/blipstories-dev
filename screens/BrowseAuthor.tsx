import React, {useState, useEffect} from 'react';
import { 
    View,
    Text,
    StyleSheet, 
    Dimensions, 
    Image, 
    TouchableWithoutFeedback, 
    FlatList, 
    RefreshControl, 
    TouchableOpacity
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { Searchbar } from 'react-native-paper';

import {LinearGradient} from 'expo-linear-gradient';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { listUsers, getUser } from '../src/graphql/queries';


const BrowseAuthor = ({navigation} : any) => {

    const [ users, setUsers ] = useState([]);

    const [user, setUser] = useState()

    const [didUpdate, setDidUpdate] = useState(false);

    const [isFetching, setIsFetching] = useState(false);

    const [searchQ, setSearchQ] = useState('');

    const [following, setFollowing] = useState([]);

    const [nextToken, setNextToken] = useState(null)

    //refresh function, does not work yet
    const onRefresh = () => {
        setIsFetching(true);
        setUsers([]);
        setNextToken(null)
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

//on render, get the user and then list the following connections for that user
    useEffect(() => {

        let follarr = []

        const fetchUser = async () => {

            const userInfo = await Auth.currentAuthenticatedUser();

            setUser(userInfo.attributes.sub)

            const userconns = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))

            for (let i = 0; i < userconns.data.getUser.following.items.length; i++) {
                follarr.push(userconns.data.getUser.following.items[i].authorID)
            }
            
            setFollowing(follarr)

            try {

                const followData = await API.graphql(graphqlOperation(
                    listUsers, {
                        nextToken,
                        filter: {
                            isPublisher: {
                                eq: true
                            },
                            pseudonym: {
                                contains: searchQ.toLowerCase()
                            }
                        }
                }))

                setNextToken(followData.data.listUsers.nextToken)
                setUsers(users.concat(followData.data.listUsers.items));
                
            } catch (e) {
            console.log(e);
          }
        }
        fetchUser();
      }, [didUpdate])

      //search bar

      
      function SearchBar () {

        const [searchQuery, setSearchQuery] = useState(searchQ);
      
        const onChangeSearch = query  => setSearchQuery(query);
      
        return (
          <View>
            <Searchbar
              placeholder={'Search Authors'}
              placeholderTextColor='#000000a5'
              onChangeText={onChangeSearch}
              value={searchQuery}
              iconColor='#000000a5'
              onIconPress={() => {setSearchQ(searchQuery); setNextToken(null); setUsers([]); setDidUpdate(!didUpdate);}}
              onSubmitEditing={() => {setSearchQ(searchQuery); setNextToken(null); setUsers([]); setDidUpdate(!didUpdate);}}
              style={{
                height: 35,
                marginLeft: 40,
                borderRadius: 8,
                backgroundColor: '#e0e0e0',
                width: Dimensions.get('window').width - 100
              }}
              inputStyle={{fontSize: 16,}}
            />
          </View>
        );
      };

    //title item for the flatlist that displays the authors the user following
    const Item = ({ numAuthored, pseudonym, imageUri, id, bio } : any) => {

        const [imageU, setImageU] = useState()
        
        useEffect(() => {
            const fetchImage = async () => {
                let response = await Storage.get(imageUri);
                setImageU(response);
            }
            fetchImage()
        }, [])

        //on item render, determine if the user is following them or not
       const [isFollowing, setIsFollowing] = useState(false)
        
        //list the following connections that contain the current user and the selected author to determine if there is a following connection
        useEffect(() => {
            const fetchInfo = async () => {

            if (following.includes(id)) {
                setIsFollowing(true)
            };    
            }
            fetchInfo();
        }, [])
        
        return (
            <View style={styles.tile}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('UserScreenStack', {userID: id, status: 'publisher'})}>
                        <View style={{ flexDirection: 'row'}}>
                            <Image 
                                source={ imageUri ? { uri: imageU} : require('../assets/images/blankprofile.png')}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'gray'
                                }}
                            />
                        
                            <View style={{ marginHorizontal: 10, width: '78%'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={styles.name}>
                                        {pseudonym}
                                    </Text> 
                                    {isFollowing === true ? (
                                        <FontAwesome5 
                                            name='check-double'
                                            size={12}
                                            color='cyan'
                                            style={{ marginRight: 0}}
                                        />
                                    ) : null}
                                </View>
                                
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'center'}}>
                                    <FontAwesome5 
                                        name='book-open'
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
    
    const renderItem = ({ item } : any) => {

        return (
            <Item 
                name={item.name}
                id={item.id}
                pseudonym={item.pseudonym}
                imageUri={item.imageUri}
                bio={item.bio}
                numAuthored={item.numAuthored}
            />
        )   
    }
    
    return (

    <View >
        <LinearGradient
        colors={['#363636', 'black', 'black']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
          <View>
                <View style={{ width: Dimensions.get('window').width, flexDirection: 'row', alignItems: 'center', marginTop: 60, marginHorizontal: 20}}>
                    <TouchableWithoutFeedback onPress={ () => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                  
                    <SearchBar />

                </View>
            
          </View>
                <View style={{ alignItems: 'center', marginTop: 20, height: '84%'}}>
                    <FlatList
                        style={{ width: '100%' }}
                        data={users}
                        extraData={users}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        initialNumToRender={20}
                        maxToRenderPerBatch={20}
                        refreshControl={
                            <RefreshControl
                                refreshing={isFetching}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={() => {
                            return (
                                <View style={{margin: 40, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{color: '#fff'}}>
                                        There is nothing here. Check your internet connection.
                                    </Text>
                                </View>
                            )
                        }}
                        ListFooterComponent={() => {
                            return (
                                <View style={{ height:  150, alignItems: 'center', marginTop: 40}}>
                                    <TouchableOpacity onPress={() => setDidUpdate(!didUpdate)}>
                                        <Text style={{color: '#fff'}}>
                                            {nextToken ? 'Load More' : null}
                                        </Text>
                                    </TouchableOpacity>
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

export default BrowseAuthor;
