const reportarConsulta = async (req, res, next) => {
    const parametros = req.query
    const url = req.url
    const method = req.method

    if (Object.keys(parametros).length > 0) {
        console.log(` Hoy ${new Date()} url ${url} metodo ${method}
        parámetros:        
        `)
        console.table(parametros)
        next()
    }else{
        console.log(` Hoy ${new Date()} url ${url} metodo ${method}`)
        next()
    }
}
module.exports = reportarConsulta