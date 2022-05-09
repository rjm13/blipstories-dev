import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Dimensions, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    FlatList,
    RefreshControl
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { commentsByDate, listFollowingConns, listImageAssets } from '../src/graphql/queries';
import { updateComment, deleteComment } from '../src/graphql/mutations';
import { formatRelative, parseISO } from "date-fns";
import id from 'date-fns/esm/locale/id/index.js';

const ModSection = ({navigation} : any) => {

    const [didUpdate, setDidUpdate] = useState(false)

    const [comments, setComments] = useState([])

       //refresh state of the flatlist
       const [isFetching, setIsFetching] = useState(false);

       const onRefresh = () => {
           setIsFetching(true);
           setDidUpdate(!didUpdate)
           setTimeout(() => {
               setIsFetching(false);
           }, 2000);
           }

    useEffect(() => {
        const getUser = async () => {
            let response = await Auth.currentAuthenticatedUser();
            if (response.attributes.email === 'martianspidermedia@gmail.com') {
                return
            } else {
                navigation.navigate('HomeScreen');
            }
        }
        getUser();
    }, [])

    useEffect(() => {
        const fetchComments = async () => {
            let response = await API.graphql(graphqlOperation(
                commentsByDate, {
                    sortDirection: 'ASC',
                    type: 'Comment',
                    filter: {
                        approved: {
                            eq: false
                        }
                    }
                }
            ))
            setComments(response.data.commentsByDate.items)
        }
        fetchComments();
    }, [didUpdate])

    const Comment = ({createdAt, id, username, storytitle, content, userID, storyID} : any) => {

        const Delete = async () => {
            try {
                await API.graphql(graphqlOperation(
                    deleteComment, {input: {
                        id: id,
                    }}
                ))
            } catch {
                alert ('CommentDeleted')
            }
            setDidUpdate(!didUpdate)
        }
    
        const Approve =  async () => {
            try {
                await API.graphql(graphqlOperation(
                    updateComment, {input: {
                        id: id,
                        approved: true
                    }}
                ))
            } catch {
                alert ('Could not update comment')
            }
            setDidUpdate(!didUpdate)
        }
        
        return (
            <TouchableWithoutFeedback onPress={Approve} onLongPress={Delete}>
                <View style={{backgroundColor: '#132F35', margin: 20, padding: 10, borderRadius: 15}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserScreen', {userID: userID})}>
                            <Text style={{fontWeight: 'bold', color: '#fff', marginVertical: 4, textTransform: 'capitalize'}}>
                                {username}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('StoryScreen', {storyID: storyID})}>
                        <Text style={{fontWeight: 'bold', color: '#fff', marginVertical: 4, fontSize: 12}}>
                            {storytitle}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{color: '#fff', marginVertical: 10}}>
                        {content}
                    </Text>
                    <Text style={{fontSize: 11, color: '#fff', marginVertical: 4, textTransform: 'capitalize'}}>
                    {formatRelative(parseISO(createdAt), new Date())}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const renderComment = ({item} : any) => {
        return (
            <Comment 
                createdAt={item.createdAt}
                id={item.id}
                username={item.user.name}
                storytitle={item.story.title}
                content={item.content}
                storyID={item.storyID}
                userID={item.userID}
            />
        )
    }




    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 60, marginBottom: 30, marginLeft: 20 }}>
                <FontAwesome5 
                    name='chevron-left'
                    size={20}
                    color='#fff'
                    style={{padding: 30, margin: -30}}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18, marginLeft: 40}}>
                    New Comments
                </Text>
            </View>

            <FlatList 
                data={comments}
                keyExtractor={item => item.id}
                extraData={comments}
                renderItem={renderComment}
                showsVerticalScrollIndicator={false}
                maxToRenderPerBatch={20}
                    refreshControl={
                        <RefreshControl
                        refreshing={isFetching}
                        onRefresh={onRefresh}
                        />
                    }
                    ListEmptyComponent={ () => {
                        return (
                            <View style={{ alignItems: 'center'}}>
                                    <Text style={{ color: 'white', margin: 20,}}>
                                        No new comments.
                                    </Text>
                            </View>
                    );}}
                    ListFooterComponent={ () => {
                        return (
                            <View style={{ height: 100}}>
                            </View>
                    );}}
            />


        </View>
    )
}

export default ModSection;