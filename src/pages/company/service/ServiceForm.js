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
import { setUser, setUserEdit } from 'src/store/apps/user'

const schema = yup.object().shape({
  name: yup.string().min(5).required(),
  price: yup.string().required(),
});

const UserForm = ({ user }) => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  const router = useRouter();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user)


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
      dispatch(setUserEdit(false));
      router.replace('/users/view/account/?id=' + id)
    }
  }

  useEffect(() => {
    reset({
      id: userData?._id || undefined,
      name: userData?.name || '',
      phone: userData?.phone || '',
      email: userData?.email || '',
      language: userData?.language || '',
      type: userData?.type?._id || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  const cancel = () => {
    dispatch(setUserEdit(false))
  }

  return (
    <Card>
      <CardHeader title='Edit user' />
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
                  name='price'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      fullWidth
                      label='Price'
                      placeholder='45322'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.price)}
                    />
                  )}
                />
                {errors.price && <FormHelperText sx={{ color: 'error.main' }}>{errors.price.message}</FormHelperText>}
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

export default UserForm
