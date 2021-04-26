import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    

    //cuando el usuario agregue un gasto
    const agregarGasto = e => {
        e.preventDefault();
        
        //validar
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //resetear el form
        guardarNombre('');
        guardarCantidad('');
    }
    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agregar tus gastos aquí</h2>

            {error ? <Error mensaje="Ambos campos son obligatorios o su presupuesto es incorrecto" /> : null }

            <div className="campo">
                <label>Nombre gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Comida"
                    value={nombre}
                    onChange={ e => guardarNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label>Cantidad gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 1000"
                    value={cantidad}
                    onChange={ e => guardarCantidad(parseInt(e.target.value))}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar gasto"
            />
        </form>

     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;