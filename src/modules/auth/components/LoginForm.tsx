import { useCallback, useState } from "react";
import { LoginParams, LoginValidation } from "../types";
import { validLogin, validateLogin } from "../pages/login/utils";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/actions/authActions";
import { notification } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { homeUrl } from "../../../routers/urls";

interface LoginFormProps {
    onLogin: (values: LoginParams) => void;
    loading: boolean;
    errorMessage: string;
}


const LoginForm: React.FC<LoginFormProps> = ({
    onLogin,
    loading,
    errorMessage,
}) => {

    const [formValues, setFormValues] = useState<LoginParams>({
        email: '',
        password: '',
        rememberMe: false
    })

    const navigate = useNavigate();
    const [validate, setValidate] = useState<LoginValidation>();
    const dispatch: AppDispatch = useDispatch();

    
    const handleChange = (e: any) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        // if(formValues.email != '' && formValues.password != ''){
        //     setDone(false);
        // }
    };

    const onSubmit =  useCallback(() => {
        const validate = validateLogin(formValues)
        
        setValidate(validate);

        if(!validLogin(validate)){
            return;
        }

        onLogin(formValues);
    },[formValues, onLogin]);

    const handleLogin = (values: LoginValidation) => {
        dispatch(loginUser(values)).then((res: any) => {
            if(res.payload?.success === true){
                notification.success({
                    message: "You have been sign in successfully!",
                    icon: (
                        <CheckCircleOutlined className="done" />
                    )
                })
                navigate(homeUrl)
            }else if(res.payload?.success === false){
                notification.error({
                    message: `Could not sign in. Please try again!`,
                    description: ` ${res.payload.errors.email}`,
                    icon: (
                      <WarningOutlined className='warning' />
                    )
                })
            }
        })
    }
    
    return (
        <>
            {errorMessage != '' ? <p>{errorMessage}</p> : null}
            <form
                style={{
                    maxWidth: '560px',
                    width: '100%',
                }}
                noValidate
                onSubmit={(e) => {
                    e.preventDefault();
                    // onSubmit();
                    handleLogin(formValues);
                }}
                className="row g-3 needs-validation"
            >
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">
                        Email
                    </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputEmail"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />

                    {!!validate?.email && (
                        <small className="text-danger">
                            {validate.email}
                        </small>
                    )}
                </div>

                <div className="col-md-12">
                    <label htmlFor="inputPassword" className="form-label">
                        Password
                    </label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="inputPassword" 
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />

                    {!!validate?.password && (
                        <small className="text-danger">
                            {validate.password}
                        </small>
                    )}
                </div>

                <div className="col-12">
                    <div className="form-check">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="invalidCheck" 
                            name="rememberMe"
                            onChange={(e) => setFormValues({...formValues, [e.target.name]: e.target.checked})}
                        />
                        <label htmlFor="invalidCheck" className="form-check-label">
                            Lưu thông tin đăng nhập
                        </label>
                    </div>
                </div>

                <div className="row justify-content-md-center" style={{ margin: '16px 0'}}>
                    <div className="col-auto">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            style={{
                                minWidth: '160px',
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            disabled={loading}
                        >   
                            Đăng Nhập
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LoginForm