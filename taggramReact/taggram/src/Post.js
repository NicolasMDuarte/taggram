import liked from "./images/liked.png"
import unliked from "./images/unliked.png"

const Post = (props) => {
    return (
        <div className="Post">
            <img className='postPhoto' src={props.post.photo} alt="User Post" />
            <div className='CommentsSection'>
                <div className="UpDetails"></div>
                <div className='Comments'>
                    {props.post.comments.map((data) => {
                        const like = (e) => {
                            const apiUrl = "https://taggram.herokuapp.com";
                            console.log(e)
                            const username = props.username
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
                                else
                                    data.has_liked = true;
                                data.like_count++;
                                e.target.src = liked;
                                e.target.onclick = unlike;
                            });
                        }
                        const unlike = (e) => {
                            const apiUrl = "https://taggram.herokuapp.com";
                            console.log(e)
                            const username = props.username
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
                                else
                                    data.has_liked = false;
                                data.like_count--;
                                e.target.src = unliked;
                                e.target.onclick = like;
                            });
                        }
                        return (
                            <div key={data.uuid}>
                                <div>
                                    <div className="comment-user__avatar" style={{
                                        backgroundImage: data.user.avatar
                                    }}></div>
                                    <div>
                                        <b>{data.user.username}</b>{" " + data.message}
                                    </div>
                                </div>
                                <div>
                                    <div>{data.created_at}</div>
                                    <b>{data.like_count !== 0 ?
                                        data.like_count === 1 ?
                                            data.like_count + " curtida" :
                                            data.like_count + " curtidas" :
                                        ""}</b>
                                </div>
                                <img id={data.uuid} src={data.has_liked ? liked : unliked} alt="Heart"
                                    onClick={data.has_liked ? unlike : like}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className='BotDetails'>
                    <div>{props.post.comments && Object.keys(props.post.comments).length + " comentários"}</div>
                    <div>{props.post.created_at}</div>
                </div>
            </div>
        </div>
    );
}

export default Post;