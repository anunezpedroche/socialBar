import React from "react";
import { Avatar } from "antd";
import "antd/dist/antd.css";
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import "./Profile.css";
import { connect } from 'react-redux';
import { readUser } from '../../Redux/Reducers/UserReducer';
import { logOutUser} from '../../Redux/Actions/UserActions';
import { logout as deleteCookie } from '../../Helpers/auth-helpers';
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

const Profile = ({ user, logOutUser, collapsed }) => {

    const [ logginOut, setLogginOut ] = useState(false);

    const { nombre, apellidos, nickname } = user;

    const data = [
        `${nombre} ${apellidos}`,
    ];
    const icon = (user.avatar)?user.avatar:'default_user.jpg';

    const logOutUserAndRemoveCookie = () =>{
        deleteCookie();
        logOutUser();
        setLogginOut(true);
    }

   useEffect(()=>{
    if(user.avatar===null){
        user.avatar = 'default_user.jpg';
    }
   },[])

    return (
        

        <React.Fragment>
            {(logginOut ) ? <Redirect to="/login"></Redirect> : null }
            {(collapsed)?
            <div className="collapsedProfile">
            <Avatar src={icon} size="medium" /> 
            <Button
                        size="medium"
                        shape="circle"
                        type="primary"
                        icon={<PoweroffOutlined size='medium'/>}
                        onClick={logOutUserAndRemoveCookie}
                        className={'collapsedOffButton'}
                    />
            </div>
            :
            <div className="unCollapsedProfile">
                <Avatar src={require(`../../img/usr/${icon}`)} size="medium" />
                <div className="nickname">{nickname}</div>
                <div className="nombreCompleto">{data} &nbsp;&nbsp;</div>
                <Button
                            className='unCollapsedOffButton'
                            size="medium"
                            shape="circle"
                            type="primary"
                            icon={<PoweroffOutlined size="medium"/>}
                            onClick={logOutUserAndRemoveCookie}
                        />
            </div>
            }
        </React.Fragment>        
    );
};


const mapStateToProps = (state) =>{
    return {user:readUser(state)};
}

export default connect(mapStateToProps,{logOutUser})(Profile);
