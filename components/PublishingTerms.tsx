import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PublishingTerms = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <Text style={styles.inputheader}>
                    Publishing Terms
                </Text>
                <FontAwesome5 
                    name={isExpanded === true ? 'chevron-down' : 'chevron-right'}
                    size={20}
                    color='#fff'
                    style={{padding: 20, margin: -20}}
                    onPress={() => setIsExpanded(!isExpanded)}
                />
            </View>
           {isExpanded === true ? (
                <View style={{width: '90%',  borderRadius: 10, alignSelf: 'center', marginTop: 20, backgroundColor: '#363636a5'}}>
                    <Text style={{color: '#ffffffa5', margin: 20}}>
                        i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name. 
                        i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name. 
                        i. I agree that as a publisher, I am handing over all rights to Blip. I am their slave and master and will submit to Blip's every command. Blip maintains the right to enforce this servitude indefinitely. This is a binding contract that cannot be ammended. Upon agreeing to terms, the signee will liquidate and forfiet all assets in the signee's name.                        
                    </Text> 
                </View>
           ) : null}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        width: Dimensions.get('window').width
    },
    inputheader: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default PublishingTerms;