import React, {useRef, useState} from "react";
import styles from "./video-player.module.css";
import ReactPlayer from "react-player";
import {Button, Card} from "react-bootstrap";
import {Dropdown, Menu, Slider} from "antd";
import classnames from "classnames";
import {useRouter} from "next/router";


const screenfull = import('screenfull');

const VideoPlayer = () => {
    const router = useRouter();
    const [playing, setPlaying] = useState(false);
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [activeMenuItem, setActiveMenuItem] = useState(1);
    const [volume, setVolume] = useState(50);

    const ref = useRef();
    const screenFullRef = useRef();

    const handlePlaying = (status) => {
        setPlaying(status)
    }

    const SpeedList = [
        {key: 2},
        {key: 1.5},
        {key: 1.25},
        {key: 1},
        {key: .5},
    ]

    const VolumeSlider = (
        <Menu>
            <Menu.Item>
                <Slider vertical value={volume} className={styles.volume_slider} onChange={(volume) => {
                    setVolume(volume)
                }}/>
            </Menu.Item>
        </Menu>
    )

    const menu = (
        <Menu>
            {SpeedList.map((speed) => {
                return (
                    <Menu.Item
                        className={activeMenuItem === (speed.key) ? styles.active_menu : ""}
                        onClick={() => {
                            setActiveMenuItem(speed.key)
                            setPlaybackRate(speed.key)
                            setShow(false)
                        }}
                        key={speed.key}
                    >
                        {speed.key}×
                    </Menu.Item>
                )
            })}
        </Menu>
    );

    return (
        <div ref={screenFullRef} className="text-center">
            <div className={classnames(styles.bg_return_btn, "w-100 text-center")}>
                <Button variant="dark" className={styles.return_btn} onClick={() => {
                    router.back()
                }}>
                    بازگشت به صفحه فیلم
                </Button>
            </div>
            <ReactPlayer
                ref={ref}
                className={styles.player}
                url="/assets/player/film.mp4"
                width={"100%"}
                height={"100vh"}
                playing={playing}
                onProgress={({played, playedSeconds, loaded, loadedSeconds}) => {
                    setProgress(played * 100)
                }}
                playbackRate={playbackRate}
                volume={volume / 100}
            />
            <Card className={classnames(styles.controller, show && styles.show)}>
                <div className={classnames(styles.main_control, "ml-2")}>
                    {!playing ?
                        <img onClick={() => handlePlaying(true)} className={styles.play} width={32} src={"/play.svg"}
                             alt="play icon"/>
                        :
                        <img onClick={() => handlePlaying(false)} className={styles.play} width={32} src={"/pause.svg"}
                             alt="pause icon"/>
                    }
                    <Slider
                        onChange={value => {
                            setProgress(value);
                            ref.current.seekTo(value / 100)
                        }}
                        value={progress}
                        className={styles.slider}
                        tooltipVisible={false}
                    />

                    <Dropdown overlay={menu} trigger={['click']} onClick={() => setShow(true)}>
                        <img width={32} src={"/speedrating.svg"} className="mx-3" alt="speed rating icon"/>
                    </Dropdown>

                    <Dropdown overlay={VolumeSlider} trigger={['click']} onClick={() => setShow(true)}>
                        <img width={32} src={volume !== 0 ? "/volume.svg" : "/mute.svg"} alt="speed rating icon"/>
                    </Dropdown>

                    <img width={32} src={"/fullscreen.svg"} className="mx-3" alt="fullscreen icon"
                         onClick={async () => (await screenfull).default.toggle(screenFullRef.current)}/>
                </div>
            </Card>
        </div>
    )
}

export default VideoPlayer