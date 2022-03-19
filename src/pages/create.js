import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { add, search } from "../db/functions/dbUtils";
import DataInput from "../components/dataInput";
import TextField from '@material-ui/core/TextField';

const CardSelect = withStyles((theme) => ({
  root: {
    backgroundColor: grey[100],
    width: 650,
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
}))(Card);

const Create = props => {
	//data inputs
	const [data, setData] = useState({});
	const [err, setErr] = useState(false);
	const [confirmationMode, setConfirmationMode] = useState(false);	
	const [correctionMode, setCorrectionMode] = useState(false);	

	useEffect(() => {
		let semiParams = window.location.href.split('/')
		let paramsFinished = semiParams[4]
		setData({...data, DNI: paramsFinished})
	},[]);

	const validationData = async () => {
		console.log(data)
		if(data.surname === '' || typeof(data.surname) == 'undefined'){
			setErr('Ingrese un apellido')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("surname").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}	
		if(data.name === '' || typeof(data.name) == 'undefined'){
			setErr('Ingrese un nombre')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("name").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}
		if(data.course === '' || typeof(data.course) == 'undefined'){
			setErr('Ingrese un teléfono')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("course").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}
		if(data.domicile === '' || typeof(data.domicile) == 'undefined'){
			setErr('Ingrese un domicilio')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("domicile").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}
		if(data.location === '' || typeof(data.location) == 'undefined'){
			setErr('Ingrese un localidad')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("location").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}
		if(data.birthday === '' || typeof(data.birthday) == 'undefined'){
			setErr('Ingrese una fecha de nacimiento')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("birthday").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}
		if(data.telephone === '' || typeof(data.telephone) == 'undefined'){
			setErr('Ingrese un teléfono')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("telephone").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}
		if(data.DNItutor === '' || typeof(data.DNItutor) == 'undefined'){
			setErr('Ingrese DNI del tutor/a')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("DNItutor").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}
		if(data.surnameTutor === '' || typeof(data.surnameTutor) == 'undefined'){
			setErr('Ingrese un apellido del tutor/a')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("surnameTutor").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}
		if(data.nameTutor === '' || typeof(data.nameTutor) == 'undefined'){
			setErr('Ingrese un nombre del tutor/a')
			setConfirmationMode(false)
			setTimeout(() => {
				document.getElementById("nameTutor").focus()
				window.scrollTo(0,document.body.scrollHeight);
			}, 300);
			return
		}
		add("student", data, props.history)
		let existsTutor =  await search("tutor", data.DNItutor)
		console.log(existsTutor)
		if(existsTutor.exitence === 0){
			add("tutor", data)
		}	else{
			existsTutor = ""
		}
	}

	const confirmationDefinition = (definition) => {
		console.log("confirmationDefinition", definition)
		console.log(typeof definition)
		if(definition.target.value == 1)
			validationData()
		if(definition.target.value == 2){
			console.log("confirmationDefinition 2")
			setConfirmationMode(false)
			setCorrectionMode(true)
		}
	}

	const correctionDefinition = (definition) => {
		if(definition.target.value == 1){
			setCorrectionMode(false)
			setTimeout(() => {
				document.getElementById("surname").focus()
			}, 300);
		}
		if(definition.target.value == 2){
			setCorrectionMode(false)
			setTimeout(() => {
				document.getElementById("name").focus()
			}, 300);
		}
		if(definition.target.value == 3){
			setCorrectionMode(false)
			setTimeout(() => {
				document.getElementById("course").focus()
			}, 300);
		}
		if(definition.target.value == 4){
			setCorrectionMode(false)
			setTimeout(() => {
				document.getElementById("domicile").focus()
			}, 300);
		}
		
		if(definition.target.value == 5){
			setCorrectionMode(false)
			setTimeout(() => {
				document.getElementById("location").focus()
			}, 300);
		}
		
		if(definition.target.value == 6){
			setCorrectionMode(false)
			setTimeout(() => {
				document.getElementById("birthday").focus()
			}, 300);
		}
		if(definition.target.value == 7){
			setCorrectionMode(false)
			setTimeout(() => {
				document.getElementById("telephone").focus()
			}, 300);
		}
	}

	console.log(data)
	return(
		<div className="mainCenter">
			<Helmet>
				<title>Grandfather project - Alta</title>
			</Helmet>
			<h2 align="center" style={{marginRight: 5}}>ALUMNADO - ALTAS</h2>
			<div  align="center" style={{marginTop: 150}}>
				<div className="card-container">	
					<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }}>
						{ confirmationMode && 
							<div>
								<h2 className="mr-8">¿Datos correctos? </h2>
								<div id="div-options" align="left" className="flex flex-col justify-initial w-56 mb-16">
									<p>1 Datos correctos, continuar</p>
									<p>2 Datos incorrectos, corregir</p>
								</div>
								<TextField 
									variant="outlined" 
									style={{marginBottom: 50, width: 200, }} 
									type="text"
									InputProps={{ inputProps: { min: 0, max: 4 } }}
									onChange={confirmationDefinition}
									error={err}
									autoFocus={true}
								/>
							</div>
						}
						{ correctionMode && 
							<div>
								<h2>¿Qué dato quiere corregir? </h2>
								<div id="div-options" align="left" className="flex flex-col justify-initial w-56 mb-16">
									<p>1 Apellido/s</p>
									<p>2 Nombre/s</p>
									<p>3 Curso</p>
									<p>4 Domicilio</p>
									<p>5 Localidad</p>
									<p>6 Fecha de nacimiento</p>
									<p>7 Teléfono</p>
								</div>
								<TextField 
									variant="outlined" 
									style={{marginBottom: 50, width: 200 }} 
									type="text"
									InputProps={{ inputProps: { min: 0, max: 4 } }}
									onChange={correctionDefinition}
									error={err}
									autoFocus={true}
								/>
							</div>
						}
						{ (!confirmationMode && !correctionMode) && 
							<div>
								<h2 style={{marginTop: 15}}>Crear alumno</h2>
								<br />
								<br />		
								<div align="left" className="-mt-1 ml-2 mb-8 text-2xl box-input2">
									<p >DNI: </p> 
									<p className="mt-1" style={{fontSize: '1.3rem', marginLeft: "6rem"}}>{data.DNI} </p>
								</div>
								<DataInput 
									id="surname"
									field="Apellido/s" 
									setData={setData} 
									type={"text"} 
									name={"apellido"} 
									state={data} 
									setErr={setErr} 
									autoFocus={true} 
									submit={validationData} 
									document={document}
								/>
								<DataInput 
									id="name"
									field="Nombre/s" 
									setData={setData} 
									type={"text"} 
									name={"nombre"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
								/>
								<DataInput 
									id="course"
									field="Curso" 
									setData={setData} 
									type={"text"} 
									name={"curso"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
								/>
								<DataInput 
									id="domicile"
									field="Domicilio" 
									setData={setData} 
									type={"text"} 
									name={"domicilio"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
								/>
								<DataInput 
									id="location"
									field="Localidad" 
									setData={setData} 
									type={"text"} 
									name={"localidad"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
								/>
								<DataInput 
									id="birthday"
									field="Fecha de nacimiento" 
									setData={setData} 
									type={"date"} 
									name={"fecha de nacimiento"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
								/>
								<DataInput 
									id="telephone"
									field="Teléfono" 
									setData={setData} 
									type={"number"} 
									name={"telefono"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
									setConfirmationMode={setConfirmationMode}
								/>
								<DataInput 
									id="DNItutor"
									field="DNI del tutor/a" 
									setData={setData} 
									type={"number"} 
									name={"DNI del tutor/a"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
									setConfirmationMode={setConfirmationMode}
								/>
								<DataInput 
									id="surnameTutor"
									field="Apellido del tutor/a" 
									setData={setData} 
									type={"text"} 
									name={"Apellido del tutor/a"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
									setConfirmationMode={setConfirmationMode}
								/>
								<DataInput 
									id="nameTutor"
									field="Nombre del tutor/a" 
									setData={setData} 
									type={"text"} 
									name={"Nombre del tutor/a"} 
									state={data} 
									setErr={setErr} 
									submit={validationData} 
									document={document}
									setConfirmationMode={setConfirmationMode}
								/>
							</div>
						}
						{err && <b><p style={{color: "red"}}> {err} </p></b> }	
						
						<br />	
						
					</CardSelect>
				</div>
			</div>
		</div>
	)
}

export default Create