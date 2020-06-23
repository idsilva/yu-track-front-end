import React,{Component} from 'react';
import { Map, GoogleApiWrapper,Marker,InfoWindow } from 'google-maps-react';
import SaveNewAddress from './SaveNewAddress'
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import '../App.css';
import Utiles from '../Utiles/AddressFunctions';

class MapContainer extends Component{
	   
	constructor(props) {	
		super(props);
		this.state = {
			displayedMarker:{},
			centerPoint:props.centerPoint,
			selectedPlace: {},
			showingInfoWindow:false
			}
	}
	
	saveNewAddress = (address)=>{
		const {displayedMarker} = this.state
		if(displayedMarker)
		{
			address.coords=[displayedMarker.position.lat,displayedMarker.position.lng]
			const {createAddress} = this.props
			createAddress(address);
		}
			
	}
	handlerClick=(mapProps, marker, clickEvent) =>{
		console.log(mapProps,marker)
		let selectPosition = {name:"",position:{lat:clickEvent.latLng.lat(),lng:clickEvent.latLng.lng()}}
		let address = {
			name:"",
			position:{
			lat:clickEvent.latLng.lat(),
			lng:clickEvent.latLng.lng()
			}}		
		this.setState({selectedPosition:selectPosition,displayedMarker:address})
	}
	
	onMarkerClick = (props, marker, e) =>{
		console.log(props,marker,e)
		  this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow:true
		});
	}
	  
	componentWillReceiveProps=(props)=> {
		this.setState({displayedMarker: props.displayedMarker,centerPoint:props.centerPoint});
		
	}

	
	displayMarkers = () => {
		const {displayedMarker,activeMarker,showingInfoWindow,selectedPlace} = this.state;
		
		return <Marker position={displayedMarker.position}
			name={displayedMarker.name}
			onClick={this.onMarkerClick} />		
	}
	
	 /**
	  * When the user types an address in the search box
	  * @param place
	  */
	onPlaceSelected = ( place ) => {
	const address = place.formatted_address,
	   addressArray =  place.address_components,
	   city = Utiles.getCity( addressArray ),
	   area = Utiles.getArea( addressArray ),
	   state = Utiles.getState( addressArray ),
	   latValue = place.geometry.location.lat(),
	   lngValue = place.geometry.location.lng();
	   
	// Set these values in the state.
	  this.setState({
	   address: ( address ) ? address : '',
	   area: ( area ) ? area : '',
	   city: ( city ) ? city : '',
	   state: ( state ) ? state : '',
	   displayedMarker: {
		   name:( city ) ? city : '',
		   position:{
			lat: latValue,
			lng: lngValue
		   }
	   },
	   centerPoint:{
		   name:( city ) ? city : '',
		   position:{
			lat: latValue,
			lng: lngValue
		   }
	   }
	  })
	 };
	 
	 
	render(){
		const mapStyles = {
			height: '500px',
			width: '500px'
		};
	
		const {centerPoint} = this.state
	  return (
		<div id="mapBox">
			<Map google={this.props.google}
			  onClick={this.handlerClick}
			  center = {centerPoint.position}
			  zoom={12}
			  style={mapStyles}
			  initialCenter={centerPoint.position}>
			        <Autocomplete style={{ width: '500px', height: '40px' }}
						onPlaceSelected={ this.onPlaceSelected }
						types={['address']}/>
			  {this.displayMarkers()}
			</Map>
			<div>
				<SaveNewAddress handlerClick={this.saveNewAddress}/>
			</div>

		</div>
	  );
	}
  
}

//export default App;

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCZEAaPR-yVMJZ9iAU-FPm67zLO3Ei_iNg'
})(MapContainer);	