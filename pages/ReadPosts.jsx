import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import './ReadPosts.css'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setPosts(props.data);
    }, [props]);

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const filteredPosts = posts.filter(post => post.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return (
        <div className="ReadPosts">

            <div className = "search-bar">
                <input className = "search-bar-box" type = "text" placeholder = "Search..." onChange = {handleSearchQueryChange} />
            </div>

            <br />



            <div className = "post-list">
                {
                    searchQuery.length > 0 ? 
                        filteredPosts && filteredPosts.length > 0 ? 
                            filteredPosts.map((post,index) => 
                            <Card className = "discussion-post" id={post.id} title={post.title} author={post.author} description={post.description}/>
                            

                        ) : <p>no search results</p>

                    : 
                    posts && posts.length > 0 ?
                    posts.map((post,index) => 
                    <Card className = "discussion-post" id={post.id} title={post.title} author={post.author} description={post.description}/>
                    ) : <h2>{'No Movie Discussions Yet'}</h2>

                        
                }
            </div>

            
        </div>  
    )
}

export default ReadPosts;