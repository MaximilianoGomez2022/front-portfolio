async function find() {
    return fetch('https://back-portfolio-lac.vercel.app/api/generos')
        .then(response => response.json())
}

export {
    find
}