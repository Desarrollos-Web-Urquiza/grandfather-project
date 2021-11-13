/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/*FIN*/
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

const End = props => {

	const [err, setErr] = useState(false)

	const handleData = (e) =>	{
		setErr(false)
		console.log(e.target.value)
		let operationNumber = e.target.value
		if(isNaN(parseInt(operationNumber)) && operationNumber != "")	{
			setErr("Error: No puede ingresar letras. Debe ingresar un número")
			e.target.value = ""
			return
		}
		if((parseInt(operationNumber) !== 1 ) && e.target.value != "")	{
			setErr("Error: No puede ingresar otro número que no sea 1")
			e.target.value = ""
			return
		}	else	{
			redirection(e.target.value)
		}
	}
	
	const redirection = (data) =>	{
		if(data == ""){
			setErr("Error: Los datos están vacíos")
		}	else {
			props.history.push('/')
		}
	}

	return(
		<div className="mainCenter">
			<Helmet>
				<title>Grandfather project - Fin</title>
			</Helmet>
			<h2 align="center" style={{marginLeft: 5}}>ÍNDICE GENERAL DEL SISTEMA</h2>
			<h2 align="center" style={{marginLeft: 5}}>(FIN)</h2>
			<div align="center"  style={{marginTop: 150}}>
				<div className="card-container">
					<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }} >
						<div id="div-options" align="center" className="flex flex-col justify-initial w-80">
							<h2>Regresar a Alumnado</h2>
							<p className="mt-8">1 Continuar</p>
						</div>
						<div className="mt-8">
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
					</CardSelect>
				</div>
				{err && <b><p style={{color: "red"}} className="-mt-8"> {err} </p></b> }	
			</div>
		</div>
	)
}

export default End  ;