"use client"
import React, {useEffect, useState} from "react";
import {Flex, Skeleton} from "antd";
import {getCurrentUser} from "@/actions/client/fetcher";
import UserMainCard from "@/components/UI/cards/UserMainCard";
import UserInfoCard from "@/components/UI/cards/UserInfoCard";

export default function ProfileWrapper(){
    const [user, setUser] = useState<{
        name: string,
        email: string,
        avatarUrl: string,
        createdAt: Date,
        role: "user"|"admin"
    }|null>(null)
    useEffect(() => {
        getCurrentUser().then((user) => {
            setUser(user)
        })
    }, [])
    return (
        <div>
            {
                user? <Flex style={{marginBlock: "2em", maxWidth: "100%"}} gap={"2em"}>
                    <UserMainCard user={user}/>
                    <UserInfoCard user={user}/>
                </Flex>
                    : <Flex style={{marginBlock: "2em", minWidth: "60%", maxWidth: "60%"}} gap={"2em"}>
                        <Skeleton.Image style={{height: 550, width: 550}} active/>
                        <Skeleton active/>
                    </Flex>
            }
            </div>
    )
}