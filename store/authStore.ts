import create from 'zustand'
import { persist } from 'zustand/middleware'
import axios from "axios";
import { BASE_URL } from '../utils';


const authStore = (set: any) => ({
    userProfile: null,
    allUsers: [],
    adddUser: (user: any) => set({userProfile: user}),
    removeuser: () => set({userProfile: null}),
    fetchAllusers: async () => {
       const responce = await axios.get(`${BASE_URL}/api/users`);
       set({allUsers: responce.data})
    }
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
)

export default useAuthStore;