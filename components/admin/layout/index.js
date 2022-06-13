import React, {useState} from "react";
import styles from "./admin-layout.module.css"
import {Layout, Menu} from 'antd';
import classnames from "classnames";
import pages from "./menu";
import HomeAdminComponent from "../components/home";

const {Sider, Content} = Layout;

export const AdminLayout = () => {
    const [activeComponent, setActiveComponent] = useState(<HomeAdminComponent/>)

    return (
        <Layout className="rtl">
            <Sider collapsed={true} className="rtl">
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
                    {pages.map(item =>
                        <Menu.Item key={item.key} icon={item.icon} onClick={() => setActiveComponent(item.component)}>
                            {item.name}
                        </Menu.Item>
                    )}
                </Menu>
            </Sider>
            <Layout className={classnames(styles.site_layout, "rtl")}>
                <Content
                    className={styles.site_layout_background}
                    style={{
                        padding: 24,
                        minHeight: "100vh",
                        height:"100%"
                    }}
                >
                    {activeComponent}
                </Content>
            </Layout>
        </Layout>
    );
}