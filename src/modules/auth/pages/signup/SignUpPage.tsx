import styles from "./style.module.scss";
import SignUpForm from '../../components/SignUpForm'
import { useCallback, useEffect, useState } from "react";
import { LOCATIONS } from "../../data";
import { ILocationParams, ISignUpParams } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../contants/config";
import { useFetchApi } from "../../../../lib/api";
import { notification } from "antd";
import storage from "../../../../utils/storage";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { homeUrl, signinUrl } from "../../../../routers/urls";

export function SignUpPage() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [locations, setLocations] = useState<ILocationParams[]>([]);

    const getLocation = useCallback(async () => {
        setLocations(LOCATIONS)
        return;
    },[LOCATIONS]);

    useEffect(() => {
        getLocation();
    },[getLocation])

    const onSignUp = useCallback(async(values: ISignUpParams) => {
        const config = {
            apiUrl: `${BASE_URL}users/create`,
            method: 'POST',
            data: {
                name: values.name,
                email: values.email,
                password: values.password,
            }
        }
        setLoading(true);
        await useFetchApi(config.apiUrl,'POST', config.data).then((res: any) =>{
            notification.success({
                message: "You have been sign up successfully!",
                icon: (
                    <CheckCircleOutlined className="done" />
                )
            })
            storage.setToken(res.access_token)
            setLoading(false)
        }).catch((error) => {
            notification.error({
                message: `Could not sign up. Please try again!`,
                description: ` ${error}`,
                icon: (
                  <WarningOutlined className='warning' />
                )
            })
            setErrorMessage(error)
        })
    },[useFetchApi])

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
                width:'450px',
                height: "auto",
                border: "1px solid teal",
                borderRadius: "5px",
            }}>
                <div className={styles.nameLogo}>
                    PowerGate SoftWare
                </div>
                <div className={styles.signupFormMain}>
                    <SignUpForm onSignUp={onSignUp} loading={loading} errorMessage={errorMessage} locations={locations}/>
                </div>
                <div className="row justify-content-center mb-2">
                    <div className="col-auto">
                        <Link to={signinUrl}>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}