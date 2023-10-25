import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTimer(true);
    }, [10000]);
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        top: "25%",
        left: "46%",
      }}
    >
      {" "}
      {timer ? (
       <span style={{color:'red',fontWeight:'600',fontSize:'32px',marginLeft:'-60px'}}> No Data Found!</span>
      ) : (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}{" "}
    </div>
  );
};

export default Loader;
