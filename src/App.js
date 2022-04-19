import Header from './Header.js'
import Post from './Post.js'
import MorePosts from './MorePosts.js'
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  //Declaração de states
  const [username, setUsername] = useState();
  const [avatar, setAvatar] = useState();
  const [post, setPost] = useState();
  const [relatedPosts, setRelatedPosts] = useState();

  //Coleta de dados de API
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
  }, []); //sem dependência
  useEffect(() => {
    if (username) {
      const apiUrl = "https://taggram.herokuapp.com";
      fetch(apiUrl + "/post?username=" + username)
        .then(function (response) {
          return response.json();
        })
        .then(function (posted) {
          setPost(posted);
        });
    }
  }, [username]); //precisa do username
  useEffect(() => {
    if (post) {
      const apiUrl = "https://taggram.herokuapp.com";
      fetch(apiUrl + "/posts/" + post.uuid + "/related")
        .then(function (response) {
          return response.json();
        })
        .then(function (related) {
          setRelatedPosts(related);
        });
    }
  }, [post]); //precisa de um post

  //página
  return (
    <div className="App">
      <div className='head'>
        <title>Taggram</title>
        <link rel="stylesheet" href="https://unpkg.com/normalize.css@8.0.1/normalize.css" />
        <link rel="stylesheet" type="text/css" href="style.css" />
        <script src="index.js"></script>
      </div>
      <div className="body">
        <Header
          username={username}
          avatar={avatar}
        />
        {/* não pode ser undefined */}
        {post && username && <Post
          post={post}
          username={username}
        />}
        <div className='divider'></div>
        {/* não pode ser undefined */}
        {relatedPosts && <MorePosts
          relatedPosts={relatedPosts}
        />}
      </div>
    </div>
  );
};

export default App;
