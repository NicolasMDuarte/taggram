import logo from './images/logo.png';

const Header = (props) => {
    const username = props.username;
    const avatar = props.avatar;

    return (
        <header className="Header">
            <div className="header__container">
                <div className='logo'>
                    <img src={logo} alt="Taggram Logo" />
                </div>
                <div className="current-user">
                    <div className="current-user__username">{username}</div>
                    <div className="current-user__avatar" style={{
                        backgroundImage: { avatar }
                    }}></div>
                </div>
            </div>
        </header>
    );
}

export default Header;