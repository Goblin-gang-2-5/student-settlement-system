"use client";
import {useQuery} from "react-query";
import axios from "axios";

export default function useCurrentUser(){
    const {data, error, isError, isLoading} = useQuery(
        "currentUser",
        () => axios.get("/api/users/me").then(res => res.data)
    )
    return {
        data,
        error,
        isError,
        isLoading
    }
}