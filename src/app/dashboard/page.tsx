import DashboardLayoutProvider from "@/components/providers/DashboardLayoutProvider";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import Map from "@/components/Map/Map";

export default async function Dashboard(){
    const session = await auth()
    if (!session) redirect("/login")
    return(
            <></>
    )
}