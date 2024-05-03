import { Spinner } from '@material-tailwind/react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen gap-4">
      <Spinner color="blue" className="h-12 w-12" />
      <p>Đang tải...</p>
    </div>
  )
}

export default Loader
