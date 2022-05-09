/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          genre {
            id
            genre
          }
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
          genre {
            id
            genre
          }
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
          user {
            id
            pseudonym
            artistPseudo
            narratorPseudo
          }
          sharedUserID
          sharedUser {
            id
            pseudonym
            artistPseudo
            narratorPseudo
          }
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
          user {
            id
            pseudonym
            artistPseudo
            narratorPseudo
          }
          sharedUserID
          sharedUser {
            id
            pseudonym
            artistPseudo
            narratorPseudo
          }
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
          user {
            id
            pseudonym
            artistPseudo
            narratorPseudo
          }
          sharedUserID
          sharedUser {
            id
            pseudonym
            artistPseudo
            narratorPseudo
          }
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
          user {
            id
            pseudonym
            artistPseudo
            narratorPseudo
          }
          sharedUserID
          sharedUser {
            id
            pseudonym
            artistPseudo
            narratorPseudo
          }
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
          genre {
            id
            genre
          }
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
          author {
            id
            pseudonym
            imageUri
            bio
            numAuthored
          }
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
          story {
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
            genre {
              id
              genre
            }
            hidden
            approved
            createdAt
            updatedAt
            numListens
          }
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
          story {
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
            genre {
              id
              genre
            }
            hidden
            approved
            createdAt
            updatedAt
            numListens
          }
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
          story {
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
            genre {
              id
              genre
            }
            hidden
            approved
            createdAt
            updatedAt
            numListens
          }
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
          user {
            id
            pseudonym
            narratorPseudo
            artistPseudo
          }
          otherUserID
          otherUser {
            id
            pseudonym
            narratorPseudo
            artistPseudo
          }
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
          user {
            id
            pseudonym
            narratorPseudo
            artistPseudo
            imageUri
          }
          otherUserID
          otherUser {
            id
            pseudonym
            narratorPseudo
            artistPseudo
            imageUri
          }
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFollowingConn = /* GraphQL */ `
  query GetFollowingConn($id: ID!) {
    getFollowingConn(id: $id) {
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
export const listFollowingConns = /* GraphQL */ `
  query ListFollowingConns(
    $filter: ModelFollowingConnFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowingConns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        follower {
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
      nextToken
    }
  }
`;
export const getPinnedStory = /* GraphQL */ `
  query GetPinnedStory($id: ID!) {
    getPinnedStory(id: $id) {
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
export const listPinnedStories = /* GraphQL */ `
  query ListPinnedStories(
    $filter: ModelPinnedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPinnedStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        storyID
        story {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFinishedStory = /* GraphQL */ `
  query GetFinishedStory($id: ID!) {
    getFinishedStory(id: $id) {
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
export const listFinishedStories = /* GraphQL */ `
  query ListFinishedStories(
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFinishedStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        storyID
        story {
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
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStory = /* GraphQL */ `
  query GetStory($id: ID!) {
    getStory(id: $id) {
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
          user {
            id
            imageUri
            name
          }
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
          tag {
            id
            tagName
            nsfw
            count
          }
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
export const listStories = /* GraphQL */ `
  query ListStories(
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getGenre = /* GraphQL */ `
  query GetGenre($id: ID!) {
    getGenre(id: $id) {
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
          tag {
            id
            tagName
            nsfw
            count
          }
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
export const listGenres = /* GraphQL */ `
  query ListGenres(
    $filter: ModelGenreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGenres(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getImageAsset = /* GraphQL */ `
  query GetImageAsset($id: ID!) {
    getImageAsset(id: $id) {
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
export const listImageAssets = /* GraphQL */ `
  query ListImageAssets(
    $filter: ModelImageAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImageAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        sharedUserID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDocumentAsset = /* GraphQL */ `
  query GetDocumentAsset($id: ID!) {
    getDocumentAsset(id: $id) {
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
export const listDocumentAssets = /* GraphQL */ `
  query ListDocumentAssets(
    $filter: ModelDocumentAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocumentAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAudioAsset = /* GraphQL */ `
  query GetAudioAsset($id: ID!) {
    getAudioAsset(id: $id) {
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
export const listAudioAssets = /* GraphQL */ `
  query ListAudioAssets(
    $filter: ModelAudioAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAudioAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFlag = /* GraphQL */ `
  query GetFlag($id: ID!) {
    getFlag(id: $id) {
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
export const listFlags = /* GraphQL */ `
  query ListFlags(
    $filter: ModelFlagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFlags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        storyID
        story {
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
        flagTypes
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
        Status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        storyID
        story {
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
        createdAt
        approved
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
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
          story {
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
            genre {
              id
              genre
            }
            hidden
            approved
            createdAt
            updatedAt
            numListens
          }
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
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRating = /* GraphQL */ `
  query GetRating($id: ID!) {
    getRating(id: $id) {
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
export const listRatings = /* GraphQL */ `
  query ListRatings(
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        storyID
        story {
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
        userID
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
          user {
            id
            artistPseudo
            narratorPseudo
            pseudonym
          }
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getReply = /* GraphQL */ `
  query GetReply($id: ID!) {
    getReply(id: $id) {
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
export const listReplies = /* GraphQL */ `
  query ListReplies(
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReplies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStoryTag = /* GraphQL */ `
  query GetStoryTag($id: ID!) {
    getStoryTag(id: $id) {
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
export const listStoryTags = /* GraphQL */ `
  query ListStoryTags(
    $filter: ModelStoryTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStoryTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        storyID
        tagID
        story {
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
        tag {
          id
          type
          tagName
          nsfw
          count
          updatedAt
          createdAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGenreTag = /* GraphQL */ `
  query GetGenreTag($id: ID!) {
    getGenreTag(id: $id) {
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
export const listGenreTags = /* GraphQL */ `
  query ListGenreTags(
    $filter: ModelGenreTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGenreTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        tag {
          id
          type
          tagName
          nsfw
          count
          updatedAt
          createdAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const usersByNarratorActiveAt = /* GraphQL */ `
  query UsersByNarratorActiveAt(
    $type: String!
    $narratorActiveAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByNarratorActiveAt(
      type: $type
      narratorActiveAt: $narratorActiveAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const usersByArtistActiveAt = /* GraphQL */ `
  query UsersByArtistActiveAt(
    $type: String!
    $artistActiveAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByArtistActiveAt(
      type: $type
      artistActiveAt: $artistActiveAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const followingByDate = /* GraphQL */ `
  query FollowingByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFollowingConnFilterInput
    $limit: Int
    $nextToken: String
  ) {
    followingByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        follower {
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
      nextToken
    }
  }
`;
export const pinnedStoryByDate = /* GraphQL */ `
  query PinnedStoryByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPinnedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    PinnedStoryByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        storyID
        story {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const finishedStoriesByDate = /* GraphQL */ `
  query FinishedStoriesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFinishedStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    finishedStoriesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        storyID
        story {
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
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const storiesByDate = /* GraphQL */ `
  query StoriesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const storiesByUpdated = /* GraphQL */ `
  query StoriesByUpdated(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    storiesByUpdated(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const imageAssetsByDate = /* GraphQL */ `
  query ImageAssetsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelImageAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    imageAssetsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        sharedUserID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const documentsByDate = /* GraphQL */ `
  query DocumentsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDocumentAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    documentsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const audioAssetsByDate = /* GraphQL */ `
  query AudioAssetsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAudioAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    audioAssetsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const flagsByDate = /* GraphQL */ `
  query FlagsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFlagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    flagsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        storyID
        story {
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
        flagTypes
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
        Status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByDate = /* GraphQL */ `
  query CommentsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        storyID
        story {
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
        createdAt
        approved
        updatedAt
      }
      nextToken
    }
  }
`;
export const tagsByCreated = /* GraphQL */ `
  query TagsByCreated(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagsByCreated(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const tagsByUpdated = /* GraphQL */ `
  query TagsByUpdated(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagsByUpdated(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const ratingsByDate = /* GraphQL */ `
  query RatingsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratingsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        storyID
        story {
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
        userID
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
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByDate = /* GraphQL */ `
  query MessagesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const messagesByUpdatedDate = /* GraphQL */ `
  query MessagesByUpdatedDate(
    $type: String!
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByUpdatedDate(
      type: $type
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const repliesByDate = /* GraphQL */ `
  query RepliesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReplyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    repliesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        updatedAt
      }
      nextToken
    }
  }
`;
