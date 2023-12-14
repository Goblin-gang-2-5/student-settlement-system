"use client"

import {useQuery} from "react-query";
import axios from "axios";

export default function useHotelData(){
    const {data, error, isError, isLoading} = useQuery(
        "hotelData",
        () => axios.get("/api/dormitory").then(res => res.data)
    )
    return {
        data,
        error,
        isError,
        isLoading
    }
}
