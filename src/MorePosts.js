import logo from "./images/tagview.png";

//recebe os dados da API
const MorePosts = (props) => {
    return (
        <div className="MorePosts">
            <b className="maisPosts">Mais Publicações</b>
            <div className="grid">
                {props.relatedPosts.map((data) => {
                    const img = data.photo;
                    // só exibe se tiver 3 ou mais comentários
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