import TextField from '@material-ui/core/TextField';

const DataInput =  (props) => {
    //filter input
    const handleData = (e) =>	{
        props.setErr(false)
		props.setData({ ...props.state, [e.target.name]: e.target.value})
        if(e.target.value.length === 31 && props.id === "surname"){
            e.target.value = e.target.value.substring(0, e.target.value.length - 1)
            props.setErr('El apellido no puede tener más de 30 caracteres')
        }
        if(e.target.value.length === 31 && props.id === "name"){
            e.target.value = e.target.value.substring(0, e.target.value.length - 1)
            props.setErr('El nombre no puede tener más de 30 caracteres')
        }
	}

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(props.id == "surname"){
                props.document.getElementById("name").focus();
            }
            if(props.id == "name"){
                props.submit()
            }
		}
	}
   
    return(
        <div align="left" className="box-input">
            <h3 className="text-2xl">{props.field}:</h3>
            <div className="-mt-3 ml-4 mb-8 text-7xl" >
                    <TextField 
                        id={props.id}
                        variant="outlined"
                        name={props.name}
                        onChange={handleData}
                        type={props.type}
                        autoFocus={props.autoFocus}
                        onKeyDown={handleKeyDown} 
                        className="w-85"
                        InputProps={{
                            style: {fontSize: '1.3rem'},
                            inputProps: { maxLength: 31 }
                        }}
                    />
            </div>
        </div>
    )
}

export default DataInput