import { useCallback, useContext } from 'react';
import styles from './style.module.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { signinUrl } from '../../routers/urls';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import storageFetch from '../../utils/storage';

export function Home() {

    //const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handeSignOut = useCallback(() => {
        // auth?.signOut();
        dispatch(logout())
        storageFetch.clearToken();
        navigate(signinUrl)
    },[dispatch])

    return (
        <div className={styles.container}>
            <h5>Home</h5>
            <button onClick={handeSignOut}>
                Sign Out
            </button>
        </div>
    )
}