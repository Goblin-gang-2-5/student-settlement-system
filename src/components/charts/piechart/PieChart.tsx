"use client"
import React from "react"
import {Pie} from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
export default function PieChart(
    {chartData}:{
        chartData:{
            labels: string[] | undefined,
            datasets: {
                data: number[],
                backgroundColor: string[]
            }[]
        }
    }
){
    ChartJS.register(ArcElement, Tooltip, Legend);
    return (
        <Pie data={chartData}/>
    )
}