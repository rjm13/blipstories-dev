import {graphqlOperation, API, Auth} from 'aws-amplify';
import { listPinnedStories } from '../../src/graphql/queries';
import { deletePinnedStory } from '../../src/graphql/mutations';


const unPinStory = async ({storyID} : any) => {

    let userInfo = await Auth.currentAuthenticatedUser();

    let getPin = await API.graphql(graphqlOperation(
        listPinnedStories, {
            filter: {
                userID: {
                    eq: userInfo.attributes.sub
                },
                storyID: {
                    eq: storyID
                }
            }
        }
    ))
    console.log(getPin)
    
    let connectionID = getPin.data.listPinnedStories.items[0].id
    console.log(connectionID)

    let deleteConnection = await API.graphql(graphqlOperation(
        deletePinnedStory, {input: {"id": connectionID}}
    ))
    console.log(deleteConnection)
}

export default unPinStory;