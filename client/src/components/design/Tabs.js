import MUITabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function Tabs({ tabs = [], current = 0, onChange }) {

  const handleChange = (_, newValue) => {
    onChange(newValue)
  }

  return (
    <MUITabs value={current} onChange={handleChange} aria-label="basic tabs example" sx={{ marginLeft: 4 }}>
      {tabs.map((tab, index) => (
        <Tab key={tab.label} label={tab.label} {...a11yProps(index)} />
      ))}
    </MUITabs>
  )
}
