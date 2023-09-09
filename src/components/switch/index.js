import { FormControlLabel, FormGroup, Switch, Typography, styled } from '@material-ui/core'
import React from 'react'
import CRM from '../../assets/crm_1548182.png'
import CRS from '../../assets/crs-512.png'
import { useDispatch } from 'react-redux';
import { setBooleanValue, setDashboardBooleanValue } from '../../redux/slices/dashboard';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url(${CRS})`,
                backgroundSize: 'cover'
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${CRM})`,
            backgroundSize: 'cover'
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const SwitchBtn = () => {
    const dispatch = useDispatch()

    const handleState = (e) => {
        if (e.target.checked) {
            dispatch(setDashboardBooleanValue(true))
        }else{
            dispatch(setDashboardBooleanValue(false))
        }
    }
    return (
        <div>
            <FormGroup style={{ display: "flex", flexDirection: 'row' }}>
                <Typography variant='h6' style={{ marginRight: "25px",color:'black' }}>
                    CRM
                </Typography>
                <FormControlLabel
                    control={<MaterialUISwitch defaultChecked onChange={handleState} />}
                />
                <Typography variant='h6' style={{color:"black"}}> 
                    CRS
                </Typography>
            </FormGroup>
        </div>
    )
}

export default SwitchBtn
