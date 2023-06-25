// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { styled, useTheme } from '@mui/material/styles'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
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
import { useRef } from 'react'
import { useAuth } from 'src/hooks/useAuth'

const schema = yup.object().shape({
  logo: yup.string(),
  bannerImage: yup.string(),
  name: yup.string().min(5).required(),
  phone: yup.string().required(),
  email: yup.string().required(),
  website: yup.string().required(),
  timeZone: yup.string().required(),
  currency: yup.string().required(),
  language: yup.string().required(),
});

const Appointments = () => {
  const router = useRouter();
  const logoImagePickerRef = useRef(null);
  const bannerImagePickerRef = useRef(null);
  const listTimezones = listTimeZones();
  const { appointment, setAppointment } = useAuth();

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

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
      getCurrentAppointment();
    }
  }

  const handleLogoChange = (e) => {
    if (!(document.getElementById("upload-button").files[0].type.match(/image.*/))) {
      const snackbarJson = {
        msg: "You can\'t upload this type of file.",
        open: true,
        severity: 'error'
      }
      console.log("snackbarJson", snackbarJson);

      // return snackbar.setSnackbarJson(snackbarJson);
    }
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = (readerEvt) => {
      let binaryString = readerEvt.target.result;
      let base64tImageString = "data:image/png;base64," + btoa(binaryString);
      console.log("base64tImageString", base64tImageString)

      // upload(binaryString);
    };
    reader.readAsDataURL(file);


  };

  const handleLBannerChange = (e) => {
    if (!(document.getElementById("upload-button").files[0].type.match(/image.*/))) {
      const snackbarJson = {
        msg: "You can\'t upload this type of file.",
        open: true,
        severity: 'error'
      }
      console.log("snackbarJson", snackbarJson);

      // return snackbar.setSnackbarJson(snackbarJson);
    }
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = (readerEvt) => {
      let binaryString = readerEvt.target.result;
      let base64tImageString = "data:image/png;base64," + btoa(binaryString);
      console.log("base64tImageString", base64tImageString)

      // upload(binaryString);
    };
    reader.readAsDataURL(file);


  };

  // const upload = async (base64tImageString) => {
  //   try {
  //     const response = await axiosCall.post(
  //       `${AllUrls.FILE_UPLOAD}`,
  //       { file: base64tImageString, path: "profile" }
  //     );
  //     if (response?.data?.data?.Location) {
  //       const snackbarJson = {
  //         msg: response?.data?.message,
  //         open: true,
  //         severity: 'success'
  //       }

  //       snackbar.setSnackbarJson(snackbarJson);
  //       setReset(true);
  //       setFormData((prev) => {
  //         return {
  //           ...prev,
  //           profilePicture: response.data?.data?.Location,
  //         };
  //       });
  //     }
  //   } catch (error) {
  //     const snackbarJson = {
  //       msg: error?.message,
  //       open: true,
  //       severity: 'error'
  //     }
  //     snackbar.setSnackbarJson(snackbarJson);
  //   }
  // }

  const handleUpload = async (e) => {
    imagePickerRef.current.click();
  };

  useEffect(() => {
    console.log(user);
    reset({
      logo: appointment?.client?.logo || '',
      bannerImage: appointment?.client?.bannerImage || '',
      name: appointment?.client?.name || '',
      phone: appointment?.client?.phone || '',
      email: appointment?.client?.email || '',
      website: appointment?.client?.website || '',
      timeZone: appointment?.client?.timeZone || '',
      currency: appointment?.client?.currency || '',
      language: appointment?.client?.language || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment])

  useEffect(() => {
    // getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCurrentAppointment = () => {
    axiosCall
      .get(allURL.PROFILE)
      .then(async response => {
        setLoading(false)
        setAppointment({ ...response.data.data })
      })
      .catch(() => {
        console.log("Error while fetching appointment");
      })
  }

  return (
    <Card>
      <CardHeader title='Company setup' />
      <CardContent>
        <form onSubmit={handleSubmit(submit)}>
          <Grid container flexDirection={'row'} spacing={5}>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='logo'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Stack alignItems={'center'}>
                      <Avatar
                        sx={{ mb: 5 }}
                        className="formControl"
                        id="logo"
                        name="logo"
                        src={``}
                        alt="appointment"
                        value={value}
                      ></Avatar>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          id="upload-button"
                          style={{ display: "none" }}
                          onChange={handleLogoChange}
                          ref={logoImagePickerRef}
                        />
                        <Button
                          variant="contained"
                          onClick={handleUpload}
                        >
                          Change Logo
                        </Button>
                      </div>
                    </Stack>
                  )}
                />
                {errors.logo && <FormHelperText sx={{ color: 'error.main' }}>{errors.logo.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='bannerImage'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Stack alignItems={'center'}>
                      <Avatar
                        sx={{ mb: 5 }}
                        className="formControl"
                        id="bannerImage"
                        name="bannerImage"
                        src={``}
                        alt="appointment"
                        value={value}
                      ></Avatar>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          id="upload-button"
                          style={{ display: "none" }}
                          onChange={handleLBannerChange}
                          ref={bannerImagePickerRef}
                        />
                        <Button
                          variant="contained"
                          onClick={handleUpload}
                        >
                          Change Banner
                        </Button>
                      </div>
                    </Stack>
                  )}
                />
                {errors.logo && <FormHelperText sx={{ color: 'error.main' }}>{errors.logo.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
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
                {errors.logo && <FormHelperText sx={{ color: 'error.main' }}>{errors.logo.message}</FormHelperText>}
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
                  name='website'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      fullWidth
                      label='Website'
                      placeholder='https://vizz.com'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.website)}
                    />
                  )}
                />
                {errors.website && <FormHelperText sx={{ color: 'error.main' }}>{errors.website.message}</FormHelperText>}
              </FormControl>
            </Grid>
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
                        defaultValue={getValues().language}
                        label="Language"
                        placeholder='Select language'
                        value={appointment?.client?.language || value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.language)}
                      >
                        {[{ name: 'English', value: 'english' }, { name: 'Hindi', value: 'hindi' }].map((x, i) => (
                          <MenuItem value={x.value} key={i}>{x.name}</MenuItem>
                        ))}
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
                        placeholder='Select language'
                        label="Timezone"
                        value={appointment?.client?.timeZone || value}
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
          </Grid>
          <Grid container mt={5} flexDirection={'row'} spacing={5}>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='currency'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Stack>
                      <InputLabel id='demo-simple-select-helper-label'>Currency</InputLabel>
                      <Select
                        defaultValue={getValues().currency}
                        label="Currency"
                        placeholder='Select currency'
                        value={appointment?.client?.currency || value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.currency)}
                      >
                        {['INR', 'SAR'].map((x) => (
                          <MenuItem value={x} key={x}>{x}</MenuItem>
                        ))}
                      </Select>
                    </Stack>
                  )}
                />
                {errors.currency && <FormHelperText sx={{ color: 'error.main' }}>{errors.currency.message}</FormHelperText>}
              </FormControl>
            </Grid>
            {/* <Grid item xs={4}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='address'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      fullWidth
                      multiline
                      type='text'
                      label='Address'
                      placeholder='Address'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.address)}
                    />
                  )}
                />
                {errors.address && <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>}
              </FormControl>
            </Grid> */}
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

export default Appointments
