import React, {useState, useEffect, useContext, useRef} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    FlatList, 
    Dimensions, 
    RefreshControl, 
    TouchableWithoutFeedback, 
    ActivityIndicator, 
    ScrollView
} from 'react-native';

import { AppContext } from '../AppContext';

import { listStories } from '../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

import StoryTile from '../components/StoryTile';


const AudioStoryList = ({genreID} : any) => {

    const { nsfwOn } = useContext(AppContext);

    const flatListRef = useRef();

    

    const ScrollToThisThing = ({letter, id}: any) => {
        flatListRef.current?.scrollTo({x: id * id, animated: true});
        setSelectedLetter(letter);
      }


    const alphabet = [{id: 1, letter: 'a'},{id: 2,letter: 'b'},{id: 3,letter: 'c'},{id: 4,letter: 'd'},{id: 5,letter: 'e'},{id: 6,letter: 'f'},{id: 7,letter: 'g'},{id: 8,letter: 'h'},{id: 9,letter: 'i'},{id: 10,letter: 'j'},{id: 11,letter: 'k'},{id: 12,letter: 'l'},{id: 13,letter: 'm'},{id: 14,letter: 'n'},{id: 15,letter: 'o'},{id: 16,letter: 'p'},{id: 17,letter: 'q'},{id: 18,letter: 'r'},{id: 19,letter: 's'},{id: 20,letter: 't'},{id: 21,letter: 'u'},{id: 22,letter: 'v'},{id: 23,letter: 'w'},{id: 24,letter: 'x'},{id: 25,letter: 'y'},{id: 26,letter: 'z'},]

    //state for the array of pinned stories for that user
    const [genreStories, setGenreStories] = useState([])

    //update trigger for fetching the pinned stories
    const [didUpdate, setDidUpdate] = useState(false);

    //the selected letter for the filter to the stories in the genre. Begins with...
    const [selectedLetter, setSelectedLetter] = useState('a')

    //const [nextToken, setNextToken] = useState(null)

    

    //on render, get the user and then list the following connections for that user
    useEffect(() => {

        let genresarr = []
        setGenreStories([])

        const fetchStories = async (nextToken: any) => {

            setIsLoading(true);

            try {

                const genreData = await API.graphql(graphqlOperation(
                    listStories, {
                        nextToken,
                        filter: {
                            genreID: {
                                eq: genreID
                            },
                            title: {
                                beginsWith: selectedLetter.toUpperCase()
                            },
                            hidden: {
                                eq: false
                            },
                            approved: {
                                eq: 'approved'
                            },
                            nsfw: {
                                ne: nsfwOn === true ? true : null
                            },
                        }
                }))
                
                for(let i = 0; i < genreData.data.listStories.items.length; i++ ){
                    genresarr.push(genreData.data.listStories.items[i])
                }
                
                if(genreData.data.listStories.nextToken !== null) {
                    fetchStories(genreData.data.listStories.nextToken)
                    return
                }

                if (genreData.data.listStories.nextToken === null) {
                    setIsLoading(false);
                    return
                }

            } catch (e) {
            console.log(e);
          }
        }
        fetchStories(null)
        setGenreStories(genresarr);
           
      }, [selectedLetter, didUpdate])


    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

      const renderItem = ({ item }: any) => {

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

      const [isLoading, setIsLoading] = useState(false);

    return (
            <View style={styles.container}>
                <View>
                    <ScrollView style={{paddingHorizontal: 20}} horizontal={true} ref={flatListRef} showsHorizontalScrollIndicator={false}>        
                        {alphabet.map(({ id, letter } : any) => (
                                <View key={id} style={{}}>
                                    <TouchableWithoutFeedback onPress={() => {ScrollToThisThing({letter, id})}}>
                                        <View style={{ paddingHorizontal: 10, marginBottom: 20}}>
                                            <Text style={{
                                                color: selectedLetter === letter ? 'cyan' : '#fff',
                                                fontWeight: selectedLetter === letter ? 'bold' : 'normal',
                                                fontSize: selectedLetter === letter ? 20 : 17,
                                                textTransform: 'capitalize',
                                            }}>
                                                {letter}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                        ))}
                        <View style={{width: 40}}>

                        </View>
                    </ScrollView>
                    </View>


                <FlatList 
                    data={genreStories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}  
                    ListFooterComponent={ () => {
                        return (
                            <View style={{ height:  200}}>
                                
                            </View>
                    );}}
                    ListEmptyComponent={ () => {
                        return (
                            <View style={{ height:  70, alignItems: 'center'}}>
                                {isLoading === true ? (
                                <View style={{margin: 30}}>
                                    <ActivityIndicator size='small' color='cyan' />
                                </View>
                                ) : (
                                <Text style={{ color: 'white', margin: 20,}}>
                                    Oops! There is nothing here!
                                </Text>
                                )}
                            </View>
                    );}}
                />

            </View>

    );
}

const styles = StyleSheet.create({
    container: {
       width: Dimensions.get('window').width, 
       height: '93%'
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

export default AudioStoryList;
