// import AdminLogin from './AdminLogin'
import ThemeProvider from '../../components/ThemeProvider'
// import Dashboard from './Dashboard'

function AdminLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export default AdminLayout
