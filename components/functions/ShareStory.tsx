import React, {useState, useEffect, useRef, useContext} from 'react';
import * as Linking from 'expo-linking';
import {
    Share
} from 'react-native';

const handleShareWithLinking = async ({id, title}: any) => {

    let deepUri = Linking.createURL('storyscreen/', { queryParams: {id: id } } )
    // {
    //         queryParams: { id: Story?.id },
    // });    

    try {
      const result = await Share.share({
        message: title + ', : ' + deepUri,
        url: deepUri,
        title: 'Check out this short story on Blip!'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //alert(error.message);
    }
}

export default handleShareWithLinking;