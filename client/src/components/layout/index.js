import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'

import UserHeader from '../business/UserHeader'
import Tabs from '../design/Tabs'

const drawerWidth = 400

const Layout = ({ children, tabs, current, onChangeTab, onProfileClick }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}>
        <UserHeader onClick={onProfileClick} />
        {tabs && (
          <Tabs
            tabs={[{ label: 'catches' }, { label: 'catessages' }]}
            current={current}
            onChange={onChangeTab}
          />
        )}
        {tabs?.[current]}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout
