import React from 'react';
import { connect } from 'react-redux';
import { get_user } from '../../store/action'
import Firebase from '../../config/firebase'
import firebase from 'firebase'




class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            chat_user: {},
            chats: [],
            message:""
           
        }
    }

    Chat = (user) => {
        this.setState({
            chat_user: user
        }) 
        let current_user = this.props.current_user;       
        let merge_uid = this.uid_marge(current_user.uid,user.uid);
        this.get_message(merge_uid)
       
    }

    componentDidMount() {
        this.props.get_user();
    }

    uid_marge(uid1,uid2){
        if(uid1,uid2){
            return uid1 + uid2
        }
        else{
            return uid2 + uid1
        }
    }

    send_message = () =>{
        let user = this.props.current_user;
        let chat_user= this.state.chat_user;
        let merge_uid = this.uid_marge(user.uid,chat_user.uid);
       
        firebase.database().ref('/').child(`chats/${merge_uid}`).push({
            message: this.state.message,
            name : user.name,
            uid:user.uid
        })
         this.state.chats.push({
             message:this.state.message 
         })

         this.setState({
             chats:this.state.chats,
             message:""
         })
    }

    get_message= (uid) => {
        firebase.database().ref('/').child(`chats/${uid}`).on('child_added',(message)=>{
            this.state.chats.push(message.val())

        })
        this.setState({
            chats:this.state.chats
        })
    }

    render() {
        let user = this.props.current_user;
        return (
            <div>
                <h1>Welcome {user.name}</h1>
                <img src={user.profile} alt='not found' />
                <h1>email {user.email}</h1>
                <h3>Users:</h3>
                {this.props.users.map((v, i) => {
                    return v.uid !== user.uid ?  <li key={i}><img src={v.profile} alt='' width='20px' />{v.name}<button onClick={() => this.Chat(v)}>Chat</button></li>:''
                })}

                <div>
                    <h2>Chat</h2>
                    {
                        Object.keys(this.state.chat_user).length?
                        <div>
                            <span><img src={this.state.chat_user.profile} alt=''  width='20' />{this.state.chat_user.name}</span>
                           <ul>
                               {this.state.chats.map((v,i)=>{
                                   return <li style={{color: v.uid === user.uid ? 'blue' : 'green'}} keys={i}>{v.message} </li>
                               })}
                           </ul>

                            <input value={this.state.message} onChange={(e)=> this.setState({message:e.target.value})} type='text' placeholder='enter your message' />
                            <button onClick={()=> this.send_message()}>Send</button>
                            </div>:
                            <h4>no user</h4>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    current_user: state.current_user,
    users: state.users
})

const mapDispatchToProps = (dispatch) => ({
    get_user: () => dispatch(get_user())
})


export default connect(mapStateToProps, mapDispatchToProps)(Chat);