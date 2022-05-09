import React, {useState, useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Dimensions, 
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { listStories, listComments, listFlags } from '../src/graphql/queries';
import { updateUser } from '../src/graphql/mutations';

const ModSection = ({navigation} : any) => {

    const [stories, setStories] = useState(0)
    const [flags, setFlags] = useState(0)
    const [comments, setComments] = useState(0)

    useEffect(() => {
        const getUser = async () => {
            let response = await Auth.currentAuthenticatedUser();
            if (response.attributes.email === 'martianspidermedia@gmail.com') {
                return
            } else {
                navigation.goBack();
            }
        }
        getUser();
    }, [])

    useEffect(() => {
        const fetchStories = async () => {
            let response = await API.graphql(graphqlOperation(
                listStories, {
                    filter: {
                        approved: {
                            eq: 'pending'
                        }
                    }
                }
            ))
            setStories(response.data.listStories.items.length)
        }
        fetchStories();
        const fetchFlags = async () => {
            let response = await API.graphql(graphqlOperation(
                listFlags, {
                    filter: {
                        Status: {
                            eq: 'active'
                        }
                    }
                }
            ))
            setFlags(response.data.listFlags.items.length)
        }
        fetchFlags();
        const fetchComments = async () => {
            let response = await API.graphql(graphqlOperation(
                listComments, {
                    filter: {
                        approved: {
                            eq: false
                        }
                    }
                }
            ))
            setComments(response.data.listComments.items.length)
        }
        fetchComments();
    }, [])


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
                    Blip Moderator
                </Text>
            </View>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('PendingStories')}>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        Pending Stories
                    </Text>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {stories}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            

            <TouchableWithoutFeedback onPress={() => navigation.navigate('FlaggedStories')}>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        Flagged Stories
                    </Text>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {flags}
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('NewComments')}>
                <View style={{paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>
                        New Comments
                    </Text>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        {comments}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default ModSection;