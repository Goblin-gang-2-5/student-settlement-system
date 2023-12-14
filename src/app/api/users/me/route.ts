import {auth} from "@/auth";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export const GET = auth(async function GET(req){
    if (req?.auth?.user){
        const user = await prismadb.user.findUnique({
            where: {
                email: `${req.auth.user.email}`
            }
        })
        if (user) {
            return NextResponse.json({email: user.email, name: user.name, avatarUrl: user.avatarUrl, createAt: user.createAt})
        }
        return NextResponse.json({message: 'Not found'}, {status: 404})
    }
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
})