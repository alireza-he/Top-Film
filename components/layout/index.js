import React, {useContext} from "react";
import {Avatar, Badge, Divider, Dropdown, Menu} from "antd";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import styles from "./Layout.module.css";
import {useRouter} from "next/router";
import Link from "next/link"
import {AuthContext} from "../../store/auth"
import axios from "axios";
import {toast} from "react-toastify";

const Layout = ({children, customize}) => {
    const {isAuthenticated, authState, setAuthNewState} = useContext(AuthContext);
    const router = useRouter();

    const menu = (
        <Menu className={styles.avatar_menu}>
            <Menu.Item key="profile">
                <Link href={`/user/${authState.user?.username}`}>
                    <a>
                        پروفایل
                    </a>
                </Link>
            </Menu.Item>
            <Menu.Item
                key="logout"
                danger
                onClick={() => {
                    axios.get("/api/auth/logout").then(res => {
                        window.localStorage.removeItem("user")
                        setAuthNewState({})
                        toast.warning("شما از حساب کاربری خود خارج شدید!")
                    }).catch(err => {
                        console.log(err)
                    })
                }}
            >
                خروج
            </Menu.Item>
        </Menu>
    );

    if (customize) {
        return (
            <div>{children}</div>
        )
    } else {
        return (
            <div>
                <Navbar className={styles.navbar} bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img className={`mx-2 ${styles.logo}`} src={"/favicon.ico"}/>
                            تاپ فیلم
                        </Navbar.Brand>
                        <Divider type="vertical" style={{backgroundColor: "#fff"}}/>
                        <Nav className="ml-auto">
                            <Link href={"/"}>
                                <Nav.Link active={router.pathname === "/"} href="#home">خانه</Nav.Link>
                            </Link>
                            <Link href={"/films"}>
                                <Nav.Link active={router.pathname.split("/")[1] == "film"} href="#features">فیلم
                                    ها</Nav.Link>
                            </Link>
                        </Nav>

                        {isAuthenticated() === false ?
                            <Link href={"/auth"}>
                                <Button className={styles.login_Btn} variant="light">ورود</Button>
                            </Link>
                            :
                            <Dropdown overlay={menu} className={styles.avatar_dropdown}>
                                <Badge dot status={authState.user?.sub === true ? "success" : "error"}>
                                    <Avatar
                                        src={authState.user?.profilePhoto}
                                        size={32}
                                    />
                                </Badge>
                            </Dropdown>
                        }
                    </Container>
                </Navbar>

                <div>{children}</div>

                <footer className={styles.footer}>
                    <div>
                        <p className="text-center">
                            @تمام حقوق تاپ فیلم متعلق به رضا حیدری است.
                        </p>
                    </div>
                </footer>
            </div>
        );
    }

};

export default Layout;
