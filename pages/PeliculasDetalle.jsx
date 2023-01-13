import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import * as peliculasServices from "../services/peliculas.services"

function PeliculasDetalle(){
    const {id} = useParams()
    const [pelicula, setPelicula] = useState({})

    useEffect(()=>{
        peliculasServices.findById(id)
        .then(data => {
            setPelicula(data)
        })
    }, [id])

    return <div className="text-center">
        <h2>{pelicula.name}</h2>
        <p>Año: {pelicula.anio}</p> <p>Género: {pelicula.genero}</p>
        <iframe width="853" height="480" src="https://www.youtube.com/embed/p3F_-QqPdlk" title="New Universal Intro 2012 1080p full HD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
}

export default PeliculasDetalle