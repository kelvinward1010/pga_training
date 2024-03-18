import { useCallback, useState } from "react";
import LoginForm from "../../components/LoginForm";
import styles from "./style.module.scss";
import { LoginParams } from "../../types";
import { Link } from "react-router-dom";
import { useFetchApi } from "../../../../lib/api";
import { BASE_URL } from "../../../../contants/config";
import { notification } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import storage from "../../../../utils/storage";

export function LoginPage() {

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>();

    const onLogin = useCallback(async (values: LoginParams) => {
        const config = {
            apiUrl: `${BASE_URL}auth/login`,
            method: 'POST',
            data: {
                email: values.email,
                password: values.password,
            }
        }
        setLoading(true);
        await useFetchApi(config.apiUrl,'POST', config.data).then((res: any) =>{
            notification.success({
                message: "You have been sign in successfully!",
                icon: (
                    <CheckCircleOutlined className="done" />
                )
            })
            storage.setToken(res.access_token)
            setLoading(false)
        }).catch((error) => {
            notification.error({
                message: `Could not sign in. Please try again!`,
                description: ` ${error}`,
                icon: (
                  <WarningOutlined className='warning' />
                )
            })
            setErrorMessage(error)
        })
    },[useFetchApi])

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
                border: "1px solid black"
            }}>
                <div className={styles.nameLogo}>
                    PowerGate SoftWare
                </div>
                <div className={styles.loginFormMain}>
                    <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <Link to={'/sign_up'}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}