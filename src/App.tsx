
import React, { useEffect, useRef } from 'react';
import Content from './components/content';
import RightDrawer from './components/rightDrawer';
import { CDN_VIDEO_URL } from './utils/Host';

export default () => {
    const ref = useRef(null);


    useEffect(() => {


    }, []);

    return (
        <>
            <div id="main" ref={ref}>

            </div>
            <video id="video" loop={false} crossOrigin="anonymous" playsInline style={{ display: "none" }}>
                <source src={CDN_VIDEO_URL + "sintel.ogv"} type='video/ogg; codecs="theora, vorbis"' />
                <source src={CDN_VIDEO_URL + "sintel.mp4"} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
            </video>
            <Content />
            <RightDrawer />
        </>
    );
};