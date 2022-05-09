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


const ShortSweet = () => {

    //data set for the stories flatlist    
    const [stories, setStories] = useState([]);

    //global context to filter out nsfw
    const { nsfwOn } = useContext(AppContext);

    useEffect(() => {

        const fetchStorys = async () => {

            const date = new Date();

            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
        
            //const c = new Date(year + 1, month, day) // PLUS 1 YEAR
            const newdate = new Date(year, month - 1, day).toISOString() // PLUS 1 MONTH
            //const f = new Date(year, month, day  + 1) // PLUS 1 DAY
            
                
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            storiesByDate, {
                                type: 'Story',
                                createdAt: {
                                    gt: newdate
                                },
                                filter: {
                                    hidden: {
                                        eq: false
                                    },
                                    approved: {
                                        eq: 'approved'
                                    },
                                    time: {
                                        //under 30 minutes
                                        lt: 1800000
                                    },
                                    imageUri: {
                                        attributeExists: true
                                    },
                                    ratingAvg: {
                                        gt: 6
                                    },
                                    genreID: {
                                        ne: '1108a619-1c0e-4064-8fce-41f1f6262070'
                                    },
                                    nsfw: {
                                        ne: nsfwOn === true ? true : null
                                    }
                                    // ratingAmt: {
                                    //     gt: 5,
                                    // }
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
                    Short and Sweet
                </Text>
            </View>
            <FlatList
                data={stories}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                horizontal={true}
                maxToRenderPerBatch={8}
                showsHorizontalScrollIndicator={false}
               
                ListFooterComponent={
                    <View style={{width: 60}}>
                    </View>
                }
            />
        </View>

    );
}

export default ShortSweet;
