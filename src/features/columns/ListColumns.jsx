import Column from './Column'

const ListColumn = ({ columns }) => {
  return (
    <div className="flex gap-4">
      {columns.map((column) => (
        <Column key={column._id} column={column} />
      ))}
    </div>
  )
}

export default ListColumn
