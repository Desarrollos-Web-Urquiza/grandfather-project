import TextField from '@material-ui/core/TextField';

const DataInput =  (props) => {
    //filter input
    const handleData = (e) =>	{
        props.setErr(false)
		console.log(e.target.value)
		console.log(e.target.name)
		console.log(props.setData)
		props.setData({ ...props.state, [e.target.name]: e.target.value} )
	}
    return(
        <div align="left" className="box-input">
            <h3>{props.field}:</h3>
            <div className="-mt-1 ml-4 mb-8" >
                <TextField 
                    name={props.name}
                    onChange={handleData}
                    type={props.type}
                />
            </div>
        </div>
    )
}

export default DataInput