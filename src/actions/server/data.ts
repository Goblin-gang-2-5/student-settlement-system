"use server";

import prismadb from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@/auth";
import hdate from "human-date"

export const getCurrentUser = async () => {
    const session = await auth()
    if (!session || !session.user) return null
    const user = await prismadb.user.findUnique({
        where: {
            email: `${session.user.email}`
        }
    })
    if (!user) return null
    return {email: user.email, name: user.name, avatarUrl: user.avatarUrl, createAt: user.createAt, role: user.role}

}

export const getRoomsMetrics = async() => {
    const rooms = await prismadb.room.findMany({
        include: {
            students: true
        }
    })
    if (!rooms) return null
    let metrics = {withStudents: 0, free: 0}
    for (let room of rooms){
        if (room.students.length > 0) metrics.withStudents ++
        else metrics.free ++
    }
    return metrics
}

export const getDormitoryMetrics = async () => {
    const dormitories = await prismadb.dormitory.findMany({
        include: {
            floors: {
                include: {
                    rooms: {
                        include: {
                            students: true
                        }
                    }
                }
            }
        }
    })
    if (!dormitories) return null
    const metrics = {}
    for (let building of dormitories){
        // @ts-ignore
        const localMetrics = metrics[`${building.address.substring(0, 9)}...`] = {
            free: 0,
            withStudents: 0
        }
        for (let floor of building.floors){
            for (let room of floor.rooms){
                if (room.students.length > 0) localMetrics.withStudents ++
                else localMetrics.free ++
            }
        }
    }
    return metrics
}

export const getAllUsers = async () => {
    const users = await prismadb.user.findMany()
    if (!users) return []
    const res = []
    for (let user of users) {
        res.push({name: user.name, createdAt: hdate.relativeTime(user.createAt), email: user.email, key: user.id, role: user.role})
    }
    return res
}