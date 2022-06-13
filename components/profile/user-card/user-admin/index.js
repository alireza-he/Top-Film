import React from "react";
import {Typography} from "antd";
import Link from "next/link"

const Paragraph = Typography;

const UserAdmin = () => {
    return (
        <Typography>
            <Paragraph>
                <ul>
                    <li>
                        <Link href={"/panel"}>پنل ادمین</Link>
                    </li>
                    <li>
                        <Link href={"/docs/spec/overview"}>...</Link>
                    </li>
                    <li>
                        <Link href={"/docs/resources"}>...</Link>
                    </li>
                </ul>
            </Paragraph>
        </Typography>
    )
}

export default UserAdmin