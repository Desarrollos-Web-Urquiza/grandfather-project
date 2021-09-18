/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* INGRESO CLAVE*/
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

const KeyEntry = props => {

	const [operationNumber, setOperationNumber] = useState(null);

	useEffect(() => {
		let semiParams = window.location.href.split('/')
		let paramsFinished = semiParams[4]
		if(parseInt(paramsFinished) === 4) 
			props.history.push('/fin')
		setOperationNumber(paramsFinished)
	},[]);

	return(
		<div className="mainCenter">
			<Helmet>
				<title>Grandfather project - Ingreso de clave</title>
			</Helmet>
			<h1 align="center" style={{marginLeft: 5}}>Ingreso de clave</h1>
			<div align="center"  style={{marginTop: 150}}>
				<div className="card-container">
					<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }} >
						<h2 >Ingrese DNI de alumno</h2>
						<TextField 
							variant="outlined" 
							style={{marginBottom: 70, marginTop: 50, width: 200 }} 
							type="number"
							InputProps={{ inputProps: { min: 0, max: 9 } }}
						/>
						<br />		
						<Button variant="contained" color="primary">
							Realizar operación
						</Button>
					</CardSelect>
				</div>
			</div>
		</div>
	)
}

export default  KeyEntry  ;