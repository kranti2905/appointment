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

// ** Timezone Imports
import { listTimeZones } from "timezone-support";


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

const schema = yup.object().shape({
  name: yup.string().min(5).required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  type: yup.string().required(),
  timeZone: yup.string().required(),
});

const InviteUser = ({ user }) => {
  const router = useRouter();
  const listTimezones = listTimeZones();

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
    const response = await axiosCall.put(allURL.UPDATE_CLIENT, data);
    if (response.status == 200) {
      router.replace('/users/list')
    }
  }

  useEffect(() => {
    console.log(user);
    reset({
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      timeZone: user?.timeZone || '',
      type: user?.type?._id || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    // getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardHeader title='Invite user' />
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
                  name='timeZone'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Stack>
                      <InputLabel id='demo-simple-select-helper-label'>Timezone</InputLabel>
                      <Select
                        defaultValue={getValues().timeZone}
                        id='demo-simple-select-helper'
                        labelId='demo-simple-select-helper-label'
                        placeholder='Select Timezone'
                        label="Timezone"
                        value={user?.client?.timeZone || value}
                        onBlur={onBlur}
                        onChange={onChange}
                      >
                        {listTimezones.map((x, i) => (
                          <MenuItem value={x} key={i}>{x}</MenuItem>
                        ))}
                      </Select>
                    </Stack>

                  )}
                />
                {errors.timeZone && <FormHelperText sx={{ color: 'error.main' }}>{errors.timeZone.message}</FormHelperText>}
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
                      <InputLabel id='demo-simple-select-helper-label'>User Type</InputLabel>
                      <Select
                        defaultValue={getValues().type}
                        label="User type"
                        placeholder='Select user type'
                        value={user?.type?.slug || value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.type)}
                      >
                        {[{ name: 'Owner', slug: 'owner' }, { name: 'Admin', slug: 'admin' }].map((x, i) => (
                          <MenuItem value={x.slug} key={i}>{x.name}</MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  )}
                />
                {errors.type && <FormHelperText sx={{ color: 'error.main' }}>{errors.type.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container mt={5} flexDirection={'row'} spacing={5}>
            <Grid item xs={4}>
              <Button type='submit' variant='contained' size='large'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default InviteUser
