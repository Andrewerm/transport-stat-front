import React, {useState} from "react";
import {IUserProfile} from "../types";

interface IProfileDataProps {
    children: React.ReactNode
}

interface IProfileDataContext {
    user_data?: IUserProfile,
    setDataUser: any
}

const initialUserProfileDataContext:IProfileDataContext={
    user_data: undefined,
    setDataUser: undefined
}

export const ProfileDataContext=React.createContext<IProfileDataContext>(initialUserProfileDataContext)

export const ProfileData:React.FC<IProfileDataProps>=({children})=>{
    const [user_data, setDataUser] = useState<IUserProfile|undefined>(initialUserProfileDataContext.user_data);
    return (
        <ProfileDataContext.Provider value={{user_data, setDataUser}}>
            {children}
        </ProfileDataContext.Provider>
    )
}
