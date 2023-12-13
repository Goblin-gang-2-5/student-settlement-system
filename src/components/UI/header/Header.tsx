import {Col, Flex, Input, Row} from "antd";
import Image from "next/image";

export default function Header(){
    return (
        <Row style={{height: "7rem"}}>
            <Col flex={"25%"} style={{backgroundColor: "#3D68E2", color: "#F5F5F5", fontSize: 20, fontWeight: 700, paddingInline: "1rem"}}>
                <Flex align={"center"} style={{minHeight: "100%"}}>
                    <Flex align={"center"} gap={"0.5em"}>
                        <Image src={"/assets/mirea-logo.png"} height={75} width={65} alt={"mirea-logo"}/>
                        <span>MIREA общежития</span>
                    </Flex>
                </Flex>
            </Col>
            <Col flex={"auto"} style={{backgroundColor: "#496FDC", maxWidth: "100%"}}>
                <Flex justify={"space-between"} align={"center"} style={{minHeight: "100%"}}>
                    <Input suffix={}/>
                </Flex>
            </Col>
        </Row>
    )
}