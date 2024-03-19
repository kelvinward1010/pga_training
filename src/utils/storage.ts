//access_token
//user_cookie


const storage = {
    getToken: () => {
        return JSON.parse(
            window.localStorage.getItem(`user_cookie`) as string,
        );
    },
    setToken: (token: string) => {
        window.localStorage.setItem(`user_cookie`, JSON.stringify(token));
    },
    clearToken: () => {
        window.localStorage.removeItem(`user_cookie`);
    },
};

export default storage;
