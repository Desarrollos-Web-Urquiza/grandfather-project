/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* INDICE ALUMNOS  */
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

	const [data, setData] = useState("");
	const [err, setErr] = useState(false);

	const handleData = (e) =>	{
		setErr(false)
		console.log(e.target.value)
		let operationNumber = e.target.value
		if(isNaN(parseInt(operationNumber)) && operationNumber != "")	{
			setErr("Error: No puede ingresar letras. Debe ingresar un número")
			setData("")
			e.target.value = ""
			return
		}
		if((operationNumber < 1 || operationNumber > 4) && e.target.value != "")	{
			setErr("Error: Debe ingresar un número del 1 a 4")
			setData("")
			e.target.value = ""
		}	else	{
			setData(e.target.value )
		}
	}
	
	const redirection = () =>	{
		if(!err){
			if(data == ""){
				setErr("Error: Los datos están vacíos")
			}	else {
				props.history.push('/ingresoClave/' + data)
			}
		}
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			redirection()
		}
	}

	return(
		<div className="mainCenter">
			<Helmet>
				<title>Grandfather project - Índice alumnos</title>
			</Helmet>
			<h2 align="center">ALUMNADO</h2>
			<div align="center"  >
				<div className="card-container">
					<div id="div-options" align="left" className="flex flex-col justify-initial w-32">
						<p>1 Ingresos</p>
						<p>2 Modificaciones</p>
						<p>3 Bajas</p>
						<p>4 Fin</p>
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
							onKeyDown={handleKeyDown} 
						/>
					</div>	
					
					{err && <p style={{color: "red"}}> {err} </p> }	
					<br/>
					
				</div>
			</div>
		</div>
	)
}

export default  Home  ;