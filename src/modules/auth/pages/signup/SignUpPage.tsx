import styles from "./style.module.scss";
import SignUpForm from '../../components/SignUpForm'
import { useCallback, useEffect, useState } from "react";
import { ILocationParams, ISignUpParams } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { OTHER_API_URL } from "../../../../contants/config";
import { useFetchApi } from "../../../../lib/api";
import { notification } from "antd";
import storage from "../../../../utils/storage";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { homeUrl, signinUrl, signupUrl } from "../../../../routers/urls";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getLocations } from "../../../../apis/location";

export function SignUpPage() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [locations, setLocations] = useState<ILocationParams[]>([]);
    const isAuthenticated = useSelector((state: RootState) => state.auth.user);

    const onSignUp = useCallback(async(values: ISignUpParams) => {
        const config = {
            apiUrl: `${OTHER_API_URL}users/create`,
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
        getLocations().then((res: any) => {
            setLocations(res.data)
        })
    }, [getLocations]);

    useEffect(() => {
        if(isAuthenticated){
            navigate(homeUrl)
        }else{
            navigate(signupUrl)
        }
    },[isAuthenticated])

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