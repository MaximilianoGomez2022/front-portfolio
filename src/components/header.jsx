import './styles.css'
import './bootstrap.min.css'

function Header(props){
    return (
        <div className="Header">
            {props.children}
        </div>
    )
}

export default Header