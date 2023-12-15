"use client"
import {Flex, Image, Skeleton, Divider} from "antd";

export default function UserMainCard({user}:{user:{
        name: string,
        email: string,
        avatarUrl: string,
        createdAt: Date,
        role: "user"|"admin"
    }}){
    return (
        <div style={{paddingBlock: "1em", paddingInline: "3em", fontSize: 24, fontWeight: 700, backgroundColor: "white", boxShadow: "-4px 4px 4px 0 rgba(0, 0, 0, 0.25)"}}>
            <Flex vertical>
                <Image src={user?.avatarUrl??"https://s3-alpha-sig.figma.com/img/28c0/b02d/4b8423892b8649eae2861b717957a400?Expires=1703462400&Signature=ql9yp406sDP~7bpsoAEGVjRfcAElMXsVn7hGmM7DIMdF-NR8tLdGh6svz~fndlnmDt4dsgNq-xTXKrH6XeVm5G1F00CcGCWGdOYDvMaqrnx0Y0EM3GcrEv5L4oy~S5~fOXUszvs8wLonqgAwS0LQNT3Cz-LkTgkshiMGGx9rs0rzqL5QZC3Cljzn4Lse-8PpDGWCFls6f9wPx93a-SO7pYsJaM5VCXbFefn~ZdLvQgsqm-p~IbTXlHx-adZoXVL7quXoRDZDK4DtxevJXoHikrlheG1Yq7s-ZBorobFWkLmJnr4BszyJVAxPtHO7L7jgfnPe8j41Ya~6SIn1RuyGug__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"} alt={"userAvatar"} width={350} height={350}/>
                <Divider plain/>
                {user.role === 'user' ? <span style={{textAlign: "center", fontSize: 24, fontWeight: 700}}>Ответственный по работе со студентами</span>:<span style={{textAlign: "center", fontSize: 24, fontWeight: 700}}>Технический специалист</span>}
            </Flex>
        </div>
    )
}