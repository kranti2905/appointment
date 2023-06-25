import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosCall } from 'src/http-call-and-loader/Loader'
import allURL from 'src/http-call-and-loader/allURL'

// ** Fetch Users
export const fetchData = createAsyncThunk('appAppointments/fetchData', async () => {
  const response = await axiosCall.get(allURL.APPOINTMENTS)

  return response.data?.data?.docs
})

// ** Add User
export const addAppointment = createAsyncThunk('appAppointments/addAppointment', async (data, { getState, dispatch }) => {
  const response = await axiosCall.post(allURL.APPOINTMENTS, {
    data
  })
  const res = await dispatch(fetchData())
  dispatch(setUsers(res.payload))

  return response.data?.data?.docs
})

// ** Delete User
export const deleteAppointment = createAsyncThunk('appAppointments/deleteAppointment', async (id, { getState, dispatch }) => {
  const response = await axiosCall.delete(`${allURL.APPOINTMENTS}?id=${id}`)
  const res = await dispatch(fetchData())
  dispatch(setAppointments(res.payload))

  return response.data?.data?.docs
})

export const appAppointmentsSlice = createSlice({
  name: 'appAppointments',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    appointmentList: [],
    appointmentData: null,
    currentAppointment: null,
    isEditAppointment: false
  },
  reducers: {
    setAppointmentData: (state, action) => {
      state.appointmentData = action.payload.data
    },
    setEditAppointment: (state, action) => {
      state.isEditAppointment = action.payload.isEditAppointment
    },
    setAppointmentList: (state, action) => {
      state.appointmentList = action.payload.data
    },
    changeCurrentAppointment: (state, action) => {
      state.currentAppointment = action.payload.data
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.appointments
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appAppointmentsSlice.reducer;

//Actions

const { setAppointmentData, setEditAppointment, setAppointmentList, changeCurrentAppointment } = appAppointmentsSlice.actions

export const setAppointment = (data) => (dispatch) => {
  dispatch(setAppointmentData({ data }));
}

export const setAppointmentEdit = (isEditAppointment) => (dispatch) => {
  dispatch(setEditAppointment({ isEditAppointment }));
}

export const setAppointments = (data) => (dispatch) => {
  dispatch(setAppointmentList({ data }));
}

export const setCurrentAppointment = (data) => (dispatch) => {
  dispatch(changeCurrentAppointment({ data }));
}
