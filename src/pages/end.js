/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/*FIN*/
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import Card from '@material-ui/core/Card';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

	return(
		<div className="mainCenter">
			<Helmet>
				<title>Grandfather project - Fin</title>
			</Helmet>
			<h1 align="center" style={{marginLeft: 5}}>ÍNDICE GRAL. DEL SISTEMA</h1>
			<h1 align="center" style={{marginLeft: 5}}>(FIN)</h1>
			<div align="center"  style={{marginTop: 150}}>
				<div className="card-container">
					<CardSelect style={{  paddingTop: 10, paddingBottom: 20 }} >
						<h2 >Regresar a "Índice alumno"</h2>
						<Button variant="contained" color="primary" style={{marginTop: 70}} onClick={() => props.history.push('/')}>
							Volver
						</Button>
					</CardSelect>
				</div>
			</div>
		</div>
	)
}

export default End  ;