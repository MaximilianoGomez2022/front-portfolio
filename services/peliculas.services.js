async function find() {
    return fetch('http://localhost:2022/api/peliculas')
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('No se pudo obtener las peliculas')
            }
        })
}

async function findDestacadas() {
    return fetch('http://localhost:2022/api/peliculas?destacada=true')
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('No se pudo obtener las peliculas')
            }
        })
}

async function findById(id) {
    return fetch(`http://localhost:2022/api/peliculas/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('No se pudo obtener las peliculas')
            }
        })
}

async function create(pelicula) {
    return fetch('http://localhost:2022/api/peliculas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(pelicula)
    })
        .then(response => response.json())
}

async function edit(id, pelicula) {
    return fetch(`http://localhost:2022/api/peliculas/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(pelicula)
    })
        .then(response => response.json())
}

async function eliminar(id) {
    return fetch(`http://localhost:2022/api/peliculas/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(response => response.json())
}

export {
    find,
    findById,
    findDestacadas,
    create,
    edit,
    eliminar
}