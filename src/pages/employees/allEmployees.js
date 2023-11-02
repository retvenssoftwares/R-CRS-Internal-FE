import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles, styled } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
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
