import React, {useEffect, useState} from 'react';
import {
    View, 
    Text,
    StyleSheet,
    TouchableOpacity, 
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';

import {Auth, API, graphqlOperation} from 'aws-amplify';
import {listGenres} from '../../src/graphql/queries';
import {updateUser} from '../../src/graphql/mutations';

const SplashCarousel = ({navigation} : any) => {

    const [genres, setGenres] = useState([]);
    
    const [top3, setTop3] = useState([])

    useEffect(() => {

        const fetchGenres = async () => {

            const genreInfo = await API.graphql(graphqlOperation(
                listGenres, {filter: {
                    id: {
                        ne: '1108a619-1c0e-4064-8fce-41f1f6262070'
                    }
                }}
            ))
            setGenres(genreInfo.data.listGenres.items);
        }
        fetchGenres();

    }, []);

    const UpdateThree = async () => {

        if (top3.length === 3) {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();

            const update = await API.graphql(graphqlOperation(
                updateUser, {input: {id: userInfo.attributes.sub, topthree: top3}}
            ))
            console.log(update.data.updateUser.topthree)
            navigation.navigate('Redirect', {trigger: Math.random()})
            
            } catch (e) {
                return (e)
            } 
        } else {
            alert ('Please select 3 genres')
        }
    }


    return (
        <ScrollView>

            <View style={{margin: 40, alignSelf: 'center'}}>
                <Text style={styles.header}>
                    Let's Get Started!
                </Text>

                <Text style={{fontSize: 16, marginTop: 20, color: '#fff'}}>
                    Select 3 of your favorite genres
                </Text>

            </View>

            <ScrollView scrollEnabled={false} contentContainerStyle={{justifyContent: 'center', flexDirection: 'row',flexWrap: 'wrap'}}>
                {genres.map(({genre, id}, index) => {

                const AddToTop3 = ({genreid} : any) => {

                    if (top3.includes(genreid)) {
                        setTop3(top3.filter(item => item !== genreid))
                    
                    } 
                    if (top3.length < 3) {
                        setTop3([...top3,genreid])
                    }
                }

                return (
                    <TouchableOpacity style={{width: '48%'}} onPress={() => AddToTop3({genreid: id})}>
                        <View style={{margin: 10, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 0.5, borderRadius: 30,
                            borderColor: top3.includes(id) === true ? 'cyan' : '#fff', 
                            backgroundColor: top3.includes(id) === true ? 'cyan' : 'transparent',
                        }}>
                            <Text style={{textAlign: 'center', textTransform: 'capitalize', color: top3.includes(id) === true ? '#000' : '#fff'}}>
                                {genre}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )})}
            </ScrollView>

            <TouchableWithoutFeedback onPress={UpdateThree}>
                <View style={{alignSelf: 'center', width: 80, paddingVertical: 6, paddingHorizontal: 20, borderRadius: 30, borderWidth: 0.5, margin: 40, 
                    borderColor: 'cyan',
                    backgroundColor: 'cyan',
                }}>
                    <Text style={{textAlign: 'center',
                        fontSize: 16, color: '#000',
                    }}>
                        Next
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
       
    },
    header: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
});

export default SplashCarousel;