
const { getJoyasQuery, filtrarJoyasQuery, getJoyaByIdQuery} = require("../querys/index")


/* En Hateoas */
const prepararHATEOAS = (joyas) => {
    const results = joyas.map((joya) => {
        return {
            nombre: joya.nombre,
            href: `/joyas/${joya.id}`
        };
    });
    const total = joyas.length;
    const HATEOAS = {
        total,
        results,
    };
    return HATEOAS;
};


const getJoyaByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const joya = await getJoyaByIdQuery(id);
        if (!joya) {
            return res.status(404).json({ msg: 'Joya no encontrada' });
        }
        res.json(joya);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener detalles de la joya', error: error.message });
    }
};

const getJoyasController = async (req, res) => {
    try {
        const queryString = req.query
        const result = await getJoyasQuery(queryString);
        const HATEOASResult = prepararHATEOAS(result);
        res.json(HATEOASResult);
    } catch (error) {
        res.status(500).json({
            msg: 'Error al cargar...',
            error: error.message
        });
    }

}

const filtrarJoyasController = async (req,res) => {
    try {
        const { precio_max, precio_min, categoria, metal } = req.query;

        const parsedPrecioMax = parseFloat(precio_max);
        const parsedPrecioMin = parseFloat(precio_min);

        if (!precio_max || !precio_min || !categoria || !metal) {
            return res.status(400).json({
                msg: 'Se exigen todos los parámetros',
            });
        }

        if (typeof parsedPrecioMax !== 'number' || typeof parsedPrecioMin !== 'number') {
            return res.status(400).json({
                msg: 'Por favor, valores numericos parr precio_max y precio_min',
            });
        }
        if (parsedPrecioMax < 0 || parsedPrecioMin < 0 || parsedPrecioMax < parsedPrecioMin) {
            return res.status(400).json({
                msg: 'Por favor, valores >= a 0 para precio_max y precio_min, y precio_max debe ser mayor o igual a precio_min',
            });
        }

        const result = await filtrarJoyasQuery(precio_max, precio_min, categoria, metal);
       if(result.length > 0){
        res.json(result);
       }else{
            res.status(200).json({
                msg: 'Busqueda sin resultado',
            })
       }

    } catch (error) {
        res.status(500).json({
            msg: 'Error.... en la carga',
            error: error.message
        });

    }
}

module.exports = {
    getJoyaByIdController,
    getJoyasController,
    filtrarJoyasController
}