
var userJson = {
    userID: "UserID",
    firstName: "User name",
    lastName: "lastName",
    role: "Role",
    email: "email",
    gender: "gender",
    phoneNumber: "phoneNumber"
}

const loginReducer = (state = userJson, action) => {
    if (action.type ==='user/getUserInfo') {
        return action.payload
    } else {
        return state;
    }
}
export default loginReducer