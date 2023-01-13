import './styles.css'

function Content(props){
    return (
        <div className="Content container">
            {props.children}
        </div>
    )
}

export default Content