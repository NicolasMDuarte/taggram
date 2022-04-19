import logo from "./images/tagview.png";

const MorePosts = (props) => {
    return (
        <div className="MorePosts">
            <b>Mais Publicações</b>
            <div className="grid">
                {props.relatedPosts.map((data) => {
                    const img = data.photo;
                    if (data.comment_count >= 3) {
                        return (
                            <img className="relatedPost" key={data.uuid} src={img} alt="Related Post" />
                        );
                    }
                    else
                        return (null);
                })}
            </div>
            <img className="botLogo" src={logo} alt="Taggram" />
        </div>
    );
}

export default MorePosts;