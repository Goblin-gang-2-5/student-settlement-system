import React from "react";
import {Divider, Flex} from "antd";

export default function AuthLogin({children}:{children:React.ReactNode}){
    return (
        <>
            {children}
            <Divider plain style={{color: "#E3E3E3"}}>O</Divider>
            <Flex justify={"center"} style={{color: "#6A6A6A", fontWeight: 700}}>©2023 МИРЭА - Российский технологический Университет</Flex>
        </>
    )
}