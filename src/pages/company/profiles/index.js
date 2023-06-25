// ** Third Party Imports
//import axios from 'axios';

// ** Demo Components Imports
import UserProfile from 'src/views/pages/company/UserProfile';

const UserProfileTab = ({ tab }) => {
  const data = {
    profile: {
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
      ],
      connections: [
        {
          isFriend: false,
          connections: '45',
          name: 'Cecilia Payne',
          avatar: '/images/avatars/8.png'
        },
        {
          isFriend: true,
          connections: '1.32k',
          name: 'Curtis Fletcher',
          avatar: '/images/avatars/3.png'
        },
        {
          isFriend: true,
          connections: '125',
          name: 'Alice Stone',
          avatar: '/images/avatars/12.png'
        },
        {
          isFriend: false,
          connections: '456',
          name: 'Darrell Barnes',
          avatar: '/images/avatars/7.png'
        },
        {
          isFriend: false,
          connections: '1.2k',
          name: 'Eugenia Moore',
          avatar: '/images/avatars/6.png'
        }
      ],
      teamsTech: [
        {
          members: 72,
          ChipColor: 'error',
          chipText: 'Developer',
          title: 'React Developers',
          avatar: '/images/icons/project-icons/react-label.png'
        },
        {
          members: 122,
          chipText: 'Support',
          ChipColor: 'primary',
          title: 'Support Team',
          avatar: '/images/icons/project-icons/support-label.png'
        },
        {
          members: 7,
          ChipColor: 'info',
          chipText: 'Designer',
          title: 'UI Designer',
          avatar: '/images/icons/project-icons/figma-label.png'
        },
        {
          members: 289,
          ChipColor: 'error',
          chipText: 'Developer',
          title: 'Vue.js Developers',
          avatar: '/images/icons/project-icons/vue-label.png'
        },
        {
          members: 24,
          chipText: 'Marketing',
          ChipColor: 'secondary',
          title: 'Digital Marketing',
          avatar: '/images/icons/project-icons/twitter-label.png'
        }
      ]
    }
  }
  return <UserProfile tab={`profile`} data={data} />
}

// export const getStaticPaths = () => {
//   return {
//     paths: [
//       { params: { tab: 'profile' } },
//       { params: { tab: 'account' } }
//     ],
//     fallback: false
//   }
// }

// export const getStaticProps = async ({ params }) => {
//   debugger;
//   //const res = await axios.get('/pages/profile', { params: { tab: params?.tab } })
//   const data = {
//     profile: {
//       about: [
//         { property: 'Full Name', value: 'John Doe', icon: 'tabler:user' },
//         { property: 'Status', value: 'active', icon: 'tabler:check' },
//         { property: 'Role', value: 'Developer', icon: 'tabler:crown' },
//         { property: 'Country', value: 'USA', icon: 'tabler:flag' },
//         { property: 'Language', value: 'English', icon: 'tabler:language' }
//       ],
//       contacts: [
//         { property: 'Contact', value: '(123) 456-7890', icon: 'tabler:phone-call' },
//         { property: 'Skype', value: 'john.doe', icon: 'tabler:brand-skype' },
//         { property: 'Email', value: 'john.doe@example.com', icon: 'tabler:mail' }
//       ],
//       teams: [
//         { property: 'Backend Developer', value: '(126 Members)', icon: 'tabler:brand-github', color: 'primary' },
//         { property: 'React Developer', value: '(98 Members)', icon: 'tabler:brand-react', color: 'info' }
//       ],
//       overview: [
//         { property: 'Task Compiled', value: '13.5k', icon: 'tabler:check' },
//         { property: 'Connections', value: '897', icon: 'tabler:users' },
//         { property: 'Projects Compiled', value: '146', icon: 'tabler:layout-grid' }
//       ],
//       connections: [
//         {
//           isFriend: false,
//           connections: '45',
//           name: 'Cecilia Payne',
//           avatar: '/images/avatars/8.png'
//         },
//         {
//           isFriend: true,
//           connections: '1.32k',
//           name: 'Curtis Fletcher',
//           avatar: '/images/avatars/3.png'
//         },
//         {
//           isFriend: true,
//           connections: '125',
//           name: 'Alice Stone',
//           avatar: '/images/avatars/12.png'
//         },
//         {
//           isFriend: false,
//           connections: '456',
//           name: 'Darrell Barnes',
//           avatar: '/images/avatars/7.png'
//         },
//         {
//           isFriend: false,
//           connections: '1.2k',
//           name: 'Eugenia Moore',
//           avatar: '/images/avatars/6.png'
//         }
//       ],
//       teamsTech: [
//         {
//           members: 72,
//           ChipColor: 'error',
//           chipText: 'Developer',
//           title: 'React Developers',
//           avatar: '/images/icons/project-icons/react-label.png'
//         },
//         {
//           members: 122,
//           chipText: 'Support',
//           ChipColor: 'primary',
//           title: 'Support Team',
//           avatar: '/images/icons/project-icons/support-label.png'
//         },
//         {
//           members: 7,
//           ChipColor: 'info',
//           chipText: 'Designer',
//           title: 'UI Designer',
//           avatar: '/images/icons/project-icons/figma-label.png'
//         },
//         {
//           members: 289,
//           ChipColor: 'error',
//           chipText: 'Developer',
//           title: 'Vue.js Developers',
//           avatar: '/images/icons/project-icons/vue-label.png'
//         },
//         {
//           members: 24,
//           chipText: 'Marketing',
//           ChipColor: 'secondary',
//           title: 'Digital Marketing',
//           avatar: '/images/icons/project-icons/twitter-label.png'
//         }
//       ]
//     }
//   }

//   return {
//     props: {
//       data,
//       tab: params?.tab
//     }
//   }
// }

export default UserProfileTab
