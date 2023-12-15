"use client"
import {Button, Divider, Drawer, Dropdown, Flex, Image, MenuProps, Skeleton} from "antd";
import React, {useEffect, useRef, useState} from "react";
import useHotelData from "@/hooks/useHotelData";
import cl from "./map.module.css"
import hdate from "human-date"

export default function Map(){
    const {data, error, isError, isLoading} = useHotelData()
    const [dormitoryItems, setDormitoryItems] = useState<MenuProps["items"]>(undefined)
    const [floorItems, setFloorItems] = useState<MenuProps["items"]>(undefined)
    const [rooms, setRooms] = useState<any[]|null>(null)
    const [isActiveSvg, setIsSvgActive] = useState<number|null>(null)
    const [pickedBuilding, setPickedBuilding] = useState(0)
    const [pickedFloor, setPickedFloor] = useState(0)
    const [buildingsData, setBuildingsData] = useState<any[]>([])
    const [drawerOpen, setDrawerOpen] = useState(false)
    const activeSvg = useRef(null)
    useEffect(() => {
        if (!isLoading && data){
            console.log(data)
            let tempDormitoryItems:MenuProps["items"] = []
            let tempFloorsItems:MenuProps["items"] = []
            //@ts-ignore
            data.forEach((e, i) => {
                //@ts-ignore
                tempDormitoryItems.push({
                    key: `d${i}`,
                    label: e.address
                })
            })
            // @ts-ignore
            data[0].floors.forEach((e1, i1) => {
                tempFloorsItems?.push({
                    key: `f${i1}`,
                    // @ts-ignore
                    label: e1["floorNumber"]
                })
            })
            setDormitoryItems(tempDormitoryItems)
            setFloorItems(tempFloorsItems)
            setBuildingsData(data)
            console.log(dormitoryItems)
        }
    }, [isLoading, data]);
    useEffect(() => {
        if (buildingsData.length > 0) {
            console.log(buildingsData)
            setRooms(buildingsData[pickedBuilding].floors[pickedFloor].rooms)
        }
    }, [pickedBuilding, pickedFloor, buildingsData]);

    const handleSvgClick = (e:any) => {
        console.log(e, isActiveSvg)
        if (isActiveSvg === Number(e.target.dataset.room)){
            e.target.style.fill = '#dadada'
            setDrawerOpen(false)
            setIsSvgActive(null)
            return;
        }
        if (isActiveSvg) return
        setIsSvgActive(Number(e.target.dataset.room))
        // e.target.style.fill = 'red'
        setDrawerOpen(true)
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false)
        setIsSvgActive(null)
    }
    const handleBuildingClick:MenuProps['onClick'] = ({key}) => {
        setPickedBuilding(Number(key.substring(1, 2)))
    }
    const handleFloorClick:MenuProps['onClick'] = ({key}) => {
        setPickedFloor(Number(key.substring(1, 2)))
    }
    return (
        <main style={{
            display: "flex",
            flexDirection: 'column',
            marginInline: "1em",
            background: "#FFFFFF",
            maxWidth: "100%"
        }}>
            <Drawer
                title={`Комната ${rooms ? rooms[isActiveSvg ?? 0].number?? "x" : "x"}`}
                open={drawerOpen}
                closable={false}
                onClose={handleDrawerClose}
            >
                <Flex vertical>
                    <Flex vertical gap={".5em"}>
                        <span>Студентов в команте: {rooms ? rooms[isActiveSvg ?? 0].students?.length?? "0" : "0"}</span>
                        <span>Свободных мест в команате: {4 - (rooms ? rooms[isActiveSvg ?? 0].students?.length?? 0 : 0)}</span>
                    </Flex>
                    <Divider/>
                    {
                        // @ts-ignore
                        rooms? rooms[isActiveSvg?? 0].students?.map((s, i) => (
                            <Flex key={i} vertical gap={"1em"}>
                                <Flex justify={"space-between"}>
                                    <span>Студент {i}</span>
                                    {/*@ts-ignore*/}
                                    <Image src={s.imageUrl ?? ""} alt={"Фото студента"} width={130}/>
                                </Flex>
                                <Flex vertical>
                                    <span style={{color: '#D9D9D9', fontStyle: "italic"}}>Фамилия</span>
                                    <span style={{fontWeight: 700}}>{s.surname}</span>
                                </Flex>
                                <Flex vertical>
                                    <span style={{color: '#D9D9D9', fontStyle: "italic"}}>Имя</span>
                                    <span style={{fontWeight: 700}}>{s.name}</span>


                                </Flex>
                                <Flex vertical>
                                    <span style={{color: '#D9D9D9', fontStyle: "italic"}}>Отчество</span>
                                    <span style={{fontWeight: 700}}>{s.fatherName}</span>


                                </Flex>
                                <Flex vertical>
                                <span style={{color: '#D9D9D9', fontStyle: "italic"}}>Дата рождения</span>
                                    <span style={{fontWeight: 700}}>{hdate.prettyPrint(s.birthDate)}</span>
                                </Flex>
                                <Flex vertical>
                                    <span style={{color: '#D9D9D9', fontStyle: "italic"}}>Номер приказа о предоставлении общежития</span>
                                    <span style={{fontWeight: 700}}>№{s.roomOrderNumber}</span>
                                </Flex>
                                <Flex vertical>
                                    <span style={{color: '#D9D9D9', fontStyle: "italic"}}>Номер приказа о зачислении</span>
                                    <span style={{fontWeight: 700}}>№{s.universcityOrderNumber}</span>
                                </Flex>
                                <Flex>
                                    <span style={{
                                        color: '#D9D9D9',
                                        fontStyle: "italic"
                                    }}>Дата зачисления</span>
                                    <span style={{fontWeight: 700}}>{hdate.prettyPrint(s.enrollDate)}</span>
                                </Flex>
                                <Flex vertical>
                                    <span style={{
                                        color: '#D9D9D9',
                                        fontStyle: "italic"
                                    }}>Место рождения</span>
                                    <span style={{fontWeight: 700}}>{s.bornPlace}</span>
                                </Flex>
                                <Flex vertical>
                                     <span style={{
                                         color: '#D9D9D9',
                                         fontStyle: "italic"
                                     }}>Адресс проживания</span>
                                    <span style={{fontWeight: 700}}>{s.livingAddress}</span>
                                </Flex>
                            </Flex>
                        )) ?? "Стундентов нет" : "Студентов нет"
                    }
                </Flex>
            </Drawer>
            <Flex justify={"start"} align={'center'} gap={"2em"}
                  style={{height: "3rem", backgroundColor: "#496FDC", maxWidth: "100%", paddingInline: "2rem"}}>
                {/*@ts-ignore*/}
                <Dropdown menu={{items: dormitoryItems, selectable: true, defaultSelectedKeys: ['d0'], onClick: handleBuildingClick}}>
                    <Button loading={isLoading} style={{borderRadius: 50}}>
                        Выбор общежития...
                    </Button>
                </Dropdown>
                <Dropdown menu={{items: floorItems, selectable:true, defaultSelectedKeys: ["f0"], onClick: handleFloorClick}}>
                    <Button loading={isLoading} style={{borderRadius: 50}}>
                        Выбор этажа...
                    </Button>
                </Dropdown>
            </Flex>
            <Flex style={{paddingInline: "1em", paddingBlock: "2em"}}>
                {
                    isLoading || !rooms? <div><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/></div>
                        : <Flex justify={"center"} style={{minWidth: "100%"}} align={"center"}>
                            <svg  width="1430"
                                 height="400" style={{paddingTop: "-5em"}}><title>my vector
                                image</title>
                                <g transform="scale(2)" className="currentLayer"><title>Layer 1</title>
                                    <rect onClick={handleSvgClick} data-room={0} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" id="svg_3" x="4.914394378662109"
                                          y="4.715952634811401" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1">
                                    </rect>
                                    <text
                                        x="22"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[0]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={1} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="41.879378259181976"
                                          y="4.7159519493579865" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_6"/>
                                    <text
                                        x="58"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[1]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={2} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="79.23346614837646"
                                          y="4.715954542160034" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_7"/>
                                    <text
                                        x="95"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[2]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={3} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="116.19844102859497"
                                          y="4.715952634811401" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_15"/>
                                    <text
                                        x="132"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[3]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={4} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="153.16342490911484"
                                          y="4.7159519493579865" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_16"/>
                                    <text
                                        x="170"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[4]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={5} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="190.51751279830933"
                                          y="4.715954542160034" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_17"/>
                                    <text
                                        x="207"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[5]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={6} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="227.48249101638794"
                                          y="4.71595299243927" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_18"/>
                                    <text
                                        x="245"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[6]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={7} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="264.4474748969078"
                                          y="4.715952306985855" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_22"/>
                                    <text
                                        x="282"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[7]?.number?? 'x': 'x'}
                                    </text>
                                    <rect fill={'#dadada'} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="302.57976891131466"
                                          y="5.1050571501255035" width="69.7976622581482" height="32"
                                          style={{color: "rgb(0, 0, 0)"}} fill-opacity="1" id="svg_55"/>
                                    <text
                                        x="335"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        Холл
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={8} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="375.73152154684067"
                                          y="4.715952306985855" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_20"/>
                                    <text
                                        x="392"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[8]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={9} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="413.08560943603516"
                                          y="4.715954899787903" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_21"/>
                                    <text
                                        x="430"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[9]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={10} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="450.8287892341614"
                                          y="4.3268479108810425" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_24"/>
                                    <text
                                        x="468"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[10]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={11} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="487.79377311468124"
                                          y="4.326847225427628" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_34"/>
                                    <text
                                        x="505"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[11]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={12} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="525.1478610038757"
                                          y="4.326849818229675" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_35"/>
                                    <text
                                        x="542"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[12]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={13} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="562.1128358840942"
                                          y="4.3268479108810425" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_31"/>
                                    <text
                                        x="579"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[13]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={14} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="599.0778197646141"
                                          y="4.326847225427628" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_32"/>
                                    <text
                                        x="617"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[14]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={15} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="636.4319076538086"
                                          y="4.326849818229675" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_33"/>
                                    <text
                                        x="653"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[15]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={16} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="673.3968858718872"
                                          y="4.326848268508911" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_25"/>
                                    <text
                                        x="690"
                                        y="23"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[16]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={17} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="4.914394378662109"
                                          y="93.04280018806458" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_36"/>
                                    <text
                                        x="22"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[17]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={18} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="41.879378259181976"
                                          y="93.04279950261116" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_53"/>
                                    <text
                                        x="58"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[18]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={19} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="79.23346614837646"
                                          y="93.04280209541321" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_54"/>
                                    <text
                                        x="95"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[19]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={20} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="116.19844102859497"
                                          y="93.04280018806458" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_50"/>
                                    <text
                                        x="132"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[20]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={21} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="153.16342490911484"
                                          y="93.04279950261116" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_51"/>
                                    <text
                                        x="170"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[21]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={22} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="190.51751279830933"
                                          y="93.04280209541321" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_52"/>
                                    <text
                                        x="207"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[22]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={23} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="227.48249101638794"
                                          y="93.04280054569244" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_44"/>
                                    <text
                                        x="245"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[23]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={24} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="264.4474748969078"
                                          y="93.04279986023903" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_48"/>
                                    <text
                                        x="282"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[24]?.number?? 'x': 'x'}
                                    </text>
                                    <rect fill={'#dadada'} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="302.57976891131466"
                                          y="93.4319089949131" width="69.7976622581482" height="32"
                                          style={{color: "rgb(0, 0, 0)"}} fill-opacity="1" id="svg_56"/>
                                    <text
                                        x="335"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        Холл
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={25} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="375.73152154684067"
                                          y="93.04279986023903" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_46"/>
                                    <text
                                        x="392"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[25]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={26} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="413.08560943603516"
                                          y="93.04280245304108" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_47"/>
                                    <text
                                        x="430"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[26]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={27} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="450.8287892341614"
                                          y="92.65369546413422" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_37"/>
                                    <text
                                        x="468"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[27]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={28} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="487.79377311468124"
                                          y="92.6536947786808" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_42"/>
                                    <text
                                        x="505"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[28]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={29} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="525.1478610038757"
                                          y="92.65369737148285" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_43"/>
                                    <text
                                        x="542"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[29]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={30} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="562.1128358840942"
                                          y="92.65369546413422" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_39"/>
                                    <text
                                        x="579"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[30]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={31} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="599.0778197646141"
                                          y="92.6536947786808" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_40"/>
                                    <text
                                        x="617"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[31]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={32} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="636.4319076538086"
                                          y="92.65369737148285" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_41"/>
                                    <text
                                        x="653"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[32]?.number?? 'x': 'x'}
                                    </text>
                                    <rect onClick={handleSvgClick} data-room={33} className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="673.3968858718872"
                                          y="92.65369582176208" width="34" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_38"/>
                                    <text
                                        x="690"
                                        y="111"
                                        font-size="12"
                                        text-anchor="middle"
                                        alignment-baseline="middle"
                                        fill="black"
                                    >
                                        {rooms? rooms[33]?.number?? 'x': 'x'}
                                    </text>
                                    <foreignObject className={cl.room} stroke="#222222" stroke-width="2"
                                                   stroke-linejoin="round"
                                                   stroke-dashoffset="" fill-rule="nonzero" font-size="100"
                                                   font-family="Georgia, serif" letter-spacing="0" word-spacing="0"
                                                   marker-start="" marker-mid="" marker-end="" id="svg_59" x="5" y="5"
                                                   width="0" height="2"
                                                   style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}><p>text</p>
                                    </foreignObject>
                                    <foreignObject className={cl.room} stroke="#222222" stroke-width="2"
                                                   stroke-linejoin="round"
                                                   stroke-dashoffset="" fill-rule="nonzero" font-size="100"
                                                   font-family="Georgia, serif" letter-spacing="0" word-spacing="0"
                                                   marker-start="" marker-mid="" marker-end="" id="svg_65" x="500"
                                                   y="-150"
                                                   width="22" height="14"
                                                   style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}><p>text</p>
                                    </foreignObject>
                                </g>
                            </svg>
                        </Flex>
                }
            </Flex>
        </main>
    )
}