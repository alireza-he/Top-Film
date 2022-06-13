import {
    HomeOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import HomeAdminComponent from "../components/home";
import UserListAdminComponent from "../components/users";
import CreatMediaPage from "../components/create_film";
import FilmListAdminComponent from "../components/films";
import CreateBannerPage from "../components/create_banner";
import BannersListAdminComponent from "../components/banners";

const pages = [
    {name: "صفحه اصلی", key: "home", icon: <HomeOutlined/>, component: <HomeAdminComponent/>},
    {name: "لیست کاربران", key: "users", icon: <UserOutlined/>, component: <UserListAdminComponent/>},
    {name: "لیست فیلم ها", key: "films", icon: <VideoCameraOutlined/>, component: <FilmListAdminComponent/>},
    {name: "لیست بنر ها", key: "banners", icon: <VideoCameraOutlined/>, component: <BannersListAdminComponent/>},
    {name: "لیست اسلایدر ها", key: "sliders", icon: <VideoCameraOutlined/>, component: <FilmListAdminComponent/>},
    {name: "ایجاد فیلم جدید", key: "create_film", icon: <UploadOutlined/>, component: <CreatMediaPage/>},
    {name: "ایجاد ینر جدید", key: "create_banner", icon: <UploadOutlined/>, component: <CreateBannerPage/>},
    {name: "ایجاد اسلایدر جدید", key: "create_slider", icon: <UploadOutlined/>, component: <CreatMediaPage/>},
]

export default pages