"use client";
import {Avatar, Button, Dropdown, Flex, MenuProps} from "antd";
import cl from "./header.module.css"
import React, {useEffect, useState} from "react";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {logOut} from "@/actions/server/authenticate";
import {usePathname, useRouter} from "next/navigation";
import {getCurrentUser} from "@/actions/client/fetcher";
import {useAppDispatch} from "@/hooks/storeHooks";

export default function Navbar(){
    const [showInput, setShowInput] = useState(true)
    const [user, setUser] = useState<{
        name: string,
        email: string,
        avatarUrl: string,
        createdAt: Date,
        role: "user"|"admin"
    }|null>(null)
    const router = useRouter()
    const items:MenuProps["items"] = [
        {
            key: "u0",
            label: "Профиль",
            icon: <UserOutlined />,
            onClick: () => router.replace("/dashboard/profile")
        },
        {
            key: "u1",
            label: "Выйти",
            danger: true,
            icon: <LogoutOutlined />,
            onClick: async () => {
                await logOut()
            }
        }
    ]
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (pathname === "/login") setShowInput(false)
        else {
            getCurrentUser().then(user => {
                    setUser(user)
                }
            )

        }
    }, [pathname])
    return (
        <Flex justify={"space-between"} align={"center"} style={{minHeight: "100%", paddingInline: "1em"}}>

                    {
                        showInput &&  <Flex align="center" gap={"1em"}>
                            <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="ion:search">
                                    <path id="Vector"
                                          d="M44.5986 41.1514L35.4102 31.9629C37.6223 29.0179 38.8165 25.4333 38.8125 21.75C38.8125 12.3418 31.1582 4.6875 21.75 4.6875C12.3418 4.6875 4.6875 12.3418 4.6875 21.75C4.6875 31.1582 12.3418 38.8125 21.75 38.8125C25.4333 38.8165 29.0179 37.6223 31.9629 35.4102L41.1514 44.5986C41.6165 45.0144 42.2231 45.2364 42.8467 45.2189C43.4704 45.2014 44.0636 44.9459 44.5048 44.5048C44.9459 44.0636 45.2014 43.4704 45.2189 42.8467C45.2364 42.2231 45.0144 41.6165 44.5986 41.1514ZM9.5625 21.75C9.5625 19.3395 10.2773 16.9832 11.6165 14.979C12.9556 12.9748 14.8591 11.4127 17.086 10.4902C19.313 9.56778 21.7635 9.32642 24.1277 9.79668C26.4918 10.2669 28.6634 11.4277 30.3679 13.1321C32.0723 14.8366 33.2331 17.0082 33.7033 19.3723C34.1736 21.7365 33.9322 24.187 33.0098 26.414C32.0873 28.6409 30.5252 30.5444 28.521 31.8835C26.5168 33.2227 24.1605 33.9375 21.75 33.9375C18.5189 33.9336 15.4212 32.6483 13.1364 30.3636C10.8517 28.0788 9.56638 24.9811 9.5625 21.75Z"
                                          fill="white"/>
                                </g>
                            </svg>
                            <input className={cl.input} style={{
                                paddingInline: "1em",
                                paddingBlock: ".5em",
                                borderRadius: "50px",
                                outline: "none",
                                border: "none",
                                height: "2em"
                            }} placeholder={"Начните вводить студента..."}/>
                        </Flex>
                    }
                    {
                        user &&
                            <Dropdown menu={{items}}>
                                <Button style={{display: "flex", height: "fit-content", borderRadius: 50}}>
                                    <Flex align={"center"} gap={'.5em'} style={{cursor: "pointer", paddingBlock: ".4em"}}>
                                        <Avatar src={user.avatarUrl} alt={"avatar"}/>
                                        <span style={{fontWeight: 700}}>{user.name}</span>
                                    </Flex>
                                </Button>
                            </Dropdown>
                    }
        </Flex>
    )
}