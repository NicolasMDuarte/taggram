import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);

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

  return (
    <div className="App">
      <head>
        <title>Taggram</title>
        <link rel="stylesheet" href="https://unpkg.com/normalize.css@8.0.1/normalize.css" />
        <link rel="stylesheet" type="text/css" href="style.css" />
        <script src="index.js"></script>
      </head>

      <body className="body">
        <header className="header">
          <div className="header__container">
            <div className="current-user">
              <div className="current-user__username">{username}</div>
              <div className="current-user__avatar" style={{
                backgroundImage: { avatar }
              }}></div>
            </div>
          </div>
        </header>
      </body>
    </div>
  );
};

export default App;
