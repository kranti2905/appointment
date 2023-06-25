// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatsHorizontalWithDetails from 'src/@core/components/card-statistics/card-stats-horizontal-with-details'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { getServices, deleteService, setServices, setServiceEdit } from 'src/store/apps/service'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Table Components Imports
import TableHeader from './TableHeader'

import AddServiceDrawer from './AddServiceDrawer'
import { useRouter } from 'next/router'

// ** renders client column
const statusObj = {
  0: { title: 'inactive', color: 'warning' },
  1: { title: 'active', color: 'success' },
  2: { title: 'deleted', color: 'error' },
}

// const userStatusObj = {
//   active: 'success',
//   pending: 'warning',
//   inactive: 'secondary'
// }

// ** renders client column
const renderClient = row => {
  if (row?.image) {
    return <CustomAvatar src={row.image} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor}
        sx={{ mr: 2.5, width: 38, height: 38, fontSize: '1rem', fontWeight: 500 }}
      >
        {getInitials(row?.name || '')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const router = useRouter();

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    dispatch(setServiceEdit(true));
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    dispatch(deleteService(id))
    handleRowOptionsClose();
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem

          // component={Link}
          sx={{ '& svg': { mr: 2 } }}

          // href={'/users/view/account?id=' + id}
          onClick={handleRowOptionsClose}
        >
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.275,
    minWidth: 200,
    field: 'image',
    headerName: 'Image',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
        </Box>
      )
    }
  },
  {
    flex: 0.275,
    minWidth: 290,
    field: 'name',
    headerName: 'Name',
    renderCell: params => {
      const { row } = params

      return (
        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
          {row.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: 'price',
    headerName: 'Price',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.price}
      </Typography>
    )
  },
  {
    flex: 0.2,
    type: 'date',
    minWidth: 120,
    headerName: 'Created Date',
    field: 'createdAt',
    valueGetter: params => new Date(params.value),
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.createdAt}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'status',
    headerName: 'Status',
    renderCell: params => {
      const status = statusObj[params.row.status]

      return (
        <CustomChip
          rounded
          size='small'
          skin='light'
          color={status?.color}
          label={status?.title}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row?._id} />
  }
];

const ServiceList = ({ apiData }) => {

  // ** State
  const [data, setData] = useState([])
  const [value, setValue] = useState()
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const { serviceList, isEditService } = useSelector(state => state.service)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    getAllServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback(e => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback(e => {
    setStatus(e.target.value)
  }, [])
  const toggleAddServiceDrawer = () => dispatch(setServiceEdit(!isEditService))

  const getAllServices = async () => {
    const data = await dispatch(getServices());
    dispatch(setServices(data.payload))
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddServiceDrawer} />
          <DataGrid
            getRowId={(row) => row?._id}
            autoHeight
            rowHeight={62}
            rows={serviceList}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      {/* <AddServiceDrawer open={isEditService} toggle={toggleAddServiceDrawer} /> */}
    </Grid>
  )
}

export default ServiceList
