import React, {useState} from 'react';
import { 
    TouchableWithoutFeedback,
    Text,
    View,
} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';

import PinnedStoryFlatList from '../components/PinnedStoryFlatList';
import FavedStoryFlatList from '../components/FavedStoryFlatList';


const PlaylistScreen = () => {

    //state for selecting the playlist
    const [SelectedId, setSelectedId] = useState(1);

    return (
        <View >
            <LinearGradient
                colors={['#3b4b80a5','#000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0.5 }}
            >
                <View>
                    <View style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'flex-start', 
                        width: '100%', 
                        alignItems: 'flex-end',
                        marginHorizontal: 10,
                        height: 80,
                        marginTop: 10,
                    }}>
                        <TouchableWithoutFeedback onPress={() => setSelectedId(1)}>
                            <Text style={{ 
                                color: SelectedId ===  1 ? '#fff' : '#ffffffa5',
                                marginHorizontal: 15, 
                                fontSize: SelectedId ===  1 ? 22 : 17,
                                fontWeight: SelectedId === 1 ? 'bold' : 'normal',
                                borderBottomColor: '#fff',
                            }}>
                                Pinned
                            </Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => setSelectedId(2)}>
                            <Text style={{ 
                                color: SelectedId ===  2 ? '#fff' : '#ffffffa5',
                                marginHorizontal: 15, 
                                fontSize: SelectedId ===  2 ? 22 : 17,
                                fontWeight: SelectedId === 2 ? 'bold' : 'normal'
                            }}>
                                Favorites
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

            <View style={{ alignItems: 'center', marginTop: 20, height: '86%'}}>
                {SelectedId === 1 ? (
                    <PinnedStoryFlatList/>
                ) : SelectedId === 2 ? (
                    <FavedStoryFlatList/>
                ) : null}
            </View>
           
            
        
        </LinearGradient>
        </View>
    );
}

export default PlaylistScreen;
