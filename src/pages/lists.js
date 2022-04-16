/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* LISTADOS*/
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import { getAll } from "../db/functions/dbUtils";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

const styles = theme => ({
	root: {
	  width: '100%',
	  marginTop: theme.spacing.unit * 3,
	  overflowX: 'auto',
	},
	table: {
	  minWidth: 700,
	},
});

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiTableCell-root': {
		borderBottom: '1px dashed rgb(4 3 3)' ,
    },
  },
})(() => null);

let id = 0;
function createData(DNI, surname, fat, carbs, protein) {
	id += 1;
	return { id, DNI, surname, fat, carbs, protein };
}

const Lists = props => {

	const { classes } = props;
	const [list, setList] = useState([]);
	const [rows, setRows] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const params = await getAll("student");
			console.log(params)
			// setList(params)
			let arrayOfParams = []
			let i = 0
			params.map(item => (
				arrayOfParams.push({id: i, DNI: item.student.DNI, surname: item.student.surname, name: item.student.name, birthday: item.student.birthday, course: item.student.course,  domicile: item.student.domicile, location: item.student.location , telephone: item.student.telephone, tutor: item.student.tutor} ),
				i++
			))
			console.log(arrayOfParams)
			setRows(arrayOfParams)
		}
		fetchData();
		// list.map(item => (
		// 	rows.createData(item.DNI)
		// ))
	},[]);

	return(
		<div align="center" className="mainCenter">
			<GlobalCss />
			<Helmet>
				<title>Grandfather project - Listados</title>
			</Helmet>

			<Table className={classes.table}>
				<TableHead>
				<TableRow>
					<TableCell><b>DNI</b></TableCell>
					<TableCell align="right"><b>Apellido</b></TableCell>
					<TableCell align="right"><b>Nombre</b></TableCell>
					<TableCell align="right"><b>Fecha de nacimiento</b></TableCell>
					<TableCell align="right"><b>Curso</b></TableCell>
					<TableCell align="right"><b>Domicilio</b></TableCell>
					<TableCell align="right"><b>Localidad</b></TableCell>
					<TableCell align="right"><b>Teléfono</b></TableCell>
					<TableCell align="right"><b>DNI de Tutor</b></TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{rows.length !== 0 && (
						rows.map(row => (
						
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										{row.DNI}
									</TableCell>
									<TableCell align="right">{row.surname}</TableCell>
									<TableCell align="right">{row.name}</TableCell>
									<TableCell align="right">{row.birthday}</TableCell>
									<TableCell align="right">{row.course}</TableCell>
									<TableCell align="right" width="100px">{row.domicile}</TableCell>
									<TableCell align="right">{row.location}</TableCell>
									<TableCell align="right" width="100px">{row.telephone}</TableCell>
									<TableCell align="right">{row.tutor}</TableCell>
								</TableRow>
							
						))
					)
				}
				</TableBody>
			</Table>
		
		</div>
	)
}

Lists.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default  withStyles(styles)(Lists)  ;