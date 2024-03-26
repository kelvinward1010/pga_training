import styles from "./style.module.scss";
import { Avatar, Col, Flex, Row, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useGetApi } from "../../hooks/get_api";
import { BASE_URL, URL_AVATAR } from "../../contants/config";


const { Text } = Typography;

export function Detail() {
    
    const {data, loading, error} = useGetApi(`${BASE_URL}/user`);
    const user = data?.data;
    
    if(loading){
        return (
            <>Loading...</>
        )
    }

    if(error){
        return (
            <>Have some error</>
        )
    }

    return (
        <div className={styles.container}>
            <Row justify={'space-between'} wrap>
                <Col span={24} xs={7}>
                    <Avatar size={200} icon={<UserOutlined />} src={`${URL_AVATAR}/${user?.avatar}`} />
                </Col>
                <Col span={24} xs={17}>
                    <Flex 
                        style={{
                            width: '100%',
                        }} 
                        justify={'start'} 
                        align={'start'}
                        vertical
                    >
                        <Row justify={'start'} className={styles.flex_vl}>
                            <Col span={5}>
                                <Text strong>Name:</Text>
                            </Col>
                            <Col span={18}>
                                <Text>{user?.name}</Text>
                            </Col>
                        </Row>
                        <Row justify={'start'} className={styles.flex_vl}>
                            <Col span={5}>
                                <Text strong>Email:</Text>
                            </Col>
                            <Col span={18}>
                                <Text>{user?.email}</Text>
                            </Col>
                        </Row>
                        <Row justify={'start'} className={styles.flex_vl}>
                            <Col span={5}>
                                <Text strong>Gender:</Text>
                            </Col>
                            <Col span={18}>
                                <Text>{user?.gender}</Text>
                            </Col>
                        </Row>
                        <Row justify={'start'} className={styles.flex_vl}>
                            <Col span={5}>
                                <Text strong>Region:</Text>
                            </Col>
                            <Col span={18}>
                                <Text>{user?.region}</Text>
                            </Col>
                        </Row>
                        <Row justify={'start'} className={styles.flex_vl}>
                            <Col span={5}>
                                <Text strong>State:</Text>
                            </Col>
                            <Col span={18}>
                                <Text>{user?.state}</Text>
                            </Col>
                        </Row>
                    </Flex>
                </Col>
            </Row>
        </div>
    )
}
