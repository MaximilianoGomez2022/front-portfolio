import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import * as peliculasServices from '../services/peliculas.services.js'
import {useNavigate} from 'react-router-dom'

function PeliculasDeletePage(){

    const [pelicula, setPelicula] = useState({})

    useEffect(()=>{
        peliculasServices.findById(id)
        .then(data => {
            setPelicula(data)
        })
    },)

    const {id} = useParams()

    const navigate = useNavigate()

    function onSubmit(e){
        e.preventDefault()
        if(confirm('Deseas eliminar esta pelicula ?')){
            peliculasServices.eliminar(id)
            .then((data) => {
                console.log('Eliminaste')
                console.log(data)
                navigate("/peliculas")
                
            })
        }

    }

    return (<div>
        <h2>Eliminar pelicula {pelicula.name}</h2>
        <form className='w-50' onSubmit={onSubmit}>
            <div className='mb-3'>
            <button className='btn btn-primary w-100'>Eliminar</button>
            </div>
            
        </form>
    </div> )
}

export default PeliculasDeletePage