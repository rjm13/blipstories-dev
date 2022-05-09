/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      type
      id
      name
      email
      imageUri
      bio
      authored {
        items {
          id
          type
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          artistName
          artistID
          time
          summary
          description
          nsfw
          ratingAvg
          ratingAmt
          genreID
          hidden
          approved
          createdAt
          updatedAt
          numListens
        }
        nextToken
      }
      narrated {
        items {
          id
          type
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          artistName
          artistID
          time
          summary
          description
          nsfw
          ratingAvg
          ratingAmt
          genreID
          hidden
          approved
          createdAt
          updatedAt
          numListens
        }
        nextToken
      }
      sharedAssets {
        items {
          id
          type
          title
          audioUri
          time
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      sharedImageAssets {
        items {
          id
          type
          title
          imageUri
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      sharedWithAssets {
        items {
          id
          type
          title
          audioUri
          time
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      sharedWithImageAssets {
        items {
          id
          type
          title
          imageUri
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      art {
        items {
          id
          type
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          artistName
          artistID
          time
          summary
          description
          nsfw
          ratingAvg
          ratingAmt
          genreID
          hidden
          approved
          createdAt
          updatedAt
          numListens
        }
        nextToken
      }
      numAuthored
      pseudonym
      narratorPseudo
      artistPseudo
      birthdate
      isPublisher
      isNarrator
      isArtist
      topthree
      following {
        items {
          id
          type
          followerID
          authorID
          createdAt
          updatedAt
        }
        nextToken
      }
      followers {
        items {
          id
          type
          followerID
          authorID
          createdAt
          updatedAt
        }
        nextToken
      }
      Pinned {
        items {
          id
          type
          userID
          storyID
          createdAt
          updatedAt
        }
        nextToken
      }
      Rated {
        items {
          id
          type
          storyID
          userID
          rating
          nsfw
          genreID
          createdAt
          updatedAt
        }
        nextToken
      }
      Finished {
        items {
          id
          type
          userID
          storyID
          createdAt
          nsfw
          genreID
          updatedAt
        }
        nextToken
      }
      sampleUri
      narratorText
      accents
      voice
      artistText
      artStyles
      narratorActiveAt
      artistActiveAt
      plan
      messageSent {
        items {
          id
          type
          title
          subtitle
          content
          userID
          otherUserID
          createdAt
          isReadbyUser
          isReadByOtherUser
          request
          docID
          updatedAt
          status
        }
        nextToken
      }
      messageRec {
        items {
          id
          type
          title
          subtitle
          content
          userID
          otherUserID
          createdAt
          isReadbyUser
          isReadByOtherUser
          request
          docID
          updatedAt
          status
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      type
      id
      name
      email
      imageUri
      bio
      authored {
        items {
          id
          type
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          artistName
          artistID
          time
          summary
          description
          nsfw
          ratingAvg
          ratingAmt
          genreID
          hidden
          approved
          createdAt
          updatedAt
          numListens
        }
        nextToken
      }
      narrated {
        items {
          id
          type
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          artistName
          artistID
          time
          summary
          description
          nsfw
          ratingAvg
          ratingAmt
          genreID
          hidden
          approved
          createdAt
          updatedAt
          numListens
        }
        nextToken
      }
      sharedAssets {
        items {
          id
          type
          title
          audioUri
          time
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      sharedImageAssets {
        items {
          id
          type
          title
          imageUri
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      sharedWithAssets {
        items {
          id
          type
          title
          audioUri
          time
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      sharedWithImageAssets {
        items {
          id
          type
          title
          imageUri
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      art {
        items {
          id
          type
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          artistName
          artistID
          time
          summary
          description
          nsfw
          ratingAvg
          ratingAmt
          genreID
          hidden
          approved
          createdAt
          updatedAt
          numListens
        }
        nextToken
      }
      numAuthored
      pseudonym
      narratorPseudo
      artistPseudo
      birthdate
      isPublisher
      isNarrator
      isArtist
      topthree
      following {
        items {
          id
          type
          followerID
          authorID
          createdAt
          updatedAt
        }
        nextToken
      }
      followers {
        items {
          id
          type
          followerID
          authorID
          createdAt
          updatedAt
        }
        nextToken
      }
      Pinned {
        items {
          id
          type
          userID
          storyID
          createdAt
          updatedAt
        }
        nextToken
      }
      Rated {
        items {
          id
          type
          storyID
          userID
          rating
          nsfw
          genreID
          createdAt
          updatedAt
        }
        nextToken
      }
      Finished {
        items {
          id
          type
          userID
          storyID
          createdAt
          nsfw
          genreID
          updatedAt
        }
        nextToken
      }
      sampleUri
      narratorText
      accents
      voice
      artistText
      artStyles
      narratorActiveAt
      artistActiveAt
      plan
      messageSent {
        items {
          id
          type
          title
          subtitle
          content
          userID
          otherUserID
          createdAt
          isReadbyUser
          isReadByOtherUser
          request
          docID
          updatedAt
          status
        }
        nextToken
      }
      messageRec {
        items {
          id
          type
          title
          subtitle
          content
          userID
          otherUserID
          createdAt
          isReadbyUser
          isReadByOtherUser
          request
          docID
          updatedAt
          status
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      type
      id
      name
      email
      imageUri
      bio
      authored {
        items {
          id
          type
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          artistName
          artistID
          time
          summary
          description
          nsfw
          ratingAvg
          ratingAmt
          genreID
          hidden
          approved
          createdAt
          updatedAt
          numListens
        }
        nextToken
      }
      narrated {
        items {
          id
          type
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          artistName
          artistID
          time
          summary
          description
          nsfw
          ratingAvg
          ratingAmt
          genreID
          hidden
          approved
          createdAt
          updatedAt
          numListens
        }
        nextToken
      }
      sharedAssets {
        items {
          id
          type
          title
          audioUri
          time
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      sharedImageAssets {
        items {
          id
          type
          title
          imageUri
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      sharedWithAssets {
        items {
          id
          type
          title
          audioUri
          time
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      sharedWithImageAssets {
        items {
          id
          type
          title
          imageUri
          isSample
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        nextToken
      }
      art {
        items {
          id
          type
          title
          imageUri
          audioUri
          userID
          author
          authorID
          narrator
          narratorID
          artistName
          artistID
          time
          summary
          description
          nsfw
          ratingAvg
          ratingAmt
          genreID
          hidden
          approved
          createdAt
          updatedAt
          numListens
        }
        nextToken
      }
      numAuthored
      pseudonym
      narratorPseudo
      artistPseudo
      birthdate
      isPublisher
      isNarrator
      isArtist
      topthree
      following {
        items {
          id
          type
          followerID
          authorID
          createdAt
          updatedAt
        }
        nextToken
      }
      followers {
        items {
          id
          type
          followerID
          authorID
          createdAt
          updatedAt
        }
        nextToken
      }
      Pinned {
        items {
          id
          type
          userID
          storyID
          createdAt
          updatedAt
        }
        nextToken
      }
      Rated {
        items {
          id
          type
          storyID
          userID
          rating
          nsfw
          genreID
          createdAt
          updatedAt
        }
        nextToken
      }
      Finished {
        items {
          id
          type
          userID
          storyID
          createdAt
          nsfw
          genreID
          updatedAt
        }
        nextToken
      }
      sampleUri
      narratorText
      accents
      voice
      artistText
      artStyles
      narratorActiveAt
      artistActiveAt
      plan
      messageSent {
        items {
          id
          type
          title
          subtitle
          content
          userID
          otherUserID
          createdAt
          isReadbyUser
          isReadByOtherUser
          request
          docID
          updatedAt
          status
        }
        nextToken
      }
      messageRec {
        items {
          id
          type
          title
          subtitle
          content
          userID
          otherUserID
          createdAt
          isReadbyUser
          isReadByOtherUser
          request
          docID
          updatedAt
          status
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFollowingConn = /* GraphQL */ `
  mutation CreateFollowingConn(
    $input: CreateFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    createFollowingConn(input: $input, condition: $condition) {
      id
      type
      followerID
      authorID
      author {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      follower {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFollowingConn = /* GraphQL */ `
  mutation UpdateFollowingConn(
    $input: UpdateFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    updateFollowingConn(input: $input, condition: $condition) {
      id
      type
      followerID
      authorID
      author {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      follower {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFollowingConn = /* GraphQL */ `
  mutation DeleteFollowingConn(
    $input: DeleteFollowingConnInput!
    $condition: ModelFollowingConnConditionInput
  ) {
    deleteFollowingConn(input: $input, condition: $condition) {
      id
      type
      followerID
      authorID
      author {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      follower {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPinnedStory = /* GraphQL */ `
  mutation CreatePinnedStory(
    $input: CreatePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    createPinnedStory(input: $input, condition: $condition) {
      id
      type
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePinnedStory = /* GraphQL */ `
  mutation UpdatePinnedStory(
    $input: UpdatePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    updatePinnedStory(input: $input, condition: $condition) {
      id
      type
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePinnedStory = /* GraphQL */ `
  mutation DeletePinnedStory(
    $input: DeletePinnedStoryInput!
    $condition: ModelPinnedStoryConditionInput
  ) {
    deletePinnedStory(input: $input, condition: $condition) {
      id
      type
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFinishedStory = /* GraphQL */ `
  mutation CreateFinishedStory(
    $input: CreateFinishedStoryInput!
    $condition: ModelFinishedStoryConditionInput
  ) {
    createFinishedStory(input: $input, condition: $condition) {
      id
      type
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      createdAt
      nsfw
      genreID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const updateFinishedStory = /* GraphQL */ `
  mutation UpdateFinishedStory(
    $input: UpdateFinishedStoryInput!
    $condition: ModelFinishedStoryConditionInput
  ) {
    updateFinishedStory(input: $input, condition: $condition) {
      id
      type
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      createdAt
      nsfw
      genreID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const deleteFinishedStory = /* GraphQL */ `
  mutation DeleteFinishedStory(
    $input: DeleteFinishedStoryInput!
    $condition: ModelFinishedStoryConditionInput
  ) {
    deleteFinishedStory(input: $input, condition: $condition) {
      id
      type
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      createdAt
      nsfw
      genreID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const createStory = /* GraphQL */ `
  mutation CreateStory(
    $input: CreateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    createStory(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      audioUri
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      author
      authorID
      narrator
      narratorUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      narratorID
      artistName
      artist {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      artistID
      time
      summary
      description
      nsfw
      comments {
        items {
          id
          type
          storyID
          content
          userID
          createdAt
          approved
          updatedAt
        }
        nextToken
      }
      tags {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      ratingAvg
      ratingAmt
      rated {
        items {
          id
          type
          storyID
          userID
          rating
          nsfw
          genreID
          createdAt
          updatedAt
        }
        nextToken
      }
      genreID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      hidden
      approved
      createdAt
      updatedAt
      numListens
      flag {
        items {
          id
          type
          storyID
          flagTypes
          userID
          Status
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateStory = /* GraphQL */ `
  mutation UpdateStory(
    $input: UpdateStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    updateStory(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      audioUri
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      author
      authorID
      narrator
      narratorUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      narratorID
      artistName
      artist {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      artistID
      time
      summary
      description
      nsfw
      comments {
        items {
          id
          type
          storyID
          content
          userID
          createdAt
          approved
          updatedAt
        }
        nextToken
      }
      tags {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      ratingAvg
      ratingAmt
      rated {
        items {
          id
          type
          storyID
          userID
          rating
          nsfw
          genreID
          createdAt
          updatedAt
        }
        nextToken
      }
      genreID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      hidden
      approved
      createdAt
      updatedAt
      numListens
      flag {
        items {
          id
          type
          storyID
          flagTypes
          userID
          Status
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteStory = /* GraphQL */ `
  mutation DeleteStory(
    $input: DeleteStoryInput!
    $condition: ModelStoryConditionInput
  ) {
    deleteStory(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      audioUri
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      author
      authorID
      narrator
      narratorUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      narratorID
      artistName
      artist {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      artistID
      time
      summary
      description
      nsfw
      comments {
        items {
          id
          type
          storyID
          content
          userID
          createdAt
          approved
          updatedAt
        }
        nextToken
      }
      tags {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      ratingAvg
      ratingAmt
      rated {
        items {
          id
          type
          storyID
          userID
          rating
          nsfw
          genreID
          createdAt
          updatedAt
        }
        nextToken
      }
      genreID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      hidden
      approved
      createdAt
      updatedAt
      numListens
      flag {
        items {
          id
          type
          storyID
          flagTypes
          userID
          Status
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createGenre = /* GraphQL */ `
  mutation CreateGenre(
    $input: CreateGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    createGenre(input: $input, condition: $condition) {
      id
      genre
      icon
      PrimaryColor
      SecondaryColor
      imageUri
      tags {
        items {
          id
          genreID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateGenre = /* GraphQL */ `
  mutation UpdateGenre(
    $input: UpdateGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    updateGenre(input: $input, condition: $condition) {
      id
      genre
      icon
      PrimaryColor
      SecondaryColor
      imageUri
      tags {
        items {
          id
          genreID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteGenre = /* GraphQL */ `
  mutation DeleteGenre(
    $input: DeleteGenreInput!
    $condition: ModelGenreConditionInput
  ) {
    deleteGenre(input: $input, condition: $condition) {
      id
      genre
      icon
      PrimaryColor
      SecondaryColor
      imageUri
      tags {
        items {
          id
          genreID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createImageAsset = /* GraphQL */ `
  mutation CreateImageAsset(
    $input: CreateImageAssetInput!
    $condition: ModelImageAssetConditionInput
  ) {
    createImageAsset(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      sharedUserID
      createdAt
      updatedAt
    }
  }
`;
export const updateImageAsset = /* GraphQL */ `
  mutation UpdateImageAsset(
    $input: UpdateImageAssetInput!
    $condition: ModelImageAssetConditionInput
  ) {
    updateImageAsset(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      sharedUserID
      createdAt
      updatedAt
    }
  }
`;
export const deleteImageAsset = /* GraphQL */ `
  mutation DeleteImageAsset(
    $input: DeleteImageAssetInput!
    $condition: ModelImageAssetConditionInput
  ) {
    deleteImageAsset(input: $input, condition: $condition) {
      id
      type
      title
      imageUri
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      sharedUserID
      createdAt
      updatedAt
    }
  }
`;
export const createDocumentAsset = /* GraphQL */ `
  mutation CreateDocumentAsset(
    $input: CreateDocumentAssetInput!
    $condition: ModelDocumentAssetConditionInput
  ) {
    createDocumentAsset(input: $input, condition: $condition) {
      id
      type
      title
      docUri
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateDocumentAsset = /* GraphQL */ `
  mutation UpdateDocumentAsset(
    $input: UpdateDocumentAssetInput!
    $condition: ModelDocumentAssetConditionInput
  ) {
    updateDocumentAsset(input: $input, condition: $condition) {
      id
      type
      title
      docUri
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteDocumentAsset = /* GraphQL */ `
  mutation DeleteDocumentAsset(
    $input: DeleteDocumentAssetInput!
    $condition: ModelDocumentAssetConditionInput
  ) {
    deleteDocumentAsset(input: $input, condition: $condition) {
      id
      type
      title
      docUri
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createAudioAsset = /* GraphQL */ `
  mutation CreateAudioAsset(
    $input: CreateAudioAssetInput!
    $condition: ModelAudioAssetConditionInput
  ) {
    createAudioAsset(input: $input, condition: $condition) {
      id
      type
      title
      audioUri
      time
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAudioAsset = /* GraphQL */ `
  mutation UpdateAudioAsset(
    $input: UpdateAudioAssetInput!
    $condition: ModelAudioAssetConditionInput
  ) {
    updateAudioAsset(input: $input, condition: $condition) {
      id
      type
      title
      audioUri
      time
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAudioAsset = /* GraphQL */ `
  mutation DeleteAudioAsset(
    $input: DeleteAudioAssetInput!
    $condition: ModelAudioAssetConditionInput
  ) {
    deleteAudioAsset(input: $input, condition: $condition) {
      id
      type
      title
      audioUri
      time
      isSample
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      sharedUserID
      sharedUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFlag = /* GraphQL */ `
  mutation CreateFlag(
    $input: CreateFlagInput!
    $condition: ModelFlagConditionInput
  ) {
    createFlag(input: $input, condition: $condition) {
      id
      type
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      flagTypes
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      Status
      createdAt
      updatedAt
    }
  }
`;
export const updateFlag = /* GraphQL */ `
  mutation UpdateFlag(
    $input: UpdateFlagInput!
    $condition: ModelFlagConditionInput
  ) {
    updateFlag(input: $input, condition: $condition) {
      id
      type
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      flagTypes
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      Status
      createdAt
      updatedAt
    }
  }
`;
export const deleteFlag = /* GraphQL */ `
  mutation DeleteFlag(
    $input: DeleteFlagInput!
    $condition: ModelFlagConditionInput
  ) {
    deleteFlag(input: $input, condition: $condition) {
      id
      type
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      flagTypes
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      Status
      createdAt
      updatedAt
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      type
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      content
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      createdAt
      approved
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      type
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      content
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      createdAt
      approved
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      type
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      content
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      createdAt
      approved
      updatedAt
    }
  }
`;
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      id
      type
      tagName
      nsfw
      genre {
        items {
          id
          genreID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      stories {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      count
      updatedAt
      createdAt
    }
  }
`;
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
      id
      type
      tagName
      nsfw
      genre {
        items {
          id
          genreID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      stories {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      count
      updatedAt
      createdAt
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      id
      type
      tagName
      nsfw
      genre {
        items {
          id
          genreID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      stories {
        items {
          id
          storyID
          tagID
          createdAt
          updatedAt
        }
        nextToken
      }
      count
      updatedAt
      createdAt
    }
  }
`;
export const createRating = /* GraphQL */ `
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
      id
      type
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      rating
      nsfw
      genreID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateRating = /* GraphQL */ `
  mutation UpdateRating(
    $input: UpdateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    updateRating(input: $input, condition: $condition) {
      id
      type
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      rating
      nsfw
      genreID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteRating = /* GraphQL */ `
  mutation DeleteRating(
    $input: DeleteRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    deleteRating(input: $input, condition: $condition) {
      id
      type
      storyID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      userID
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      rating
      nsfw
      genreID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      type
      title
      subtitle
      content
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      otherUserID
      otherUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      isReadbyUser
      isReadByOtherUser
      replies {
        items {
          id
          type
          content
          createdAt
          isRead
          messageID
          userID
          updatedAt
        }
        nextToken
      }
      request
      docID
      doc {
        id
        type
        title
        docUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        sharedUserID
        sharedUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
      status
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      type
      title
      subtitle
      content
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      otherUserID
      otherUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      isReadbyUser
      isReadByOtherUser
      replies {
        items {
          id
          type
          content
          createdAt
          isRead
          messageID
          userID
          updatedAt
        }
        nextToken
      }
      request
      docID
      doc {
        id
        type
        title
        docUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        sharedUserID
        sharedUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
      status
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      type
      title
      subtitle
      content
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      otherUserID
      otherUser {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      isReadbyUser
      isReadByOtherUser
      replies {
        items {
          id
          type
          content
          createdAt
          isRead
          messageID
          userID
          updatedAt
        }
        nextToken
      }
      request
      docID
      doc {
        id
        type
        title
        docUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        sharedUserID
        sharedUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
      status
    }
  }
`;
export const createReply = /* GraphQL */ `
  mutation CreateReply(
    $input: CreateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    createReply(input: $input, condition: $condition) {
      id
      type
      content
      createdAt
      isRead
      messageID
      message {
        id
        type
        title
        subtitle
        content
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        otherUserID
        otherUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        createdAt
        isReadbyUser
        isReadByOtherUser
        replies {
          nextToken
        }
        request
        docID
        doc {
          id
          type
          title
          docUri
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        updatedAt
        status
      }
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      updatedAt
    }
  }
`;
export const updateReply = /* GraphQL */ `
  mutation UpdateReply(
    $input: UpdateReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    updateReply(input: $input, condition: $condition) {
      id
      type
      content
      createdAt
      isRead
      messageID
      message {
        id
        type
        title
        subtitle
        content
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        otherUserID
        otherUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        createdAt
        isReadbyUser
        isReadByOtherUser
        replies {
          nextToken
        }
        request
        docID
        doc {
          id
          type
          title
          docUri
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        updatedAt
        status
      }
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      updatedAt
    }
  }
`;
export const deleteReply = /* GraphQL */ `
  mutation DeleteReply(
    $input: DeleteReplyInput!
    $condition: ModelReplyConditionInput
  ) {
    deleteReply(input: $input, condition: $condition) {
      id
      type
      content
      createdAt
      isRead
      messageID
      message {
        id
        type
        title
        subtitle
        content
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        otherUserID
        otherUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        createdAt
        isReadbyUser
        isReadByOtherUser
        replies {
          nextToken
        }
        request
        docID
        doc {
          id
          type
          title
          docUri
          userID
          sharedUserID
          createdAt
          updatedAt
        }
        updatedAt
        status
      }
      user {
        type
        id
        name
        email
        imageUri
        bio
        authored {
          nextToken
        }
        narrated {
          nextToken
        }
        sharedAssets {
          nextToken
        }
        sharedImageAssets {
          nextToken
        }
        sharedWithAssets {
          nextToken
        }
        sharedWithImageAssets {
          nextToken
        }
        art {
          nextToken
        }
        numAuthored
        pseudonym
        narratorPseudo
        artistPseudo
        birthdate
        isPublisher
        isNarrator
        isArtist
        topthree
        following {
          nextToken
        }
        followers {
          nextToken
        }
        Pinned {
          nextToken
        }
        Rated {
          nextToken
        }
        Finished {
          nextToken
        }
        sampleUri
        narratorText
        accents
        voice
        artistText
        artStyles
        narratorActiveAt
        artistActiveAt
        plan
        messageSent {
          nextToken
        }
        messageRec {
          nextToken
        }
        createdAt
        updatedAt
      }
      userID
      updatedAt
    }
  }
`;
export const createStoryTag = /* GraphQL */ `
  mutation CreateStoryTag(
    $input: CreateStoryTagInput!
    $condition: ModelStoryTagConditionInput
  ) {
    createStoryTag(input: $input, condition: $condition) {
      id
      storyID
      tagID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      tag {
        id
        type
        tagName
        nsfw
        genre {
          nextToken
        }
        stories {
          nextToken
        }
        count
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateStoryTag = /* GraphQL */ `
  mutation UpdateStoryTag(
    $input: UpdateStoryTagInput!
    $condition: ModelStoryTagConditionInput
  ) {
    updateStoryTag(input: $input, condition: $condition) {
      id
      storyID
      tagID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      tag {
        id
        type
        tagName
        nsfw
        genre {
          nextToken
        }
        stories {
          nextToken
        }
        count
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteStoryTag = /* GraphQL */ `
  mutation DeleteStoryTag(
    $input: DeleteStoryTagInput!
    $condition: ModelStoryTagConditionInput
  ) {
    deleteStoryTag(input: $input, condition: $condition) {
      id
      storyID
      tagID
      story {
        id
        type
        title
        imageUri
        audioUri
        user {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        userID
        author
        authorID
        narrator
        narratorUser {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        narratorID
        artistName
        artist {
          type
          id
          name
          email
          imageUri
          bio
          numAuthored
          pseudonym
          narratorPseudo
          artistPseudo
          birthdate
          isPublisher
          isNarrator
          isArtist
          topthree
          sampleUri
          narratorText
          accents
          voice
          artistText
          artStyles
          narratorActiveAt
          artistActiveAt
          plan
          createdAt
          updatedAt
        }
        artistID
        time
        summary
        description
        nsfw
        comments {
          nextToken
        }
        tags {
          nextToken
        }
        ratingAvg
        ratingAmt
        rated {
          nextToken
        }
        genreID
        genre {
          id
          genre
          icon
          PrimaryColor
          SecondaryColor
          imageUri
          createdAt
          updatedAt
        }
        hidden
        approved
        createdAt
        updatedAt
        numListens
        flag {
          nextToken
        }
      }
      tag {
        id
        type
        tagName
        nsfw
        genre {
          nextToken
        }
        stories {
          nextToken
        }
        count
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createGenreTag = /* GraphQL */ `
  mutation CreateGenreTag(
    $input: CreateGenreTagInput!
    $condition: ModelGenreTagConditionInput
  ) {
    createGenreTag(input: $input, condition: $condition) {
      id
      genreID
      tagID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      tag {
        id
        type
        tagName
        nsfw
        genre {
          nextToken
        }
        stories {
          nextToken
        }
        count
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateGenreTag = /* GraphQL */ `
  mutation UpdateGenreTag(
    $input: UpdateGenreTagInput!
    $condition: ModelGenreTagConditionInput
  ) {
    updateGenreTag(input: $input, condition: $condition) {
      id
      genreID
      tagID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      tag {
        id
        type
        tagName
        nsfw
        genre {
          nextToken
        }
        stories {
          nextToken
        }
        count
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteGenreTag = /* GraphQL */ `
  mutation DeleteGenreTag(
    $input: DeleteGenreTagInput!
    $condition: ModelGenreTagConditionInput
  ) {
    deleteGenreTag(input: $input, condition: $condition) {
      id
      genreID
      tagID
      genre {
        id
        genre
        icon
        PrimaryColor
        SecondaryColor
        imageUri
        tags {
          nextToken
        }
        createdAt
        updatedAt
      }
      tag {
        id
        type
        tagName
        nsfw
        genre {
          nextToken
        }
        stories {
          nextToken
        }
        count
        updatedAt
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
