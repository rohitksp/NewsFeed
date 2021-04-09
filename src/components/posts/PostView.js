import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const PostView = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState({
    author: "",
    comment: "",
    cId: id,
  });

  const getPost = async () => {
    const result = await axios.get(`https://newsfeed-app-react.herokuapp.com/posts/${id}`);
    setPosts(result.data);
  };

  const getComment = async () => {
    const result = await axios.get(`https://newsfeed-app-react.herokuapp.com/comments?cId=${id}`);
    setItems(result.data.reverse());
  };

  useEffect(() => {
    getPost();
    getComment();
  }, []);

  const onInputChange = (event) => {
    setComments({ ...comments, [event.target.name]: event.target.value });
  };

  const showComments = () => {
    return (
      <div className="ui relaxed divided list">
        {items.map((item, index) => {
          return (
            <div className="item" key={index}>
              <img
                className="ui avatar image"
                src={`https://joeschmoe.io/api/v1/${item.author}`}
                alt={item.author}
                style={{ marginTop: "3px" }}
              />
              <div className="content">
                <h4 className="header">{item.author}</h4>
                <div className="description">{item.comment}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:3001/comments", comments);
    getComment();
    setComments({
      author: "",
      comment: "",
      cId: id,
    });
  };

  const { title, body } = posts;

  return (
    <div
      style={{ marginTop: "10px", background: "#DCDCDC" }}
      className="ui segment container"
    >
      <div style={{ marginTop: "3px" }} className="ui message">
        <h4 className="ui header">
          <b>Title:</b> {title}
        </h4>
        <p>
          <b>Description:</b> {body}
        </p>
      </div>
      <div>{showComments()}</div>
      <form
        style={{ marginTop: "10px" }}
        className="ui form"
        onSubmit={(event) => onSubmit(event)}
      >
        <input
          type="text"
          name="author"
          value={comments.author}
          placeholder="Author"
          autoComplete="off"
          onChange={(event) => onInputChange(event)}
          style={{ marginBottom: "5px" }}
        />
        <input
          type="text"
          name="comment"
          value={comments.comment}
          placeholder="Comment"
          autoComplete="off"
          onChange={(event) => onInputChange(event)}
        />
        <button style={{ marginTop: "5px" }} className="ui primary button">
          Comment
        </button>
        <Link to="/" className="ui negative button">
          Home
        </Link>
      </form>
    </div>
  );
};

export default PostView;
