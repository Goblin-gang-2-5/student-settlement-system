"use client";
import React from "react";
import {Button, Col, Dropdown, Flex, Row} from "antd";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayoutProvider({children}:{children:React.ReactNode}){
    return (
        <Row>
            <Col flex={"15%"} style={{boxShadow: "4px 0 4px 0 rgba(0, 0, 0, 0.25)", minHeight: "91vh"}}>
                <Flex vertical gap={'2em'} style={{fontWeight: 700, paddingInline: "2em", paddingBlock: "2em"}}>
                    <Link href={"/dashboard"} style={{textDecoration: "none", color: "black"}}>
                        <div style={{display: "flex", alignContent: "center", gap: "1em"}}>
                            <Image src={"/assets/map.png"} height={20} width={20} alt={'Карта'}/>
                            <span>Карта</span>
                        </div>
                    </Link>
                    <Link href={"/admins"} style={{textDecoration: "none", color: "black"}}>
                        <div style={{display: "flex", alignContent: "center", gap: "1em"}}>
                            <Image src={"/assets/admin.png"} height={20} width={20} alt={'Добавление Администратора'}/>
                            <span>Добавление администратора</span>
                        </div>
                    </Link>
                    <Link href={"/students"} style={{textDecoration: "none", color: "black"}}>
                        <div style={{display: "flex", alignContent: "center", gap: "1em"}}>
                            <Image src={"/assets/students.png"} height={20} width={20} alt={'Расселение студентов'}/>
                            <span>Расселение студентов</span>
                        </div>
                    </Link>
                </Flex>
            </Col>
            <Col flex={"auto"} style={{paddingBlock: '2em', paddingInline: "1em", backgroundColor: "#F5F5F5", minHeight: "100%"}}>
                {children}
            </Col>
        </Row>
    )
}