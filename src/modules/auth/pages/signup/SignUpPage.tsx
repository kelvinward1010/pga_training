import styles from "./style.module.scss";
import SignUpForm from '../../components/SignUpForm'
import { useCallback, useEffect, useState } from "react";
import { LOCATIONS } from "../../data";
import { ILocationParams, ISignUpParams } from "../../types";
import { Link } from "react-router-dom";

export function SignUpPage() {

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
                width:'450px',
                height: "auto",
                border: "1px solid black"
            }}>
                <div className={styles.nameLogo}>
                    PowerGate SoftWare
                </div>
                <div className={styles.signupFormMain}>
                    <SignUpForm onSignUp={onSignUp} loading={loading} errorMessage={errorMessage} locations={locations}/>
                </div>
                <div className="row justify-content-center mb-2">
                    <div className="col-auto">
                        <Link to={'/login'}>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}