import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    FlatList, 
    Dimensions, 
    TouchableWithoutFeedback, 
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LinearGradient} from 'expo-linear-gradient';

import { useRoute } from '@react-navigation/native';

import { AppContext } from '../AppContext';
import StoryTile from '../components/StoryTile';


import { getTag } from '../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

const TagSearchScreen = ({navigation} : any) => {

//set the position of the audio player if the screen is full page
    const { nsfwOn } = useContext(AppContext);
    const { ADon } = useContext(AppContext);

    const route = useRoute();
    const {mainTag, tagName} = route.params

    //primary data set of searched stories for the flatlist
    const [searchedStories, setSearchedStories] = useState([])

    //on render, get the user and then list the following connections for that user. Using listStoryTags produces

    useEffect(() => {

        let stories = []

        const fetchTags = async () => {
            let response = await API.graphql(graphqlOperation(
                getTag, {
                    id: mainTag,
                }
            ))

            if (response.data.getTag.stories.items.length > 0) {
                for(let i = 0; i < response.data.getTag.stories.items.length; i++) {
                    if (response.data.getTag.stories.items[i].story.approved === 'approved' && response.data.getTag.stories.items[i].story.hidden === false) {
                        if (nsfwOn === false) {
                            if (ADon === false) {
                                stories.push(response.data.getTag.stories.items[i].story)
                            }
                            if (ADon === true && response.data.getTag.stories.items[i].story.genreID !== '1108a619-1c0e-4064-8fce-41f1f6262070') {
                                stories.push(response.data.getTag.stories.items[i].story)
                            }
                            
                        }
                        if (nsfwOn === true && response.data.getTag.stories.items[i].story.nsfw === false) {
                            stories.push(response.data.getTag.stories.items[i].story)
                        }  
                    }   
                }
            }

            setSearchedStories(stories)

        }
        fetchTags()
    }, [])

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
          <View style={{marginTop: 60, marginBottom: 10, marginHorizontal: 30}}>
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
                
                <View style={{marginLeft: 40}}>
                    <Text style={{color: 'cyan', fontSize: 22 }}>
                        #{tagName}
                    </Text>
                </View>
                
            </View>
            <View style={{ flexDirection: 'row'}}>
            
            </View>
          </View>

            

            <View style={{ alignSelf: 'center',marginHorizontal: 0, height: '90%'}}>
              <FlatList 
                data={searchedStories}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={searchedStories}
                showsVerticalScrollIndicator={false}   
                initialNumToRender={20}
                maxToRenderPerBatch={20} 
                ListFooterComponent={ () => {
                    return (
                        <View style={{ height:  150}}/>
                );}}
                ListHeaderComponent={ () => {
                    return (
                        <View style={{}}>
                            <Text style={{ width: Dimensions.get('window').width-40, fontSize: 18, fontWeight: 'bold', color: 'white', margin: 20,}}>
                                Stories
                            </Text>
                        </View>
                );}}
                ListEmptyComponent={ () => {
                    return (
                        <View style={{ height:  70, alignItems: 'center'}}>
                            <Text style={{ color: 'white', margin: 20,}}>
                                There are no stories for this tag.
                            </Text>
                        </View>
                );}}
            />
            </View>

        </LinearGradient>
        </View>
    );
}

export default TagSearchScreen;
