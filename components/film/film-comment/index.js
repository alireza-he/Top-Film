import React, {useContext, useState} from "react";
import {Comment, Avatar, Form, Button, List, Input, Divider} from 'antd';
import {Card, Row} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../../../store/auth";
import Link from "next/link"
import moment from 'moment';

moment.locale("fa");

const {TextArea} = Input;

const CommentList = ({comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} پاسخ`}
        itemLayout="horizontal"
        renderItem={({user, created, content}) =>
            <React.Fragment>
                <Comment
                    className="w-100"
                    content={content}
                    datetime={moment(comments[0].created).fromNow()}
                    avatar={user.profilePhoto}
                    author={user.username}
                />
                <Divider/>
            </React.Fragment>
        }
    />
);

const Editor = ({onChange, onSubmit, submitting, value, auth}) => (
    <div>
        {auth ?
            (
                <>
                    <Form.Item>
                        <TextArea rows={4} onChange={onChange} value={value}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                            اضافه كردن نظر
                        </Button>
                    </Form.Item>
                </>
            )
            :
            (
                <div className="text-center">
                    <p>برای ثبت نظر ابتدا <Link href="/auth">وارد</Link> شوید</p>
                </div>
            )
        }
    </div>
);

const FilmsComment = ({filmId, comments: commentsList}) => {
    const [comments, setComments] = useState(commentsList);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const {authState, isAuthenticated} = useContext(AuthContext);
    console.log(authState, isAuthenticated(), "authState")

    const handleSubmit = async () => {
        if (!value) {
            return;
        }

        setSubmitting(true);

        const params = {filmId, comment: {user: authState.user.username, content: value}}
        const addComment = (await axios.post("/api/comments/create", params)).data;

        setTimeout(async () => {
            setSubmitting(false);
            setValue("");
            setComments([
                ...comments,
                {
                    author: authState.user.username,
                    avatar: authState.user.profilePhoto,
                    content: <p>{value}</p>,
                    datetime: moment(addComment.comments[0].created).fromNow(),
                },
            ]);
        }, 1000);
    };

    const handleChange = (e) => {
        setValue(e.target.value)
    };

    return (
        <Card className={"rtl mt-5"}>
            <Card.Body>
                <Divider>نظرات فیلم</Divider>

                <Row className={"p-5"}>
                    <div>{comments.length > 0 && <CommentList comments={comments}/>}</div>
                    <Comment
                        content={
                            <Editor
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                submitting={submitting}
                                value={value}
                                auth={isAuthenticated()}
                            />
                        }
                    />
                </Row>
            </Card.Body>
        </Card>
    );
}

export default FilmsComment