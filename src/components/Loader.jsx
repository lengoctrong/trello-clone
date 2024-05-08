import { Spinner } from '@material-tailwind/react'

const initalSpinnerClassname = 'h-12 w-12'

const Loader = ({ className, children, spinnerClassname, ...props }) => {
  const spinnerContainerProps = {
    className,
    children
  }

  const spinnerProps = {
    className: `${initalSpinnerClassname} ${spinnerClassname}`,
    ...props
  }

  return (
    <div {...spinnerContainerProps} className={className}>
      <Spinner color="blue" {...spinnerProps} />
      {<p>Đang tải...</p> || children}
    </div>
  )
}

export default Loader
