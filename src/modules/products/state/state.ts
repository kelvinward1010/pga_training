import { selector } from "recoil";
import { refeshProductState } from "./atom";


export const refeshProduct: any = selector({
    key: "refeshPD",
    get: ({ get }) => {
        const refeshpd = get(refeshProductState);
        return refeshpd;
    },
});