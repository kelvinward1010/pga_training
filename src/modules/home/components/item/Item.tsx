import { Avatar, Text } from '@mantine/core';
import styles from './style.module.scss';

interface ItemProps{
    values: any;
}

const Item: React.FC<ItemProps> = ({
    values
}) => {
    return (
        <div className={styles.container}>
            <Avatar />
            <div className={styles.info}>
                <Text>Name</Text>
            </div>
        </div>
    )
}

export default Item