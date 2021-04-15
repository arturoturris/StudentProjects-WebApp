const {API_URL} = require('../config/config')
const fetch = require('node-fetch')

async function renderProyectos(req,res){
    let proyectos = await getProyectos(req.usuario.matricula)

    res.render('alumno/proyectos/proyectos',{
        usuario: req.usuario.nombre,
        pageTitle: 'Proyectos',
        menuSelection: 'Proyectos',
        role: 'ALUMNO',
        proyectos
    })
}

async function renderNuevoProyecto(req,res){
    let materias = await getMateriasAlumno(req.usuario.matricula)

    res.render('alumno/nuevoProyecto/nuevoProyecto',{
        usuario: req.usuario.nombre,
        pageTitle: 'Nuevo proyecto',
        menuSelection: 'Proyectos',
        role: 'ALUMNO',
        materias
    })
}

function getProyectos(matricula){
    return fetch(`${API_URL}alumnos/${matricula}/proyectos`,{
        method: 'GET'
    })
    .then(async res => {
        if(res.status === 200)
            return await res.json()
        return []
    })
    .then(proyectos => proyectos)
    .catch(err => {
        console.error(err)
        return []
    })
}

function getMateriasAlumno(matricula){
    return fetch(`${API_URL}alumnos/${matricula}/materias`,{
        method: 'GET'
    })
    .then(async res => {
        if(res.status === 200)
            return await res.json()
        return []
    })
    .then(materias => materias.Materia)
    .catch(err => {
        console.error(err)
        return []
    })
}

module.exports = {
    renderProyectos,
    renderNuevoProyecto
}