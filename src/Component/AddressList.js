import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import Address from './Address'
import '../App.css';

class AddressList extends Component{

	constructor(props){
		super(props);
		this.state = {
			addressList:[],
			deleteList:[]
			}
	}
	
	handlerSubmit=(e)=>
	{
		const {deleteList} = this.state
		const {deleteAddressList} = this.props
		e.preventDefault()
 		if(deleteList.length > 0)
		{
			deleteAddressList(deleteList);
		}
 	}
	
	updateAddress = (address)=>{
		const {updateAddress} = this.props
		updateAddress(address)
	}
	
	goFunction=(address)=>
	{
		const {handlerGoFunction} = this.props
		handlerGoFunction(address);
	}
	
	handlerCheckbox = (add,address)=>
	{
		let {deleteList} = this.state
		if(add)
		{
			const found = deleteList.find(element => element._id === address._id);
			if(!found)
			{
				deleteList.push(address)
				this.setState({deleteList:deleteList})
			}
		}else{
			const index = deleteList.findIndex(element => element._id === address._id);
			if(index>=0)
			{
				deleteList.splice(index,1)
				this.setState({deleteList:deleteList})
			}
		}
	}
	
	componentWillReceiveProps=(props)=> {
		this.setState({addressList: props.addressList});
	}

	
	displayAddressList(){
		if(this.state.addressList.length > 0)
		{
			return this.state.addressList.map((loc, index)=>{
				return <Address key={loc._id} 
						handleGoClick={this.goFunction} 
						handlerCheckboxChanged={this.handlerCheckbox}
						handlerBlur={this.updateAddress}
						address={loc} />
			})
		}else{
			return <p>No tienes direcciones guardadas</p>
		}
	}
	render(){
		const {style} = this.props
		return (
		<div style={style}>
			<label>Mis Direcciones<br/></label>
			<div style={{textAlign:"left",width:"20%"}}>
				<input type="submit" value="X" onClick={this.handlerSubmit} />
			</div>
			<div className="container">
			{this.displayAddressList()}				
			</div>
		</div>
		);		
	}
}

export default AddressList;