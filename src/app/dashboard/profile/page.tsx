import {Flex} from "antd";
import ProfileWrapper from "@/components/wrappers/ProfileWrapper";

export default async function ProfilePage(){
    return(
        <div style={{marginInline: "1em", maxWidth: "50%", display: "flex"}}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <span style={{fontWeight: 400, fontSize: 40}}>Личный кабинет</span>
                <ProfileWrapper/>
            </div>
        </div>
    )
}