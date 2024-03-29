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
import { URL_AVATAR } from '../../contants/config';

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
                    onClick={() => navigate(`/detail/${user?.id}`)}
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
                <Text className={styles.logo} c="teal.4" onClick={() => navigate(homeUrl)}>PGA TRAINING</Text>
                <div className={styles.right}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <div className={styles.profile}>
                            <Avatar className={styles.avatar} src={`${URL_AVATAR}/${user?.avatar}` ?? null} icon={<UserOutlined />} />
                            <Text className={styles.name_user} c="teal.4">{user?.name}</Text>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default Header