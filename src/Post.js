import liked from "./images/liked.png"
import unliked from "./images/unliked.png"

//recebe os dados coletados da API
const Post = (props) => {
    return (
        <div className="Post">
            <img className='postPhoto' src={props.post.photo} alt="User Post" />
            <div className='commentsSection'>
                <div className="upDetails">
                    <div className="comment-user__avatar" style={{
                        backgroundImage: `url(${props.post.user.avatar})`
                    }}></div>
                    <div className="upData">
                        <b className="username">{props.post.user.username}</b>
                        <div className="location">{props.post.location.city}, {props.post.location.country}</div>
                    </div>
                </div>
                <div className='comments'>
                    {/* "foreach" dos dados dos comentários */}
                    {props.post.comments.map((data) => {
                        const like = (e) => {
                            e.preventDefault(); //evita double click
                            const apiUrl = "https://taggram.herokuapp.com";
                            const username = props.username;
                            const usernamejson = { username };
                            fetch(apiUrl + "/comments/" + e.target.id + "/like", {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(usernamejson),
                                crossDomain: true,

                            }).then((response) => {
                                //se funcionar, atualiza
                                if (!response.ok)
                                    alert("Não foi possível curtir o comentário, tente novamente.");
                                else {
                                    data.has_liked = true;
                                    data.like_count++;
                                    e.target.src = liked;
                                    e.target.onclick = unlike;
                                }
                            });
                        }
                        const unlike = (e) => {
                            e.preventDefault(); //evita double click
                            const apiUrl = "https://taggram.herokuapp.com";
                            const username = props.username;
                            const usernamejson = { username };
                            fetch(apiUrl + "/comments/" + e.target.id + "/unlike", {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(usernamejson),
                                crossDomain: true,

                            }).then((response) => {
                                //se funcionar, atualiza
                                if (!response.ok)
                                    alert("Não foi possível descurtir o comentário, tente novamente.");
                                else {
                                    data.has_liked = false;
                                    data.like_count--;
                                    e.target.src = unliked;
                                    e.target.onclick = like;
                                }
                            });
                        }
                        return (
                            <div key={data.uuid} className="comment">
                                <div className="comment-user__avatar" style={{
                                    backgroundImage: `url(${data.user.avatar})`
                                }}></div>
                                <div className="comData">
                                    <div className="message">
                                        <b className="username">{data.user.username}</b>{" " + data.message}
                                    </div>
                                    <div className="comDetails">
                                        <div>{data.created_at}</div>
                                        {/* verifica o n° de curtidas para atualizar */}
                                        <b className="nCurtidas">{data.like_count !== 0 ?
                                            data.like_count === 1 ?
                                                data.like_count + " curtida" :
                                                data.like_count + " curtidas" :
                                            ""}</b>
                                    </div>
                                </div>
                                {/* verifica o estado */}
                                <img className="heart" id={data.uuid} src={data.has_liked ? liked : unliked} alt="Heart"
                                    onClick={data.has_liked ? unlike : like}
                                />

                            </div>
                        );
                    })}
                </div>
                <div className='botDetails'>
                    {/* pega o n° de comentários e escreve baseado nele */}
                    <b className="ncommentsb">{Object.keys(props.post.comments).length + (Object.keys(props.post.comments).length!==1?" comentários":" comentário")}</b>
                    <div className="createdat">{props.post.created_at}</div>
                </div>
            </div>
        </div>
    );
}

export default Post;