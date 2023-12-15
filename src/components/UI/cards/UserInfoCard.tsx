"use client"
import {Divider, Flex, Image} from "antd";
import hdate from "human-date"


export default function UserInfoCard({user}:{user: {
        name: string,
        email: string,
        avatarUrl: string,
        createdAt: Date,
        role: "user"|"admin"
    }}){
    const job = user.role === 'user'? "Ответственный по делам со студентами":"Технический специалист"
    return (
        <div style={{
            paddingBlock: "3em",
            paddingInline: "3em",
            fontSize: 24,
            fontWeight: 700,
            backgroundColor: "white",
            boxShadow: "-4px 4px 4px 0 rgba(0, 0, 0, 0.25)",
            minWidth: "50%"
        }}>
            <Flex vertical>
                <Flex vertical>
                    <span style={{fontSize: 24, fontWeight: 400}}>{user.name}</span>
                    <span style={{fontSize: 16, fontWeight: 400, color: "#6A6A6A"}}>{job}</span>
                </Flex>
                <Divider plain/>
                <Flex justify={"space-between"}>
                    <Flex vertical gap={"2em"}>
                        <span style={{fontSize: 18}}>E-main</span>
                        <span style={{fontSize: 18}}>На платформе с</span>
                    </Flex>
                    <Flex vertical gap={"2em"}>
                        <span style={{fontSize: 18, color: "#6A6A6A"}}>{user.email}</span>
                        <span style={{fontSize: 18, color: "#6A6A6A"}}>{hdate.prettyPrint(user.createdAt)}</span>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    )
}