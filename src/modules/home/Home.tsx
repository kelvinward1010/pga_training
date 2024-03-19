import { useCallback, useContext } from 'react';
import styles from './style.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signinUrl } from '../../routers/urls';

export function Home() {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handeSignOut = useCallback(() => {
        auth?.signOut();
        navigate(signinUrl)
    },[auth])

    return (
        <div className={styles.container}>
            Home
            <button onClick={handeSignOut}>
                Sign Out
            </button>
        </div>
    )
}