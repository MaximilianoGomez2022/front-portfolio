async function find() {
    return fetch('http://back-portfolio-lac.vercel.app/api/generos')
        .then(response => response.json())
}

export {
    find
}