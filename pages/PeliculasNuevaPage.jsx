import {useEffect, useState} from 'react'
import * as peliculasServices from '../services/peliculas.services.js'
import * as GenerosServices from '../services/generos.services.js'

import {useNavigate} from 'react-router-dom'

function PeliculasNuevaPage(){

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
        peliculasServices.create({name, anio, genero})
        .then(() => {
            console.log('agregaste')
            navigate("/peliculas")
            
        })
    }

    return (<div>
        <h2>Agregar nueva pelicula</h2>
        <form onSubmit={onSubmit}>
        <div className='mb-3'>
            <label className="form-label">Nombre</label>
            <input className="form-control" type="text" name='name' onChange={changeName} value={name}/>
        </div>
            <label className="form-label">Año</label>
            <input className="form-control" type="number" name='anio' onChange={changeAnio} value={anio} />
            <label className="form-label">Genero</label>
            <select className="form-select" onChange={changeGenero} value={genero}>
                    {generos.map((genero)=>{
                        return <option key={genero.id} value={genero.id}>{genero.name}</option>
                    })}
            </select>

            <div className='mb-3'>
            <button className='btn btn-dark w-100'>Agregar</button>
            </div>
            
        </form>
    </div> )
}

export default PeliculasNuevaPage