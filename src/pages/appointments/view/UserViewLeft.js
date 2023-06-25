// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'
import UserSubscriptionDialog from 'src/views/apps/user/view/UserSubscriptionDialog'

// ** Third Party Components
import allURL from 'src/http-call-and-loader/allURL'
import { axiosCall } from 'src/http-call-and-loader/Loader'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import UserForm from '../list/UserForm'

// ** Actions Imports
import { setUserEdit, setUser } from 'src/store/apps/user'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

const user = {
  id: 1,
  role: 'owner',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  billing: 'Manual - Cash',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/14.png'
}

const roleColors = {
  // admin: 'error',
  // editor: 'info',
  // author: 'warning',
  owner: 'success',

  // subscriber: 'primary'
}

const statusColors = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const statusObj = {
  0: { title: 'inactive', color: 'warning' },
  1: { title: 'active', color: 'success' },
  2: { title: 'deleted', color: 'error' },
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: 0,
  left: -10,
  fontSize: '1rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')(({ theme }) => ({
  fontSize: '1rem',
  alignSelf: 'flex-end',
  color: theme.palette.text.secondary
}))

const UserViewLeft = ({ id }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)
  const [openPlans, setOpenPlans] = useState(false)

  // const [user, setUser] = useState({})
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)
  const dispatch = useDispatch();
  const { isEditUser, userData } = useSelector((state) => state.user)

  // Handle Edit dialog
  const handleEditClickOpen = () => {
    // setOpenEdit(true)
    dispatch(setUserEdit(true));
    dispatch(setUser(userData));
  }
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  const getUserById = (userId) => {
    axiosCall
      .get(`${allURL.USERS}?id=${userId}`)
      .then(async response => {
        console.log("user user", response.data);
        dispatch(setUser(response.data.data));
      })
      .catch(() => {
        console.log("Error while fetching user by id");
      })
  }

  useEffect(() => {
    getUserById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isEditUser]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ pt: 13.5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {userData?.photo ? (
              <CustomAvatar
                src={userData?.photo}
                variant='rounded'
                alt={userData?.name}
                sx={{ width: 100, height: 100, mb: 4 }}
              />
            ) : (
              <CustomAvatar
                skin='light'
                variant='rounded'
                color={userData?.avatarColor}
                sx={{ width: 100, height: 100, mb: 4, fontSize: '3rem' }}
              >
                {getInitials(userData?.name || '')}
              </CustomAvatar>
            )}
            <Typography variant='h5' sx={{ mb: 3 }}>
              {userData?.name}
            </Typography>
            <CustomChip
              rounded
              skin='light'
              size='small'
              label={userData?.type?.slug}
              color={roleColors[userData?.type?.slug]}
              sx={{ textTransform: 'capitalize' }}
            />
          </CardContent>

          <Divider sx={{ my: '0 !important', mx: 6 }} />

          <CardContent sx={{ pb: 4 }}>
            <Typography variant='body2' sx={{ color: 'text.disabled', textTransform: 'uppercase' }}>
              Details
            </Typography>
            <Box sx={{ pt: 4 }}>
              {/* <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500 }}>Username:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>@{userData.}</Typography>
              </Box> */}
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500 }}>Email:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.email || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500 }}>Status:</Typography>
                <CustomChip
                  rounded
                  skin='light'
                  size='small'
                  label={statusObj[userData?.status]?.title}
                  color={statusObj[userData?.status]?.color}
                  sx={{
                    textTransform: 'capitalize'
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500 }}>Role:</Typography>
                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{userData?.type?.slug}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500 }}>Contact:</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{userData?.phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 3 }}>
                <Typography sx={{ mr: 2, fontWeight: 500 }}>Language:</Typography>
                <Typography sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>{userData?.language || '-'}</Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
              Edit
            </Button>
            <Button color='error' variant='outlined' onClick={() => setSuspendDialogOpen(true)}>
              Suspend
            </Button>
          </CardActions>
          <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
          <UserSubscriptionDialog open={subscriptionDialogOpen} setOpen={setSubscriptionDialogOpen} />
        </Card>
      </Grid>
    </Grid>
  )

}

export default UserViewLeft
