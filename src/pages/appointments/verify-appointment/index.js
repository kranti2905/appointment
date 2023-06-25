// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'
import { axiosCall } from 'src/http-call-and-loader/Loader'
import { useRouter } from 'next/router'
import allURL from 'src/http-call-and-loader/allURL'

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '1rem',
  textDecoration: 'none',
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main
}))

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 48,
  textAlign: 'center',
  height: '48px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

const defaultValues = {
  val1: '',
  val2: '',
  val3: '',
  val4: ''
}

const VerifyOtp = () => {
  const router = useRouter();

  // ** State
  const [isBackspace, setIsBackspace] = useState(false)

  // ** Hooks
  const theme = useTheme()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const errorsArray = Object.keys(errors)

  const handleChange = (event, onChange) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }

  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={event => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  const submit = async (data) => {
    // e.preventDefault();
    const phone = localStorage.getItem('phone');
    const otp = `${data.val1}${data.val2}${data.val3}${data.val4}`;
    const response = await axiosCall.post(allURL.VERIFY_OTP, { phone, otp });
    if (response.status == 200) {
      const regRes = await axiosCall.post(allURL.REGISTER, response?.data?.data);
      if (regRes.status === 200) router.replace('/login')
    }
  }

  return (

    <Card>
      <CardHeader title='Verify User' />
      <CardContent>
        <Box alignItems={'center'} sx={{ ml: "30%", width: '100%', maxWidth: 400 }}>
          <Box sx={{ my: 6 }}>
            <Typography sx={{ mb: 1.5, fontWeight: 500, fontSize: '1.625rem', lineHeight: 1.385 }}>
              Two-Step Verification 💬
            </Typography>
            <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
              We sent a verification code to your mobile. Enter the code from the mobile in the field below.
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>******9763</Typography>
          </Box>
          <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Type your 4 digit security code</Typography>
          <form onSubmit={handleSubmit(submit)}>
            <CleaveWrapper
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                ...(errorsArray.length && {
                  '& .invalid:focus': {
                    borderColor: theme => `${theme.palette.error.main} !important`,
                    boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                  }
                })
              }}
            >
              {renderInputs()}
            </CleaveWrapper>
            {errorsArray.length ? (
              <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid OTP</FormHelperText>
            ) : null}
            <Button fullWidth type='submit' variant='contained' sx={{ mt: 2 }}>
              Verify
            </Button>
          </form>
          <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>Didn't get the code?</Typography>
            <LinkStyled href='/' onClick={e => e.preventDefault()}>
              Resend
            </LinkStyled>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default VerifyOtp
