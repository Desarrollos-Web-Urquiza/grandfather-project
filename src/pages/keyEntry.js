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
import { search } from "../db/functions/dbUtils";

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
	const [searchResult, setSearchResult] = useState(null);
	const [operationType, setOperationType] = useState(null);
	const [err, setErr] = useState(false);
	const [DNI, setDNI] = useState(null);

	useEffect(() => {
		let semiParams = window.location.href.split('/')
		let paramsFinished = semiParams[4]
		switch (paramsFinished) {
			case "1":
				setOperationType('Alta')
				break;
			case "2":
				setOperationType('Modificación')
				break;
			case "3":
				setOperationType('Baja')
				break;
			case "4":
				props.history.push('/fin')
				break;
			default:
				setOperationType('No seleccionó operación')
		}
		setOperationNumber(paramsFinished)
	},[]);

	const handleData = (e) =>	{
		setErr(false)
		if(isNaN(parseInt(e.target.value)) && e.target.value != "")	{
			setErr("Error: No puede ingresar letras. Debe ingresar un número")
			setDNI("")
			e.target.value = ""
			return
		}
		let DNI = parseInt(e.target.value)
		setDNI(DNI)
	}

	const executesSearch =  async () =>	{
		let promiseSearch =  await search(DNI)
		setSearchResult(promiseSearch)
		analyzeSearchResult(promiseSearch)
	}

	const analyzeSearchResult =  (directSearchResult) =>	{
		if(parseInt(operationNumber) === 1){
			if(parseInt(directSearchResult) === 0){
				console.log('Alumno no encontrado')
				if(DNI !== null && DNI !== '' ){
					props.history.push('/alumnoAlta/' + DNI)
				} else	{
					setErr('Debe ingresar un DNI')
				}
			} else if(parseInt(directSearchResult) === 1){
				console.log('Alumno sí encontrado')
				setErr('Error: El DNI ingresado ya existe. No lo puede volver a crear')
			}
		}
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			executesSearch()
		}
	}
	
	console.log(searchResult)
	
	return(
		<div align="center" className="mainCenter">
			<Helmet>
				<title>Grandfather project - Ingreso de clave</title>
			</Helmet>
			<h1 style={{marginLeft: 5}}>Ingreso de clave</h1>
			<h2 className={"m-8"}>Operación seleccionada: {operationType} </h2>
			<div style={{marginTop: 150}}>
				<div className="card-container">
					<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }} >
						<h2 >Ingrese DNI de alumno</h2>
						<TextField 
							variant="outlined" 
							style={{marginBottom: 70, marginTop: 50, width: 200 }} 
							type="text"
							InputProps={{ inputProps: { min: 0, max: 9 } }}
							autoFocus={true}
							onChange={handleData}
							onKeyDown={handleKeyDown} 
						/>
						{err && <p style={{color: "red"}}> {err} </p> }	
						<br />		
						<Button variant="contained" color="primary" onClick={() => executesSearch()}>
							Realizar operación
						</Button>
					</CardSelect>
				</div>
			</div>
		</div>
	)
}

export default  KeyEntry  ;