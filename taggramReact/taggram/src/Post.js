import liked from "./images/liked.png"
import unliked from "./images/unliked.png"

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
                        <b>{props.post.user.username}</b>
                        <div>{props.post.location.city}, {props.post.location.country}</div>
                    </div>
                </div>
                <div className='comments'>
                    {props.post.comments.map((data) => {
                        const like = (e) => {
                            e.preventDefault();
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
                            e.preventDefault();
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
                                    <div>
                                        <b>{data.user.username}</b>{" " + data.message}
                                    </div>
                                    <div className="comDetails">
                                        <div>{data.created_at}</div>
                                        <b className="nCurtidas">{data.like_count !== 0 ?
                                            data.like_count === 1 ?
                                                data.like_count + " curtida" :
                                                data.like_count + " curtidas" :
                                            ""}</b>
                                    </div>
                                </div>
                                <img className="heart" id={data.uuid} src={data.has_liked ? liked : unliked} alt="Heart"
                                    onClick={data.has_liked ? unlike : like}
                                />

                            </div>
                        );
                    })}
                </div>
                <div className='botDetails'>
                    <b>{props.post.comments && Object.keys(props.post.comments).length + " comentários"}</b>
                    <div>{props.post.created_at}</div>
                </div>
            </div>
        </div>
    );
}

export default Post;