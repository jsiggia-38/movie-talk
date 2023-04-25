import React from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../src/client';
import { useState } from 'react';
import { useEffect } from 'react';

const EditPost = ({data}) => {

    const { id } = useParams();

    
    const post = data.filter(item => item.id === parseInt(id))[0];
    const [updatedPost, setUpdatedPost] = useState(post);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    console.log(data);

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase.from('posts').update(updatedPost).eq('id', id);

        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase.from('posts').delete().eq('id', id);


        window.location = "/";
    }

    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase.from('comments').select('*').eq('post_id', id);

            if (error) {
                console.log('error', error);
            }

            else {
                console.log('comments', data);
                setComments(data);
            }
        };
        fetchComments();



    }, [id]);


    const onChange = event => {
        const { name, value } = event.target;
        setUpdatedPost(prevState => ({
          ...prevState,
          [name]: value
        }));
      };


    const handleCommentChange = event => {
        setCommentText(event.target.value);
      };


    const addComment = async event => {
        event.preventDefault();

        const newComment = {
            text: commentText,
            post_id: id,
        };

        console.log('new comment:', newComment);

        const { data, error } = await supabase.from("comments").insert(newComment);
        console.log('inserted comment:', data);

        if (error) {
            console.log('error', error);
        }

        else {

            if (data && data.length > 0) {
                setComments([...comments, newComment]);
                setCommentText("");

            }

            else {
                console.log("too bad")
            }

            
        }




    };

    
    





    return (
        <div>
            <form className = "edit-form" onSubmit = {updatePost}>
                <br/>
                <hr/>
                <br/>
                <label className = "edit-label" for="title">Scene Title</label> <br /> <br />
                <input className = "edit-input" type="text" id="title" name="title" value={updatedPost?.title || ''} onChange = {onChange}/><br />
                <br/>
                <hr/>
                <br/>

                <label className = "edit-label" for="author">Author</label><br /> <br />
                <input className = "edit-input" type="text" id="author" name="author" value={updatedPost?.author || ''} onChange = {onChange}/><br />
                <br/>
                <hr/>
                <br/>

                <label className = "edit-label" for="description">Movie Title</label><br /> <br />
                <input className = "edit-input" type = "text" id="description" name = "description" value={updatedPost?.description || ''} onChange = {onChange}/>
                <br/>
                <hr/>
                <br/>
                <input className = "edit-submit" type="submit" value="Submit" />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>

            <br/>
            <hr/>
            <br/>

            <div className = "comments-section">
                <h3>comments</h3>
                <ul className = "comments-list" key = {comments.length}>
                    {comments.map(comment => (
                        <li className = "comment" key = {comment.id}>{comment.text}</li>
                    ))}
                </ul>
                <form onSubmit = {addComment}>
                    <input className = "comment-field" type = "text" value = {commentText} placeholder = "Enter your comment..." onChange = {handleCommentChange} />
                    <button className = "comment-submit" type = "submit">Add Comment</button>
                </form>
            </div>
        </div>
    )
}

export default EditPost;