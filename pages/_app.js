import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import 'react-toastify/dist/ReactToastify.css';
// Global styles
import "../styles/global.css"
// Loader styles
import "../styles/loader.scss"
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {ToastContainer} from 'react-toastify';
import Layout from "../components/layout";
import {AuthProvider} from "../store/auth";
import {useState} from "react";
import Loader from "../util/loader";
import Router from "next/router";
import axios from "axios";

// Axios Config :
axios.defaults.baseURL = "http://localhost:3000"

function MyApp({Component, pageProps}) {
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [isFirstLoading, setIsFirstLoading] = useState(true);

    Router.onRouteChangeStart = () => {
        setLoaderStatus(true)
        setIsFirstLoading(false)
    }

    Router.onRouteChangeComplete = () => {
        setLoaderStatus(false)
        setIsFirstLoading(false)
    }

    return (
        <AuthProvider>
            <ToastContainer rtl theme={"colored"}/>
            {loaderStatus ? (
                <Loader
                    setLoader={bool => {
                        setLoaderStatus(bool)
                        setIsFirstLoading(bool)
                    }}
                    isFirstLoading={isFirstLoading}
                />
            ) : (
                <Layout customize={pageProps.customize}>
                    <Component {...pageProps} />
                </Layout>
            )}
        </AuthProvider>
    );
}

export default MyApp;
