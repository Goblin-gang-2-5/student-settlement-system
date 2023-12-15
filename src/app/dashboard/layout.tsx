import React from "react";
import DashboardLayoutProvider from "@/components/providers/DashboardLayoutProvider";

export default function DashboardLayout({children}:{children:React.ReactNode}){
    return(
        <DashboardLayoutProvider>
            {children}
        </DashboardLayoutProvider>
    )
}