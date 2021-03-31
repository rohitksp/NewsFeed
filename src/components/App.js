import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostList from "./posts/PostList";
import PostEdit from "./posts/PostEdit";
import PostCreate from "./posts/PostCreate";
import PostView from "./posts/PostView";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/post/create" component={PostCreate} />
        <Route exact path="/post/edit/:id" component={PostEdit} />
        <Route exact path="/post/view/:id" component={PostView} />
      </Switch>
    </Router>
  );
};

export default App;
