import { Button, Col, DatePicker, Form, Input, notification, Popconfirm, Row, Select, Table, TableColumnType, Typography } from "antd";
import styles from "./style.module.scss";
import * as _ from "lodash/fp";
import { IDataProduct } from "../../types";
import { CheckCircleOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, WarningOutlined } from "@ant-design/icons";
import { formatDate, formatNumber } from "../../../../utils/format";
import { deleteProduct } from "../../api/deleteProduct";
import Update from "../modals/update/Update";
import { useEffect, useState } from "react";
import { CLIENT_PRODUCTS, STATUS_PRODUCTS } from "../../config";
import { Dayjs } from "dayjs";
import ButtonConfig from "../../../../components/button/ButtonConfig";
import { useRecoilState, useRecoilValue } from "recoil";
import { refeshProduct } from "../../state/state";
import { refeshProductState } from "../../state/atom";
import { getProduct } from "../../api/getProduct";

const {Text} = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'DD//MM/YYYY';

function TableProduct() {

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [clickOn, setClickOn] = useState(null);
    const [form] = Form.useForm();
    const [chooseStatus, setChooseStatus] = useState('all');
    const [chooseClient, setChooseClient] = useState('all');
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | []>([]);
    const [query, setQuery] = useState('');
    const isRefeshProduct = useRecoilValue(refeshProduct);
    const [, setIsRefesh] = useRecoilState(refeshProductState);
    

    useEffect(() => {
        getProduct().then((products) => {
            setData(products?.data?.data);
        })
    },[getProduct])

    const handleSetRefesh = () => setIsRefesh(false);

    useEffect(() => {
        getProduct().then((products) => {
            setData(products?.data?.data);
        })
        setTimeout(handleSetRefesh, 1000)
    },[isRefeshProduct == true])

    const convertData = data?.map((item: IDataProduct) => ({
        key: item.id,
        id: item.id,
        client: item.client,
        order: item.order,
        createdBy: item.createdBy,
        currency: item.currency,
        fundingMethod: item.fundingMethod,
        invoice: item.invoice,
        status: item.status,
        total: item.total,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    })) ?? [];

    const dataSelect = _.flow(
        _.filter(
            (item: any) =>
                item.status == chooseStatus || chooseStatus === 'all'
        ),
        _.filter(
            (item: any) =>
                item.client == chooseClient || chooseClient === 'all'
        ),
        _.filter((item: any) => {
            if (dateRange[0] && dateRange[1]) {
                const itemTimestamp = new Date(item.createdAt).getTime();
                const startTimestamp = dateRange[0].valueOf();
                const endTimestamp = dateRange[1].valueOf();
                return itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp;
            }
            return true;
        }),
        _.filter(
            (item: any) =>
              item?.invoice?.includes(query) ||
              (query ?? "") === "",
        ),
    )(convertData);

    const handleRangeChange = (dates: [Dayjs | null, Dayjs | null]) => {
        if (dates?.[0] && dates?.[1]) {
          setDateRange(dates as [Dayjs, Dayjs]);
        }else{
            setDateRange([]);
        }
    };

    const handleChangeSearch = (e: string) => {
        setQuery(e);
    };

    const handleDelete = (id: any) => {
        deleteProduct(id).then((response) => {
            if(response.status === 200){
                notification.success({
                    message: `Delete product successfully!`,
                    icon: (
                        <CheckCircleOutlined className="done" />
                    )
                })
                setIsRefesh(true);
            }else{
                notification.error({
                    message: `Could not delete product. Please try again!`,
                    icon: (
                        <WarningOutlined className='warning'/>
                    )
                })
            }
        })
    }

    const styleStattus = (text: string) => {
        switch (text) {
            case "PENDING":
                return <Text className='line-clamp-1'>{text}</Text>
            case "FULFILLED":
                return <Text className='line-clamp-1' style={{color: "green"}}>{text}</Text>
            case "RECEIVED":
                return <Text className='line-clamp-1' style={{color: "blue"}}>{text}</Text>
            case "PROCESSING":
                return <Text className='line-clamp-1' style={{color: "orange"}}>{text}</Text>
            default:
                return <Text className='line-clamp-1'>{text}</Text>
        }
    }

    const columns: TableColumnType<any>[] = [
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            render: (text: any) => styleStattus(text),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
            render: (text: any) => <Text className='line-clamp-1'>{formatDate(text)}</Text>,
        },
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
            width: '10%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Client',
            dataIndex: 'client',
            key: 'client',
            width: '15%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'total',
            dataIndex: 'total',
            key: 'total',
            width: '15%',
            render: (text: any) => <Text className='line-clamp-1'>{formatNumber(text)}</Text>,
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            width: '10%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Invoice',
            dataIndex: 'invoice',
            key: 'invoice',
            width: '10%',
            render: (text: any) => <Text className='line-clamp-1'>{text}</Text>,
        },
        {
            title: 'Actions',
            width: '25%',
            align:'center',
            render: (_: any, record: any) => {
                return (
                    <div className={styles.actions_table}>
                        <div>
                            <Button 
                                icon={<EyeOutlined />}
                                className={styles.detail}
                                onClick={() => {
                                    setClickOn(record)
                                    setIsOpenUpdate(true)
                                }}
                            >
                                Detail
                            </Button>
                            <Popconfirm
                                title="Delete the product"
                                description="Are you sure to delete this product?"
                                onConfirm={() => handleDelete(record?.id)}
                                okText="Yes"
                                cancelText="No"
                                className='popconfirm'
                            >
                                <DeleteOutlined
                                    className={styles.delete_act}
                                    style={{color:'red'}}
                                />
                            </Popconfirm>
                        </div>
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <Update
                data={clickOn}
                isOpen={isOpenUpdate}
                setIsOpen={setIsOpenUpdate}
                setData={setClickOn}
                
            />
            <Form
                form={form}
                layout={'vertical'}
                initialValues={{
                    status: "all",
                    client: "all",
                }}
                name="filterProduct"
            >
                <Row justify={'start'} wrap>
                    <Col span={4}>
                        <Form.Item label="Status" name={"status"} className="text-internal"> 
                            <Select
                                onChange={(e) => setChooseStatus(e)}
                                style={{ width: "100%" }}
                                options={[
                                    {
                                        label: "Tất cả",
                                        value: "all",
                                    },
                                    ...STATUS_PRODUCTS
                                ]}
                                value={chooseStatus}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4} push={1}>
                        <Form.Item label="Client" name={"client"} className="text-internal"> 
                            <Select
                                onChange={(e) => setChooseClient(e)}
                                style={{ width: "100%" }}
                                options={[
                                    {
                                        label: "Tất cả",
                                        value: "all",
                                    },
                                    ...CLIENT_PRODUCTS
                                ]}
                                value={chooseStatus}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4} push={2}>
                        <Form.Item label="Date time" className="text-internal"> 
                            <RangePicker
                                onChange={handleRangeChange}
                                format={dateFormat}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4} push={3}>
                        <Form.Item label="Invoice" className="text-internal"> 
                            <Input
                                placeholder="Invoice" 
                                onChange={(e) => handleChangeSearch(e.target.value)}
                                suffix={
                                <SearchOutlined
                                    title="Search"
                                />
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4} push={4} style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                    }}>
                        <ButtonConfig
                            name="Clear Filter"
                            background={'red'}
                            onClick={() => {
                                setChooseClient("all");
                                setChooseStatus("all");
                                setDateRange([])
                                setQuery('');
                            }}
                        />
                    </Col>
                </Row>
            </Form>
            <div className={styles.container}>
                <Table
                    bordered
                    columns={columns}
                    dataSource={dataSelect ?? []}
                    pagination={{
                        pageSize: 5,
                    }}
                />
            </div>
        </>
    )
}

export default TableProduct