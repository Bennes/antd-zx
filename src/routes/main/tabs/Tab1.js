import React from 'react';
import Model from '../../../models/tabs/tab1.js';

class Tab1Page extends React.Component{
	constructor(props) {
    super(props);
  }
  componentWillUnmount(){
  	this.props.dispatch({type:'remove',objId:this.props.objId});
  }
	render(){
	  return (
		    <div style={{height:this.props.height+"px"}}>
		    	窗体高度:{this.props.objId}
		    	<input/>
		    </div>
	  );
	}
}
Tab1Page.propTypes = {
	height:React.PropTypes.number.isRequired
}
exports.Page = Tab1Page;

exports.Model = Model;

exports.StateToProps = (tabId)=>{
	return (state)=>{
		return {
			...state[Model.namespace][tabId],
			winHeight:state.top.winHeight}
	};
}
