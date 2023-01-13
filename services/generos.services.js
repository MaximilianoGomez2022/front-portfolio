async function find() {
    return fetch('http://localhost:2022/api/generos')
        .then(response => response.json())
}

export {
    find
}