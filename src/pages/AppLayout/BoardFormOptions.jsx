const BoardFormOptions = ({ title, onRestore, onDelete }) => {
  return (
    <div className="h-[calc(100%-48px)] p-3 overflow-x-auto bg-[url(/background.jpg)] bg-cover bg-center flex justify-center items-center">
      <div className="bg-white min-w-[600px] min-h-[236px] flex flex-col gap-8 text-center p-8">
        <h1 className="text-2xl font-bold">{title} đã được đóng lại.</h1>
        <button
          className="bg-blue-700 w-fit h-fit mx-auto px-2 py-1 rounded-md text-white hover:bg-blue-800"
          onClick={onRestore}
        >
          Mở lại bảng
        </button>
        <button className="text-blue-700 font-bold" onClick={onDelete}>
          Xóa bảng vĩnh viễn
        </button>
      </div>
    </div>
  )
}

export default BoardFormOptions
