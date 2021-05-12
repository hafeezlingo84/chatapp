import React from 'react';
import './style.css';
import {connect} from 'react-redux';
import {facebook_login} from '../../store/action'



class Home extends React.Component {
    render(){
        console.log('user-data',this.props.users);
        return (
            <div>
                <h1>Home</h1>
                {<button onClick={() => this.props.facebook_login(this.props.history)}>facebook login</button>}
                {/* { <button onClick={()=> this.props.set_data()}>set_data</button> } */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users
  })
  
  const mapDispatchToProps = (dispatch) => ({
    facebook_login: (history) => dispatch(facebook_login(history))
  })
  
  export default connect(mapStateToProps,mapDispatchToProps) (Home);