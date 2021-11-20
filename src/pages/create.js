import React, {useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { add } from "../db/functions/dbUtils";
import DataInput from "../components/dataInput";

const CardSelect = withStyles((theme) => ({
  root: {
    backgroundColor: grey[100],
    width: 480,
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
}))(Card);

const Create = props => {
	//data inputs
	const [data, setData] = useState({});
	const [err, setErr] = useState(false);

	useEffect(() => {
		let semiParams = window.location.href.split('/')
		let paramsFinished = semiParams[4]
		setData({...data, DNI: paramsFinished})
	},[]);

	const validationData = () => {
		if(data.surname === '' || typeof(data.surname) == 'undefined'){
			setErr('Ingrese un apellido')
			return
		}
		if(data.name === '' || typeof(data.name) == 'undefined'){
			setErr('Ingrese un nombre')
			return
		}
		add(data, props.history)
	}

	return(
		<div className="mainCenter">
			<Helmet>
				<title>Grandfather project - Alta</title>
			</Helmet>
			<h2 align="center" style={{marginRight: 5}}>ALUMNADO - ALTAS</h2>
			<div  align="center" style={{marginTop: 150}}>
				<div className="card-container">	
					<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }} >
						<h2 style={{marginTop: 15}}>Crear alumno</h2>
						<br />
						<br />		
						<div align="left" className="flex flex-wrap justify-initial -mt-1 ml-2 mb-8 text-2xl">
							<p>DNI: </p> 
							<p className="ml-20 mt-1 text-base">{data.DNI} </p>
						</div>
						<DataInput field="Apellido/s" setData={setData} type={"text"} name={"surname"} state={data} setErr={setErr} autoFocus={true} submit={validationData} />
						<DataInput field="Nombre/s" setData={setData} type={"text"} name={"name"} state={data} setErr={setErr} submit={validationData}/>
						{err && <p style={{color: "red"}}> {err} </p> }	
						<br />		
						{/* <Button style={{marginTop: 60, marginLeft: 10 }} variant="contained" color="primary" onClick={() => validationData()}>
							Crear alumno
						</Button> */}
					</CardSelect>
				</div>
			</div>
		</div>
	)
}

export default Create