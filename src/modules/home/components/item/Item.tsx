import { Avatar, Button, Grid, Input, Text } from '@mantine/core';
import styles from './style.module.scss';
import { ItemType } from '../../../../types/user';
import { useState } from 'react';
import { IconCheck, IconCircleX, IconTrash } from '@tabler/icons-react';

interface ItemProps{
    values: ItemType;
    onUpdate: (id: string, newValue: string) => void;
    onDelete: (id: string) => void;
}

const Item: React.FC<ItemProps> = ({
    values,
    onDelete,
    onUpdate
}) => {

    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState<ItemType>({
        id: values.id,
        value: values.value
    })
    const iconSave = <IconCheck size={14} />;
    const iconCancel = <IconCircleX size={14} />;
    const iconDelete = <IconTrash size={14} />;

    const handleChange = (e: any) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.container}>
            <Avatar />
            <div className={styles.info}>
                {edit ? (
                    <div className={styles.editInfo}>
                        <Input 
                            value={value.value}
                            name='value'
                            onChange={handleChange}
                        />
                        <div className={styles.actions}>
                            <Button 
                                size={'compact-sm'} 
                                color={'green'} 
                                leftSection={iconSave}
                                onClick={() => {
                                    onUpdate(value.id, value.value)
                                    setEdit(!edit);
                                }}
                            >Save</Button>
                            <Button 
                                size={'compact-sm'} 
                                color={'red'} 
                                leftSection={iconCancel}
                                onClick={() => setEdit(!edit)}
                            >Cancel</Button>
                        </div>
                    </div>
                ):(
                    <Grid w={'100%'}>
                        <Grid.Col span={8}>
                            <Text ml={5} className={styles.name} onClick={() => setEdit(!edit)}>{values.value}</Text>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Button size={'compact-sm'} color={'red'} leftSection={iconDelete} onClick={() => onDelete(value.id)}>Delete</Button>
                        </Grid.Col>
                    </Grid>
                )}
            </div>
        </div>
    )
}

export default Item