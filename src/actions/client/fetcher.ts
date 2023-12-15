"use client"
import axios from "axios";

export const getCurrentUser = async ():Promise<{
    name: string,
    email: string,
    avatarUrl: string,
    createdAt: Date,
    role: "user"|"admin"
}|null> => {
    try {
        const res = await axios.get("/api/users/me")
        return res.data
    }
    catch (e){
        console.error(e)
        return null
    }
}