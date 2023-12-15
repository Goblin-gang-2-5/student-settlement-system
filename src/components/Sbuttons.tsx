"use client"
import {Button} from "antd";

export default function Sbuttons(){
    return (
        <div style={{display: "flex", justifyContent: "space-between", maxWidth: "70%", gap: "1em"}}>
            <Button>Добавить студентов через exel</Button><Button>Добавить студента</Button>
        </div>
    )
}