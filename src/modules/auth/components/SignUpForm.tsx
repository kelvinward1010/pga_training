import { useCallback, useState } from "react";
import { IGenderParams, ILocationParams, ISignUpParams } from "../types"
import { GENDER } from "../data";
import { validSignup, validateSignup } from "../pages/signup/utils";
import { useDispatch } from "react-redux";
import { registerUser, RegisterValues } from "../../../redux/actions/authActions";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { signinUrl } from "../../../routers/urls";
import { notification } from "antd";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";


interface Props {
    onSignUp: (values: ISignUpParams) => void;
    loading: boolean;
    errorMessage: string;
    locations: Array<ILocationParams>
}

const SignUpForm: React.FC<Props> = ({
    onSignUp,
    loading,
    errorMessage,
    locations,
}) => {

    const [formValues, setFormValues] = useState<ISignUpParams>({
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
        region: '',
        state: '',
    })

    const [validate, setValidate] = useState<ISignUpParams>();
    const [done, setDone] = useState(true);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        if(formValues.email != '' && formValues.password != ''){
            setDone(false);
        }
    };

    const renderGender = () => {
        const arrGender: JSX.Element[] = [
            <option disabled selected value={''} key={''}>
                {' '}
                -- Select an option --
            </option>,
        ]
        GENDER.map((g: IGenderParams, index: number) =>{
            arrGender.push(
                <option value={g.value} key={index}>
                    {g.label}
                </option>
            )
        })
        return arrGender;
    }

    const renderRegion = () => {
        const arrRegion: JSX.Element[] = [
            <option disabled selected value={''} key={''}>
                {' '}
                -- Select an option --
            </option>,
        ]
        locations.map((g: ILocationParams, index: number) =>{
            arrRegion.push(
                <option value={g.id} key={index}>
                    {g.name}
                </option>
            )
        })
        return arrRegion;
    }

    const renderState = () => {
        const arrState: JSX.Element[] = [
            <option disabled selected value={''} key={''}>
                {' '}
                -- Select an option --
            </option>,
        ]
        locations.map((location: ILocationParams, index: number) =>{
            arrState.push(
                <option value={location.id} key={index}>
                    {location.name}
                </option>
            )
        })
        return arrState;
    }

    const onSubmit = useCallback(async () => {

        const validate = validateSignup(formValues)
        
        setValidate(validate);

        if(!validSignup(validate)){
            return;
        }

        onSignUp(formValues)
    },[formValues, onSignUp])

    const handleSignUp = () => {
        const data: RegisterValues = {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
        }
        dispatch(registerUser(data)).then((res) => {
            if(res.meta.requestStatus == 'fulfilled') {
                notification.success({
                    message: "You have been sign up successfully!",
                    icon: (
                        <CheckCircleOutlined className="done" />
                    )
                })
                navigate(signinUrl);
            }else{
                notification.error({
                    message: `Could not sign up. Please try again!`,
                    description: ` ${res.payload}`,
                    icon: (
                      <WarningOutlined className='warning' />
                    )
                })
            }
        })
    }

    // useEffect(() => {
    //     fetch('http://api.training.div3.pgtest.co/api/v1/location')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log(data);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching data:', error);
    //       });
    // }, []);

    return (
        <>
            {errorMessage != '' ? (
                <div className="alert alert-danger" role="alert" style={{width: '100%'}}>
                    {errorMessage}
                </div>
            ) : null}
            <form
                autoComplete="off"
                style={{
                    maxWidth: '560px',
                    width: '100%',
                }}
                noValidate
                onSubmit={(e) => {
                    e.preventDefault();
                    // onSubmit();
                    handleSignUp();
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
                <div className="col-md-12">
                    <label htmlFor="inputRepeatPassword" className="form-label">
                        Repeat Password
                    </label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="inputRepeatPassword" 
                        name="repeatPassword"
                        value={formValues.repeatPassword}
                        onChange={handleChange}
                    />

                    {!!validate?.repeatPassword && (
                        <small className="text-danger">
                            {validate.repeatPassword}
                        </small>
                    )}
                </div>
                
                <div className="col-md-12">
                    <label htmlFor="inputName" className="form-label">
                        Name
                    </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputName" 
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                    />

                    {!!validate?.name && (
                        <small className="text-danger">
                            {validate.name}
                        </small>
                    )}
                </div>

                <div className="col-md-12">
                    <label htmlFor="selectGender" className="form-label">
                        Gender
                    </label>
                    <select 
                        className="form-control"
                        name="gender" 
                        id="selectGender"
                        value={formValues.gender}
                        onChange={handleChange}
                    >
                        {renderGender()}
                    </select>

                    {!!validate?.gender && (
                        <small className="text-danger">
                            {validate.gender}
                        </small>
                    )}
                </div>

                <div className="col-md-12">
                    <label htmlFor="selectRegion" className="form-label">
                        Region
                    </label>
                    <select 
                        className="form-control"
                        name="region" 
                        id="selectRegion"
                        value={formValues.region}
                        onChange={handleChange}
                    >
                        {renderRegion()}
                    </select>

                    {!!validate?.region && (
                        <small className="text-danger">
                            {validate.region}
                        </small>
                    )}
                </div>

                {formValues.region ? (
                    <div className="col-md-12">
                        <label htmlFor="selectState" className="form-label">
                            State
                        </label>
                        <select 
                            className="form-control"
                            name="state" 
                            id="selectState"
                            value={formValues.state}
                            onChange={handleChange}
                        >
                            {renderState()}
                        </select>

                        {!!validate?.state && (
                            <small className="text-danger">
                                {validate.state}
                            </small>
                        )}
                    </div>
                ):
                    null
                }

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
                            disabled={loading || done}
                        >
                            Đăng Kí
                            {loading && <div className="spinner-border spinner-border-sm text-light ml-2" role="status"/>}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignUpForm