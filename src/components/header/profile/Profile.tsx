
import { Button, Form, Input, Modal, notification } from "antd";
import styles from "./style.module.scss";
import { useState } from "react";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";


interface Props {
    current_user?: any;
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
}

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onFailure, onSubmit }) => (
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
            "name": fields.find(value => value?.value != null && value?.name == "name")?.value,
            "email": fields.find(value => value?.value != null && value?.name == "email")?.value,
            "image": fields.find(value => value?.value != null && value?.name == "image")?.value,
        }}
    >
        <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Name is required!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Email is required!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: false, message: 'Image URL!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
            <Button className={styles.button} htmlType="submit">
                Update Profile
            </Button>
            <Button className={styles.button_reset} htmlType="reset">Reset</Button>
        </Form.Item>
    </Form>
);


function Profile(props: Props) {

    const dispatch = useDispatch();
    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['name'],
            value: props.current_user?.name,
        },
        {
            name: ['email'],
            value: props.current_user?.email,
        },
        {
            name: ['image'],
            value: props.current_user?.image,
        },
    ]);

    const onFinish = (values: any) => {
        const data = {
            name: values.name,
            email: values?.email,
            image: values?.image,
        }

        // update_profile(dispatch, data, props.current_user.id,).then(() => {
        //     notification.success({
        //         message: "You have been update password successfully!",
        //         icon: (
        //             <CheckCircleOutlined className="done" />
        //         )
        //     })
        // }).catch((error) => {
        //     notification.error({
        //         message: `Could not update password. Please try again!`,
        //         description: ` ${error?.response?.data?.detail}`,
        //         icon: (
        //             <WarningOutlined className='warning' />
        //         )
        //     })
        // })
    }

    const onFinishFailed = (errorInfo: any) => {
        
        notification.error({
            message: `Could not change password. Please try again!`,
            description: ` ${errorInfo}`,
            icon: (
                <WarningOutlined className='warning'/>
            )
        })
    };

    console.log(props.current_user)

    return (
        <Modal
            title={`Change Password of ${props.current_user?.name}`}
            open={props.isOpen} 
            onCancel={() => props.setIsOpen(false)}
            width={700}
            className="ant_modal"
            footer={null}
        >
            <div className={styles.container}>
                <CustomizedForm
                    fields={fields}
                    onChange={(newFields) => {
                        setFields(newFields);
                    }}
                    onFailure={(error: any) => onFinishFailed(error)}
                    onSubmit={(values: any) => onFinish(values)}
                />
            </div>
        </Modal>
    )
}

export default Profile