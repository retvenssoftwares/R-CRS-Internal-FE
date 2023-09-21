import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { styled } from '@mui/material/styles';
import ReactStars from 'react-stars';

const HorizontalCards = ({ image, title, location, pricing, rating }) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: "20px",
        margin: '20px',
        textAlign: 'center',
        borderRadius: '20px',
        color: theme.palette.text.secondary,
        boxShadow: '0px 0px 20px #00000047 !important',
        borderRadius: '20px'

    }));

    const ratingChanged = (newRating) => {
        console.log(newRating)
    }

    return (
        <Grid xs={6}>
            <Item>
                <div style={{ display: 'flex' }}>
                    <Grid item xs={2}>

                        <img src={image} style={{ width: '100%', borderRadius: '10px'}} />
                    </Grid>

                    <Grid item xs={5} style={{marginLeft:'20px',display:'flex',alignItems:'start',flexDirection:'column',justifyContent:'start'}}>
                        <Typography variant='h4' style={{ fontSize: '18px', fontWeight: '600', color: '#4026a6', textAlign: 'start', marginBottom: '5px' }}>
                            {
                                title
                            }
                        </Typography>
                        <Typography variant='h6' style={{ fontSize: '12px', fontWeight: '500', color: '#666666', textAlign: 'start', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <LocationOnIcon style={{ fontSize: '10px' }} />  {
                                location
                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ display: 'flex', alignItems: 'start', justifyContent: 'end',marginLeft:'10px' }}>
                        <Typography style={{ textAlign: 'start'}}>
                            <span style={{ fontWeight: '600', fontSize: '20px', color: 'black' }}> ₹ {pricing}</span><span style={{color:'#b0abab'}}>/Night</span>
                        </Typography>
                    </Grid>

                </div>


            </Item>
        </Grid >
    )
}

export default HorizontalCards

