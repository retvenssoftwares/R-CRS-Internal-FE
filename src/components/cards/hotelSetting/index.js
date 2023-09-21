import React from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { styled } from '@mui/material/styles';
import ReactStars from 'react-stars';

const Cards = ({ image, title, location, pricing,rating }) => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: "20px",
        margin:'20px',
        textAlign: 'center',
        borderRadius: '20px',
        color: theme.palette.text.secondary,
       boxShadow:'0px 0px 20px #00000047 !important',
       borderRadius:'20px' 
        
    }));

    const ratingChanged = (newRating) => {
        console.log(newRating)
      }
       
    return (
        <Grid  xs={3}>
            <Item>
                <img src={image} style={{ width: '100%', borderRadius: '20px', marginBottom: '10px' }} />
                <Typography variant='h4' style={{ fontSize: '16px', fontWeight: '600', color: '#4026a6', textAlign: 'start', marginBottom: '5px' }}>
                    {
                        title
                    }
                </Typography>
                <div>

                    <Typography variant='h6' style={{ fontSize: '10px', fontWeight: '500', color: '#666666', textAlign: 'start', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <LocationOnIcon style={{ fontSize: '10px' }} />  {
                            location
                        }
                    </Typography>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <Typography style={{ textAlign: 'start' }}>
                    <span style={{ fontWeight: '600', fontSize: '18px', color: 'black' }}> ₹ {pricing}</span>/Night
                </Typography>
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    value={rating}
                    size={15}
                    color2={'#ffd700'} />
                </div>
                
            </Item>
        </Grid>
    )
}

export default Cards

