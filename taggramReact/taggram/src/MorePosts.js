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
                            <div key={data.uuid}>
                                <img src={img} alt="Related Post" />
                            </div>
                        );
                    }
                    else
                        return (null);
                })}
            </div>
            <img src={logo} alt="Taggram" />
        </div>
    );
}

export default MorePosts;