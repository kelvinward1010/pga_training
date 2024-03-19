const storageInfoUser = {
    getUserInfo: () => {
        return JSON.parse(window.localStorage.getItem('user') as string);
    },
    setUserInfo: (userInfo: any) => {
        return window.localStorage.setItem('user', JSON.stringify(userInfo));
    },
    clearUserInfo: () => {
        window.localStorage.removeItem(`user`);
    }
}

export default storageInfoUser;