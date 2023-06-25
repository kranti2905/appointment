// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import UserProfile from './UserProfile'

const UserProfileTab = ({ tab, data }) => {
  return <UserProfile tab={tab} data={data} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'profile' } },
      { params: { tab: 'timeslot' } },
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const data = []

  return {
    props: {
      data,
      tab: params?.tab
    }
  }
}

export default UserProfileTab
