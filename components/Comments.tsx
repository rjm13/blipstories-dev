// import { Auth, API, graphqlOperation } from 'aws-amplify';
import React, {useContext, useEffect, useState} from 'react';
import {
    View, 
    Text, 
    FlatList, 
    Image, 
    Dimensions, 
    TouchableOpacity, 
    TextInput
} from 'react-native';

import { format, parseISO } from "date-fns";

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser, listComments } from '../src/graphql/queries';
import { createComment } from '../src/graphql/mutations';

import { AppContext } from '../AppContext';


const Item = ({content, createdAt, userName, userImageUri}: any) => {

    return (
        <View style={{ marginVertical: 10, backgroundColor: '#132F35', borderRadius: 15}}>

            <View style={{ margin: 10, flexDirection: 'row'}}>
                <View>
                   <Image 
                            source={ userImageUri ? { uri: userImageUri} : require('../assets/images/blankprofile.png')}
                            style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'lightgray'}}
                    /> 
                </View>
                <View style={{marginHorizontal: 20, alignSelf: 'center'}}>
                    <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                        {userName}
                    </Text>
                    <Text style={{color: '#ffffffa5', fontSize: 12}}>
                        {format(parseISO(createdAt), 'MMM Do yyyy')}
                    </Text>
                </View>
            </View>

            <View>
                <Text style={{ color: '#ffffff', marginBottom: 20, marginTop: 10, marginHorizontal: 20}}>
                    {content}
                </Text>
            </View>
        </View>
    );
}

const CommentsList = ({storyId}: any) => {

    const [commentUpdated, setCommentUpdated] = useState(false);

    //get the comments for that story using the storyID
    useEffect(() => {

        setStory(storyId);

        console.log(storyId)

        const fetchComments = async () => {
           
                try {
                    const response = await API.graphql(
                        graphqlOperation(
                            listComments, {
                                filter: {
                                    storyID: {
                                        eq: storyId
                                    },
                                }
                            } 
                        )
                    )
                    setCommentList(response.data.listComments.items);
                    console.log(response.data.listComments.items)
                } catch (e) {
                    console.log(e);}  
        }
        fetchComments();
    },[storyId, commentUpdated])

    const [commentList, setCommentList ] = useState();

    const [story, setStory] = useState(storyId);

    const { userID } = useContext(AppContext);
    const { setUserID } = useContext(AppContext);

    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {

            // const userInfo = await Auth.currentAuthenticatedUser(
            //     { bypassCache: true }
            //   );

            const userData = await API.graphql(
                graphqlOperation(
                getUser, 
                { id: userID,
                }
                )
            )
            setUser(userData.data.getUser);
        }
    fetchUser();
    }, [])
    
    const renderItem = ({ item } : any) => (

        <Item 
            //id={item.id}
            content={item.content}
            createdAt={item.createdAt}
            userName={item.user && item.user.name}
            userImageUri={item.user && item.user.imageUri}
        />
      );
    
    const [comment, setComment] = useState('');

    const handlePostComment = async () => {

        const poster = await Auth.currentAuthenticatedUser()

        if (comment.length > 0) {
            try {
                let result = await API.graphql(
                        graphqlOperation(createComment, { input: 
                            {
                                storyID: story,
                                content: comment,
                                userID: poster.attributes.sub
                            }
                        }))
                            console.log(result);
                    } catch (e) {
                            console.error(e);
            }
            setComment('');
            setCommentUpdated(!commentUpdated)
        }
    }

    return(
        <View>
            <View style={{backgroundColor: '#363636', padding: 20, marginVertical: 10, borderRadius: 15, }}>
                <View style={{ flexDirection: 'row', }}>
                    <Image 
                            source={ user?.imageUri ? { uri: user?.imageUri} : require('../assets/images/blankprofile.png')}
                            style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'gray'}}
                        />
                    <TextInput 
                        placeholder='Leave a comment'
                        placeholderTextColor='#ffFFFFa5'
                        style={{
                            color: '#ffffff',
                            fontSize: 14,
                            marginLeft: 20,
                            marginRight: 30,    
                        }}
                        maxLength={250}
                        multiline={true}
                        numberOfLines={2}
                        onChangeText={comment => setComment(comment)}
                        value={comment}
                    />
                </View>
                    {comment.length > 0 ? (
                        <View>
                            <View style={{marginTop: 20, alignSelf: 'center', width: '70%', height: 1, borderWidth: 0.5, borderColor: '#ffffffa5'}}>
                            </View>
                            <TouchableOpacity onPress={handlePostComment}>
                                <View style={{ marginTop: 20, alignItems: 'center'}}>
                                    <Text style={{backgroundColor: 'cyan', width: 80, padding: 5, borderRadius: 20, color: '#000', borderWidth: 0.5, borderColor: '#00ffff', textAlign: 'center'}}>
                                        Post
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : null}
            </View>

            <FlatList 
                data={commentList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                extraData={commentList}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                ListFooterComponent={ () => {
                    return (
                        <View style={{height:  300}}>
                        </View>
                    );
                }}
                // ListHeaderComponent={ () => {
                //     return (
                //     <View>
                //     </View>
                //     );
                // }}
            />
        </View>
    );
}

export default CommentsList;


