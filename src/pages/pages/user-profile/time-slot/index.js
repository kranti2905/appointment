// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import moment from 'moment'

import { getDefaultHoursConfig } from './HoursConfig'
import { useState } from 'react'
import { CardContent, Stack, Switch } from '@mui/material'
import TimePicker from '../TimePicker'

const Timeslot = ({ data }) => {

  const [hourConfigs, setHourConfigs] = useState(getDefaultHoursConfig())

  const hourStyle = {
    backgroundColor: 'rgba(17, 25, 39, 0.04)',
    padding: '1px 10px 1px 10px', borderRadius: '8px'
  }

  const handleChange = (index, toggle, event) => {
    const data = hourConfigs.map((x, i) => {
      if (i == index) {
        return {
          ...x,
          config: {
            ...x.config,
            open: toggle?.open ? event?.format("hh:mm A") : x.config.open,
            close: toggle?.close ? event?.format("hh:mm A") : x.config.close
          }
        }
      }
      if (i != index) {
        return x;
      }
    });
    setHourConfigs(data)
  };

  const handleClick = (index, toggle) => {
    const data = hourConfigs.map((x, i) => {
      if (i == index) {
        return {
          ...x,
          status: toggle
        }
      }
      if (i != index) {
        return x;
      }
    });
    setHourConfigs(data)

  }

  const handleTimeChange = (index, toggle) => {
    const data = hourConfigs.map((x, i) => {
      if (i == index) {
        return {
          ...x,
          config: {
            ...x.config,
            toggleOpen: toggle?.open ? toggle?.open : false,
            toggleClose: toggle?.close ? toggle?.close : false
          }
        }
      }
      if (i != index) {
        return x;
      }
    });
    setHourConfigs(data);
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Card sx={{ ml: 5, pl: 5 }}>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Stack sx={{ overflowY: 'auto' }} className='hideScrollbar'>
                {hourConfigs.map((item, i) => (
                  <Stack key={i} width={'100%'} flexDirection={'row'} alignItems={'center'} mb={2} gap={4} className='hideScrollbar' >
                    <Typography fontSize={'16px'} fontWeight={500} width='200px'>{item?.day}</Typography>
                    <Stack flexDirection="row" alignItems='center' gap={2}>
                      <div style={{ ...hourStyle, cursor: 'pointer' }} >
                        {!item?.config?.toggleOpen && (
                          <div onClick={() => item?.status && handleTimeChange(i, { open: true })}>
                            <Typography sx={{ cursor: 'pointer' }} color={
                              item?.status ? '#000' : '#d0d2d1'} fontSize={'14px'}>{item?.config?.open}</Typography>
                          </div>
                        )}
                        {item?.config?.toggleOpen && (<TimePicker open={item?.config?.toggleOpen} value={moment(item?.config?.open, "hh:mm A")} onChange={(e) => handleChange(i, { open: true }, e)} onClose={() => { handleTimeChange(i, { open: false }) }} />)}
                      </div>

                      <Typography fontSize={'14px'}> - </Typography>
                      <div style={{ ...hourStyle, cursor: 'pointer' }} >
                        {!item?.config?.toggleClose && (
                          <div onClick={() => item?.status && handleTimeChange(i, { close: true })}>
                            <Typography sx={{ cursor: 'pointer' }} color={
                              item?.status ? '#000' : '#d0d2d1'} fontSize={'14px'}>{item?.config?.close}</Typography>
                          </div>
                        )}
                        {item?.config?.toggleClose && (<TimePicker open={item?.config?.toggleClose} value={moment(item?.config?.close, "hh:mm A")} onChange={(e) => handleChange(i, { close: true }, e)} onClose={() => handleTimeChange(i, { close: false })} />)}
                      </div>

                    </Stack>
                    <Switch value={item} onClick={() => handleClick(i, !item.status)} />
                  </Stack>
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Timeslot
