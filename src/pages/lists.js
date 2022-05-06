/* SIS ESCUELA – DATOS ALUMNOS */
/* Ver. 1  -- SET 2021 */
/* LISTADOS*/
import React, {useState, useEffect}  from 'react';
import { Helmet } from "react-helmet";
import { getAll } from "../db/functions/dbUtils";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
const customColumnStyle = {
    width: "200px",
};
const Lists = props => {

	const { classes } = props;
	const [list, setList] = useState([]);
	const [students, setStudents] = useState([]);
	const [tutors, setTutors] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const studentsList = await getAll("student");
			const tutorsList = await getAll("tutor");
			console.log(studentsList)
			console.log(tutorsList)
			setStudents(studentsList)
			setTutors(tutorsList)
		}
		fetchData();
		// list.map(item => (
		// 	rows.createData(item.DNI)
		// ))
	},[]);

	const findTutorData = (DNI, datoToFind) =>{ 
		let tutorFounded = tutors.find(element => element.tutor.DNI == parseInt(DNI))
		console.log(tutorFounded)
		if(tutorFounded !== undefined)
			return tutorFounded.tutor[datoToFind]
	}

	return(
		<div className="overflow-hidden">
			<GlobalCss />
			<Helmet>
				<title>Grandfather project - Listados</title>
			</Helmet>

			{students.length !== 0 && (
					students.map(row => (
						<div className='itemList'>
							<div>
								<p><b>DNI:</b></p>
								<p className='ml-2'>{row.student.DNI}</p>
							</div>
							<div>
								<p className='ml-4 mr-2'><b>Apellido/s:</b></p>
								<p><div className='w-85 ml-2'>{row.student.surname}</div></p>
							</div>
							<div>
								<p><b>Nombre/s:</b></p>
								<p><div className='w-85 ml-2'> {row.student.name} </div></p>
							</div>
							<div>
								<p><b>Curso:</b></p>
								<p>{row.student.course}</p>
							</div>
							<div>
								<p><b>Domicilio:</b></p>
								<p>{row.student.domicile}</p>
							</div>
							<div>
								<p><b>Localidad:</b></p>
								<p>{row.student.location}</p>
							</div>
							<div>
								<p><b>Fecha de nacimiento:</b></p>
								<p>{row.student.birthday}</p>
							</div>
							<div>
								<p><b>Teléfono:</b></p>
								<p>{row.student.telephone}</p>
							</div>
							<div>
								<p><b>DNI del tutor/a:</b></p>
								<p>{row.student.tutor}</p>
							</div>
							<div>
								<p><b>Apellido del tutor/a:</b></p>
								<p>{findTutorData(row.student.tutor, "name")}</p>
							</div>
							<div>
								<p><b>Nombre del tutor/a:</b></p>
								<p>{findTutorData(row.student.tutor, "surname")}</p>
							</div>
						</div>
					))
				)
			}
		</div>
	)
}

Lists.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
export default  withStyles(styles)(Lists)  ;