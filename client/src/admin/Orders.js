import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {Toast} from "../ui";
import moment from 'moment'

const Orders = () => {
    const [allorders,setallorders] = useState([])
    const [loaded,setloaded] = useState(false)
    useEffect(() => {
        document.title = 'Orders';
        window.__setNavTab && window.__setNavTab('/orders')

        const getinfo = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_MAIN_URL}api/user/getallorders`);
                if(res.data.status === 'success'){
                  setallorders(res.data)
                  setloaded(true)
                }
               } catch (error) {
                console.log(error)
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
        getinfo()
    },[])
    //console.log(allorders)
    return(
        <>
        { loaded && <div className='order-p flex flex-col'>
            <div className='title font s22 b6 c000'>Orders Histry</div>
            {/* Order Lisr */}
            <div className='order-list'>
                <div className='hdr flex aic'>
                    <div className='col font s15 b6 c000 flex aic'>Order #</div>
                    <div className='col font s15 b6 c000 flex aic'>Recevied</div>
                    <div className='col font s15 b6 c000 flex aic'>Buyer Info</div>
                    <div className='col font s15 b6 c000 flex aic'>Order Detail</div>
                    <div className='col font s15 b6 c000 flex aic'>Discount</div>
                    <div className='col font s15 b6 c000 flex aic'>Total</div>
                </div>
                <div className='content'>
                    {allorders.ordersdone.map((item,i) => <div className='row flex'>
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
                                <div className='font s15 b5 c000'>Westren Shirt</div>
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
                                    <div className='font s15'>&#8362; 1800</div>
                                </div>
                                {item.items.length > i+1  && <hr/> }
                                </>
                            )}
                            </div>
                        </div>
                        <div className='col font s15 c000'>&#8362; 600</div>
                        <div className='col font s15 b6 c000'>&#8362; 1200</div>
                    </div>
                    )}
                </div>
            </div>
        </div> }
        </> 
    )
}

export default Orders