import { CDN_IMG_URL } from '@/utils/Host';
import { Card, Classes, Drawer, Position } from '@blueprintjs/core';
import React, { useState } from 'react';

interface IContentProps {
}


const state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    position: Position.RIGHT,
    usePortal: true,
};


const RightDrawer: React.FunctionComponent<IContentProps> = (props) => {

    const [close, setClose] = useState(false);

    return (
        <Drawer
            icon="info-sign"
            title="Palantir Foundry"
            {...state}
            isOpen={close}
        >
            <div className={Classes.DRAWER_BODY}>
                <div className={Classes.DIALOG_BODY}>
                    <div style={{backgroundImage:`url(${CDN_IMG_URL}zd01.jpg)`}}></div>
                </div>
            </div>
            <div className={Classes.DRAWER_FOOTER}>Footer</div>
        </Drawer>
    );
};

export default RightDrawer;
