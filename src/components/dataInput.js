import TextField from '@material-ui/core/TextField';

const DataInput =  (props) => {
    //filter input
    const handleData = (e) =>	{
		console.log(e.target.value)
		console.log(e.target.name)
		console.log(props.setData)
		props.setData({ [e.target.name]: e.target.value} )
	}
    return(
        <div align="left" className="box-input">
            <h3>{props.field}:</h3>
            <div style={{marginTop: 15, marginLeft: 10 }} >
                <TextField 
                    name={props.field}
                    onChange={handleData}
                    type="number"
                />
            </div>
        </div>
    )
}

export default DataInput