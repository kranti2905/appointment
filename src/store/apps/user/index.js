import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosCall } from 'src/http-call-and-loader/Loader'
import allURL from 'src/http-call-and-loader/allURL'

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers/fetchData', async () => {
  const response = await axiosCall.get(allURL.USERS)

  return response.data?.data?.docs
})

// ** Add User
export const addUser = createAsyncThunk('appUsers/addUser', async (data, { getState, dispatch }) => {
  const response = await axiosCall.post(allURL.USERS, {
    data
  })
  const res = await dispatch(fetchData())
  dispatch(setUsers(res.payload))

  return response.data?.data?.docs
})

// ** Delete User
export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { getState, dispatch }) => {
  const response = await axiosCall.delete(`${allURL.USERS}?id=${id}`)
  const res = await dispatch(fetchData())
  dispatch(setUsers(res.payload))

  return response.data?.data?.docs
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    userList: [],
    userData: null,
    currentUser: null,
    isEditUser: false
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload.data
    },
    setEditUser: (state, action) => {
      state.isEditUser = action.payload.isEditUser
    },
    setUserList: (state, action) => {
      state.userList = action.payload.data
    },
    changeCurrentUser: (state, action) => {
      state.currentUser = action.payload.data
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appUsersSlice.reducer;

//Actions

const { setUserData, setEditUser, setUserList, changeCurrentUser } = appUsersSlice.actions

export const setUser = (data) => (dispatch) => {
  dispatch(setUserData({ data }));
}

export const setUserEdit = (isEditUser) => (dispatch) => {
  dispatch(setEditUser({ isEditUser }));
}

export const setUsers = (data) => (dispatch) => {
  dispatch(setUserList({ data }));
}

export const setCurrentUser = (data) => (dispatch) => {
  dispatch(changeCurrentUser({ data }));
}
