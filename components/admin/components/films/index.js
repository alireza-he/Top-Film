import React, {useState} from "react";
import styles from "./films.module.css"
import {Table, Space, Button, Badge, Modal, Divider} from 'antd';
import useSWR from "swr";
import {toast} from "react-toastify";
import axios from "axios";
import classnames from "classnames";
import ChangeFilmDataModal from "./ChangeFilmData";

const FilmListAdminComponent = () => {
    const [pageSize, setPageSize] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const [count, setCount] = useState();
    const [tableData, setTableData] = useState();

    const {error} = useSWR("/api/admin/films", (url) =>
        axios
            .get(url, {params: {pageSize, page: activePage}})
            .then(res => {
                console.log(res.data, "listFilms")
                setTableData(res.data.films)
                setCount(res.data.count)
            }).catch(err => toast.error("دریافت اطلاعات با مشکل مواجه شده است!"))
    )

    const handlePaginationChange = ({page, pageSize}) => {
        axios
            .get("/api/admin/films", {params: {pageSize, page}})
            .then(res => {
                setTableData(res.data.films)
                setCount(res.data.count)
            }).catch(err => toast.error("دریافت اطلاعات با مشکل مواجه شده است!"))
    }

    const columns = [
        {
            title: 'نام فیلم',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'سال ساخت',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'امتياز',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="text" onClick={() => {
                        Modal.info({
                            title: `تغییر اطلاعات ${record.name}`,
                            content: <ChangeFilmDataModal filmData={record}/>,
                            style: {direction: "rtl"},
                            className: "w-75",
                            okText: "لغو",
                            okType: "danger"
                        })
                    }}>
                        تغيير
                    </Button>
                    <Divider type="vertical"/>
                    <Button
                        danger
                        type="text"
                        onClick={() => {
                            Modal.confirm({
                                title: `تغییر اطلاعات ${record.name}`,
                                content:
                                    <p className="text-right">
                                        اگر از حذف فیلم اطمینان دارید روی دکمه حذف کلیک کنید.
                                    </p>,
                                style: {direction: "rtl"},
                                okText: "حذف",
                                okType: "danger",
                                cancelText: "لغو",
                                cancelButtonProps: "primary",
                                okButtonProps: {className:"mx-2"},
                                onOk: () => {
                                    axios.delete("/api/admin/films/update", {params: {id: record._id}}).then(res => {
                                        // console.log(res.data)
                                        if (res.data.deletedFilm._id) {
                                            toast.warning("فیلم مورد نظر با موفقیت حذف شد!")
                                        }
                                    }).catch(err => {
                                        // console.log(err)
                                        toast.error("در فرآینده حذف فیلم، مشکلی رخ داده است!")
                                    })
                                }
                            })
                        }}>
                        حذف
                    </Button>
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

export default FilmListAdminComponent