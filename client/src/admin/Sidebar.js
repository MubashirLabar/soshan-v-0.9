import React,{useState, useEffect} from 'react';
import { Link,Redirect,useHistory  } from 'react-router-dom';
import {useDispatch} from 'react-redux'
function Sidebar(props) {
    const history = useHistory()
    const dispatch  = useDispatch()
    const [nav, setNav] = useState([
        {label: "Dashboard", icon: "icon-grid", slug:"/"},
        {label: "Orders", icon: "icon-shopping-bag", slug:"/orders"},
        /*{label: "Products", icon: "icon-inbox", slug:"/my-products"},*/
        {label: "Setting", icon: "icon-settings", slug:"/setting"}, 
    ]);
    const [tab, setTab] = useState(null);   

    useEffect(()=>{
       if("__setNavTab" in window == false){
            window.__setNavTab = (tab) => {
                setTab(tab);
            }
        }
    }, [tab])

    return (
        <div className="adm-sidebar fixed flex flex-col">
            <Link to="/" className="logo rfont s32 b5 flex aic"> 
                <img src="/images/logo.png" className="img"/>
            </Link>
            <div className="nav flex flex-col">
                {
                    nav.map(item=>(
                        <Link to={item.slug} className={`item flex aic ${tab == item.slug ? "color" : "black"}`}>
                            <div className={`ico font ${item.icon} s22`} />
                            <div className="lbl font s18">{item.label}</div> 
                        </Link>
                    ))
                }
                <button
                onClick={() => {
                    localStorage.removeItem('tokenJWT77');
                    dispatch({type : 'UPDATE_LOGOUT_STATUS'})
                    history.push('/login')
                }}
                className='cleanbtn item flex aic'>
                    <div className='ico font s22 icon-log-out'/>
                    <div className="lbl font s18">Logout</div> 
                </button>
            </div> 
        </div> 
    );
} 
  
export default Sidebar; 