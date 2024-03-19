import { useCallback, useContext, useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import styles from "./style.module.scss";
import { LoginParams } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { useFetchApi } from "../../../../lib/api";
import { BASE_URL } from "../../../../contants/config";
import { notification } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import storage from "../../../../utils/storage";
import { homeUrl, signupUrl } from "../../../../routers/urls";
import { AuthContext } from "../../../../context/AuthContext";
import storageInfoUser from "../../../../utils/userStorage";

export function LoginPage() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();

    const auth = useContext(AuthContext);

    const onLogin = useCallback(async (values: LoginParams) => {
        const config = {
            apiUrl: `${BASE_URL}/authentication/login`,
            method: 'POST',
            data: {
                email: values.email,
                password: values.password,
            }
        }
        setLoading(true);
        await useFetchApi(config.apiUrl,'POST', config.data).then((res: any) =>{
            if(res.data && res.success === true){
                notification.success({
                    message: "You have been sign in successfully!",
                    icon: (
                        <CheckCircleOutlined className="done" />
                    )
                })
                storage.setToken(res.user_cookie)
                storageInfoUser.setUserInfo({email: values.email});
                setLoading(false)
                navigate(homeUrl)
            }else{
                notification.error({
                    message: `Could not sign in. Please try again!`,
                    description: ` ${res.errors.email}`,
                    icon: (
                      <WarningOutlined className='warning' />
                    )
                })
                setLoading(false)
                setErrorMessage(res.errors.email)
            }
        }).catch((error) => {
            notification.error({
                message: `Could not sign in. Please try again!`,
                description: ` ${error}`,
                icon: (
                  <WarningOutlined className='warning' />
                )
            })
            setLoading(false)
            setErrorMessage(error)
        })
    },[navigate, auth])

    useEffect(() => {
        if (storage.getToken()) navigate(homeUrl)
    }, [navigate]);

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                width:'400px',
                height: "500px",
                border: "1px solid teal",
                borderRadius: "5px",
            }}>
                <div className={styles.nameLogo}>
                    PowerGate SoftWare
                </div>
                <div className={styles.loginFormMain}>
                    <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Link to={signupUrl}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}