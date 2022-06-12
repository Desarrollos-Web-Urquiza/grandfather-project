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

// let id = 0;
// function createData(DNI, surname, fat, carbs, protein) {
// 	id += 1;
// 	return { id, DNI, surname, fat, carbs, protein };
// }
const customColumnStyle = {
    width: "200px",
};
const Lists = props => {

	const { classes } = props;
	const [list, setList] = useState([]);
	const [lastPage, setLastPage] = useState(false);
	const [amountToShow, setAmountToShow] = useState(30);
	const [page, setPage] = useState(1);
	const [studentsAll, setStudentsAll] = useState([]);
	const [students, setStudents] = useState([]);
	const [tutors, setTutors] = useState([]);

	useEffect(() => {
		async function fetchData() {
			console.log("María de los Milagros Santos", "María de los Milagros Santos".length)
			const studentsList = await getAll("student");
			const tutorsList = await getAll("tutor");
			console.log(studentsList)
			console.log(tutorsList)
			setStudentsAll(studentsList)
			setTutors(tutorsList)
			let studentsToShow = []
			for (let index = 0; index < amountToShow; index++) {
				studentsToShow[index]	=  	studentsList[index]
			}
			setStudents(studentsToShow)
			if(studentsList.length < 8)
				setLastPage(true)
		}
		fetchData();
		// list.map(item => (
		// 	rows.createData(item.DNI)
		// ))
	},[]);

	const changePage = (nextOrBack) =>{ 
		let newPage 
		console.log(page)
		if(nextOrBack === "next"){
			newPage = page + 1 
		}	else {
			newPage = page - 1 
		}
		console.log(newPage)
		let final = amountToShow * newPage
		let initial = final - amountToShow
		let studentsToShow = []
		console.log(initial)
		console.log(final)
		console.log(studentsAll.length)
		if(final >= studentsAll.length ){
			setLastPage(true)
			final = studentsAll.length
		}	else{
			setLastPage(false)
		}
		if(initial >= studentsAll.length){
			setLastPage(true)
			return
		}
		for (let index = initial; index < final; index++) {
			studentsToShow[index]	=  	studentsAll[index]
		}
		setStudents(studentsToShow)
		setPage(newPage)
		
	}

	const findTutorData = (DNI, datoToFind) =>{ 
		let tutorFounded = tutors.find(element => element.tutor.DNI == parseInt(DNI))
		console.log(tutorFounded)
		if(tutorFounded !== undefined)
			return tutorFounded.tutor[datoToFind]
	}

	return(
		<div className="overflow-hidden" align="center">
			<GlobalCss />
			<Helmet>
				<title>Grandfather project - Listados</title>
			</Helmet>
			<h2 align="center"><b>Listado de alumnos y sus tutores</b></h2>
			<p className='text-2xl ml-2.5' align="left">Hoja {page}</p>
				<div style={{width: 1800}} align="center">
					<Table className={classes.table}>
						<TableHead>
						<TableRow>
							<TableCell align="left" style={{ padding: 0 }}><b>DNI</b></TableCell>
							<TableCell align="left" style={{ padding: 0 }}><b>APELLIDO</b></TableCell>
							<TableCell align="left" style={{ padding: 0 }}><b>NOMBRE</b></TableCell>
							<TableCell align="left" width="5px" style={{ padding: 0 }}><b>FECHA NAC.</b></TableCell>
							<TableCell align="left" width="25px" style={{ padding: 0 }}><b style={{ wordBreak: "break-all" }}>CURSO</b></TableCell>
							<TableCell align="left" style={{ padding: 0 }} ><b>DOMICILIO</b></TableCell>
							<TableCell align="left" style={{ padding: 0 }}><b>LOCALIDAD</b></TableCell>
							<TableCell align="left" style={{ padding: 0 }}><b>TELÉFONO</b></TableCell>
							<TableCell align="left" width="20px" style={{ padding: 0 }}><b>DNI DE TUTOR</b></TableCell>
							<TableCell align="left" style={{ padding: 0 }}><b>NOMBRE DE TUTOR</b></TableCell>
							<TableCell align="left" style={{ padding: 0 }}><b>APELLIDO DEL TUTOR</b></TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
						{students.length !== 0 && (
								students.map(row => (
										<TableRow key={row.student.id}>
											<TableCell component="th" scope="row" width="5px" style={{ padding: 0 }}>
												{row.student.DNI}
											</TableCell>
											<TableCell align="left" width="170px" style={{ padding: 0 }} >{row.student.surname}</TableCell>
											<TableCell align="left" width="170px" style={{ padding: 0 }}>{row.student.name}</TableCell>
											<TableCell align="left" width="5px" style={{ padding: 0 }}>{row.student.birthday}</TableCell>
											<TableCell align="left" width="25px" style={{ padding: 0 }}>{row.student.course}</TableCell>
											<TableCell align="left" width="130px" style={{ padding: 0 }}>{row.student.domicile}</TableCell>
											<TableCell align="left" width="135px" style={{ padding: 0 }}>{row.student.location}</TableCell>
											<TableCell align="left" width="130px" style={{ padding: 0 }} >{row.student.telephone}</TableCell>
											<TableCell align="left" width="20px" style={{ padding: 0 }}>{row.student.tutor}</TableCell>
											<TableCell align="left" width="156px" style={{ padding: 0 }}>{findTutorData(row.student.tutor, "name")}</TableCell>
											<TableCell align="left" width="200px" style={{ padding: 0 }}>{findTutorData(row.student.tutor, "surname")}</TableCell>

										</TableRow>
									
									))
									)
								}
						</TableBody>
					</Table>
				</div>
			<div align="center">
				{ page !== 1 && <h3 className='nextOrBackPage' onClick={() => changePage('back') }> {`< Retroceder página`} </h3> }
				{ !lastPage && <h3 className='nextOrBackPage' onClick={() => changePage('next') }>Avanzar página > </h3>  }
			</div>
		</div>
	)
}

Lists.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default  withStyles(styles)(Lists)  ;