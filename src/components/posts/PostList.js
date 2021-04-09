import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get("https://news-feed-react.herokuapp.com/posts");
      setIsLoading(false);
      setPosts(result.data.reverse());
    } catch {
      setIsLoading(false);
      setError("Something went wrong");
    }
  };

  const deletePost = async (id) => {
    await axios.delete(`https://news-feed-react.herokuapp.com/posts/${id}`);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="ui active centered inline loader" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="ui segment container relaxed divided list">
        {posts.map((post, index) => {
          return (
            <div className="item" key={index}>
              <div className="content">
                <Link to={`/post/view/${post.id}`}>
                  <h3>{post.title}</h3>
                </Link>
              </div>
              <div className="right floated content">
                <Link to={`/post/edit/${post.id}`} className="ui icon button">
                  <i className="edit outline icon"></i>
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="ui icon button"
                >
                  <i className="trash alternate outline icon"></i>
                </button>
              </div>
              <div className="description">
                <p>{post.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
