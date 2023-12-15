import GeneralMetrics from "@/components/metrics/GeneralMetrics";
import UserTable from "@/components/managment/UserTable";

export default function ManagementPage(){
    return(
        <div style={{marginInline: "1em", display: "flex", gap: "2em"}}>
            <GeneralMetrics/>
            <div style={{
                display: "flex",
                flexDirection: "column",
                background: "white",
                maxWidth: "100%",
                width: "80%",
                paddingBlock: "1em",
                paddingInline: "1em",
                boxShadow: "-4px 4px 4px 0 rgba(0, 0, 0, 0.25)"
            }}>
                <div style={{maxWidth: '100%', width: "100%"}}>
                    <UserTable/>
                    {/*<DormitoryMetrics/>*/}
                </div>
            </div>
        </div>
    )
}