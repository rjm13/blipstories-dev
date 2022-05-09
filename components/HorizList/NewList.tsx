import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    Text, 
    FlatList,  
} from 'react-native';


import { AppContext } from '../../AppContext';
import HorzStoryTile from '../HorzStoryTile';

import { storiesByDate } from '../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';


const NewList = () => {

    const { nsfwOn } = useContext(AppContext);

    //fetch the stories for a specific genre for promoted carousel      
    const [stories, setStories] = useState([]);

    useEffect(() => {

        const fetchStorys = async () => {
                
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            storiesByDate, {
                                type: 'Story',
                                sortDirection: 'DESC',
                                filter: {
                                    hidden: {
                                        eq: false
                                    },
                                    approved: {
                                        eq: 'approved'
                                    },
                                    genreID: {
                                        ne: '1108a619-1c0e-4064-8fce-41f1f6262070'
                                    },
                                    imageUri: {
                                        attributeExists: true
                                    },
                                    nsfw: {
                                        ne: nsfwOn === true ? true : null
                                    }
                                }
                            } 
                        )
                    )
                    setStories(response.data.storiesByDate.items.splice(0, 9));
                } catch (e) {
                    console.log(e);}
        }

        fetchStorys();

    },[])


    const renderItem = ({ item }: any) => {

        let icon = ''
        let genreName = ''

        if (item.genre) {
            icon = item.genre.icon
            genreName = item.genre.genre
        }
        
        return (
        <HorzStoryTile 
          title={item.title}
          imageUri={item.imageUri}
          genreName={genreName}
          icon={icon}
          id={item.id}
          ratingAvg={item.ratingAvg}
        />
      );}

    return (

        <View>
            <View style={{marginBottom: 0, marginLeft: 20}}>
                <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                    Brand New
                </Text>
            </View>
            <FlatList
                data={stories}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                maxToRenderPerBatch={8}
                ListFooterComponent={
                    <View style={{width: 60}}/>
                }
            />
        </View>

    );
}

export default NewList;
