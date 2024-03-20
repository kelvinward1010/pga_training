import React, { createContext, useCallback } from "react";
import { BASE_URL } from "../contants/config";
import { useFetchApi } from "../lib/api";
import { notification } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import storageInfoUser from "../utils/userStorage";
import storageFetch from "../utils/storage";


interface AuthProviderProps {
    children: React.ReactNode;
}


interface AuthContextProps {
    user: any | null;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(JSON.parse(localStorage.getItem('user') || 'null'));

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children
}) => {

    const user = storageInfoUser.getUserInfo();

    const signIn = useCallback(async (email: string, password: string) => {
        const config = {
            apiUrl: `${BASE_URL}/authentication/login`,
            method: 'POST',
            data: {
                email: email,
                password: password,
            }
        }

        await useFetchApi(config.apiUrl,'POST', config.data).then((res: any) =>{
            if(res.data && res.success === true){
                notification.success({
                    message: "You have been sign in successfully!",
                    icon: (
                        <CheckCircleOutlined className="done" />
                    )
                })
                storageFetch.setToken(res.user_cookie);
                storageInfoUser.setUserInfo({email});
            }else{
                notification.error({
                    message: `Could not sign in. Please try again!`,
                    description: ` ${res.errors.email}`,
                    icon: (
                      <WarningOutlined className='warning' />
                    )
                })
            }
        }).catch((error) => {
            notification.error({
                message: `Could not sign in. Please try again!`,
                description: ` ${error}`,
                icon: (
                  <WarningOutlined className='warning' />
                )
            })
        })
    },[useFetchApi]);

    const signOut = () => {
        storageFetch.clearToken();
        storageInfoUser.clearUserInfo();  
    };

    return <AuthContext.Provider value={{ user, signIn, signOut}}>
        {children}
    </AuthContext.Provider>
}