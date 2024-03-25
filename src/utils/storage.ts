//access_token
//user_cookie


const storageFetch = {
    getToken: () => {
        return JSON.parse(
            window.localStorage.getItem(`token`) as string,
        );
    },
    setToken: (token: string) => {
        window.localStorage.setItem(`token`, JSON.stringify(token));
    },
    clearToken: () => {
        window.localStorage.removeItem(`token`);
    },
};

export default storageFetch;
