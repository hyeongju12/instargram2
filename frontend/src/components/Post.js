import React from "react";
import {Avatar, Card} from "antd";
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
function Post({post}) {
    const {caption, location, photo} = post;
    return (
        <div className="post">
            <Card
                hoverable
                cover={<img src={photo} alt={caption}/>}
                actions={[<HeartOutlined/>]}
            >
                <Card.Meta avatar={<Avatar icon={<UserOutlined/>}/>} title={location} description={caption}/>
            </Card>
            {/*<img src={photo} alt={caption} style={{width: '100px'}}/>*/}
            {/*{caption}, {location},*/}
        </div>
    );
}
export default Post;