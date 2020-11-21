import React, {useState, useEffect} from 'react'
import {listOrders, getStatusValues, updateOrderStatus } from '../Admin/ApiAdmin';
import { isAunthenticated } from '../auth/auth';
import moment from 'moment'

 const Orders = () => {

    const [orders, setOrders] = useState([])
    
    const [status, setStatus]= useState([])
    const {user, token} = isAunthenticated()

  const loadOrders = () =>{
      listOrders(user._id, token).then(data=>{
          if(data.error){
              console.log(data.error)
          }else{
              setOrders(data)
          }
      })
  }


  const loadStatusValue = () =>{
    getStatusValues(user._id, token).then(datas=>{
        if(datas.error){
            console.log(datas.error)
        }else{
            setStatus(datas)
        }
    })
}



    useEffect(() => {

      loadOrders(user._id, token)
      loadStatusValue(user._id, token)
        
    }, [])

    const showOrders = () =>{
        if(orders.length > 0){
            return(
            <h2 className='text-center text-danger py-4'>ORDER LENGTH: {orders.length}</h2>
            )
        }else

        return <h2>No orders</h2>
    }


    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {status.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (

        <div className='row'>

            <div className='col-md-8 offset-md-2'>
               {showOrders()}
           {orders.map((o, oindex) =>{
               return(
                   <div className='mt-5 align-center' key={oindex} style={{borderBottom: '5px solid red'}}>
                       <h2 className='text-center'>Order ID: {o._id}</h2>
                       <ul className='list-group mb-2'>
                           <li className='list-group-item'>
                           STATUS: {showStatus(o)}
                           </li>

                           <li className="list-group-item">
                                    Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                       </ul>

                       <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.product.length}
                                </h3>

                                {o.product.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                            </div>
                    
               )
           })}
         
        </div>
        
        </div>
        
    )
}

export default Orders
