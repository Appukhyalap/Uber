import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({ children }) => {

    const [userData, setUserData] = useState({
        email: "",
        fullname: {
            firstName: "",
            LastName: "",
        },
    });
    
    return (
        <div>
            <UserDataContext.Provider value={[userData, setUserData]}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext