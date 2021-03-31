import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ marginBottom: "-15px" }} className="ui container segment">
      <h2>NewsFeed</h2>
      <Link to="/post/create" className="ui primary button">
        Add Post
      </Link>
    </div>
  );
};

export default Header;
