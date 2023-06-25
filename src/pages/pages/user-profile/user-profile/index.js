// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import AboutOverview from './AboutOverview'

const ProfileTab = ({ data }) => {
  return (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverview about={data.about} contacts={data.contacts} teams={data.teams} overview={data.overview} />
      </Grid>
    </Grid>
  )
}

export default ProfileTab
