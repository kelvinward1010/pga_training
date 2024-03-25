import { Text } from '@mantine/core';
import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { logout } from '../../redux/slices/authSlice';
import storageFetch from '../../utils/storage';
import { homeUrl, profileUrl, signinUrl } from '../../routers/urls';
import ButtonConfig from '../button/ButtonConfig';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const user: any = useSelector((state: RootState) => state.auth.user);
    
    const handeSignOut = useCallback(() => {
        dispatch(logout())
        storageFetch.clearToken();
        navigate(signinUrl)
    }, [dispatch])

    const items = [
        {
            label: <>
                <ButtonConfig
                    type={'fullbg'}
                    onClick={() => navigate(profileUrl)}
                    name="Profile"
                />
            </>,
            key: '0',
        },
        {
            label: <>
                <ButtonConfig
                    type={'fullbg'}
                    onClick={() => navigate(`/detail/${user?.token}`)}
                    name="Detail User"
                />
            </>,
            key: '1',
        },
        {
            label: <>
                <ButtonConfig
                    type={'fullbg'}
                    onClick={handeSignOut}
                    name="Sign Out"
                />
            </>,
            key: '2',
        },
    ]

    return (
        <>
            <div className={styles.container}>
                <Text c="teal.4" onClick={() => navigate(homeUrl)} style={{cursor: 'pointer'}}>Kelvin Ward</Text>
                <div className={styles.right}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <div className={styles.profile}>
                            <Avatar className={styles.avatar} src={user?.image ?? null} icon={<UserOutlined />} />
                            <Text c="teal.4" style={{marginLeft:"10px"}}>{user?.name}</Text>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default Header