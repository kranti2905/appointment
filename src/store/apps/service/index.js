import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosCall } from 'src/http-call-and-loader/Loader'
import allURL from 'src/http-call-and-loader/allURL'

// ** Fetch Users
export const getServices = createAsyncThunk('appServices/getServices', async () => {
  const response = await axiosCall.get(allURL.SERVICE)

  return response.data?.data?.docs
})

// ** Add User
export const addService = createAsyncThunk('appServices/addService', async (data, { getState, dispatch }) => {
  const response = await axiosCall.post(allURL.SERVICE, {
    data
  })
  const res = await dispatch(fetchData())
  dispatch(setServiceList(res.payload))

  return response.data?.data?.docs
})

// ** Delete User
export const deleteService = createAsyncThunk('appServices/deleteService', async (id, { getState, dispatch }) => {
  const response = await axiosCall.delete(`${allURL.SERVICE}?id=${id}`)
  const res = await dispatch(fetchData())
  dispatch(setServiceList(res.payload))

  return response.data?.data?.docs
})

export const appServicesSlice = createSlice({
  name: 'appServices',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    serviceList: [],
    serviceData: null,
    isEditService: false
  },
  reducers: {
    setServiceData: (state, action) => {
      state.serviceData = action.payload.data
    },
    setServiceList: (state, action) => {
      state.serviceList = action.payload.data
    },
    setEditService: (state, action) => {
      state.isEditService = action.payload.isEditService
    },
  },
  extraReducers: builder => {
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.data = action.payload.users
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appServicesSlice.reducer;

//Actions

const { setServiceData, setServiceList, setEditService } = appServicesSlice.actions

export const setService = (data) => (dispatch) => {
  dispatch(setServiceData({ data }));
}

export const setServices = (data) => (dispatch) => {
  dispatch(setServiceList({ data }));
}

export const setServiceEdit = (isEditService) => (dispatch) => {
  dispatch(setEditService({ isEditService }));
}
