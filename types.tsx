export type RootStackParamList = {
  Root: undefined;
  StoryScreen: undefined;
  AudioPlayerTest: undefined;
  UserScreen: undefined;
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  ForgotPasswordCon: undefined;
  ConfirmEmail: undefined;
  ModalNavigator: undefined;
  Drawer: undefined;
  Redirect: undefined;
  SimpleAudioPlayer: undefined;
  TagSearchScreen: undefined;
  SplashCarousel: undefined;
  CreateMessage: undefined;
  Welcome: undefined;

};

export type BottomTabParamList = {
  Home: undefined;
  Stories: undefined;
  Playlist: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  NotificationSetting: undefined;
  Narrations: undefined;
  History: undefined;
  Following: undefined;
  AboutScreen: undefined;
  AccountScreen: undefined;
  Publishing: undefined;
  PublisherSetup: undefined;
  Publisher: undefined;
  Recordings: undefined;
  MyStories: undefined;
  Terms: undefined;
  EditAudioStory: undefined;
  UploadAudio: undefined;
  RecordAudio: undefined;
  GenreHome: undefined;
  BrowseGenre: undefined;
  BecomeSomething: undefined;
  NarratorMain: undefined;
  ArtistMain: undefined;
  ArtistSetup: undefined;
  NarratorSetup: undefined;
  MyArt: undefined;
  SharedAssets: undefined;
  FindNarrator: undefined;
  FindArtist: undefined;
  Inbox: undefined;
  ViewMessage: undefined;
  CoverArt: undefined;
  AllSharedAssets: undefined;
  ModSection: undefined;
  PendingStories: undefined;
  FlaggedStories: undefined;
  NewComments: undefined;
  ViewGenreTags: undefined;
};

export type TabTwoParamList = {
  StoriesScreen: undefined;
  BrowseAuthor: undefined;
  BrowseNarrator: undefined;
  GenreHome: undefined;
  SearchScreen: undefined;
  TagSearchStack: undefined;
  UserScreenStack: undefined;
  BrowseGenre: undefined;
};

export type TabThreeParamList = {
  PlaylistScreen: undefined;
  StoriesScreen: undefined;
};


export type ItemParamList = {
  //title: string;

};

export type User = {
  id: String;
  name: String;
  imageUri: String;
  bio: String;
  email: String;
}

declare const awsmobile: {};
export default awsmobile;
