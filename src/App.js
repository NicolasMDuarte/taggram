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
        setAvatar("https://th.bing.com/th/id/R.17848284334b288f34f3e0368c5ef9fb?rik=SH%2fq6VbkrptZaQ&riu=ht"+
        "tp%3a%2f%2fgetdrawings.com%2ffree-icon%2fgeneric-avatar-icon-59.png&ehk=TXts5dMGkL69GjKF676bhxuxO54koWOMPvXlvYeB%2bck%3d&risl=&pid=ImgRaw&r=0");
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
          posted.user.avatar = 
          "https://pbs.twimg.com/profile_images/1509873107/generic_avatar_400x400.gif";
          for (let i = 0; i < posted.comments.length; i++) {
            posted.comments[i].user.avatar = 
            "https://th.bing.com/th/id/OIP.ZT-Tw8tYy38htqch69vsGQAAAA?pid=ImgDet&rs=1";
          }
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
