import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import { Grid, MenuItem, Select, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles, styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MuiPhoneNumber from "material-ui-phone-number";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAllEmployee } from "../../actions/employee";
import { createEmployee } from "../../actions/employee";
import Alert from "@material-ui/lab/Alert";
import CancelIcon from "@material-ui/icons/Cancel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
// import { Space, Table } from "antd";
import Paper from "@material-ui/core/Paper";
import Table from "../../components/table";
import {
  useAddEmployeeMutation,
  useDeleteEmployeeQuery,
  useEditEmployeeMutation,
  useGetAllEmployeeQuery,
} from "../../redux/slices/employee";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { Delete, Edit } from "@material-ui/icons";
import { ThreeDots } from "react-loader-spinner";
// const { Column, ColumnGroup } = Table;

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    padding: "30px 10px 30px 10px",
  },
  formControl: {
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
  textField: {
    width: "100%",
  },
  close: {
    position: "absolute",
    right: "5%",
  },
}));

// const AddEmployee = () => {
//    const classes = useStyles();
//    const [employee, setEmployee] = React.useState({
//         first_name:"",
//         last_name:"",
//         role:"",
//         date_of_joining:"",
//         phone_number:"",
//         email:"",
//         address:"",
//         gender:"",
//         password:"",
//         isLoading:false,
//         error:"",
//         success:""
//    });

//   const [allEmployees, setAllEmployees] = React.useState(null);
//   const [openForm, setOpenForm] = React.useState(false);
//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   React.useEffect(() => {
//     getAllEmployee()
//          .then((value) => {
//           console.log("employee fetched")
//            setAllEmployees(value.employees)
//          })
//          .catch((err) => {
//           console.log("error")
//            console.log(err)
//          })
//   }, [])

//   const handleChange = (type) => e => {
//     switch (type) {
//       case "phone_number":
//            setEmployee({...employee, phone_number: e});
//         break;
//       case "first_name":
//            setEmployee({...employee, first_name: e.target.value });
//         break;
//       case "last_name":
//            setEmployee({...employee, last_name: e.target.value });
//         break;
//       case "email":
//            setEmployee({...employee, email: e.target.value });
//         break;
//       case "address":
//            setEmployee({...employee, address: e.target.value });
//         break;
//       case "doj":
//            setEmployee({...employee, date_of_joining: e.target.value });
//         break;
//       case "password":
//             setEmployee({...employee, password: e.target.value });
//         break;
//       default:

//     }
//   }

//   const handleSubmit = (e) => {
//      e.preventDefault();
//     setEmployee({...employee, isLoading:true})
//     console.log(employee)
//     createEmployee(employee)
//       .then((value) => {
//             setEmployee({...employee,
//                isLoading:false,
//                first_name:"",
//                last_name:"",
//                role:"",
//                date_of_joining:"",
//                phone_number:"",
//                email:"",
//                address:"",
//                gender:"",
//                password:"",
//                success: value,
//                error:"" })
//           })
//       .catch((err) => {
//           setEmployee({...employee, isLoading:false, error: err.error, success:"" })
//         console.log(err)
//       })
//   }

//   const gender = [
//     { title: "MALE" },
//     { title: "FEMALE" }
//   ]

//   const role= [
//     { title: "EMPLOYEE" },
//     { title: "ADMIN" }
//   ]

// if(!openForm){
//    return <>
//    <
//         <Grid container spacing={3} justifyContent="flex-end">
//            <Grid item  md={4} sm={4} xs={12}>
//              <Button
//               variant="contained"
//               onClick={() => setOpenForm(true)}
//               fullWidth
//               color="primary" style={{marginBottom:'20px'}}>
//                Add Employee
//              </Button>
//            </Grid>
//         </Grid>

//         <Paper elevation={3}>
//         <Table dataSource={allEmployees}>
//             <ColumnGroup title="Name">
//               <Column title="First Name" dataIndex="first_name" key="first_name" />
//               <Column title="Last Name" dataIndex="last_name" key="last_name" />
//             </ColumnGroup>
//             <Column title="Role" dataIndex="role" key="role" />
//             <Column title="Phone Number" dataIndex="phone_number" key="phone_number" />
//             <Column title="Email" dataIndex="email" key="email" />
//             <Column
//               title="Action"
//               key="action"
//               render={(_, record) => (
//                 <Space size="middle">
//                   <a>Deactivate</a>
//                 </Space>
//               )}
//             />
//         </Table>
//         </Paper>
//     </>
// } else{
// return <>

//   <Grid container spacing={3} justifyContent="flex-end">
//         <Grid item  md={4} sm={4} xs={12}>
//           <Button
//            variant="contained"
//            onClick={() => setOpenForm(false)}
//            className={classes.close}
//            color="primary">
//           <CancelIcon />
//           </Button>
//         </Grid>
//   </Grid>
//   <br /><br /><br />
//   <Grid container spacing={3} justifyContent="center">
//     <Grid item xs={12} md={10}>
//        <Card className={classes.cardRoot} variant="outlined">
//        {employee.success && <Alert severity="success">{employee.success}</Alert>}
//        {employee.error && <Alert severity="error">{employee.error}</Alert>}
//        <br />
//        <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//              <TextField
//              variant="outlined"
//              onChange={handleChange("first_name")}
//              value={employee.first_name}
//              fullWidth
//              label="First name"/>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//              variant="outlined"
//              onChange={handleChange("last_name")}
//              value={employee.last_name}
//              fullWidth
//              label="Last name"/>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Autocomplete
//                options={role}
//                onChange={(e, val) => {
//                  if(val){
//                      setEmployee({...employee, role: val.title });
//                  }
//                }}
//                getOptionLabel={(option) => option.title}
//                style={{ width: "100%" }}
//                renderInput={(params) => <TextField {...params} label="Role" variant="outlined"  value={employee.role}/>}
//              />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//             onChange={handleChange("email")}
//             value={employee.email}
//             variant="outlined"
//             fullWidth
//             label="Email"/>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Autocomplete
//                onChange={(e, val) => {
//                   if(val){
//                       setEmployee({...employee, gender: val.title });
//                   }
//                 }}

//                options={gender}
//                getOptionLabel={(option) => option.title}
//                style={{ width: "100%" }}
//                renderInput={(params) => <TextField {...params} label="Gender" variant="outlined"   valye={employee.gender}/>}
//              />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <TextField
//               variant="outlined"
//               id="date"
//               onChange={handleChange("doj")}
//               label="Joining date"
//               value={employee.date_of_joining}
//               type="date"
//               defaultValue="1999-05-24"
//               className={classes.textField}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <MuiPhoneNumber
//               defaultCountry={'in'}
//               variant="outlined"
//               value={employee.phone_number}
//               fullWidth
//               onChange={handleChange("phone_number")}/>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <TextField
//               onChange={handleChange("address")}
//               value={employee.address}
//               variant="outlined"
//               fullWidth
//               label="Address"/>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormControl sx={{ m: 1, width: '25ch' }}
//                   fullWidth variant="outlined" onChange = {handleChange("password")}>
//                 <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//                 <OutlinedInput
//                   id="outlined-adornment-password"
//                   type={showPassword ? 'text' : 'password'}
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                   label="Password"
//                 />
//             </FormControl>
//           </Grid>

//           <Grid container justifyContent="center" spacing={3}>
//             <Grid item xs={12} md={6}>
//               <br />
//               <Button variant="contained" color="primary" type="submit" fullWidth>Add Employee</Button>
//             </Grid>
//           </Grid>

//         </Grid>
//         </form>
//       </Card>
//     </Grid>
//   </Grid>

//   </>
//  }
// }

const AllEmployees = () => {
  const [addEmployeeState, setAddEmployeeState] = useState(false);
  const [role, setRole] = useState("");
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const[deleteEMP,setDeleteEmp] = useState(null)
  const[editEmployee] = useEditEmployeeMutation()
  const {data:deleteEmployee} = useDeleteEmployeeQuery(deleteEMP,{skip:deleteEMP ? false:true})
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(2),
    padding: "40px 20px",
    textAlign: "center",
    borderRadius: "20px",
    color: theme.palette.text.secondary,
    width: "100%",
  }));
  const { data: AllEmployees, refetch } = useGetAllEmployeeQuery({
    role: "Admin",
  });
  const [addEmployee] = useAddEmployeeMutation();


  useEffect(()=>{
    if(deleteEmployee){
      refetch()
    }
  },[deleteEmployee])

  const { register, handleSubmit, formState: errors } = useForm();
  const handleDelete = (row) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Employee!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
        setDeleteEmp({
          employee_id:row.employee_id
        })
        swal("Employee has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Employee is not deleted!");
      }
    });
  };

  const handleEdit = (row) => {
    setEditData(row);
    setEdit(true);
    console.log(row);
  };

  const onSubmit = async (data) => {
    console.log(data);
    if (data.confirm_password === data.password) {
      addEmployee({
        userName: data.userName,
        First_name: data.First_name,
        joining_date: data.joining_date,
        email: data.email,
        agent_id: data.agent_id,
        mobile_number: data.mobile_number,
        designation: data.designation,
        Last_name: data.Last_name,
        password: data.password,
        confirm_password: data.confirm_password,
        department: [
          {
            department_name: data.department_name,
            role: role,
          },
        ],
        role: "Admin",
      })
        .unwrap()
        .then((res) => {
          debugger
          swal("Good job!", "User added successfully!", "success");
          refetch();
          setAddEmployeeState(false);
        })
        .catch((err) => {
          swal("Oops!", `${err.data.message}`, "error");
        });
    } else {
      alert("Password not matched");
    }

    refetch();
  };
  const onSubmitEdit = async (data) =>{
    editEmployee({
      employee_id:editData.employee_id,
      userName: data.userName,
      First_name: data.First_name,
      joining_date: data.joining_date,
      email: data.email,
      agent_id: data.agent_id,
      mobile_number: data.mobile_number,
      designation: data.designation,
      Last_name: data.Last_name,
      password: data.password,
      confirm_password: data.confirm_password,
      department: [
        {
          department_name: data.department_name,
          role: role,
        },
      ],
      role: "Admin",
    })
      .unwrap()
      .then((res) => {
        swal("Good job!", "User Edited successfully!", "success");
        setEdit(false);
        refetch();
      })
      .catch((err) => {
        swal("Oops!", `${err.data.message}`, "error");
      });
  }

  const column = [
    {
      name: "Name",
      selector: (row) => row["name"],
      cell: (row) => {
        return (
          <div>
            {row.first_name} {row.last_name}
          </div>
        );
      },
    },
    {
      name: "Joining Date",
      selector: (row) => row["date_of_joining"],
    },
    {
      name: "Designation",
      selector: (row) => row["designation"],
    },
    {
      name: "Role",
      selector: (row) => row["role"],
    },
    {
      name: "Email",
      selector: (row) => row["email"],
    },
    {
      name: "Mobile",
      selector: (row) => row["phone_number"],
    },
    {
      name: "Status",
      selector: (row) => row["status"],
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div style={{ display: "flex" }}>
            <Button
              variant="outlined"
              style={{
                background: "#9ccf2a",
                color: "white",
                marginRight: "20px",
              }}
              onClick={() => handleEdit(row)}
            >
              <Edit />
            </Button>
            <Button
              variant="outlined"
              style={{
                background: "#FA5858",
                color: "white",
                marginRight: "20px",
              }}
              onClick={()=>handleDelete(row)}
            >
              <Delete />
            </Button>
          </div>
        );
      },
    },
    // {
    //   name:'Actions',
    //   cell:()=>{

    //   }
    // }
  ];

  const Data = [
    {
      name: "Saumitra Shukla",
      joining_date: "06-09-2023",
      designation: "Senior Frontend Developer",
      role: "Agent",
      email: "contactwithsaumitra@gmail.com",
      mobile: "8818860231",
    },
  ];
  console.log(editData);



  return (
    <>
      {!edit && (
        <Button
          variant="outlined"
          type="submit"
          style={{
            background: "#1853b1",
            color: "white",
            marginBottom: "40px",
          }}
          onClick={
            addEmployeeState
              ? () => setAddEmployeeState(false)
              : () => setAddEmployeeState(true)
          }
        >
          {addEmployeeState ? "X" : "Add New Empolyee"}
        </Button>
      )}

      {edit && (
        <Button
          variant="outlined"
          type="submit"
          style={{
            background: "#1853b1",
            color: "white",
            marginBottom: "40px",
          }}
          onClick={edit ? () => setEdit(false) : () => setEdit(true)}
        >
          {edit ? "X" : "Edit Empolyee"}
        </Button>
      )}

      {addEmployeeState && (
        <>
          <Typography
            variant="h5"
            style={{ fontWeight: "600", marginBottom: "40px" }}
          >
            Add New Employee
          </Typography>
          {/* {AddEmployee()} */}
          <Item>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} justifyContent="center">
                {role === "Agent" && (
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Agent ID"
                      name="agent_id"
                      {...register("agent_id")}
                    />
                  </Grid>
                )}
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Username"
                    name="userName"
                    {...register("userName")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Firstname"
                    name="First_name"
                    {...register("First_name")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Lastname"
                    name={"Last_name"}
                    {...register("Last_name")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Designation"
                    name="designation"
                    {...register("designation")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="department"
                      style={{ padding: "0px 15px", marginTop: "-6px" }}
                    >
                      Department
                    </InputLabel>
                    <Select
                      labelId="department"
                      id="department-select"
                      // value={age}
                      variant="outlined"
                      name="department_name"
                      {...register("department_name")}
                      label="Department"
                      // onChange={handleChange}
                    >
                      <MenuItem value={"Marketing"}>Marketing</MenuItem>
                      <MenuItem value={"Revenue"}>Revenue</MenuItem>
                      <MenuItem value={"Reservation"}>Reservation</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="role"
                      style={{ padding: "0px 15px", marginTop: "-6px" }}
                    >
                      Role
                    </InputLabel>
                    <Select
                      labelId="role"
                      id="role-select"
                      value={role}
                      variant="outlined"
                      label="Role"
                      {...register("role")}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"Agent"}>Agent</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    type="email"
                    fullWidth
                    label="Email"
                    name="email"
                    {...register("email")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="gender"
                      style={{ padding: "0px 15px", marginTop: "-6px" }}
                    >
                      Gender
                    </InputLabel>
                    <Select
                      labelId="gender"
                      id="gender-select"
                      // value={age}
                      variant="outlined"
                      name="gender"
                      {...register("gender")}
                      label="Gender"
                      // onChange={handleChange}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} style={{ margin: "-16px 0px" }}>
                  <InputLabel
                    style={{
                      padding: "0px 0x",
                      position: "relative",
                      top: "35px",
                      left: "80px",
                      margin: "0px",
                    }}
                  >
                    Joining Date
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    type="date"
                    name="joining_date"
                    {...register("joining_date")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    type="tel"
                    fullWidth
                    label="Mobile Number"
                    name="mobile_number"
                    {...register("mobile_number")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    type="password"
                    fullWidth
                    label="Password"
                    name="password"
                    {...register("password")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    type="password"
                    fullWidth
                    label="Confirm Password"
                    name="confirm_password"
                    {...register("confirm_password")}
                  />
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="outlined"
                    type="submit"
                    style={{ background: "#1853b1", color: "white" }}
                  >
                    Add Empolyee
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Item>
        </>
      )}
      {edit && editData && (
        <>
          <Typography
            variant="h5"
            style={{ fontWeight: "600", marginBottom: "40px" }}
          >
            Edit Employee
          </Typography>
          {/* {AddEmployee()} */}
          <Item>
            <form onSubmit={handleSubmit(onSubmitEdit)}>
              <Grid container spacing={2} justifyContent="center">
                {role === "Agent" && (
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      defaultValue={editData?.agent_id}
                      label="Agent ID"
                      name="agent_id"
                      {...register("agent_id")}
                    />
                  </Grid>
                )}
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    defaultValue={editData?.userName}
                    label="Username"
                    name="userName"
                    {...register("userName")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Firstname"
                    defaultValue={editData?.first_name}
                    name="first_name"
                    {...register("first_name")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Lastname"
                    name={"last_name"}
                    defaultValue={editData?.last_name}
                    {...register("last_name")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Designation"
                    name="designation"
                    defaultValue={editData?.designation}
                    {...register("designation")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="department"
                      style={{ padding: "0px 15px", marginTop: "-6px" }}
                    >
                      Department
                    </InputLabel>
                    <Select
                      labelId="department"
                      id="department-select"
                      // value={age}
                      defaultValue={editData?.department[0]?.department_name}
                      variant="outlined"
                      name="department_name"
                      {...register("department_name")}
                      label="Department"
                      // onChange={handleChange}
                    >
                      <MenuItem value={"Marketing"}>Marketing</MenuItem>
                      <MenuItem value={"Revenue"}>Revenue</MenuItem>
                      <MenuItem value={"Reservation"}>Reservation</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="role"
                      style={{ padding: "0px 15px", marginTop: "-6px" }}
                    >
                      Role
                    </InputLabel>
                    <Select
                      labelId="role"
                      id="role-select"
                      value={role}
                      defaultValue={editData?.department[0]?.role}
                      variant="outlined"
                      label="Role"
                      {...register("role")}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"Agent"}>Agent</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    type="email"
                    fullWidth
                    label="Email"
                    defaultValue={editData?.email}
                    name="email"
                    {...register("email")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="gender"
                      style={{ padding: "0px 15px", marginTop: "-6px" }}
                    >
                      Gender
                    </InputLabel>
                    <Select
                      labelId="gender"
                      id="gender-select"
                      // value={age}
                      variant="outlined"
                      defaultValue={editData?.gender}
                      name="gender"
                      {...register("gender")}
                      label="Gender"
                      // onChange={handleChange}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4} style={{ margin: "-16px 0px" }}>
                  <InputLabel
                    style={{
                      padding: "0px 0x",
                      position: "relative",
                      top: "35px",
                      left: "80px",
                      margin: "0px",
                    }}
                  >
                    Joining Date
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    type="date"
                    name="joining_date"
                    defaultValue={editData?.joining_date}
                    {...register("joining_date")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    variant="outlined"
                    type="tel"
                    fullWidth
                    label="Mobile Number"
                    name="mobile_number"
                    defaultValue={editData?.mobile_number}
                    {...register("mobile_number")}
                  />
                </Grid>

                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid
                  item
                  xs={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="outlined"
                    type="submit"
                    style={{ background: "#1853b1", color: "white" }}
                  >
                    Edit Empolyee
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Item>
        </>
      )}

      {!addEmployeeState && !edit && AllEmployees ? (
        <Table columns={column} data={AllEmployees["get_all_employee"]} />
      ) : !edit || !addEmployee && (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
        </div>
      )}
    </>
  );
};
export default AllEmployees;
