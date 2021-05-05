const {API_URL} = require('../config/config')
const fetch = require('node-fetch')

function renderMaterias(req,res){
    fetch(`${API_URL}profesores/${req.usuario.matricula}/materias`)
    .then(promiseFetch=>promiseFetch.json())
    .then(subjects => {
        res.render('profesor/pages/dashboard.page.ejs',{
            pageTitle: 'Materias',
            usuario: req.usuario.nombre,
            subjects,
            menuSelection: 'Materias',
            role: 'PROFESOR'
        })
    })
    .catch(error => res.send(error))
}

function renderDetalles(req,res){
    fetch(`${API_URL}proyectos/${req.params.id_proyecto}`)
    .then(promiseFetch=>promiseFetch.json())
    .then(details => {
        res.render("profesor/pages/detallesProyecto.page.ejs",{
            pageTitle:"Detalles de Proyecto",
            usuario: req.usuario.nombre,
            details,
            menuSelection: 'Materias',
            role: 'PROFESOR'
        })
    });
}

function renderMateria(req,res){
    fetch(`${API_URL}materias/${req.params.nrc}/proyectos`)
    .then(promiseFetch=>promiseFetch.json())
    .then(projects => {
        res.render("profesor/pages/proyectos.page.ejs",{
            pageTitle:"Proyectos",
            usuario: req.usuario.nombre,
            projects,
            menuSelection: 'Materias',
            role: 'PROFESOR'
        })
    });
}

function renderAsignacion(req,res){
    fetch(`${API_URL}proyectos/${req.params.id_proyecto}`)
    .then(promiseFetch=>promiseFetch.json())
    .then(detalles => {
        fetch(`${API_URL}asignacion/${req.params.id_proyecto}`)
        .then(promiseFetch=>promiseFetch.json())
        .then(entregables => {
            console.log(entregables)
            res.render("profesor/pages/asignacion.page.ejs",{
            pageTitle:"Asignacion",
            usuario: req.usuario.nombre,
            //projects,
            detalles,
            entregables,
            menuSelection: 'Materias',
            role: 'PROFESOR'
            });
        })
    })
}

function renderCierre(req,res){
    fetch(`${API_URL}proyectos/${req.params.id_proyecto}`)
    .then(promiseFetch=>promiseFetch.json())
    .then(detalles => {
        fetch(`${API_URL}cierre/${req.params.id_proyecto}`)
        .then(promiseFetch=>promiseFetch.json())
        .then(cierre => {
            console.log(cierre)
            res.render("profesor/pages/cierre.page.ejs",{
                pageTitle:"Cierre",
                usuario:`${req.usuario.nombre}`,
                detalles,
                cierre,
                api: API_URL,
                id_proyecto: req.params.id_proyecto,
                menuSelection: 'Materias',
                role: 'PROFESOR'
            });
        })
    })
}

function renderReporte(req,res){
    fetch(`${API_URL}proyectos/${req.params.id_proyecto}`)
    .then(promiseFetch=>promiseFetch.json())
    .then(detalles => {
        fetch(`${API_URL}asignacion/${req.params.id_proyecto}/resumen`)
            .then(promiseFetch=>promiseFetch.json())
            .then(entregables => {
                console.log(entregables)
                res.render("profesor/pages/reporte.page.ejs",{
                    pageTitle:"Reporte General",
                    usuario:`${req.usuario.nombre}`,
                    detalles,
                    entregables,
                    menuSelection: 'Materias',
                    role: 'PROFESOR'
                });
            })
    })
}

function renderCrearTarea(req,res){
    fetch(`${API_URL}proyectos/${req.params.id_proyecto}`)
    .then(promiseFetch=>promiseFetch.json())
    .then(detalles => {
        fetch(`${API_URL}proyectos/${req.params.id_proyecto}/etapas`)
        .then(promiseFetch=>promiseFetch.json())
        .then(etapas =>{
            res.render("profesor/pages/crearEntregable.page.ejs",{
                pageTitle:"Crear Tarea",
                usuario: req.usuario.nombre,
                detalles,
                etapas,
                api:`${API_URL}`,
                id_proyecto:req.params.id_proyecto,
                menuSelection: 'Materias',
                role: 'PROFESOR'
            })
        });
    });
}

function renderCalificar(req,res){
    fetch(`${API_URL}proyectos/${req.params.id_proyecto}`)
    .then(promiseFetch=>promiseFetch.json())
    .then(async detalles => {
        const entregable = await getEntregable(req.params.id_entregable)
        console.log(entregable)
        res.render("profesor/pages/calificar.page.ejs",{
            pageTitle:"Calificar entregable",
            usuario: req.usuario.nombre,
            api: `${API_URL}`,
            id_proyecto: req.params.id_proyecto,
            detalles,
            entregable,
            menuSelection: 'Materias',
            role: 'PROFESOR'
        })
    })
}

function getEntregable(id_entregable){
    return fetch(`${API_URL}entregables/${id_entregable}`)
    .then(async res => {
        if(res.status === 200)
            return await res.json()
        return null
    })
    .then(entregable => entregable)
    .catch(err => {
        console.error(err)
        return null
    })
}

module.exports = {
    renderMaterias,
    renderDetalles,
    renderMateria,
    renderAsignacion,
    renderCierre,
    renderReporte,
    renderCrearTarea,
    renderCalificar
};