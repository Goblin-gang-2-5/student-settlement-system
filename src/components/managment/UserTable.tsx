"use client"
import React, {useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Button, Form, Input, Modal, Skeleton, Table} from "antd";
import {start} from "node:repl";
import {getAllUsers} from "@/actions/server/data";
import {useAppSelector} from "@/hooks/storeHooks";

interface DataType {
    key: React.Key;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'ФИО',
        dataIndex: 'name',
    },
    {
        title: 'Почта',
        dataIndex: 'email',
    },
    {
      title: "Роль",
      dataIndex: "role"
    },
    {
        title: 'Добавлен',
        dataIndex: 'createdAt',
    },
];
export default function UserTable(){
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<DataType[]>([])
    const user = useAppSelector(state => state.user.user)
    const [openModal, setOpenModal] = useState(false)
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        const currentUser = users.find((value) => value.email === user.email)
        if (currentUser && newSelectedRowKeys.includes(currentUser.key)) newSelectedRowKeys.splice(Number(currentUser.key) - 1, 1)
        const adminUser = users.find((value) => value.role === "admin")
        if (adminUser && adminUser !== currentUser && newSelectedRowKeys.includes(adminUser.key)) newSelectedRowKeys.splice(Number(adminUser.key) - 1, 1)
        console.log(adminUser, currentUser)

        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const handleOkModal = () => {

    }

    const handleFinish = (e:{name: string, email: string, secondPassword:string, password: string}) => {
        console.log(e)
    }

    useEffect(() => {
        getAllUsers().then(d => setUsers(d))
    }, [])

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Разжаловать
                </Button>
                <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Выбрано ${selectedRowKeys.length} пользователей` : ''}
                </span>
            </div>
            {
                users? <Table rowSelection={rowSelection} columns={columns} dataSource={users} />
                : <Skeleton active/>
            }
            <Button type={"primary"} onClick={() => setOpenModal(true)}>Добавить пользователя</Button>
            <Modal title={"Добавление нового пользователя"} centered open={openModal} onCancel={() => setOpenModal(false)} onOk={handleOkModal} okButtonProps={{htmlType: 'submit', disabled: true}} cancelButtonProps={{disabled: false}}>
                <Form onFinish={handleFinish}>
                    <Form.Item name="name">
                        <Input autoComplete={'name'} placeholder={'ФИО'} />
                    </Form.Item>
                    <Form.Item name="email">
                        <Input autoComplete={'email'} placeholder={'Почта'} type={"email"}/>
                    </Form.Item>
                    <Form.Item name="password">
                        <Input autoComplete={'new-password'} placeholder={'Пароль'} type={"password"}  />
                    </Form.Item>
                    <Form.Item name="secondPassword">
                        <Input autoComplete={'new-password'} placeholder={'Повторите пароль'} type={"password"} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}