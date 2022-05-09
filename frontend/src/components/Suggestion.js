import React, {useEffect, useState} from "react";
import {Button, Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./Suggestion.scss"
import Axios from "axios";
import {useAppContext} from "../store";

export default function Suggestion({suggestionUser, onFollowUser}) {
    const {username, name, avartar_url, is_follow} = suggestionUser;
    return (
        <div className="suggestion">
            <div className="avatar">
                <Avatar
                    size="small"
                    icon={
                        <img src={"http://localhost:8000" + avartar_url}
                             alt={`${username}'s avatar`}/>
                    }
                />
                {/*<UserOutlined />*/}
            </div>
            <div className="username">
                {name.length === 0 ? username: name}
            </div>
            <div className="action">
                {is_follow && "팔로잉 중"}
                {!is_follow && <Button size="small" onClick={() => onFollowUser(username)}>Follow</Button>}
            </div>
        </div>
    );
}