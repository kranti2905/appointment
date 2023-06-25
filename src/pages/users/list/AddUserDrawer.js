// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import allURL from 'src/http-call-and-loader/allURL'
import { axiosCall } from 'src/http-call-and-loader/Loader'

// ** Timezone Imports
import { listTimeZones } from "timezone-support";

// Phone Input
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser, fetchData, setUsers } from 'src/store/apps/user'
import { Stack } from '@mui/system'
import { useRouter } from 'next/router'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

const schema = yup.object().shape({
  name: yup.string().min(5).required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  type: yup.string().required(),
  timeZone: yup.string().required(),

  // company: yup.string().required(),
  // billing: yup.string().required(),
  // country: yup.string().required(),
  // email: yup.string().email().required(),
  // contact: yup
  //   .number()
  //   .typeError('Contact Number field is required')
  //   .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
  //   .required(),
  // fullName: yup
  //   .string()
  //   .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
  //   .required(),
  // username: yup
  //   .string()
  //   .min(3, obj => showErrors('Username', obj.value.length, obj.min))
  //   .required()
})

const defaultValues = {
  name: '',
  phone: '',
  email: '',
  type: '',
  timeZone: '',
}

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props;
  const router = useRouter();

  // ** State
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState('subscriber')

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.user)
  const listTimezones = listTimeZones();

  const {
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const submit = async data => {
    const response = await axiosCall.post(allURL.USERS, data);

    if (response.status == 200) {
      toggle()
      reset()
      const data = await dispatch(fetchData())
      dispatch(setUsers(data.payload))
    }
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    setValue('contact', Number(''))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(submit)}>
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
                    value={value}
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
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.type)}
                  >
                    {[{ name: 'Branch Owner', value: '644e41b89a0bd0f9d7bae25a' }].map((x, i) => (
                      <MenuItem value={x.value} key={i}>{x.name}</MenuItem>
                    ))}
                  </Select>
                </Stack>
              )}
            />
            {errors.type && <FormHelperText sx={{ color: 'error.main' }}>{errors.type.message}</FormHelperText>}
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
