import {useState} from 'react'
import * as authService from '../services/auth.services.js'

function LoginPage({onLogin}){
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState([])

    function onSubmit(event){
        event.preventDefault()
        authService.login(mail, password)
        .then(({user, token}) =>{
            onLogin(user, token)
        })
        .catch(error =>{
            setError(error.errors)
        })

    }

    function onChangeMail(event){
        setMail(event.target.value)
    }

    function onChangePassword(event){
        setPassword(event.target.value)
    }

    return (
        <div className='formu'>
            <h2>Iniciar Sesión</h2>
            <p>Para realizar esta acción debes iniciar sesión.</p>
            <div>
                {error.map(error =><p>{error}</p>)}
            </div>
            <form onSubmit={onSubmit}>
                <div className='mb-3'>
                <label className="form-label">E-Mail: </label>
                <input className="form-control" type="text"  onChange={onChangeMail} value={mail} />
                </div>

                <div className='mb-3'>
                <label className="form-label">Contraseña: </label>
                <input className="form-control" type="password" onChange={onChangePassword} value={password} />
                </div>
     
                <button className="btn btn-dark w-100">Ingresar</button>
            </form>
        </div>)           
}


export default LoginPage