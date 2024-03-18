import { isValidEmail, isValidPassword } from "../../../../../utils/validate";
import { ISignUpParams } from "../../../types";

const validateEmail = (email: string) => {
    if(!email) return 'Email is required';
    if(!isValidEmail(email)){
        return 'Email is invalid';
    }

    return '';
}

const validatePassword = (password: string) => {
    if(!password) return 'Password is required';
    if(password.length <= 6) {
        return 'Password must be at least 6 characters';
    }
    if(!isValidPassword(password)){
        return 'Password not strong enough';
    }
    return '';
}

const validateRepeatPassword = (password: string, repeatPassword: string) => {
    if(!repeatPassword) return 'Password is required';
    if(password !== repeatPassword) return 'Password is not matching';
    return '';
}

const validateField = (field: string, value: string) => {
    if(value) return '';
    let fieldRequire = '';
    switch(field) {
        case 'name':
            fieldRequire = 'Name required';
            break;
        
        case 'gender':
            fieldRequire = 'Gender required';
            break;
        
        case 'region':
            fieldRequire = 'Region required';
            break;

        case 'state':
            fieldRequire = 'State required';
            break;
    }

    return fieldRequire;
}

export const validateSignup = (values: ISignUpParams) => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        repeatPassword: validateRepeatPassword(values.password, values.repeatPassword),
        name: validateField('name', values.name),
        gender: validateField('gender', values.gender),
        region: validateField('region', values.region),
        state: validateField('state', values.state),
    }
}

export const validSignup = (values: ISignUpParams) => {
    return !values.email && !values.password && !values.repeatPassword && !values.name && !values.gender && !values.region && !values.state
}