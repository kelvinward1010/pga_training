import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.scss";
import { RootState } from "../../redux/store";
import { Avatar, Button, Col, Form, Input, Modal, notification, Row, Select } from "antd";
import { CheckCircleOutlined, UploadOutlined, UserOutlined, WarningOutlined } from "@ant-design/icons";
import { ChangeEvent, useRef, useState } from "react";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";
import { updateUser } from "./api/updateUser";
import { URL_AVATAR } from "../../contants/config";
import { getUser } from "./api/getUser";
import { update } from "../../redux/slices/authSlice";
import { User } from "../../types/user";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

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
            "gender": fields.find(value => value?.value != null && value?.name == "gender")?.value,
            "region": fields.find(value => value?.value != null && value?.name == "region")?.value,
            "state": fields.find(value => value?.value != null && value?.name == "state")?.value,
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
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Gender is required!' }]}
        >
            <Select
                style={{ width: "100%" }}
                options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                ]}
            />
        </Form.Item>

        <Form.Item
            name="region"
            label="Region"
            rules={[{ required: true, message: 'Region is required!' }]}
        >
            <Select
                style={{ width: "100%" }}
            />
        </Form.Item>

        <Form.Item
            name="state"
            label="State"
            rules={[{ required: true, message: 'State is required!' }]}
        >
            <Select
                style={{ width: "100%" }}
            />
        </Form.Item>

        {/* <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
            <Button className={styles.button} htmlType="submit">
                Update Profile
            </Button>
            <Button className={styles.button_reset} htmlType="reset">Reset</Button>
        </Form.Item> */}
    </Form>
);

export function Profile() {

    const imgRef = useRef<any>(null);
    const previewCanvasRef = useRef<any>(null);
    const [image, setImage] = useState<any>();
    const [isOpenUpload, setIsOpenUpload] = useState(false);
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [crop, setCrop] = useState<any>();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user: any = useSelector((state: RootState) => state.auth.user);

    const [fields, setFields] = useState<FieldData[]>([
        {
            name: ['name'],
            value: user?.name,
        },
        {
            name: ['email'],
            value: user?.email,
        },
        {
            name: ['gender'],
            value: user?.gender,
        },
        {
            name: ['region'],
            value: user?.region,
        },
        {
            name: ['state'],
            value: user?.state,
        },
    ]);

    // Hàm chuyển đổi Data URL sang Blob
    function dataURLtoBlob(dataURL: string): Blob {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }


    const onFinish = () => {}

    const onFinishFailed = (errorInfo: any) => {
        
        notification.error({
            message: `Could not change. Please try again!`,
            description: ` ${errorInfo}`,
            icon: (
                <WarningOutlined className='warning'/>
            )
        })
    };
    
    const handleChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        }
        if(files !== null && files.length) reader.readAsDataURL(files[0]);
    }

    const handleClick = () => {
        hiddenFileInput.current?.click();
    };

    const handleImageLoad = (e: any) => {
        const {width, height, naturalWidth, naturalHeight} = e.currentTarget;
        if(naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION){
            setError("Image must be at least 150px");
            setImage("");
            return;
        }
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
        {
            unit: "px",
            width: cropWidthInPercent,
        },
            ASPECT_RATIO,
            width, height,
        )

        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    }

    const handleUploadAvatar = () => {
        setLoading(true);
        const dataUrl = previewCanvasRef.current.toDataURL();
        const blob: Blob = dataURLtoBlob(dataUrl);
        const formData = new FormData();
        formData.append('file', blob, "avatar.png");
        updateUser(formData).then(() => {
            getUser().then((user: User) => {
                dispatch(update(user));
            })
        }).then(() => {
            notification.success({
                message: `Update avatar successfully!`,
                icon: (
                    <CheckCircleOutlined className="done" />
                )
            })
            setIsOpenUpload(false);
            setLoading(false);
        }).catch(() => {
            notification.error({
                message: `Could not update avatar. Please try again!`,
                icon: (
                    <WarningOutlined className='warning'/>
                )
            })
        })
} 

    return (
        <>
            <Modal
                title={`Upload Image`}
                open={isOpenUpload} 
                onCancel={() => setIsOpenUpload(false)}
                width={700}
                className="ant_modal"
                footer={null}
            >
                <div onClick={handleClick} className={styles.upload}>
                    <input style={{display: "none"}} ref={hiddenFileInput} type="file" accept="image/*" onChange={handleChooseAvatar}/>
                    <Button icon={<UploadOutlined />} className={styles.btn_upload_image}>Upload Avatar</Button>
                </div>
                {error && <p style={{color: "red"}}>{error}</p>}
                {image && (
                    <>
                        <ReactCrop 
                            crop={crop} 
                            onChange={(percentCrop) => setCrop(percentCrop)}
                            keepSelection
                            circularCrop
                            aspect={1}
                            minWidth={200}
                        >
                            <img 
                                src={image}
                                ref={imgRef}
                                onLoad={handleImageLoad}
                            />
                        </ReactCrop>
                        <Button
                            onClick={() => {
                                setCanvasPreview(
                                    imgRef.current,
                                    previewCanvasRef?.current,
                                    convertToPixelCrop(
                                        crop,
                                        imgRef?.current.width,
                                        imgRef?.current.height
                                    )
                                );
                                handleUploadAvatar();
                            }}
                            loading={loading}
                        >
                            Update Avatar
                        </Button>

                        {crop && (
                            <canvas
                            ref={previewCanvasRef}
                            className="mt-4"
                            style={{
                                display: "none",
                                border: "1px solid black",
                                objectFit: "contain",
                                width: 150,
                                height: 150,
                            }}
                            />
                        )}
                    </>
                )}
            </Modal>
            <div className={styles.container}>
                <Row justify={'space-between'} style={{width: "100%"}} wrap>
                    <Col span={24} xs={5} push={2} className={styles.avatarmain}>
                        <Avatar size={200} style={{borderColor: "teal"}} icon={<UserOutlined />} src={`${URL_AVATAR}/${user?.avatar}` || image} />
                        <div onClick={() => setIsOpenUpload(true)} className={styles.upload}>
                            <Button className={styles.btn_upload_image}>Upload Avatar</Button>
                        </div>
                    </Col>
                    <Col span={24} xs={19} className={styles.infoafter}>
                        <CustomizedForm
                            fields={fields}
                            onChange={(newFields) => {
                                setFields(newFields);
                            }}
                            onFailure={(error: any) => onFinishFailed(error)}
                            onSubmit={() => onFinish()}
                        />
                    </Col>
                </Row>
            </div>
        </>
    )
}
