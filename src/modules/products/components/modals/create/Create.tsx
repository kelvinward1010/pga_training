import { Button, Form, Input, Modal, notification, Select } from "antd";
import styles from "./style.module.scss";
import { useState } from "react";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { CLIENT_PRODUCTS, MONEY_TYPES_PRODUCTS, STATUS_PRODUCTS } from "../../../config";
import { createProduct } from "../../../api/create";
import { useRecoilState } from "recoil";
import { refeshProductState } from "../../../state/atom";


interface Props {
    isOpen?: boolean;
    setIsOpen?: any;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
};

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
    onSubmit: (data: any) => void;
    onFailure: (data: any) => void;
    loading?: boolean;
}


const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onFailure, onSubmit, loading }) => (
    <Form
        name="profile"
        {...formItemLayout}
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}
        onFinish={onSubmit}
        onFinishFailed={onFailure}
        initialValues={{
            "order": fields.find(value => value?.value != null && value?.name == "order")?.value,
            "client": fields.find(value => value?.value != null && value?.name == "client")?.value,
            "status": fields.find(value => value?.value != null && value?.name == "status")?.value,
            "total": fields.find(value => value?.value != null && value?.name == "total")?.value,
            "currency": fields.find(value => value?.value != null && value?.name == "currency")?.value,
            "fundingMethod": fields.find(value => value?.value != null && value?.name == "fundingMethod")?.value,
        }}
        className={styles.formmain}
    >
        <Form.Item
            name="order"
            label="Order"
            rules={[{ required: true, message: 'Order is required!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: 'Client is required!' }]}
        >
             <Select
                style={{ width: "100%" }}
                options={CLIENT_PRODUCTS}
            />
        </Form.Item>

        <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Status is required!' }]}
        >
            <Select
                style={{ width: "100%" }}
                options={STATUS_PRODUCTS}
            />
        </Form.Item>

        <Form.Item
            name="total"
            label="Total"
            rules={[{ required: true, message: 'Total is required' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true, message: 'Currency is required' }]}
        >
            <Select
                style={{ width: "100%" }}
                options={MONEY_TYPES_PRODUCTS}
            />
        </Form.Item>

        <Form.Item
            name="invoice"
            label="Invoice"
            rules={[{ required: true, message: 'Invoice is required' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="fundingMethod"
            label="Funding Method"
            rules={[{ required: true, message: 'Funding Method is required' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
            <Button loading={loading} className={styles.button} htmlType="submit">
                Create
            </Button>
            <Button className={styles.button_reset} htmlType="reset">Reset</Button>
        </Form.Item>
    </Form>
);


function Create(props: Props) {

    const [, setIsRefesh] = useRecoilState(refeshProductState);
    const [loading, setLoading] = useState(false);

    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['order'],
            value: "",
        },
        {
            name: ['client'],
            value: "",
        },
        {
            name: ['status'],
            value: "",
        },
        {
            name: ['total'],
            value: "",
        },
        {
            name: ['currency'],
            value: "",
        },
        {
            name: ['invoice'],
            value: "",
        },
        {
            name: ['fundingMethod'],
            value: "",
        },
    ]);

    const onFinish = (values: any) => {
        setLoading(true);
        const data = {
            order: values.order,
            client: values.client,
            status: values.status,
            total: Number(values.total),
            currency: values.currency,
            invoice: values.invoice,
            fundingMethod: values.fundingMethod,
        }

        createProduct(data).then((product) => {
            if(product.code === 200){
                notification.success({
                    message: `Create product successfully!`,
                    description: ` ${product?.message}`,
                    icon: (
                        <CheckCircleOutlined className="done" />
                    )
                })
                setIsRefesh(true);
                setLoading(false);
                props.setIsOpen(false);
            }else{
                notification.error({
                    message: `Could not create product. Please try again!`,
                    icon: (
                        <WarningOutlined className='warning'/>
                    )
                })
            }
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        
        notification.error({
            message: `Could not create product. Please try again!`,
            description: ` ${errorInfo}`,
            icon: (
                <WarningOutlined className='warning'/>
            )
        })
    };

    return (
        <>
            <Modal
                title={`Create Product`}
                open={props.isOpen} 
                onCancel={() => props.setIsOpen(false)}
                width={700}
                className="ant_modal"
                footer={null}
            >
                <CustomizedForm
                    fields={fields}
                    onChange={(newFields) => {
                        setFields(newFields);
                    }}
                    onFailure={(error: any) => onFinishFailed(error)}
                    onSubmit={(values: any) => onFinish(values)}
                    loading={loading}
                />
            </Modal>
        </>
    )
}

export default Create