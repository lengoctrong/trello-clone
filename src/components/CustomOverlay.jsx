import { DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
const dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {}
  })
}

const CustomOverlay = ({ children }) => {
  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
  )
}

export default CustomOverlay
