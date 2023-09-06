import React, {useState, useEffect} from 'react';
import DashboardLayout from '../../components/layout/dashboardLayout';
import { makeStyles } from '@material-ui/core/styles';
import { getAllBookingDB } from '../../actions/booking';
import { Space, Table } from 'antd';
import Paper from '@material-ui/core/Paper';
const { Column, ColumnGroup } = Table;

const useStyles = makeStyles((theme) => ({
    cardRoot:{
        padding:"30px 10px 30px 10px"
    },
    formControl: {
    minWidth: 120,
    width:"100%"
    },
    selectEmpty: {
    marginTop: theme.spacing(0),
    },
    textField:{
    width:"100%",
    },
    close:{
    position:"absolute",
    right:'5%'
    }
}));

const AllBookingDisplay = () => {
    const classes = useStyles();

    const [allBookings, setAllBookings] = useState(null);

    React.useEffect(() => {
        getAllBookingDB()
            .then((value) => {
                console.log("booking fetcheddddd")
                console.log(value.booking)
                setAllBookings(...allBookings, value.booking)
                console.log(allBookings)
            })
            .catch((err) => {
                console.log("error")
                console.log(err)
            })
    }, [])


   return <>

        <Paper>
            {/* <Table dataSource={allBookings}>
                <Column title="BookingStatus" dataIndex="booking_status" key="booking_status" />
                <Column title="Employee ID" dataIndex="employee_id" key="employee_id" />
                <Column title="Retvens Hotel Code" dataIndex="hotel_r_code" key="hotel_r_code" />
                <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                    <a>Deactivate</a>
                    </Space>
                )}
                />
            </Table> */}
        </Paper>
    </>
}

const Bookings = () => {
    return  <>
                <DashboardLayout>
                    <AllBookingDisplay/>
                </DashboardLayout>
            </>
}
export default Bookings;
