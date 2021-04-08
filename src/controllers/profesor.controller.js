const {API_URL} = require('../config/config')
const fetch = require('node-fetch')

function renderMaterias(req,res){
    let subjects = [
        {
            name:"Metodologias de desarrollo web",
            term:"Primavera",
            NRC:"XER"
        },
        {
            
            name:"Tecnologías Web",
            term:"Primavera",
            NRC:"ASZ"
        },
        {
            name:"Herramientas Web",
            term:"Primavera",
            NRC:"AWD"
        },
        {
            name:"Desarrollo de Sitios Web",
            term:"Primavera",
            NRC:"ZAS"
        },
        {
            name:"Desarrollo de Sitios Web",
            term:"Primavera",
            NRC:"ZAS"
        }];
    res.render("profesor/dashboard",{
        pageTitle:"Materias",
        username:`${req.usuario.nombre}`,
        subjects: subjects,
        role: 'PROFESOR'
    });
}

function renderDetalles(req,res){
    res.render("profesor/details_project",{
        pageTitle:"Detalles de Proyecto",
        username:`${req.usuario.nombre}`,
        role: 'PROFESOR'
    })
}

function renderMateria(req,res){
    console.log(req.params);
    let projects=[
        {
            name:"Proyecto X",
            responsable: "Alumno responsable",
            id:"12"

        },
        {
            name:"Proyecto X",
            responsable: "Alumno responsable",
            id:"123"
        },
        {
            name:"Proyecto X",
            responsable: "Alumno responsable",
            id:"1234"
        }
    ];
    res.render("profesor/subjects",{
        pageTitle:"Proyectos",
        username:`${req.usuario.nombre}`,
        projects:projects,
        role: 'PROFESOR'
    });
}

module.exports = {
    renderMaterias,
    renderDetalles,
    renderMateria
};