/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* LISTADOS*/
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import { getAll } from "../../db/functions/dbUtils";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

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

const customColumnStyle = {
    width: "200px",
};
const Lists = props => {

	const { classes } = props;
	const [list, setList] = useState([]);
	const [lastPage, setLastPage] = useState(false);
	const [amountToShow, setAmountToShow] = useState(15);
	const [page, setPage] = useState(1);
	const [studentsAll, setStudentsAll] = useState([]);
	const [students, setStudents] = useState([]);
	const [tutors, setTutors] = useState([]);
	const [listType, setListType] = useState(4);

	useEffect(() => {
		async function fetchData() {
			let studentsList = await getAll("student");
			const tutorsList = await getAll("tutor")
			setTutors(tutorsList)
			// setStudentsAll(studentsList)
			// setStudents(studentsToShow)
			let studentsToShow =  []
			studentsList = defineListType(studentsList)
			setStudentsAll(studentsList)
			console.log('studentsToShow 1', studentsToShow)
			for (let index = 0; index < amountToShow; index++) {
				studentsToShow[index]	=  	studentsList[index]
			}
			console.log('studentsToShow 2', studentsToShow)
			setStudents(studentsToShow)
			if(studentsList.length < 8)
				setLastPage(true)
		}
		fetchData()
	},[]);

	const defineListType = (studentsToShow) =>{ 
		let semiParams = window.location.href.split('/')
		let paramsFinished = semiParams[4]
		console.log('paramsFinished', paramsFinished)
		switch (paramsFinished) {
			case "5"://sort by surname
				setListType(5)
				return sortItems("surname", studentsToShow)
				// break;
			default:
				setListType(4)//default order
				// setStudentsAll(studentsToShow)
				return studentsToShow
		}
	}

	const sortItems = (orderBy, studentsToShow) =>{ 
		console.log('studentsToShow', studentsToShow)
		const sortArray = (a, b) => {
			var reA = /[^a-zA-Z]/g;
			var reN = /[^0-9]/g;
			console.log('a', a)
			var aA = a.student[orderBy].replace(reA, "");
			var bA = b.student[orderBy].replace(reA, "");
			if (aA === bA) {
			var aN = parseInt(a.student[orderBy].replace(reN, ""), 10);
			var bN = parseInt(b.student[orderBy].replace(reN, ""), 10);
			return bN ===  aN ? 0 : aN < bN ? 1 : -1;
			} else {
			return bA < aA  ? 1 : -1;
			}
		}
		let newStudentsToShow = studentsToShow.sort(sortArray)
		console.log(newStudentsToShow)
		// setStudentsAll(newStudentsToShow)
		return newStudentsToShow
	}

	const changePage = (event) =>{ 
		let action = event.target.value
		event.target.value = ''
		if(action === "" || action > 3 || action < 1)
			return
		action = parseInt(action)
		console.log('action', action)
		let newPage 
		if(action === 1){
			console.log('next')
			action = "next"
		}
		if(action === 2){
			console.log('inside IF 2')
			action = "back" 
		}
		if(action === 3){
			props.history.push('/')
			return
		}
		if(action === "next"){
			newPage = page + 1 
		}	
		if(action === "back"){
			newPage = page - 1 
			if(newPage === 0){
				newPage = page  + 1
				return 
			}
		}
		// console.log(newPage)
		let final = amountToShow * newPage
		let initial = final - amountToShow
		let studentsToShow = []
		// console.log(initial)
		// console.log(final)
		// console.log(studentsAll.length)
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
			<h2 align="center">{listType === 4 && <b>Listado de alumnos y sus tutores</b>}</h2>
			<h2 align="center">{listType === 5 && <b>Listado de alumnos ordenados alfabéticamente</b>}</h2>
			<div style={{width: 1175}} className='-mt-4' align="center">
				<p className='text-2xl ml-2.5' align="right">Hoja {page}</p>
				<Table className={classes.table}>
					<TableHead>
					<TableRow>
						<TableCell align="left" style={{ padding: 0 }}>
							<b>DNI-ALUM</b>
							<br/>
							{listType === 4 && <b>DNI-TUTOR</b>}
						</TableCell>
						<TableCell align="left" style={{ padding: 0 }}>
							<b>APELLIDO-ALUM</b>
							<br/>
							{listType === 4 && <b>APELLIDO-TUTOR</b>}
						</TableCell>
						<TableCell align="left" style={{ padding: 0 }}>
							<b>NOMBRE-ALUM</b>
							<br/>
							{listType === 4 && <b>NOMBRE-TUTOR</b>}
						</TableCell>
						<TableCell align="left" width="5px" style={{ padding: 0 }}><b>NAC.</b></TableCell>
						<TableCell align="left" width="25px" style={{ padding: 0 }}><b>CUR.</b></TableCell>
						<TableCell align="left" style={{ padding: 0 }} ><b>DOMICILIO</b></TableCell>
						<TableCell align="left" style={{ padding: 0 }}><b>LOCALIDAD</b></TableCell>
						<TableCell align="left" style={{ padding: 0 }}><b>TELÉFONO</b></TableCell>
						{/* <TableCell align="left" width="20px" style={{ padding: 0 }}><b>DNI DE TUTOR</b></TableCell>
						<TableCell align="left" style={{ padding: 0 }}><b>NOMBRE DE TUTOR</b></TableCell>
						<TableCell align="left" style={{ padding: 0 }}><b>APELLIDO DEL TUTOR</b></TableCell> */}
					</TableRow>
					</TableHead>
					<TableBody>
					{students.length !== 0 && (
							students.map(row => (
									<TableRow key={row.student.id}>
										<TableCell component="th" scope="row" width="5px" style={{ padding: 0 }}>
											{row.student.DNI}
											<br/>
											{listType === 4 && row.student.tutor}
										</TableCell>
										<TableCell align="left" width="160px" style={{ padding: 0 }} >
											{row.student.surname}
											<br/>
											{listType === 4 && findTutorData(row.student.tutor, "surname")}
										</TableCell>
										<TableCell align="left" width="160px" style={{ padding: 0 }}>
											{row.student.name}
											<br/>
											{listType === 4 && findTutorData(row.student.tutor, "name")}
										</TableCell>
										<TableCell align="left" width="5px" style={{ padding: 0 }}>
											{row.student.birthday}
											<br/>
											{listType === 4 && <p>-</p>}
										</TableCell>
										<TableCell align="left" width="25px" style={{ padding: 0 }}>
											{row.student.course}
											<br/>
											{listType === 4 && <p>-</p>}
										</TableCell>
										<TableCell align="left" width="140px" style={{ padding: 0 }}>
											{row.student.domicile}
											<br/>
											{listType === 4 && <p>-</p>}
										</TableCell>
										<TableCell align="left" width="135px" style={{ padding: 0 }}>
											{row.student.location}
											<br/>
											{listType === 4 && <p>-</p>}
										</TableCell>
										<TableCell align="left" width="130px" style={{ padding: 0 }} >
											{row.student.telephone}
											<br/>
											{listType === 4 && <p>-</p>}
										</TableCell>
									</TableRow>
								))
								)
							}
					</TableBody>
				</Table>
			</div>
			<div align="center">
				<div id="div-options" className="flex flex-col justify-initial w-32">
					<p>1 Avanzar página</p>
					<p>2 Retroceder página</p>
					<p>3 Volver</p>
				</div>
				<br />
				<TextField 
					variant="outlined" 
					style={{marginBottom: 50, width: 200 }} 
					type="text"
					InputProps={{ inputProps: { min: 0, max: 3 } }}
					onChange={e => changePage(e)}
					autoFocus={true}
				/>
			</div>
		</div>
	)
}

Lists.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default  withStyles(styles)(Lists)  ;