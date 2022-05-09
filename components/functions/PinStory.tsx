import React from 'react'
import {graphqlOperation, API, Auth} from 'aws-amplify';
import { createPinnedStory } from '../../src/graphql/mutations';


const PinStory = async ({storyID} : any) => {

    let userInfo = await Auth.currentAuthenticatedUser();

    let createPin = await API.graphql(graphqlOperation(
        createPinnedStory, {input: {
            userID: userInfo.attributes.sub, 
            storyID: storyID,
            type: "PinnedStory",
            createdAt: new Date(),
        }}
    ))
    console.log(createPin)
}

export default PinStory;