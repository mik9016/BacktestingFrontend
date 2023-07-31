import { defineStore } from 'pinia'
import {computed, ref} from "vue";

interface ITrade{
    id: number,
    ratio: string,
    entryInDollars: number,
    entryInPercents: number,
    resultInDollars: number,
    resultInPercents: number,
    instrumentName: string,
    userId: number,
    strategyName: string
}

interface IUser{
    id: number,
    username: string,
    passwordHash: string,
    email: string,
    trades: ITrade[],
}
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('counter', () => {
    const authToken = ref<string>('')
    const isAuthenticated = ref<boolean>(false)
    const user = ref<IUser>({
        id: 0,
        username: '',
        passwordHash: '',
        email: '',
        trades: [],
    })
    const getAuthToken = computed(() => authToken.value)
    const setAuthToken = (token:string) => {
        authToken.value = token
    }
    const setIsAuthenticated = (flag:boolean) => {
        isAuthenticated.value = flag
    }
    const getIsAuthenticated = computed(() => isAuthenticated.value)

    const getUser = computed(() => user)
    const setUser = (val: IUser) => {
        user.value = val;
    }


    return { authToken, user, getAuthToken,setAuthToken, getUser ,setUser,getIsAuthenticated,setIsAuthenticated}
})
