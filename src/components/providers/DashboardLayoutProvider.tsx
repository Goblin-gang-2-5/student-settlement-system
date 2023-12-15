"use client";
import React, {useEffect, useState} from "react";
import {Col, Menu, MenuProps, Row} from "antd";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
export default function DashboardLayoutProvider({children}:{children:React.ReactNode}){
    const items:MenuProps["items"] = [
        getItem("Карта", "1", <Image src={"/assets/map.png"} height={20} width={20} alt={'Карта'}/>),
        getItem("Управление", "2",  <Image src={"/assets/admin.png"} height={20} width={20} alt={'Добавление Администратора'}/>),
        getItem("Расселение студентов", '3', <Image src={"/assets/students.png"} height={20} width={20} alt={'Расселение студентов'}/>)
    ]
    const router = useRouter()
    const pathName = usePathname()
    const onClick: MenuProps['onClick'] = (e) => {
        switch (e.key){
            case "1":
                router.replace("/dashboard")
                break
            case "2":
                router.replace("/dashboard/management")
                break
            case "3":
                router.replace("/dashboard/students")
        }
    };
    const [defOpen, setDefOpen] = useState("1")
    useEffect(() => {
        console.log(pathName)
        if (pathName){
            switch (pathName){
                case "/dashboard/":
                    setDefOpen('1')
                    break
                case "/dashboard/management":
                    setDefOpen('2')
                    break
                case "/dashboard/students":
                    setDefOpen('3')
                    break
                default:
                    setDefOpen('1')
                    break
            }
        }
    }, [pathName])
    return (
        <Row style={{minHeight: "100%"}}>
            <Col flex={"15%"} style={{boxShadow: "4px 0 4px 0 rgba(0, 0, 0, 0.25)", minHeight: "91vh"}}>
                <Menu
                    onClick={onClick}
                    defaultSelectedKeys={[defOpen]}
                    mode={"inline"}
                    items={items}
                />
            </Col>
            <Col flex={"auto"} style={{paddingBlock: '2em', paddingInline: "1em", backgroundColor: "#F5F5F5", minHeight: "100%"}}>
                {children}
            </Col>
        </Row>
    )
}