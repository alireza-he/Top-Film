import React, {useContext} from "react";
import Card from "react-bootstrap/Card";
import {Avatar, Badge, Divider} from "antd";
import {AuthContext} from "../../../store/auth";
import moment from "moment-jalaali";
import UserAdmin from "./user-admin";

const UserCard = () => {
    const {authState} = useContext(AuthContext);


    const checkSubscription = (sub) => {
        if (sub) {
            return <Badge status={"success"} text=" فعال "/>
        } else {
            return <Badge status="error" text=" غیر فعال "/>
        }
    }

    return (
        <div className="mt-5">
            <Card className="p-3">
                <div className="text-center p-2">
                    <Avatar
                        size={128}
                        src={authState.user?.profilePhoto}
                    />
                </div>
                <Divider/>
                <Card.Body className="text-center">
                    <h3>{authState.user?.username}</h3>
                    <p>تاریخ ورود : {moment(authState.user?.created).format('jYYYY/jM/jD')}</p>
                    <p>وضعیت اشتراک : {checkSubscription(authState.user?.sub)}</p>
                    {authState.user?.role === "admin" ?
                        <div>
                            <Divider>دسترسی ادمین</Divider>
                            <UserAdmin/>
                        </div>
                        :
                        <div>ادمین غیر فعال</div>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard