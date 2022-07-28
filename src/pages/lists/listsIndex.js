/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* INDICE ALUMNOS  */
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const CardSelect = withStyles((theme) => ({
  root: {
    backgroundColor: grey[100],
    maxWidth: 500,
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
}))(Card);

const Home = props => {

	const [err, setErr] = useState(false)

	const handleData = (e) =>	{
		setErr(false)
		let operationNumber = e.target.value
		if(isNaN(parseInt(operationNumber)) && operationNumber != "")	{
			setErr("Error: No puede ingresar letras. Debe ingresar un número")
			e.target.value = ""
			return
		}
		if((operationNumber < 1 || operationNumber > 2) && e.target.value != "")	{
			setErr("Error: Debe ingresar un número del 1 a 2")
			e.target.value = ""
			return
		}	else	{
			redirection(e.target.value)
		}
	}
	
	const redirection = (data) =>	{
		console.log(data)
		if(data == ""){
			setErr("Error: Los datos están vacíos")
		}	else {
			if(data == "1")
				data = 4
			if(data == "2")
				data = 5
			props.history.push('/lists/' + data)
		}
	}

	return(
		<div className="mainCenter">
			<Helmet>
				<title>Grandfather project - Índice alumnos</title>
			</Helmet>
			<div align="center"  >
				<h2 align="center">ALUMNADO - LISTADOS</h2>
				<div className="card-container">
					<div id="div-options" align="left" className="flex flex-col justify-initial w-40">
						<p>1 Listado por número de documento</p>
						<p>2 Listado por apellido</p>
					</div>
					<br />
					<br />	
					<div  id="div-options-input" className="flex flex-row flex-wrap justify-around max-w-sm">
						<p className="mt-4">Ingrese su opción:</p>
						<TextField 
							variant="outlined" 
							style={{marginBottom: 50, width: 200 }} 
							type="text"
							InputProps={{ inputProps: { min: 0, max: 4 } }}
							onChange={handleData}
							error={err}
							autoFocus={true}
						/>
					</div>	
					<br/>
					{err && <b><p style={{color: "red"}} className="-mt-8"> {err} </p></b> }	
				</div>
			</div>
		</div>
	)
}

export default  Home  ;