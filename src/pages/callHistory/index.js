import React, { useEffect } from 'react'
import DashboardLayout from '../../components/layout/dashboardLayout'
import { Typography } from '@material-ui/core'
import Table from '../../components/table'
import { useGetCallHistoryQuery } from '../../redux/slices/call'

const CallHistory = () => {
  const {data:callHistory} = useGetCallHistoryQuery()
  const column = [
    {
      name:'Agent Name',
      selector: row => row['agent_name']
    },
    {
      name:'Caller ID',
      selector:row => row['caller_id']
    },
    {
      name:'Call Duration',
      selector:row => row['call_duration']
    },
    {
      name:'Call Type',
      selector:row => row['call_type']
    },{
      name:'Disposition',
      selector:row => row['disposition']
    }
  ]
  const data = [
    {
      agent_name:'Saumitra Shukla',
      caller_id:'Rameet kaur',
      call_duration:'00:55:41',
      call_type:'Inbound',
      disposition:'Reservation'
    }
  ]

  // console.log(callHistory?.details_of_calls.length)
  useEffect(()=>{
    if(callHistory && callHistory?.details_of_calls.length){
      for(let i=0; callHistory.details_of_calls.length >= i ; i++ ){
       console.log(callHistory?.details_of_calls[i]?.calls_details.map((items)=>{return items})) 
      }
    }
  })

  return (
   <DashboardLayout>
      <Typography variant='h5' style={{fontWeight:'600',marginBottom:'20px'}}>
        Call History
      </Typography>
      <Table columns={column} data={data} selectableRows={false} />
   </DashboardLayout>
  )
}

export default CallHistory
