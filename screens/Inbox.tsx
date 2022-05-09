import React, { useEffect, useState } from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableWithoutFeedback,  
    FlatList,
    Dimensions,
    RefreshControl
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { format, parseISO } from "date-fns";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from '../src/graphql/queries';


const Inbox = ({navigation} : any) => {
    
    const [messages, setMessages] = useState([]);

    const [didUpdate, setDidUpdate] = useState(false);

    const [currentUserID, setCurrentUserID] = useState()

    useEffect(() => {
        let getMessages = async () => {


            const userInfo = await Auth.currentAuthenticatedUser();

            setCurrentUserID(userInfo.attributes.sub)

            const response = await API.graphql(graphqlOperation(
                getUser, {id: userInfo.attributes.sub}
            ))

            let arr = response.data.getUser.messageRec.items.concat(response.data.getUser.messageSent.items)

            let sortmess = arr.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1)

            setMessages(sortmess)
        }
        getMessages();
    }, [didUpdate])

    const Item = ({index, id, title, content, narrPseudo, publisherPseudo, request, artistPseudo, subtitle, userID, otherUserID, createdAt, isReadbyUser, isReadByOtherUser} : any) => {

        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewMessage', {messageid: id})}>
                <View style={{backgroundColor: index%2 === 0 ? '#303030a5' : 'transparent', alignItems: 'center', paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {isReadbyUser === true && currentUserID === userID ? null : isReadbyUser === false && currentUserID === userID ? (
                        <View style={{}}>
                            <FontAwesome5 
                                name='hand-point-right'
                                size={20}
                                color='#00ffffa5'
                                style={{marginLeft: 20, marginRight: 0, alignSelf: 'center'}}
                            />
                        </View>
                    ) : isReadByOtherUser === true && currentUserID !== userID ? null : isReadByOtherUser === false && currentUserID !== userID ? (
                            <View style={{}}>
                                <FontAwesome5 
                                    name='hand-point-right'
                                    size={20}
                                    color='#00ffffa5'
                                    style={{marginLeft: 20, marginRight: 0, alignSelf: 'center'}}
                                />
                        </View>
                    ) : null}
                    
                    <View style={{marginRight: 20, marginVertical: 10, paddingHorizontal: 20, width: isReadbyUser === true && currentUserID === userID ? Dimensions.get('window').width : isReadbyUser === false && currentUserID === userID ? Dimensions.get('window').width - 40 : isReadByOtherUser === true && currentUserID !== userID ? Dimensions.get('window').width : isReadByOtherUser === false && currentUserID !== userID ? Dimensions.get('window').width - 40 : Dimensions.get('window').width}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: '#fff', fontWeight: 'bold', textTransform: 'capitalize'}}>
                                {subtitle === 'artist' && currentUserID === userID ? artistPseudo : subtitle === 'narrator' && currentUserID === userID ? narrPseudo : publisherPseudo}
                            </Text>
                            <Text style={{color: '#fff', fontSize: 12}}>
                                {format(parseISO(createdAt), "MMM do")}
                            </Text>
                        </View>
                        <Text style={{color: '#fff', fontSize: 12, marginTop: 4 }}>
                            {title}
                        </Text>
                        <Text numberOfLines={2} style={{color: 'gray', fontSize: 12 }}>
                            {content}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        );
    }

    const renderItem = ({item, index}: any) => {

        let narratorPseudo = 'test'
        let artistPseudo = ''
        let pseudonym = ''

        if (item.user) {
            pseudonym = item.user.pseudonym
        }
        if (item.otherUser) {
            narratorPseudo = item.otherUser.narratorPseudo
            artistPseudo = item.otherUser.artistPseudo
        }

        return (
            <Item 
                id={item.id}
                title={item.title}
                content={item.content}
                subtitle={item.subtitle}
                userID={item.userID}
                otherUserID={item.otherUserID}
                createdAt={item.createdAt}
                isReadbyUser={item.isReadbyUser}
                isReadByOtherUser={item.isReadByOtherUser}
                index={index}
                narrPseudo={narratorPseudo}
                artistPseudo={artistPseudo}
                request={item.request}
                publisherPseudo={pseudonym}
            />
        )
    }

    const [isFetching, setIsFetching] = useState(false);

    const onRefresh = () => {
        setIsFetching(true);
        setDidUpdate(!didUpdate)
        setTimeout(() => {
          setIsFetching(false);
        }, 2000);
      }

    return (
        <View >
            <LinearGradient
                colors={['#363636a5', '#363636a5', 'black']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{height: Dimensions.get('window').height}}
            >
                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 20, alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                        <View style={{padding: 30, margin: -30}}>
                            <FontAwesome5 
                                name='chevron-left'
                                color='#fff'
                                size={20}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                        <Text style={styles.header}>
                            Inbox
                        </Text>
                </View>

                <View style={{height: '87%'}}>
                    <FlatList 
                        data={messages}
                        extraData={messages}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        maxToRenderPerBatch={20}
                        refreshControl={
                            <RefreshControl
                            refreshing={isFetching}
                            onRefresh={onRefresh}
                            />
                        }
                        ListFooterComponent={() => {
                            return (
                                <View style={{height: 120}}/>
                            )
                        }}
                    />
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        height: Dimensions.get('window').width
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 40,
        marginVertical: 20,
    },
    tile: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: 40, 
        marginVertical: 20
    }
});

export default Inbox;