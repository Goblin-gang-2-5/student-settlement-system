"use client"
import {Flex, Skeleton} from "antd";
import PieChart from "@/components/charts/piechart/PieChart";
import {useEffect, useState} from "react";
import {getRoomsMetrics} from "@/actions/server/data";
import {PieChartOutlined} from "@ant-design/icons";

export default function GeneralMetrics(){
    const [metrics, setMetrics] = useState<{withStudents: number, free: number}|null>(null)
    useEffect(() => {
        getRoomsMetrics().then(m => setMetrics(m))
    }, [])
    return (
        <div style={{paddingBlock: "1em", paddingInline: "2em", fontWeight: 700, backgroundColor: "white", boxShadow: "-4px 4px 4px 0 rgba(0, 0, 0, 0.25)", maxWidth: "30em", maxHeight: "30em"}}>
            <Flex vertical align={"center"} gap={"1.5em"}>
                <span style={{fontWeight: 800, fontSize: 20}}>Общая статистика</span>
                {metrics? <PieChart chartData={{labels:["Заселено", "Свободно"], datasets: [{
                        data: [metrics.withStudents, metrics.free],
                        backgroundColor: ['#496FDC', '#B554BD']
                    }]}}/>
                    : <Skeleton.Node style={{height: "15em", width: "15em", fontSize: 18}} active>
                        <PieChartOutlined />
                    </Skeleton.Node>
                }

            </Flex>
        </div>
    )
}