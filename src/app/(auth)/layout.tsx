import React from "react";
import {Divider, Flex} from "antd";
import MyDivider from "@/components/UI/MyDivider/MyDivider";

export default function AuthLogin({children}:{children:React.ReactNode}){
    return (
        <>
            {children}
            <MyDivider/>
            <div style={{display: "flex", justifyContent: "center", color: "#6A6A6A", fontWeight: 700}}>©2023 МИРЭА - Российский технологический Университет</div>
        </>
    )
}