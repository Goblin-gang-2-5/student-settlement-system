"use client"
import {Button, Flex, Form, Input, Typography} from "antd";
import Image from "next/image";
import {authenticate} from "@/actions/authenticate";

export default function Login(){
    const onFinish = async (e:{email:string, password:string}) => {
        console.log(e)
        await authenticate(e)
    }
    return(
        <Flex justify={'center'} vertical align={'center'} style={{paddingBlock: "2em"}}>
            <Image src={"/assets/new-mirea-logo.png"} alt={"new mirea logo"} width={100} height={100}/>
            <Typography.Title level={2}>Авторизация</Typography.Title>
            <Form onFinish={onFinish}>
                <Form.Item name="email">
                    <Input autoComplete={'email'} placeholder={'Почта'} type={"email"} style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}/>
                </Form.Item>
                <Form.Item name={"password"}>
                    <Input autoComplete={'current-password'} placeholder={'Пароль'} type={"password"}  style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}}/>
                </Form.Item>
                <Form.Item>
                    <Button type={"primary"} htmlType={"submit"} style={{minWidth: "100%", display: 'flex', alignContent: 'center', justifyContent: "center"}}>
                        <span style={{fontWeight: 700, justifySelf: "center"}}>войти</span>
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
    )
}