import React, {useContext} from "react";
import {AuthContext} from "../../store/auth";
import UserCard from "../../components/profile/user-card";
import UserInfo from "../../components/profile/user-info";
import {Col, Row} from "react-bootstrap";

const UserPage = ({username}) => {
    const {authState} = useContext(AuthContext);

    if (authState.user?.username === username) {
        return (
            <div>
                <Row className="w-100 rtl text-right">
                    <Col sm={12} md={6} lg={3}>
                        <UserCard/>
                    </Col>
                    <Col sm={12} md={6} lg={9}>
                        <UserInfo/>
                    </Col>
                </Row>
            </div>
        )
    } else {
        return (
            <div>شما اجازه دسترسی به این سایت را نداردید!</div>
        )
    }
}

export const getServerSideProps = (context) => {
    const {username} = context.params

    return {
        props: {
            username
        }
    }
}

export default UserPage;