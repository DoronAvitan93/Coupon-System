import { createSlice } from "@reduxjs/toolkit";





//redux
const authSlice = createSlice({
    name: 'auth',
    initialState:
    {
        isAuthenticated: false,
        clientType: null,
        adminIdAfterLogin: null,
        companyIdAfterLogin: null,
        customerIdAfterLogin: null,
        isNeedToReLogin: false
    },

    reducers: {

        setIsAuthTrue(state) {
            state.isAuthenticated = true;
        },

        setIsAuthFalse(state) {
            state.isAuthenticated = false;
        },

        setClientTypeCustomer(state) {
            state.clientType = "Customer"
            localStorage.setItem('isLogged', '3');
            sessionStorage.setItem("isLoggedSession", "1");
        },

        setClientTypeCompany(state) {
            state.clientType = "Company"
            localStorage.setItem('isLogged', '2');
            sessionStorage.setItem("isLoggedSession", "1");
        },

        setClientTypeAdmin(state) {
            state.clientType = "Administrator"
            localStorage.setItem('isLogged', '1');
            sessionStorage.setItem("isLoggedSession", "1");
        },

        setClientTypeNull(state) {
            state.clientType = null
        },

        setCompanyIdAfterLogin(state, action) {
            state.companyIdAfterLogin = action.payload;
            localStorage.setItem('companyID', action.payload)
        },

        setCustomerIdAfterLogin(state, action) {
            state.customerIdAfterLogin = action.payload;
            localStorage.setItem('customerID', action.payload)
        },

        setAdminIdAfterLogin(state, action) {
            state.adminIdAfterLogin = action.payload;
            localStorage.setItem('adminID', action.payload)
        },

        setIsRelogin(state, action) {
            state.isNeedToReLogin = action.payload;

        },
    }
}
);


export const authActions = authSlice.actions;

export default authSlice.reducer;