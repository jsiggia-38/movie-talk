import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from '../images/more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../src/client'
import { useEffect } from 'react'


const Card = (props) =>  {

  const [count, setCount] = useState(parseInt(localStorage.getItem(`post-${props.id}`)) || 0);

  useEffect(() => {
    localStorage.setItem(`post-${props.id}`, count);
  }, [count, props.id]);

  const updateCount = async (event) => {
    event.preventDefault();
    await supabase.from('posts').update({ upvotes: count + 1 }).eq('id', props.id);
    setCount((count) => count + 1);
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="post-title">{props.title}</h2>
          <h3 className="post-author">{"by " + props.author}</h3>
          <p className="post-description">{props.description}</p>
          <button className="upvote-button" onClick={updateCount} >👍 upvote: {count}</button>
      </div>
  );
};

export default Card;