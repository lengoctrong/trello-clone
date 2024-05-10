import { closeIcon } from '~/icons'
import Button from './Button'
const FormAddNew = ({
  textAreaRows = 2,
  onSubmit,
  onKeyDown,
  textAreaTitle = '',
  btnAddTitle = 'Thêm',
  onChange,
  onClose,
  icon = closeIcon,
  placeholder = '',
  className = ''
}) => {
  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={textAreaTitle}
        onChange={onChange}
        onKeyDown={onKeyDown}
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
          type="submit"
          className="hover:bg-slate-300 p-1"
          onClick={(e) => onClose(e)}
        >
          {icon}
        </button>
      </div>
    </form>
  )
}

export default FormAddNew
