import { RIGHT_DRAWER_TYPES } from '~/utils/constants'
import { ActivityDrawer } from './ActivityDrawer'
import { ArchiveDrawer } from './ArchiveDrawer'
import { ChangeBgDrawer } from './ChangeBgDrawer'
import { CloseDrawer } from './CloseDrawer'
import { CopyDrawer } from './CopyDrawer'
import { FollowDrawer } from './FollowDrawer'
import { InfoDrawer } from './InfoDrawer'
import { SettingsDrawer } from './SettingsDrawer'
import { TagsDrawer } from './TagsDrawer'

const drawerComponents = {
  [RIGHT_DRAWER_TYPES.INFO]: InfoDrawer,
  [RIGHT_DRAWER_TYPES.SETTINGS]: SettingsDrawer,
  [RIGHT_DRAWER_TYPES.ACTIVITY]: ActivityDrawer,
  [RIGHT_DRAWER_TYPES.ARCHIVE]: ArchiveDrawer,
  [RIGHT_DRAWER_TYPES.FOLLOW]: FollowDrawer,
  [RIGHT_DRAWER_TYPES.COPY]: CopyDrawer,
  [RIGHT_DRAWER_TYPES.CLOSE]: CloseDrawer,
  [RIGHT_DRAWER_TYPES.TAGS]: TagsDrawer,
  [RIGHT_DRAWER_TYPES.CHANGE_BG]: ChangeBgDrawer
}

export const SubRightDrawer = ({ type }) => {
  const DrawerComponent = drawerComponents[type] || InfoDrawer
  return <DrawerComponent />
}
