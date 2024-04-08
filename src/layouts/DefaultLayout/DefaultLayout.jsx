import Header from '../components/Header'
const DefaultLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen ">
      <Header />
      {children}
    </div>
  )
}

export default DefaultLayout
