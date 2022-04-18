import Header from './Header.js'
import Post from './Post.js'
import MorePosts from './MorePosts.js'
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [username, setUsername] = useState();
  const [avatar, setAvatar] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    const apiUrl = "https://taggram.herokuapp.com";
    fetch(apiUrl + "/me")
      .then(function (response) {
        return response.json();
      })
      .then(function (user) {
        setUsername(user.username);
        if (user.avatar) {
          setAvatar("url('" + user.avatar + "')");
        }
      });
  }, []);
  useEffect(() => {
    const apiUrl = "https://taggram.herokuapp.com";
    fetch(apiUrl + "/post?username=" + username)
      .then(function (response) {
        return response.json();
      })
      .then(function (posted) {
        setPost(posted);
      });
  }, [username]);

  return (
    <div className="App">
      <head>
        <title>Taggram</title>
        <link rel="stylesheet" href="https://unpkg.com/normalize.css@8.0.1/normalize.css" />
        <link rel="stylesheet" type="text/css" href="style.css" />
        <script src="index.js"></script>
      </head>
      <body className="body">
        <Header
          username={username}
          avatar={avatar}
        />
        {post && <Post
          post={post}
          username={username}
        />}
        <MorePosts />
      </body>
    </div>
  );
};

export default App;
