import TextField from '@material-ui/core/TextField';

const DataInput =  (props) => {
    //filter input
    const handleData = (e) =>	{
        props.setErr(false)
		console.log(e.target.value)
		console.log(e.target.name)
		console.log(props.setData)
		props.setData({ ...props.state, [e.target.name]: e.target.value})
        window.addEventListener('keydown', (e) => {
            console.log(e)
          })
          window.dispatchEvent(new KeyboardEvent('keydown', {
            key: "e",
            keyCode: 69,
            code: "KeyE",
            which: 69,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false
          }));
	}
    const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			props.submit()
		}
	}
    return(
        <div align="left" className="box-input">
            <h3 className="text-2xl">{props.field}:</h3>
            <div className="-mt-1 ml-4 mb-8" >
                <TextField 
                    name={props.name}
                    onChange={handleData}
                    type={props.type}
                    autoFocus={props.autoFocus}
                    onKeyDown={handleKeyDown} 
                />
            </div>
        </div>
    )
}

export default DataInput