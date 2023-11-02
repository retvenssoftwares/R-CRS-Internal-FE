import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function LoggedInTimer() {
  const isOnline = useSelector((state) => state.isOnline.isOnline);
  const getLoginTime = window.localStorage.getItem('loginTime')
  
useEffect(()=>{

})
  const hms = getLoginTime || ""
  const [hours, minutes, secondss] =  hms.split(':');
  const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+secondss);

    const[seconds,setSeconds] = useState(totalSeconds ? totalSeconds :0)
  
    useEffect(() => {
        let interval;
    
        if (isOnline) {
          interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
          }, 1000);
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [isOnline]);


  

    function secondsToHMS(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
      
        const pad = (value) => (value < 10 ? `0${value}` : value);
      
        return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
      }

      useEffect(()=>{
        window.localStorage.setItem('loginTime',secondsToHMS(seconds))
      },[seconds])

    return (
      <div style={{fontSize:'16px'}}>
        <p>Login Time : {secondsToHMS(seconds)}</p>
      </div>
    );
  }
  
  export default LoggedInTimer;
  