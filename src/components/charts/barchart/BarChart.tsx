"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import {Bar} from "react-chartjs-2";
export default function BarChart({chartData}:{
    chartData:{
        labels: string[] | undefined,
        datasets: {
            label: string,
            data: number[]
        }[]
    }
}){
    ChartJS.register(ArcElement, Tooltip, Legend)
    return(
        <Bar data={chartData}/>
    )
}