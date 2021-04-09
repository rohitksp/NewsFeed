import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const PostCreate = () => {
  let history = useHistory();
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const { title, body } = post;
  const onInputChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post("https://newsfeed-app-react.herokuapp.com/posts", post);
    history.push("/");
  };

  return (
    <div
      style={{ marginTop: "10px", background: "#DCDCDC" }}
      className="ui segment container"
    >
      <form className="ui form" onSubmit={(event) => onSubmit(event)}>
        <div className="field">
          <h1 style={{ textAlign: "center" }}>Create A Post</h1>
          <hr />
          <label>Create A Title</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            autoComplete="off"
            onChange={(event) => onInputChange(event)}
          />
          <label style={{ marginTop: "10px" }}>Create A Description</label>
          <input
            type="text"
            name="body"
            value={body}
            placeholder="Description"
            autoComplete="off"
            onChange={(event) => onInputChange(event)}
          />
          <button style={{ marginTop: "10px" }} className="ui primary button">
            Add Post
          </button>
          <Link to="/" className="ui negative button">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
