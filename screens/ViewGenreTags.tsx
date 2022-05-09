import React, {useState, useEffect} from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableWithoutFeedback, 
    ScrollView,
    FlatList,
    Dimensions,
} from 'react-native';

import {useRoute} from '@react-navigation/native'

import {LinearGradient} from 'expo-linear-gradient';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { getGenre, listTags } from '../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';

const GenreTags = ({navigation} : any) => {

//route params from the StoriesScreen to specifiy the genre
    const route = useRoute();
    const {genreRoute, genreName} = route.params

    const [tags, setTags] = useState([])

    useEffect(() => {

        let tagsarr = []

        const fetchTags = async () => {
            let response = await API.graphql(graphqlOperation(
                getGenre, {
                        id: genreRoute
                    
                }
            ))
            for (let i = 0; i < response.data.getGenre.tags.items.length; i++) {
                if (response.data.getGenre.tags.items[i].tag.count > 0) {
                    tagsarr.push(response.data.getGenre.tags.items[i].tag)
                }
                
            }
            setTags(tagsarr)
        }
        fetchTags();
    }, [])

  

    

    const Item = ({id, tagName, index} : any) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('TagSearchScreen', {mainTag: id, tagName: tagName})}>
               <View style={{margin: 8}}>
                    <Text style={{overflow: 'hidden', paddingVertical: 6, paddingHorizontal: 20, color: '#00ffff', borderColor: '#00ffff', backgroundColor: '#1A4851a5', borderRadius: 14, borderWidth: 0.5}}>
                        #{tagName}
                    </Text>
                </View> 
            </TouchableWithoutFeedback>
            
        )
    }

    const renderItem = ({item, index} : any) => {
        return (
            <Item 
                id={item.id}
                tagName={item.tagName}
                index={index}
            />
        )
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#212121', '#000', '#000',]}
                style={{height: '100%'}}
                start={{ x: 1, y: 1 }}
                end={{ x: 0.5, y: 0.5 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 20}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome5 
                                name='chevron-left'
                                size={22}
                                color='#fff'
                                style={{padding: 30}}
                                onPress={() => navigation.goBack()}
                            /> 
                            <Text style={{fontWeight: 'bold', fontSize: 22, color: '#fff', textTransform: 'capitalize'}}>
                                {genreName} Tags
                            </Text>
                        </View>
                    </View>

                    <View>
                        <FlatList 
                            data={tags}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{flexWrap: 'wrap', width: Dimensions.get('window').width}}
                            horizontal={true}
                            ListFooterComponent={() => {
                                return (
                                    <View style ={{height: 100}}/>
                                )
                            }}
                        />
                    </View>

                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
    },
});

export default GenreTags;