import { closeIcon } from '~/icons'
import Button from './Button'
const FormAddNew = ({
  textAreaRows = 2,
  onSubmit,
  textAreaTitle = '',
  btnAddTitle = 'Thêm',
  setTitle,
  toggleAddForm,
  setToggleAddForm,
  icon = closeIcon,
  placeholder = '',
  className = ''
}) => {
  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={textAreaTitle}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        rows={textAreaRows}
        className={`w-full p-2 mt-2 bg-white rounded-md resize-none outline-blue-500 ${className}`}
        placeholder={placeholder}
      />
      <div className="flex items-center gap-1">
        <Button type="submit" primary>
          {btnAddTitle}
        </Button>
        <button
          className="hover:bg-slate-300 p-1"
          onClick={() => setToggleAddForm(!toggleAddForm)}
        >
          {icon}
        </button>
      </div>
    </form>
  )
}

export default FormAddNew
