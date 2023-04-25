import React from 'react';
import { supabase } from '../src/client';
import './CreatePost.css'

const CreatePost = () => {


    const createPost = async (event) => {
        event.preventDefault();

        const post = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            description: document.getElementById("description").value,
            
          };

          

        console.log(post);

        try {
            const { data, error } = await supabase.from('posts').insert(post);
        
            if (error) {
              throw error;
            }
        
            console.log(data);
        
            window.location = "/";
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <div>
            <form className = "create-form" onSubmit = {createPost}>
                <label className = "create-label" for="title">Title</label> <br />
                <input className = "create-input" type="text" id="title" name="title" placeholder = "Enter the name of the scene..."/><br />
                <br/>

                <label className = "create-label" for="author">Author</label><br />
                <input className = "create-input" type="text" id="author" name="author" placeholder = "Enter your name..."/><br />
                <br/>

                <label className = "create-label" for="description">Movie Title</label><br />
                <input className = "create-input" type = "text" id="description" name = "description" placeholder = "Enter the name of the movie the scene is from..." />
                <br/>
                <input className = "create-submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost;