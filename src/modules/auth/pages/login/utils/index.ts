import { isValidEmail } from "../../../../../utils/validate";
import { LoginParams, LoginValidation } from "../../../types";

const validateEmail = (email: string) => {
    if(!email) return 'Email is required';
    if(!isValidEmail(email)){
        return 'Email is invalid';
    }

    return '';
}

const validatePassword = (password: string) => {
    if(!password) return 'Password is required';
    if(password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    // if(!isValidPassword(password)){
    //     return 'Password not strong enough';
    // }
    return '';
}

export const validateLogin = (values: LoginParams): LoginValidation => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
    }
}

export const validLogin = (values: LoginValidation) => {
    return !values.email && !values.password;
}