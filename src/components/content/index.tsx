import { ArticleApi, CDN_IMG_URL } from '@/utils/Host';
import { iFetch, RequestStatus } from '@/utils/Req';
import { formateDate, randomNum } from '@/utils/Utiles';
import { Card, Classes, Icon } from '@blueprintjs/core';
import React, { useState, useEffect } from 'react';
import './index.less';

interface IContentProps {
}

interface IArticle {
    tag: string[];
    "_id": string;
    title: string;
    content: string;
    scanCount: number;
    "create_time": string;
    "update_time": string;
    sscanCount: number;
}

const DEFAULT_PREVIEW=["zd01.jpg","zd02.jpg","banner.jpg","banner01.jpg","banner02.jpg","banner03.jpg"]


const Content: React.FunctionComponent<IContentProps> = (props) => {
    const [list, setList] = useState<IArticle[]>([]);
    useEffect(() => {
        iFetch(ArticleApi.List).then(res => {
            console.log('res: ', res);
            if (res.code === RequestStatus.Ok) {
                for (let d of res.data) {
                    d.create_time = formateDate(d.create_time);
                    d.update_time = formateDate(d.update_time);
                }
                setList(res.data);
            }
        });
        return () => {

        };
    }, []);

    return <Card id='content' className={Classes.DARK}>
        <div className="list" >
            {
                list.map(article => {
                    return (
                        <div key={article._id}>
                            <div className="title">
                                <span>{article.title}</span>
                                <div className="content">
                                    <p>主人很懒，没写描述</p>
                                    <div>
                                        <span>
                                            <Icon icon="paperclip" />
                                            {
                                                article.tag.join("|")
                                            }
                                        </span>
                                        <span>
                                            <Icon icon="time" />
                                            {
                                                article.update_time
                                            }
                                        </span>
                                        <span>
                                            <Icon icon="eye-open" />
                                            {
                                                article.scanCount
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    </Card>;
};

export default Content;
