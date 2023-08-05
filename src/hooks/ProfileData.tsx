import React from "react";
import {IUserProfile} from "../types";

interface IProfileDataProps {
    children: React.ReactNode
}

interface IProfileDataContext {
    getUserData: () => IUserProfile,
    setDataUser: (userData: IUserProfile) => void,
    clearDataUser: () => void
}


const keyLocalStorageProfile = 'transport_statistic_key';

const initialUserProfileDataContext: IProfileDataContext = {
    getUserData: () => {
        const localData = localStorage.getItem(keyLocalStorageProfile)
        if (localData) return JSON.parse(localData)
    },
    setDataUser: (userData: IUserProfile) => {
        localStorage.setItem(keyLocalStorageProfile, JSON.stringify(userData))
    },
    clearDataUser: () => {
        localStorage.removeItem(keyLocalStorageProfile);
    }
}


export const ProfileDataContext = React.createContext<IProfileDataContext>(initialUserProfileDataContext)

export const ProfileData: React.FC<IProfileDataProps> = ({children}) => {
    return (
        <ProfileDataContext.Provider value={initialUserProfileDataContext}>
            {children}
        </ProfileDataContext.Provider>
    )
}
