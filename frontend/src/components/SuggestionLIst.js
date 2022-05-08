import React from "react";
import './SuggestionList.scss'
import {Card} from "antd";
import Suggestion from "./Suggestion";

export default function SuggestionList() {
    return (
        <Card title="Suggestion for you" size="small">Stories from people you follow will show up here.
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
        </Card>
    );
}