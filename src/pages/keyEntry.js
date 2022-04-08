/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* INGRESO CLAVE*/
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
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
	const [confirmationMode, setConfirmationMode] = useState(false);

	useEffect(() => {
		let semiParams = window.location.href.split('/')
		let paramsFinished = semiParams[4]
		switch (paramsFinished) {
			case "1":
				setOperationType('ALTAS')
				break;
			case "2":
				setOperationType('MODIFICACIÓN')
				break;
			case "3":
				setOperationType('BAJA')
				break;
			case "5":
				props.history.push('/fin')
				break;
			default:
				setOperationType('No seleccionó operación')
		}
		setOperationNumber(paramsFinished)
	},[]);

	const handleData = (e) =>	{
		setErr(false)
		let dataToEvaluate = e.target.value
		dataToEvaluate = dataToEvaluate.split('')
		dataToEvaluate.map((letter) => {
			if(isNaN(parseInt(letter)) && e.target.value != "")	{
				setErr("Error: No puede ingresar letras. Debe ingresar un número")
				setDNI("")
				e.target.value = ""
				return
			}
		})
		let DNI = parseInt(e.target.value)
		setDNI(DNI)
	}
	const handleCorfirmationModeData = (e) =>	{
		console.log(e.target.value)
		let confirmationData = e.target.value
		if(isNaN(parseInt(confirmationData)) && confirmationData != "")	{
			setErr("Error: No puede ingresar letras. Debe ingresar un número")
			e.target.value = ""
			return
		}
		if((confirmationData < 1 || confirmationData > 3) && e.target.value != "")	{
			setErr("Error: Debe ingresar un número del 1 a 3")
			e.target.value = ""
			return
		}	
		if(confirmationData == "1")
			executesSearch()
		if(confirmationData == "2"){
			setDNI("")
			setConfirmationMode(false)
		}
		if(confirmationData == "3")
			props.history.push('/')

	}

	const executesSearch =  async () =>	{
		let promiseSearch =  await search("student", DNI)
		setSearchResult(promiseSearch)
		analyzeSearchResult(promiseSearch)
	}

	const analyzeSearchResult =  (directSearchResult) =>	{
		if(parseInt(operationNumber) === 1){
			if(parseInt(directSearchResult) === 0){
				console.log('Alumno no encontrado')
				props.history.push('/alumnoAlta/' + DNI)
			} else if(parseInt(directSearchResult) === 1){
				console.log('Alumno sí encontrado')
				setErr('Error: El DNI ingresado ya existe. No lo puede volver a crear')
			}
		}
		//Modificaciones
		// if(parseInt(operationNumber) === 2){
		// }
		//Bajas
		// if(parseInt(operationNumber) === 3){
		// }
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			if(event.target.value.length !== 8)	{
				setErr("Error: El DNI debe tener obligatoriamente 8 caracteres")
				setDNI("")
				event.target.value = ""
				return
			}
			if(DNI !== null && DNI !== ''){
				console.log(DNI)
				setConfirmationMode(true)
			} else	{
				setErr('Debe ingresar un DNI')
			}
		}
	}
	
	return(
		<div align="center" className="mainCenter">
			<Helmet>
				<title>Grandfather project - Ingreso de clave</title>
			</Helmet>
			<h2 style={{marginLeft: 5}}>ALUMNADO - {operationType}</h2>
			<div style={{marginTop: 150}}>
				<div className="card-container">
					<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }}>
						{ !confirmationMode &&<h2 >Ingrese DNI de alumno</h2> }
						{ confirmationMode && 
							<div>
								<h2>DNI ingresado: {DNI} </h2>
								<div id="div-options" align="left" className="flex flex-col justify-initial w-56">
									<p>1 Datos correctos, continuar</p>
									<p>2 Datos incorrectos, corregir</p>
									<p>3 Volver al Índice General</p>
								</div>
							</div>
						}
						{ !confirmationMode && 
							<TextField 
								variant="outlined" 
								style={{marginBottom: 70, marginTop: 50, width: 200}} 
								type="text"
								InputProps={{inputProps: { min: 0, max: 9 }}}
								autoFocus={true}
								onChange={handleData}
								onKeyDown={handleKeyDown} 
							/>
						}
						{ confirmationMode && <TextField 
							variant="outlined" 
							style={{marginBottom: 70, marginTop: 50, width: 200}} 
							type="text"
							InputProps={{ inputProps: { min: 0, max: 9 } }}
							autoFocus={true}
							onChange={handleCorfirmationModeData}
						/>}
						{err && <b><p style={{color: "red"}}> {err} </p></b> }	
						<br />		
					</CardSelect>
				</div>
			</div>
		</div>
	)
}

export default  KeyEntry  ;