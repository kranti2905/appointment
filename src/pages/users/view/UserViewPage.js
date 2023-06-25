// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import UserViewLeft from './UserViewLeft'
import UserViewRight from './UserViewRight'

const UserView = ({ tab, invoiceData }) => {
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft id={id} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab} invoiceData={invoiceData} id={id} />
      </Grid>
    </Grid>
  )
}

export default UserView
