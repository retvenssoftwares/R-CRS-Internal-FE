import React from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import { Box, Checkbox, Grid, Typography } from "@material-ui/core";
import image1 from "../../assets/emailTemplate/1.png";
import image2 from "../../assets/emailTemplate/2.webp";
import image3 from "../../assets/emailTemplate/3.png";
import image4 from "../../assets/emailTemplate/general.png";
import image5 from "../../assets/emailTemplate/5.png";
import image6 from "../../assets/emailTemplate/6.jpeg";
import { CheckBox } from "@material-ui/icons";

const EmailBrochure = () => {
  return (
    <>
      <Box flex={1}>
        <Grid container spacing={1}>
          <Typography
            variant="h4"
            style={{ fontWeight: "600", color: "#9ccf2a" }}
          >
            Email Brochure
          </Typography>
          <Grid item xs={12}></Grid>
          <EmailBrochureCards
            heading={"Email Template 1"}
            defaultChecked={true}
            image={image1}
          />
          <EmailBrochureCards
            heading={"Email Template 2"}
            defaultChecked={false}
            image={image2}
          />
          <EmailBrochureCards
            heading={"Email Template 3"}
            defaultChecked={false}
            image={image3}
          />
          <EmailBrochureCards
            heading={"Email Template 4"}
            defaultChecked={false}
            image={image4}
          />
          <EmailBrochureCards
            heading={"Email Template 5"}
            defaultChecked={false}
            image={image5}
          />
          <EmailBrochureCards
            heading={"Email Template 6"}
            defaultChecked={false}
            image={image6}
          />
        </Grid>
      </Box>
    </>
  );
};

export default EmailBrochure;

const EmailBrochureCards = ({ image, heading, defaultChecked }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Grid
      item
      xs={4}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          style={{ fontWeight: 600, marginBottom: "10px" }}
        >
          {heading}
        </Typography>
        {/* <Checkbox {...label} name="template"  defaultChecked={defaultChecked} style={{marginRight:'40px'}} /> */}
      </Grid>

      <img src={image} height={400} width={300} alt={heading} />
    </Grid>
  );
};
