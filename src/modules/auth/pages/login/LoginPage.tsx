import { useCallback, useState } from "react";
import LoginForm from "../../components/LoginForm";
import styles from "./style.module.scss";
import { LoginParams } from "../../types";
import { Link } from "react-router-dom";

export function LoginPage() {

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onLogin = useCallback(async (values: LoginParams) => {

        console.log(values)
    },[])

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
                    <div className="col-md-auto">
                        <Link to={'/sign_up'}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}