"use server";

import prismadb from "@/lib/prismadb";
import {NextResponse} from "next/server";
import {auth} from "@/auth";

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