import React, {useState, useEffect, useContext} from 'react';
import { 
    View, 
    Text, 
    FlatList, 
} from 'react-native';

import HorzStoryTile from '../HorzStoryTile';

import { finishedStoriesByDate } from '../../src/graphql/queries';
import {graphqlOperation, API} from 'aws-amplify';
import { AppContext } from '../../AppContext';


const GenreTrending = ({genreid} : any) => {

    const { nsfwOn } = useContext(AppContext);

//fetch the stories for a specific genre for promoted carousel      
    const [stories, setStories] = useState([]);

    useEffect(() => {

        let trendingids = []

        let count = []

        let finalTrends = []

        //const map = trendingStories.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

        const fetchStorys = async () => {

            const date = new Date();

            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
        
            //const c = new Date(year + 1, month, day) // PLUS 1 YEAR
            const newdate = new Date(year, month - 1, day).toISOString() // PLUS 1 MONTH
            //const f = new Date(year, month, day  + 1) // PLUS 1 DAY
                

            //get all of the finished stories for the last month, in order of most recent
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            finishedStoriesByDate, {
                                createdAt: {
                                    gt: newdate
                                },
                                type: 'FinishedStory',
                                sortDirection: 'DESC',
                                filter: {
                                    genreID: {
                                        eq: genreid
                                    },
                                    nsfw: {
                                        ne: nsfwOn === true ? true : null
                                    }
                                }
                            } 
                        )
                    )

                    for(let i = 0; i < response.data.finishedStoriesByDate.items.length; i++) {
                        if (response.data.finishedStoriesByDate.items[i].story.approved === 'approved' && response.data.finishedStoriesByDate.items[i].story.hidden === false)
                        trendingids.push(response.data.finishedStoriesByDate.items[i].story.id)     
                    }
                    let pp = trendingids.filter( (ele, ind) => ind === trendingids.findIndex( elem => elem === ele))

                    for(let i = 0; i < pp.length; i++) {
                        count.push({
                            count: trendingids.filter(x => x==pp[i]).length,
                            story: pp[i]
                        })
                    }

                    let sortarr = count.sort((a, b) => a.count < b.count ? 1 : -1).slice(0,10)
                    
                    //filter the top 8 and add them to the array
                    for (let i = 0; i < sortarr.length; i++) {
                        let final = response.data.finishedStoriesByDate.items.find((element) => {
                            return element.storyID === sortarr[i].story;
                        })
                        finalTrends.push(final.story)
                    }

                    setStories(finalTrends);
                  
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
          genreName={null}
          icon={icon}
          audioUri={item.audioUri}
          summary={item.summary}
          author={item.author}
          narrator={item.narrator}
          time={item.time}
          id={item.id}
          ratingAvg={item.ratingAvg}
        />
      );}

    return (

        <View>
            {stories.length > 0 ? (
                <View>
                    <View style={{marginBottom: 0, marginLeft: 20}}>
                        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
                            Trending
                        </Text>
                    </View>
                    <FlatList
                        data={stories}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    
                        ListFooterComponent={
                            <View style={{width: 50}}/>
                        }
                    />
                </View>
            ) : null
            }
        </View>

    );
}

export default GenreTrending;
