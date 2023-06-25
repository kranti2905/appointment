const navigation = () => {
  return [
    {
      title: 'Dashboards',
      icon: 'tabler:smart-home',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'Analytics',
          path: '/dashboards/analytics'
        }
      ]
    },
    {
      icon: 'tabler:layout-navbar',
      title: 'Company',
      children: [
        {
          title: 'Profile',
          path: '/company/profile'
        },
        {
          title: 'Profiles',
          path: '/company/profiles'
        },
        {
          title: 'Service',
          path: '/company/service'
        }
      ]
    },
    {
      icon: 'tabler:layout-navbar',
      title: 'Users',
      path: '/users/list',
    },
     {
      icon: 'tabler:layout-navbar',
      title: 'Appointments',
      path: '/appointments/list',
    },

  ]
}

export default navigation
