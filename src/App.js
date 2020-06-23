import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import AddressList from './Component/AddressList';
import MapContainer from './Component/MapContainer';
import axios from 'axios'
import './App.css';

class App extends Component{
	
	URI = "http://yu-track-backend.us-east-1.elasticbeanstalk.com/location"
	constructor(props) {	
		super(props);
		this.state = {
			displayedMarker:{},
			addressList:[],
			centerLocation: { }
			}
		this.getAddressList();
	}
	setDisplayedMarker=(address)=>{
		this.setState({
			displayedMarker:{name:address.name,position:{lat:address.coords[0],lng:address.coords[1]}},
			centerLocation:{name:address.name,position:{lat:address.coords[0],lng:address.coords[1]}}
			})		
		
	}
	
	createAddress = (address)=>{
		console.log(address)
		axios.post(this.URI,address)
		.then(response => {this.getAddressList()})
		
	}
	
	updateAddress=(address)=>{
		axios.put(this.URI+`/${address._id}`,address)
		.then(response => {this.getAddressList()})
	}
		
	getAddressList=()=>{
		axios.get(this.URI)
		.then(response => {this.setState({ addressList: response.data })})
	}
	
	deleteAddressList=(arrToDelete)=>{
		let deleteRequest = this.getDeleteRequest(arrToDelete);
		axios.all(deleteRequest)
		.then(reponse =>{
			this.getAddressList();
		})
		.catch(errors => {
		  console.log(errors)
		})
 	}
	
	getDeleteRequest = (arr) =>{
		return arr.map((address)=>{
			return axios.delete(this.URI+`/${address._id}`)
		})
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				displayedMarker:{
					name:"Here I am!",
					position:{lat:position.coords.latitude,lng:position.coords.longitude}},
				centerLocation:{
					name:"Here I am!",
					position:{lat:position.coords.latitude,lng:position.coords.longitude}}
				})
		});
	}

	render(){
		const mapStyles = {
			position:'relative',
			height: '100%',
			width: '50%'
		};
		const addressListStyles = {
			width: '50',
			height: '100%',
			textAlign:"center"
		};
		const {displayedMarker,addressList,centerLocation} = this.state;
	  return (
		
		<div className="container">
			<div className="item">
				<MapContainer 
				displayedMarker={displayedMarker} 
				style={mapStyles} 
				centerPoint = {centerLocation}
				createAddress = {this.createAddress}
				/>
				<div>&nbsp;</div>
			</div>
			<div className="item">
				<div>
					<AddressList style={addressListStyles} addressList={addressList} 
					handlerGoFunction={this.setDisplayedMarker} 
					deleteAddressList={this.deleteAddressList}
					updateAddress={this.updateAddress}/>
				</div>
			</div>

		</div>
	  );
	}
  
}

export default App;
