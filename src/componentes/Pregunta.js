import React, {Fragment, useState} from 'react'; //Si el useState lo pongo dentro de las llaves
                                                 //no se va a poder usar los state de Preguntas.js
                                                 //en otros componentes, ya que se define localmente????
import Error from './Error.js';         
import PropTypes from 'prop-types';                                       

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    //State
    const[cantidad, guardarCantidad] = useState(0);
    const[error, guardarError] = useState(false);

    //Funcion que lee el presupuesto
    const definirPresupuesto = e => {
        guardarCantidad(parseInt(e.target.value)); //e.target.value devuelve un string, los inputs siempre
                                                   //devuelven string mas allá que sea type number
    }
    //Tambien se podría:
    //onChange={ e => guardarCantidad( paseInt(e.target.value) ) }  Esto funciona igual

    //Submit para definir el presupuesto
    const agregarPresupuesto = e => {
        e.preventDefault();

        //Validad
        if(cantidad < 1 || isNaN(cantidad) ){
            guardarError(true);
            return;
        }

        //Si se pasa la validación
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    }
    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            {error ? <Error mensaje={"El presupuesto es incorrecto"}/> : null}

            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />

                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />
            </form>
        </Fragment>
     );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}
 
export default Pregunta;