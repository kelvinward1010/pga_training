import { Col, Row } from 'antd';
import TableProduct from './components/table/TableProduct';
import styles from './style.module.scss';
import ButtonConfig from '../../components/button/ButtonConfig';
import { useState } from 'react';
import Create from './components/modals/create/Create';

export function Products() {

    const [isOpenCreate, setIsOpenCreate] = useState(false);

    return (
        <>
            <Create 
                setIsOpen={setIsOpenCreate}
                isOpen={isOpenCreate}
            />
            <div className={styles.container}>
                <Row justify={'end'} className={styles.create}>
                    <Col span={2}>
                        <ButtonConfig 
                            name='Create Product'
                            onClick={() => setIsOpenCreate(true)}
                        />
                    </Col>
                </Row>
                <TableProduct />
            </div>
        </>
    )
}