import { Drawer } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { RIGHT_DRAWER_TYPES } from '~/utils/constants'
import { closeAllRightDrawer, closeSubRightDrawer } from '../rightDrawerSlice'
import { ActivityDrawer } from './ActivityDrawer'
import { ArchiveDrawer } from './ArchiveDrawer'
import { ChangeBgDrawer } from './ChangeBgDrawer'
import { InfoDrawer } from './InfoDrawer'
import { SettingsDrawer } from './SettingsDrawer'
import { TagsDrawer } from './TagsDrawer'

const drawerComponents = {
  [RIGHT_DRAWER_TYPES.INFO]: InfoDrawer,
  [RIGHT_DRAWER_TYPES.SETTINGS]: SettingsDrawer,
  [RIGHT_DRAWER_TYPES.ACTIVITY]: ActivityDrawer,
  [RIGHT_DRAWER_TYPES.ARCHIVE]: ArchiveDrawer,
  [RIGHT_DRAWER_TYPES.TAGS]: TagsDrawer,
  [RIGHT_DRAWER_TYPES.CHANGE_BG]: ChangeBgDrawer
}

export const SubRightDrawer = () => {
  const { type, isShowSubDrawer } = useSelector((state) => state.rightDrawer)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closeAllRightDrawer())
  }

  const handleBack = () => {
    dispatch(closeSubRightDrawer(type))
  }

  const Component = drawerComponents[type] || InfoDrawer
  return (
    <Drawer
      overlay={false}
      placement="right"
      open={isShowSubDrawer}
      // onClose={handleClose}
      className="p-4"
    >
      <Component onBack={handleBack} onClose={handleClose} />
    </Drawer>
  )
}
