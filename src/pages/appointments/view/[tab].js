// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import UserViewPage from './UserViewPage'

const UserView = ({ tab, invoiceData }) => {
  return <UserViewPage tab={tab} invoiceData={invoiceData} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'account' } },

      // { params: { tab: 'security' } },
      // { params: { tab: 'billing-plan' } },
      // { params: { tab: 'notification' } },
      // { params: { tab: 'connection' } }
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  // const res = await axios.get('/apps/invoice/invoices')
  const invoiceData = []

  return {
    props: {
      invoiceData,
      tab: params?.tab
    }
  }
}

export default UserView
