import React,{Component} from 'react';
import '../App.css';

class SaveNewAddress extends Component{

	constructor(props){
		super(props);
		this.state = {
			address:{}
			}
	}
	
 
	handlerClick=({target})=>
	{
		const {address} = this.state
		if(address.name && address.name.length > 0)
		{
			const {handlerClick} = this.props
			handlerClick(address);
		}
 	}
	
	changeHandler=({target})=>{
		let {address} = this.state
		address.name = target.value;
		this.setState({address:address})
	}
		
	render(){
		const {style} = this.props
		return (
		<div style={style}>
			<label>Guarda tu dirección&nbsp;&nbsp;&nbsp;&nbsp;</label>
			<input placeholder="Mi Dreccion" onChange={this.changeHandler} /> 
			<input inline={"true"} type="button" value="guardar" onClick={this.handlerClick}/>
		</div>
		);		
	}
}

export default SaveNewAddress;