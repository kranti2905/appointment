// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const renderList = arr => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
            <Icon fontSize='1.25rem' icon={item.icon} />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
            </Typography>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const renderTeams = arr => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:not(:last-of-type)': { mb: 3 },
            '& svg': { color: `${item.color}.main` }
          }}
        >
          <Icon fontSize='1.25rem' icon={item.icon} />

          <Typography sx={{ mx: 2, fontWeight: 500, color: 'text.secondary' }}>
            {item.property.charAt(0).toUpperCase() + item.property.slice(1)}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
          </Typography>
        </Box>
      )
    })
  } else {
    return null
  }
}

const profile = {
  about: [
    { property: 'Full Name', value: 'John Doe', icon: 'tabler:user' },
    { property: 'Status', value: 'active', icon: 'tabler:check' },
    { property: 'Role', value: 'Developer', icon: 'tabler:crown' },
    { property: 'Country', value: 'USA', icon: 'tabler:flag' },
    { property: 'Language', value: 'English', icon: 'tabler:language' }
  ],
  contacts: [
    { property: 'Contact', value: '(123) 456-7890', icon: 'tabler:phone-call' },
    { property: 'Skype', value: 'john.doe', icon: 'tabler:brand-skype' },
    { property: 'Email', value: 'john.doe@example.com', icon: 'tabler:mail' }
  ],
  teams: [
    { property: 'Backend Developer', value: '(126 Members)', icon: 'tabler:brand-github', color: 'primary' },
    { property: 'React Developer', value: '(98 Members)', icon: 'tabler:brand-react', color: 'info' }
  ],
  overview: [
    { property: 'Task Compiled', value: '13.5k', icon: 'tabler:check' },
    { property: 'Connections', value: '897', icon: 'tabler:users' },
    { property: 'Projects Compiled', value: '146', icon: 'tabler:layout-grid' }
  ]
};

const AboutOverview = props => {
  const { about, overview } = profile

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                About
              </Typography>
              {renderList(about)}
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <div>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Overview
              </Typography>
              {renderList(overview)}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverview
