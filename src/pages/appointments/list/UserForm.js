// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Select, MenuItem } from '@mui/material'

// Phone Input
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Demo Imports
import allURL from 'src/http-call-and-loader/allURL'
import { axiosCall } from 'src/http-call-and-loader/Loader'
import { Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setAppointment, setAppointmentEdit } from 'src/store/apps/appointment'

const schema = yup.object().shape({
  name: yup.string().min(5).required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  type: yup.string().required(),
  language: yup.string().required(),
});

const AppointmentForm = ({ appointment }) => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  const router = useRouter();
  const dispatch = useDispatch();
  const { appointmentData } = useSelector((state) => state.appointment)


  const {
    control,
    reset,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const submit = async (data) => {
    const response = await axiosCall.put(allURL.USERS, data);
    if (response.status == 200) {
      console.log("response", response);
      dispatch(setAppointmentEdit(false));
      router.replace('/appointments/view/account/?id=' + id)
    }
  }

  useEffect(() => {
    reset({
      id: appointmentData?._id || undefined,
      name: appointmentData?.name || '',
      phone: appointmentData?.phone || '',
      email: appointmentData?.email || '',
      language: appointmentData?.language || '',
      type: appointmentData?.type?._id || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment])


  const cancel = () => {
    dispatch(setAppointmentEdit(false))
  }

  return (
    <Card>
      <CardHeader title='Edit appointment' />
      <CardContent>
        <form onSubmit={handleSubmit(submit)}>
          <Grid container mt={5} flexDirection={'row'} spacing={5}>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      fullWidth
                      label='Name'
                      placeholder='Ashit Londhe'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.name)}
                    />
                  )}
                />
                {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
              </FormControl>

            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='phone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <PhoneInput
                      country={'in'}
                      value={value}
                      onChange={onChange}
                      inputProps={{
                        name: 'Phone',
                        required: true,
                        autoFocus: true,
                        control: { control },
                      }}
                      inputStyle={{
                        height: "55px",
                        width: '100%'
                      }}
                    />
                  )}
                />
                {errors.phone && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      fullWidth
                      label='Email'
                      placeholder='ashit@gmail.com'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container mt={5} flexDirection={'row'} spacing={5}>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='language'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Stack>
                      <InputLabel id='demo-simple-select-helper-label'>Language</InputLabel>
                      <Select
                        defaultValue=''
                        id='demo-simple-select-helper'
                        labelId='demo-simple-select-helper-label'
                        placeholder='Select language'
                        label="Language"
                        value={appointmentData?.language || value}
                        onBlur={onBlur}
                        onChange={onChange}
                      >
                        {/* {listTimezones.map((x, i) => (
                          <MenuItem value={x} key={i}>{x}</MenuItem>
                        ))} */}
                        <MenuItem value='english'>English</MenuItem>
                        <MenuItem value='hindi'>Hindi</MenuItem>
                      </Select>
                    </Stack>

                  )}
                />
                {errors.language && <FormHelperText sx={{ color: 'error.main' }}>{errors.language.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='type'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Stack>
                      <InputLabel id='demo-simple-select-helper-label'>Appointment Type</InputLabel>
                      <Select
                        defaultValue=''
                        label="Appointment type"
                        placeholder='Select appointment type'
                        value={appointmentData?.type?._id || value}
                        onBlur={onBlur}
                        onChange={(e) => {
                          console.log("e. target .value", e.target.value);
                          onChange(e)
                        }}
                        error={Boolean(errors.type)}
                      >
                        {[{ name: 'Owner', value: '644e41b89a0bd0f9d7bae25a' }].map((x, i) => (
                          <MenuItem value={x.value} key={i}>{x.name}</MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  )}
                />
                {errors.type && <FormHelperText sx={{ color: 'error.main' }}>{errors.type.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container mt={5} flexDirection={'row'} spacing={1}>
            <Grid item xs={4} ml={"30%"}>
              <Button type='submit' variant='contained' size='large'>
                Submit
              </Button>
              <Button sx={{ ml: "20px" }} onClick={cancel} variant='outlined' size='large'>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AppointmentForm
