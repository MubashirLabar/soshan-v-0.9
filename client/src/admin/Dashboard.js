import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Toast} from "../ui";
import moment from 'moment'
import setheadertoken from '../middleware/setheadertoken'
function Dashboard(props) {
    const [dashboardinfo,setdashboardinfo] = useState('')
    const [loaded,setloaded] = useState(false)
    const [summery, setSummery] = useState([
        {label: "Active Order", icon: "icon-shopping-cart", qty: "12"},
        {label: "Order Completed", icon: "icon-clipboard-list", qty: "150"},
        {label: "Total Sale", icon: "icon-chart-upward", qty: "60", val: "&#x20AA;"},
    ]);

    const [recentOrder, setRecentOrder] = useState([
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'08/06/21 8:42 AM', btn:'See Detail'},
        {name:'Mubashir Nazir', qty:'06', amount: 'Rs: 990.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Adil Nazir', qty:'03', amount: 'Rs: 1220.00', date:'29/06/21 8:42 AM', btn:'See Detail'},
        {name:'Adeel Nazir', qty:'01', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Umair Nazir', qty:'01', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Hamza Ameen', qty:'12', amount: 'Rs: 1220.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 660.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
    ]);

    const [activeOrder, setActiveOrder] = useState([
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
        {name:'Muddasir Nazir', qty:'02', amount: 'Rs: 330.00', date:'28/06/21 8:42 AM', btn:'See Detail'},
    ]);
    const getinfo = async () => {
        try {
            const token = localStorage.getItem('tokenJWT77')
            setheadertoken(token)
            const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}api/user/getdashboardinfo`);
            if(res.data.status === 'success'){
              console.log(res)
              setdashboardinfo(res.data)
              setloaded(true)
            }
           } catch (error) {
            //console.log(error)
           if(error.response){    
            if(error.response.data.errors)
            {
             Toast.show({html:`${error.response.data.errors}`, time: 5});
            }
            else {
             Toast.show({html:`${error.response.data}`, time: 5});
            }
           }
           } 
    }

    useEffect(() => {
        document.title = 'Dashboard';
        window.__setNavTab && window.__setNavTab('/')

        getinfo()
    },[])
    //console.log(dashboardinfo)
    const updatestatus = async (id) => {
        try {
         
            const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}api/user/orderstatus/${id}`);
            if(res.data.status === 'success'){
                Toast.show({html:`Order status modified`, time: 5});
                getinfo()
            }
           } catch (error) {
            //console.log(error)
           if(error.response){    
            if(error.response.data.errors)
            {
             Toast.show({html:`${error.response.data.errors}`, time: 5});
            }
            else {
             Toast.show({html:`${error.response.data}`, time: 5});
            }
           }
           } 
    }

    return ( 
        <>
        {loaded && <div className='dashboard flex flex-col'>
            {/* Summery */}
            <div className='smry flex aic'>
                <div className='item flex aic'>
                    <div className='ico s32 c000 icon-shopping-cart' />
                    <div className='flex flex-col'>
                        <div className='num font s26 b5 c000'>{dashboardinfo.activeorders.length}</div>
                        <div className='txt font s15 c333'>Active Order</div>
                    </div>
                </div>
                <div className='item flex aic'>
                    <div className='ico s32 c000 icon-layers' />
                    <div className='flex flex-col'>
                        <div className='num font s26 b5 c000'>{dashboardinfo.ordersdone}</div>
                        <div className='txt font s15 c333'>Order Completed</div>
                    </div>
                </div>
                <div className='item flex aic'>
                    <div className='ico val s44 c000'>&#x20AA;</div>
                    <div className='flex flex-col'>
                        <div className='num font s26 b5 c000'>{dashboardinfo.total[0].total}</div>
                        <div className='txt font s15 c333'>Total Sale</div>
                    </div>
                </div>
            </div>
        
            {/* Active Order */}
            <div className='title font s22 b5 c000'>Active Orders</div>
            <div className='order-list'>
                <div className='hdr flex aic'>
                    <div className='col font s15 b6 c000 flex aic'>Order #</div>
                    <div className='col font s15 b6 c000 flex aic'>Recevied</div>
                    <div className='col font s15 b6 c000 flex aic'>Buyer Info</div>
                    <div className='col font s15 b6 c000 flex aic'>Order Detail</div>
                    <div className='col font s15 b6 c000 flex aic'>Discount</div>
                    <div className='col font s15 b6 c000 flex aic'>Total</div>
                    <div className='col font s15 b6 c000 flex aic'>Action</div>
                </div>
                <div className='content'>
                    {dashboardinfo.activeorders.map((item) =>  <div className='row flex'>
                        <div className='col font s15 c000'>{item.orderno}</div>
                        <div className='col font s15 c000'>{moment(item.createdAt).format('MMMM Do YYYY')} {moment(item.createdAt).format('h:mm:ss a')}</div>
                        <div className='col flex flex-col'>
                            <div className='txt font s15 b5 c000'>{item.address.fullname}</div>
                            <div className='txt font s15 c000'>{item.address.cellphone}</div>
                            <div className='txt font s15 c000'>{item.address.email}</div>
                            <div className='txt font s15 c000'>{item.address.streetaddress}</div>
                            <div className='txt font s15 c000'>{item.address.postalcode}, {item.address.city}, {item.address.country}</div>
                        </div>
                        <div className='col flex flex-col'>
                            <div className='detail'>
                                <div className='font s15 b5 c000'>Western Shirt</div>
                                {item.items.map((theitem,i) => <>
                                <div className='meta flex aic'>
                                    <div className='lb font s15'>Size:</div>&nbsp;
                                    <div className='font s15'>{theitem.Size}</div>
                                </div>
                                <div className='meta flex aic'>
                                    <div className='lb font s15'>Corner style:</div>&nbsp;
                                    <div className='font s15'>{theitem.Corner}</div>
                                </div>
                                <div className='meta flex aic'>
                                    <div className='lb font s15'>Tzitzit style:</div>&nbsp;
                                    <div className='font s15'>{theitem.Tzstyle}</div>
                                </div>
                                <div className='meta flex aic'>
                                    <div className='lb font s15'>Tzitzit color:</div>&nbsp;
                                    <div className='font s15'>{theitem.Tzcolor}</div>
                                </div>
                                <div className='meta flex aic'>
                                    <div className='lb font s15'>Quantity:</div>&nbsp;
                                    <div className='font s15'>{theitem.Quantity}</div>
                                </div>
                                <div className='meta flex aic'>
                                    <div className='lb font s15'>Price:</div>&nbsp;
                                    <div className='font s15'>&#8362; {theitem.price}</div>
                                </div>
                                {item.items.length > i+1  && <hr/> }
                                </>
                            )}
                            </div>
                            
                         
                        </div>
                        <div className='col font s15 c000'>&#8362; {item.discount}</div>
                        <div className='col font s15 b6 c000'>&#8362; {item.price}</div>
                        <div className='col flex'>
                            <div className='actions flex'>
                                <button
                                onClick={() => updatestatus(item._id)}
                                className='button font s15 cfff anim'>Mark as done</button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div> }
        </>
    );
}

export default Dashboard;