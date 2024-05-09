import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const CardActionForm = ({ open, onOpen }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => onOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="absolute inset-0 bg-black opacity-50" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Card Actions
            </Dialog.Title>
            <div className="mt-2 flex flex-row">
              <div className="w-1/2 space-y-4">
                <textarea className="w-full h-20 p-2 border rounded"></textarea>
                <button className="w-full py-2 px-4 bg-blue-500 text-white rounded">
                  Save
                </button>
              </div>
              <div className="w-1/2 space-y-4">
                <button className="w-full py-2 px-4 border rounded">
                  Open Card
                </button>
                <button className="w-full py-2 px-4 border rounded">
                  Edit Label
                </button>
                <button className="w-full py-2 px-4 border rounded">
                  Change Member
                </button>
                <button className="w-full py-2 px-4 border rounded">
                  Change Cover
                </button>
                <button className="w-full py-2 px-4 border rounded">
                  Edit Date
                </button>
                <button className="w-full py-2 px-4 border rounded">
                  Move
                </button>
                <button className="w-full py-2 px-4 border rounded">
                  Copy
                </button>
                <button className="w-full py-2 px-4 border rounded">
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CardActionForm
