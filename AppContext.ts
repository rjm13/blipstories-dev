import React from 'react';

const context = {
    storyID: null,
    setStoryID: (id: string | null) => {},

    isRootScreen: null,
    setIsRootScreen: (val: boolean | null) => {},

    userID: null,
    setUserID: (id: string | null) => {},

    deepLink: null,
    setDeepLink: () => {},

    nsfwOn: false,
    setNSFWOn: (val: boolean | null) => {},

    ADon: false,
    setADon: (val: boolean | null) => {},
}

export const AppContext = React.createContext(context);