import {auth} from "@/auth";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export const GET = auth(async  function GET(req){
    if (req?.auth?.user){
        const dormitories  = await prismadb.dormitory.findMany({
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
        return NextResponse.json(dormitories)
    }
    return NextResponse.json({message: "Not authenticated"}, {status: 401})
})