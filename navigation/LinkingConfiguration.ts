import * as Linking from 'expo-linking';


export default {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'one',
              ProfileScreen: 'Profile',
              EditProfileScreen: 'EditProfile'
            },
          },
          Stories: {
            screens: {
              StoriesScreen: 'two',
              BrowseAuthor: 'BrowseAuthor',
              BrowseNarrator: 'BrowseNarrator',
              GenreHome: 'GenreHome',
              SearchScreen: 'SearchScreen',
            },
          },
          Playlist: {
            screens: {
              PlaylistScreen: 'three',
            },
          },
          
        },
      },
      StoryScreen: {
        path: 'storyscreen/ : id?',
        //path: 'storyscreen/:id?',
        parse: {
          id: (id: String) => `${id}`,
        },
    },
  },
}};
