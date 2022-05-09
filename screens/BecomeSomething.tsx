import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const BecomeSomthing = ({navigation} : any) => {

    const route = useRoute();
    const {User} = route.params


    return (
        <View style={{backgroundColor: 'black'}}>
            <View style={{ marginTop: 60, marginLeft: 40}}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <View style={{padding: 30, margin: -30}}>
                        <FontAwesome5 
                            name='chevron-left'
                            color='#fff'
                            size={20}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={{alignItems: 'center', alignContent: 'center', justifyContent: 'center', height: Dimensions.get('window').height - 250}}>
                <TouchableOpacity onPress={() => navigation.navigate('Publishing', {user: User})}>
                    <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{margin: 10, color: 'gray', fontSize: 14}}>
                            Write a good story?
                        </Text>
                        <Text style={{color: 'cyan', fontSize: 20}}>
                            Become a Publisher
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('NarratorMain', {user: User})}>
                    <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{margin: 10, color: 'gray', fontSize: 14}}>
                            Have a pleasant voice?
                        </Text>
                        <Text style={{color: 'pink', fontSize: 20}}>
                            Become a Narrator
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ArtistMain', {user: User})}>
                    <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{margin: 10, color: 'gray', fontSize: 14}}>
                            Are you artistic?
                        </Text>
                        <Text style={{color: '#27d995', fontSize: 20}}>
                            Become an Illustrator 
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default BecomeSomthing;