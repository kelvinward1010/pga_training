import { useCallback, useState } from "react";
import { LoginParams, LoginValidation } from "../types";
import { validLogin, validateLogin } from "../pages/login/utils";

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

    const [validate, setValidate] = useState<LoginValidation>();
    const [done, setDone] = useState(true);

    
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
    },[formValues, onLogin])
    
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
                    onSubmit();
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
                    <div className="col-md-auto">
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