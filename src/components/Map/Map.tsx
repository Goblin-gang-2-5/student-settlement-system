"use client"
import {Button, Dropdown, Flex, MenuProps, Skeleton} from "antd";
import React, {useEffect, useState} from "react";
import useHotelData from "@/hooks/useHotelData";
import cl from "./map.module.css"

export default function Map(){
    const {data, error, isError, isLoading} = useHotelData()
    const [dormitoryItems, setDormitoryItems] = useState<MenuProps["items"]>(undefined)
    const [floorItems, setFloorItems] = useState<MenuProps["items"]>(undefined)
    const [isActiveSvg, setIsSvgActive] = useState(Array(34).fill(false))
    const handleDormitoryClick = (e:any) => {
        console.log(e)
    }
    const handleFloorClick = (e:any) => {
        console.log(e)
    }
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
                    label: e.address,
                    onClick: handleDormitoryClick
                })
            })
            // @ts-ignore
            data[0].floors.forEach((e1, i1) => {
                tempFloorsItems?.push({
                    key: `f${i1}`,
                    // @ts-ignore
                    label: e1["floorNumber"],
                    onClick: handleFloorClick
                })
            })
            setDormitoryItems(tempDormitoryItems)
            setFloorItems(tempFloorsItems)
            console.log(dormitoryItems)
        }
    }, [isLoading, data]);
    // @ts-ignore
    return (
        <main style={{
            display: "flex",
            flexDirection: 'column',
            marginInline: "1em",
            background: "#FFFFFF",
            maxWidth: "100%"
        }}>
            <Flex justify={"start"} align={'center'} gap={"2em"}
                  style={{height: "3rem", backgroundColor: "#496FDC", maxWidth: "100%", paddingInline: "2rem"}}>
                {/*@ts-ignore*/}
                <Dropdown menu={{items: dormitoryItems, selectable: true, defaultSelectedKeys: ['d1']}}>
                    <Button loading={isLoading} style={{borderRadius: 50}}>
                        Выбор общежития...
                    </Button>
                </Dropdown>
                <Dropdown menu={{items: floorItems, selectable:true, defaultSelectedKeys: ["f1"]}}>
                    <Button loading={isLoading} style={{borderRadius: 50}}>
                        Выбор этажа...
                    </Button>
                </Dropdown>
            </Flex>
            <Flex style={{paddingInline: "1em", paddingBlock: "2em"}}>
                {
                    isLoading? <div><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/><Skeleton active/></div>
                        : <Flex justify={"center"} style={{minWidth: "100%"}} align={"center"}>
                            <svg  width="811.3035005507284"
                                 height="130.20622493299925" style={{paddingTop: "-5em"}}><title>my vector
                                image</title>
                                <g className="currentLayer" ><title>Layer 1</title>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" id="svg_3" x="4.914394378662109"
                                          y="4.715952634811401" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="4.914394378662109"
                                          y="93.04280018806458" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_36"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="450.8287892341614"
                                          y="92.65369546413422" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                         fill-opacity="1" id="svg_37"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="673.3968858718872"
                                          y="92.65369582176208" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_38"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="562.1128358840942"
                                          y="92.65369546413422" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_39"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="599.0778197646141"
                                          y="92.6536947786808" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_40"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="636.4319076538086"
                                          y="92.65369737148285" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_41"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="487.79377311468124"
                                          y="92.6536947786808" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_42"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="525.1478610038757"
                                          y="92.65369737148285" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_43"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="227.48249101638794"
                                          y="93.04280054569244" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_44"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="375.73152154684067"
                                          y="93.04279986023903" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_46"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="413.08560943603516"
                                          y="93.04280245304108" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                         fill-opacity="1" id="svg_47"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="264.4474748969078"
                                          y="93.04279986023903" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_48"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="116.19844102859497"
                                          y="93.04280018806458" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_50"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="153.16342490911484"
                                          y="93.04279950261116" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_51"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="190.51751279830933"
                                          y="93.04280209541321" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_52"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="41.879378259181976"
                                          y="93.04279950261116" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_53"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="79.23346614837646"
                                          y="93.04280209541321" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_54"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="450.8287892341614"
                                          y="4.3268479108810425" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_24"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="673.3968858718872"
                                          y="4.326848268508911" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_25"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="562.1128358840942"
                                          y="4.3268479108810425" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_31"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="599.0778197646141"
                                          y="4.326847225427628" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_32"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="636.4319076538086"
                                          y="4.326849818229675" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_33"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="487.79377311468124"
                                          y="4.326847225427628" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                         fill-opacity="1" id="svg_34"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="525.1478610038757"
                                          y="4.326849818229675" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_35"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="227.48249101638794"
                                          y="4.71595299243927" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_18"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="375.73152154684067"
                                          y="4.715952306985855" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_20"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="413.08560943603516"
                                          y="4.715954899787903" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_21"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="264.4474748969078"
                                          y="4.715952306985855" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_22"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="302.57976891131466"
                                          y="5.1050571501255035" width="69.7976622581482" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}  fill-opacity="1" id="svg_55"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="302.57976891131466"
                                          y="93.4319089949131" width="69.7976622581482" height="32"
                                          style={{color: "rgb(0, 0, 0)", cursor: "pointer"}} fill-opacity="1" id="svg_56"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="116.19844102859497"
                                          y="4.715952634811401" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_15"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="153.16342490911484"
                                          y="4.7159519493579865" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_16"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="190.51751279830933"
                                          y="4.715954542160034" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                          fill-opacity="1" id="svg_17"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="41.879378259181976"
                                          y="4.7159519493579865" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_6"/>
                                    <rect className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                          stroke-dashoffset="" fill-rule="nonzero" x="79.23346614837646"
                                          y="4.715954542160034" width="34" height="32" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}
                                           fill-opacity="1" id="svg_7"/>
                                    <foreignObject className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                                   stroke-dashoffset="" fill-rule="nonzero" font-size="100"
                                                   font-family="Georgia, serif" letter-spacing="0" word-spacing="0"
                                                   marker-start="" marker-mid="" marker-end="" id="svg_59" x="26" y="45"
                                                   width="0" height="2" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}><p>text</p></foreignObject>
                                    <foreignObject className={cl.room} stroke="#222222" stroke-width="2" stroke-linejoin="round"
                                                   stroke-dashoffset="" fill-rule="nonzero" font-size="100"
                                                   font-family="Georgia, serif" letter-spacing="0" word-spacing="0"
                                                   marker-start="" marker-mid="" marker-end="" id="svg_65" x="500" y="-150"
                                                   width="22" height="14" style={{color: "rgb(0, 0, 0)", cursor: "pointer"}}><p>text</p></foreignObject>
                                </g>
                            </svg>
                        </Flex>
                }
            </Flex>
        </main>
    )
}