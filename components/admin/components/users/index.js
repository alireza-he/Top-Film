import React, {useState} from "react";
import styles from "./users.module.css"
import {Table, Space, Button, Badge, Modal} from 'antd';
import useSWR from "swr";
import {toast} from "react-toastify";
import axios from "axios";
import classnames from "classnames";
import ChangeUserDataModal from "./ChangeUserData";

const UserListAdminComponent = () => {
    const [pageSize, setPageSize] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const [count, setCount] = useState();
    const [tableData, setTableData] = useState();

    const {error} = useSWR("/api/admin/users", (url) =>
        axios
            .get(url, {params: {pageSize, page: activePage}})
            .then(res => {
                setTableData(res.data.users)
                setCount(res.data.count)
            }).catch(err => toast.error("دریافت اطلاعات با مشکل مواجه شده است!"))
    )

    const handlePaginationChange = ({page, pageSize}) => {
        axios
            .get("/api/admin/users", {params: {pageSize, page}})
            .then(res => {
                setTableData(res.data.users)
                setCount(res.data.count)
            }).catch(err => toast.error("دریافت اطلاعات با مشکل مواجه شده است!"))
    }

    const columns = [
        {
            title: 'نام کاربری',
            dataIndex: 'username',
            key: 'username',
            render: text => <a>{text}</a>,
        },
        {
            title: 'پست الکترونیکی',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'نقش',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'وضعیت اشتراک',
            key: 'sub',
            dataIndex: 'sub',
            render: (sub, record, index) => {
                const text = sub === true ? "فعال" : "غیر فعال";
                const status = sub === true ? "success" : "error";
                return (
                    <>
                        <Badge status={status} text={text}/>
                    </>
                )
            },
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="text" onClick={() => {
                        Modal.info({
                            title:`تغییر اطلاعات ${record.username}`,
                            content:<ChangeUserDataModal userData={record}/>,
                            style:{direction:"rtl"},
                            okText:"لغو",
                            okType:"danger"
                        })
                    }}>تغيير</Button>
                </Space>
            ),
        },
    ];

    if (error) {
        toast.error("دریافت اطلاعات با مشکل مواجه شد!")
        return <div>مشكلي رخ داده است!</div>
    }

    if (!tableData) {
        return <div>در حال بارگزاری ...</div>
    }

    return (
        <div className={classnames(styles.main_table, "w-100")}>
            <Table
                pagination={{
                    pageSize: pageSize, onChange: (page, pageSize) => {
                        setActivePage(page)
                        setPageSize(pageSize)
                        handlePaginationChange({page, pageSize})
                    },
                    total: count
                }}
                rowKey={record => record._id}
                columns={columns}
                dataSource={tableData}
            />
        </div>
    );
}

export default UserListAdminComponent