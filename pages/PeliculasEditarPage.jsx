import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as peliculasServices from '../services/peliculas.services.js'
import * as GenerosServices from '../services/generos.services.js'

import {useNavigate} from 'react-router-dom'

function PeliculasEditPage(){

    const {id} = useParams()
    const [name, setName] = useState("")
    const [anio, setAnio] = useState(0)
    const [genero, setGenero] = useState("")
    const [generos, setGeneros] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        GenerosServices.find()
        .then((data)=>{
            setGeneros(data)
            setGenero(data[0].name)
        })
    }, [])

    function changeName(e){
        setName(e.target.value)
    }
    function changeAnio(e){
        setAnio(e.target.value)
    }
    function changeGenero(e){
        setGenero(e.target.value)
    }
    function onSubmit(e){
        e.preventDefault()
        peliculasServices.edit(id, {name, anio, genero})
        .then((data) => {
            console.log(data)
            navigate("/peliculas")
            
        })
    }

    return (<div>
        <h2>Editar pelicula</h2>
        <form onSubmit={onSubmit}>
        <div className='mb-3'>
            <label className="form-label">Nombre</label>
            <input className="form-control" type="text" name='name' onChange={changeName} value={name}/>
        </div>
            <label className="form-label">Año</label>
            <input className="form-control" type="number" name='anio' onChange={changeAnio} value={anio} />
            <label className="form-label">Genero</label>
            <select onChange={changeGenero} value={genero}>
                    {generos.map((genero)=>{
                        return <option key={genero.id} value={genero.id}>{genero.name}</option>
                    })}
            </select>
            <div className='mb-3'>
            <button className='btn btn-dark w-100'>Editar</button>
            </div>
            
        </form>
    </div> )
}

export default PeliculasEditPage