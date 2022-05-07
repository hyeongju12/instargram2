import React, {useEffect, useState} from "react";
import Axios from "axios";
import Post from "components/Post";

function PostList() {
    const [postList, setPostList] = useState([]);
    const apiUrl = "http://127.0.0.1:8000/api/posts/"
    useEffect(() => {
        Axios.get(apiUrl)
            .then(response => {
                const {data} = response;
                console.log("loaded response :", response);
                setPostList(data);
            })
            .catch(error => {
                // error.response;
            });
        console.log("mounted");
    }, []);

    return (
        <div>
            <h1>Hello hyeongju</h1>
            {postList.map((post, index) => {
                return <Post post={post} key={post.id}/>
            })}
        </div>
    );
}

export default PostList;