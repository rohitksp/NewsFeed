import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

const PostEdit = () => {
  let history = useHistory();
  let { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const getPost = async () => {
    const result = await axios.get(`https://newsfeed-app-react.herokuapp.com/posts/${id}`);
    setPost(result.data);
  };

  useEffect(() => {
    getPost();
  }, []);

  const { title, body } = post;
  const onInputChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.put(`https://newsfeed-app-react.herokuapp.com/posts/${id}`, post);
    history.push("/");
  };

  return (
    <div
      style={{ marginTop: "10px", background: "#DCDCDC" }}
      className="ui segment container"
    >
      <form className="ui form" onSubmit={(event) => onSubmit(event)}>
        <div className="field">
          <h1 style={{ textAlign: "center" }}>Edit A Post</h1>
          <hr />
          <label>Edit Title</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            autoComplete="off"
            onChange={(event) => onInputChange(event)}
          />
          <label style={{ marginTop: "10px" }}>Edit Description</label>
          <input
            type="text"
            name="body"
            value={body}
            placeholder="Description"
            autoComplete="off"
            onChange={(event) => onInputChange(event)}
          />
          <button style={{ marginTop: "10px" }} className="ui primary button">
            Update Post
          </button>
          <Link to="/" className="ui negative button">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
export default PostEdit;
