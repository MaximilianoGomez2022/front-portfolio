import { useState, useEffect } from "react"
import * as peliculasServices from "../services/peliculas.services.js"

import {Link} from 'react-router-dom'

function PeliculasListPage(){

    const [peliculas, setPeliculas] = useState([])

    useEffect(()=>{
        peliculasServices.find()
        .then(data => {
            setPeliculas(data)
        })
    }, [])

   return ( 
            <div>
            <h2>Lista de Peliculas</h2>
            <div className="row">
                {peliculas.map(({_id, name, img, genero}) =>
                <div key={_id} className="col-md-3">
                    {name}
                    <div>
                    <Link to={`/peliculas/${_id}`} className="btn btn-secondary me-3">Ver</Link> 
                    <Link to={`/peliculas/${_id}/editar`} className="btn btn-primary me-3">Editar</Link><Link to={`/peliculas/${_id}/eliminar`} className="btn btn-danger">Eliminar</Link>
                    </div>
                    <img src={`./public/${img}`}/>
                    <p>Género: {genero}</p>
                </div>
                )}
            </div>
            </div> 
          
          )}

export default PeliculasListPage