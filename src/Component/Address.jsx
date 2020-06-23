import React,{Component} from 'react';
import axios from 'axios'
import Geocode from "react-geocode";
import '../App.css';
import {Utiles} from '../Utiles/AddressFunctions';

Geocode.setApiKey("AIzaSyCZEAaPR-yVMJZ9iAU-FPm67zLO3Ei_iNg");
Geocode.enableDebug();

class Address extends Component{
		
	
	constructor(props)
	{
		super(props)
		this.state = {
			address: '',
			city: '',
			area: '',
			state: ''}
	}
	blurHandler =({target})=>{
		let {address,handlerBlur} = this.props
		address.name = target.value;
		handlerBlur(address);
	}
	
	handleCheckBoxClick=({target})=>{
		const {address,handlerCheckboxChanged} = this.props
		handlerCheckboxChanged(target.checked,address)		
	}
	
	goClick=({target})=>{
		const {address,handleGoClick} = this.props
		handleGoClick(address);
	}
	
	/**
	  * Get the current address from the default map position and set those values in the state
	  */
	 componentDidMount() {
		const {address} = this.props
		Geocode.fromLatLng( address.coords[0] , address.coords[1] ).then(
		   response => {
			const fullAddress = response.results[0].formatted_address,
			 addressArray =  response.results[0].address_components,
			 city = Utiles.getCity( addressArray ),
			 area = Utiles.getArea( addressArray ),
			 state = Utiles.getState( addressArray );
		  
			this.setState( {
			 fullAddress: ( fullAddress ) ? fullAddress : '',
			 area: ( area ) ? area : '',
			 city: ( city ) ? city : '',
			 state: ( state ) ? state : '',
			} )
		   },
		   error => {
			console.error(error);
		   }
		);
	};

 
	render(){
		const {address} = this.props
		return (
			<div id={address._id}>
				<input type="checkbox" inline={"true"} onChange={this.handleCheckBoxClick} />
				<input placeholder="Lugar" defaultValue={address.name} onChange={this.changeHandler} onBlur={this.blurHandler}/> 
				<input placeholder="Dirección" defaultValue={this.state.fullAddress} /> 
				<input type="button" inline={"true"} onClick={this.goClick} value="go"/>
			</div>
		);		
	}
}

export default Address;