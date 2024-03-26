import { atom } from "recoil";


export const refeshProductState = atom<any>({
    key: "refesh",
    default: false,
});