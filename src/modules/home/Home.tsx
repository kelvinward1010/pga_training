import { useCallback, useEffect } from 'react';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { homeUrl, signinUrl } from '../../routers/urls';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import storageFetch from '../../utils/storage';
import { RootState } from '../../redux/store';

export function Home() {

    //const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.user);

    const handeSignOut = useCallback(() => {
        // auth?.signOut();
        dispatch(logout())
        storageFetch.clearToken();
        navigate(signinUrl)
    },[dispatch])

    useEffect(() => {
        if(isAuthenticated){
            navigate(homeUrl)
        }else{
            navigate(signinUrl)
        }
    },[isAuthenticated])

    return (
        <div className={styles.container}>
            <h5>Home</h5>
            <button onClick={handeSignOut}>
                Sign Out
            </button>
        </div>
    )
}