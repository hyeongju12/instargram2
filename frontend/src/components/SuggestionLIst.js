import React, {useEffect, useMemo, useState} from "react";
import {Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./SuggestionList.scss"
import useAxios from "axios-hooks";
import {useAppContext} from "../store";
import Suggestion from "./Suggestion";
import {Card} from 'antd';

export default function SuggestionList() {
    const {store: {jwtToken}} = useAppContext();
    const headers = {Authorization: `JWT ${jwtToken}`};

    const [userList, setUserList] = useState([]);

    const [{data: originuserList, loading, error}, refetch] = useAxios({
        url : "http://127.0.0.1:8000/accounts/suggestions",
        headers,
    });
    useEffect(() => {
        if (!originuserList) setUserList([]);
        else setUserList(originuserList.map(user => ({...user, is_follow: false})));
    }, [originuserList]);

    const onFollowUser = username => {
        setUserList(prevUserList => {
            return prevUserList.map(user => {
                // return
                // (user.username !== username) ? user : {...user, is_follow: true}
                if (user.username === username) {
                    return {...user, is_follow: true};
                }
                else
                    return user;
            })
        })
    };

    return (
        <div>
            {loading && <div>Loading ...</div>}
            {error && <div>로딩중에 에러가 발생했습니다.</div>}

            <button onClick={()=>refetch()}>Reload</button>

            <Card title="Suggestion for you" size="small">Stories from people you follow will show up here.
                {userList.map(suggestionUser => (
                        <Suggestion
                            key={suggestionUser.username}
                            suggestionUser={suggestionUser}
                            onFollowUser={onFollowUser}
                        />
                    ))}
            </Card>
        </div>
    );
}