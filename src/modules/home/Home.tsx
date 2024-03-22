import { useState } from "react"
import { DATA_LIST } from "./data";
import styles from './style.module.scss';
import { Button, Grid } from "@mantine/core";
import { ItemType } from "../../types/user";
import Item from "./components/item/Item";

export function Home() {

    const [data, setData] = useState<ItemType[]>(DATA_LIST);

    const handleDeleteItemById = (id: string) => {
        setData((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleUpdateItemById = (id: string, newValue: string) => {
        setData((prevItems) =>
          prevItems.map((item) => (item.id === id ? { ...item, value: newValue } : item))
        );
    };

    const handleResetData = () => {
        setData(DATA_LIST);
    };

    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <div className={styles.action}>
                    <Button>CONFIRM</Button>
                    <Button style={{marginLeft: '10px'}} onClick={handleResetData}>RESET</Button>
                </div>

                <div className={styles.listitem}>
                    {data.map((item: ItemType) => (
                        <Item 
                            values={item}
                            onUpdate={handleUpdateItemById}
                            onDelete={handleDeleteItemById}
                            key={item.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}