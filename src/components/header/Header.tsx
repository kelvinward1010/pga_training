import { Avatar, Button, Popover, Text } from '@mantine/core';
import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { logout } from '../../redux/slices/authSlice';
import storageFetch from '../../utils/storage';
import { homeUrl, signinUrl } from '../../routers/urls';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user: any = useSelector((state: RootState) => state.auth.user);
    
    const handeSignOut = useCallback(() => {
        dispatch(logout())
        storageFetch.clearToken();
        navigate(signinUrl)
    }, [dispatch])

    return (
        <div className={styles.container}>
            <Text c="teal.4" onClick={() => navigate(homeUrl)} style={{cursor: 'pointer'}}>Kelvin Ward</Text>
            <div className={styles.right}>
                <Popover width={200} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <div className={styles.profile}>
                            <Avatar />
                            <Text c="teal.4">{user?.firstName}</Text>
                        </div>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <Button onClick={handeSignOut}>Logout</Button>
                    </Popover.Dropdown>
                </Popover>
            </div>
        </div>
    )
}

export default Header