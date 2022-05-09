import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    Dimensions,
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    ScrollView
} from 'react-native';

import { Searchbar } from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LinearGradient} from 'expo-linear-gradient';

import StoryTile from '../components/StoryTile';
import { AppContext } from '../AppContext';

import {listStories, listTags } from '../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

const SearchScreen = ({navigation} : any) => {

  //nsfw global app context
    const { nsfwOn } = useContext(AppContext);
    const { ADon } = useContext(AppContext);

  //search function states
    const [newSearch, setNewSearch] = useState();

    //search function trigger that refreshes the search results
    const [didUpdate, setDidUpdate] = useState(false);

    const [tagUpdate, setTagUpdate] = useState(null);
    

    //focus the keyboard only on initial render
    const focus = useRef(null)

    useEffect(() => {
      focus.current.focus()
    }, [])

  //this is the search bar
    function SearchBar () {

        const [searchQuery, setSearchQuery] = useState('');

        const onChangeSearch = (query : any)  => setSearchQuery(query); 

        return (
          <View>
            <Searchbar
              placeholder={'Search Stories, Tags'}
              placeholderTextColor='#000000a5'
              //autoComplete={true}
              onChangeText={onChangeSearch}
              onIconPress={() => {setNewSearch(searchQuery); setSearchedStories([]); setNextToken(null); setDidUpdate(!didUpdate); }}
              onSubmitEditing={() => {setNewSearch(searchQuery); setSearchedStories([]); setNextToken(null); setDidUpdate(!didUpdate);}}
              value={searchQuery}
              ref={focus}
              maxLength={20}
              icon={() => {return(
                <FontAwesome5 
                  name='search'
                  color='#000000a5'
                  size={18}
                />)}}
              iconColor='#000000a5'
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

    //primary data set of searched stories for the flatlist
    const [searchedStories, setSearchedStories] = useState([])

    //array of tags that show from search results
    const [TagsArray, setTagsArray] = useState([]);
    const [tagToken, setTagToken] = useState(null);

    useEffect(() => {

        if (newSearch !== '') {
            const fetchTags = async () => {
                const tagResults = await API.graphql(graphqlOperation(
                    listTags, {
                        tagToken,
                        filter: {
                            tagName: {
                                contains: newSearch.toLowerCase()
                            },
                            nsfw: {
                              ne: ADon === true ? true : null
                            } 
                        }
                    }
                ))
                //setTagToken(tagResults.data.listTags.nextToken)
                setTagsArray(tagResults.data.listTags.items)
            }
            fetchTags();
        }
    },[didUpdate])

    const [nextToken, setNextToken] = useState(null)

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

      const fetchStories = async () => {

          if (newSearch.length > 2 ) {

          try {

              const searchResults = await API.graphql(graphqlOperation(
                  listStories, {
                      nextToken,
                      filter: {
                        or: [
                          {title: {
                              contains: newSearch
                          },
                          approved: {
                              eq: 'approved'
                          },
                          hidden: {
                              eq: false
                          },
                          genreID: {
                            ne: ADon === true ? '1108a619-1c0e-4064-8fce-41f1f6262070' : ''
                          },
                          nsfw: {
                            ne: nsfwOn === true ? true : null
                          }
                        },
                          {summary: {
                            contains: newSearch
                            },
                            approved: {
                                eq: 'approved'
                            },
                            hidden: {
                                eq: false
                            },
                            genreID: {
                              ne: ADon === true ? '1108a619-1c0e-4064-8fce-41f1f6262070' : ''
                            },
                            nsfw: {
                              ne: nsfwOn === true ? true : null
                            }
                        }
                        ]
                      }
              }))
              
              setNextToken(searchResults.data.listStories.nextToken)
              
              setSearchedStories(searchedStories.concat(searchResults.data.listStories.items));

          } catch (e) {
          console.log(e);
        }
      } else {
        return;
      }
    }
        fetchStories(); 
    
    }, [didUpdate])

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
        <View >
          <LinearGradient
          colors={['#363636','#2f217966', '#000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{marginTop: 40, marginBottom: 10, marginHorizontal: 20}}>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
            <View style={{ flexDirection: 'row'}}>
            
            </View>
          </View>

            

            <View style={{ alignSelf: 'center',marginHorizontal: 0, height: '90%'}}>
              <FlatList 
                data={searchedStories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={searchedStories}
                showsVerticalScrollIndicator={false}   
                initialNumToRender={10}
                maxToRenderPerBatch={10} 
                ListFooterComponent={ () => {
                    return (
                        <View style={{ height:  150, alignItems: 'center', marginTop: 40}}>
                            <TouchableOpacity onPress={() => setDidUpdate(!didUpdate)}>
                              <Text style={{color: '#fff'}}>
                                {nextToken ? 'Load More' : null}
                              </Text>
                            </TouchableOpacity>
                        </View>
                );}}
                ListHeaderComponent={ () => {
                    return (
                        <View style={{}}>
                            {TagsArray.length > 0 ? (
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                        Tags
                                    </Text>
                                    <View>
                                        <ScrollView style={{width: Dimensions.get('window').width - 40, marginHorizontal: 20, marginBottom: 20, paddingBottom: 1}} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {TagsArray.map(({ tagName, id, genreID, nsfw } : any, index) => (
                                                <View key={id} style={{marginTop: 10, marginRight: 10}}>
                                                    <TouchableOpacity onPress={() => navigation.navigate('TagSearchStack', {mainTag: id, tagName: tagName})}>
                                                        <View style={{}}>
                                                            <Text style={{color: nsfw === true ? 'red' : 'cyan',
                                                              fontSize: 14,
                                                              backgroundColor: nsfw === true ? '#371111a5' :'#1A4851a5',
                                                              borderColor: nsfw === true ? '#ff0000a5' : '#00ffffa5',
                                                              borderWidth: 0.5,
                                                              paddingHorizontal: 16,
                                                              paddingVertical: 6,
                                                              overflow: 'hidden',
                                                              borderRadius: 14}}>
                                                                #{tagName}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </ScrollView>

                                          <TouchableOpacity onPress={() => setTagUpdate(!tagUpdate)}>
                                            <View style={{alignItems: 'center', marginTop: 10}}>
                                              <Text style={{color: '#fff'}}>
                                                 {tagToken === null ? '' : 'Load More'}
                                              </Text>
                                            </View>
                                          </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            ) : null}
                            {searchedStories.length > 0? (
                                <Text style={{ width: Dimensions.get('window').width-40, fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                    Stories
                                </Text>
                            ) : null}
                            
                        </View>
                );}}
                ListEmptyComponent={ () => {
                    return (
                        <View style={{ height:  70}}>
                        </View>
                );}}
            />
            </View>

        </LinearGradient>
        </View>
    );
}

export default SearchScreen;
