import {Col, Flex, Row} from "antd";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import Link from "next/link";
export default function Header({children}:{children: React.ReactNode}){
    return (
        <Row style={{height: "7rem"}}>
            <Col flex={"15%"} style={{backgroundColor: "#3D68E2", color: "#F5F5F5", fontSize: 20, fontWeight: 700, paddingInline: "1rem", boxShadow: "4px 0 4px 0 rgba(0, 0, 0, 0.5)"}}>
                <Flex align={"center"} justify={"start"} style={{minHeight: "100%"}}>
                    <Link href={"/"} style={{textDecoration: "none", color: "white"}}>
                        <Flex align={"center"} gap={"0.5em"}>
                            <Image src={"/assets/mirea-logo.png"} height={75} width={68} alt={"mirea-logo"}/>
                            <span>MIREA общежития</span>
                        </Flex>
                    </Link>
                </Flex>
            </Col>
            <Col flex={"auto"} style={{backgroundColor: "#496FDC", maxWidth: "100%"}}>
                {children}
            </Col>
        </Row>
    )
}