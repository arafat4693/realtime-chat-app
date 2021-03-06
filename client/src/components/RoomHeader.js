import { LogoutIcon } from "@heroicons/react/solid"
import { useDispatch, useSelector } from "react-redux"
import { leaveRoom } from "../slices/roomSlice"
import Avatar from "./Avatar"
import ResIcons from "./ResIcons"

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function RoomHeader({ currentRoom, user }) {
    const { allUsers } = useSelector(state => state.users)
    const roomUsers = allUsers.filter(u => currentRoom?.members.includes(u._id) && u._id !== user._id)
    const dispatch = useDispatch()

    function leaveARoom() {
        dispatch(leaveRoom(currentRoom._id))
    }

    return (
        <header className="absolute top-0 left-0 w-full sm:py-8 py-6 sm:px-20 px-10 bg-gray-900 flex justify-between items-center">
            <div className="flex sm:items-center sm:gap-6 sm:flex-row flex-col">
                <h2 className="capitalize text-gray-300 text-2xl">
                    <span className="mr-4">#</span>
                    {currentRoom?.roomName}
                </h2>

                <p className="text-gray-600 text-lg">Room Id: {currentRoom?._id}</p>
            </div>

            <div className="members flex items-center gap-4 sm:gap-2">
                {roomUsers.slice(0, roomUsers.length >= 3 ? 3 : roomUsers.length).map(u => <Avatar key={u._id} image={u.imageUrl ? u.imageUrl : defaultImage} customStyle="w-9 h-9 hidden lg:block" />)}
                {roomUsers?.length ? <div className="w-9 h-9 bg-gray-800 rounded-xl text-gray-400 text-base hidden items-center justify-center lg:flex">{roomUsers.length}</div> : null}
                <ResIcons />
                <div className="w-9 h-9 bg-gray-700 rounded-xl text-base flex items-center justify-center">
                    <LogoutIcon className="w-6 h-6 fill-gray-300 cursor-pointer" onClick={leaveARoom} />
                </div>
            </div>
        </header>
    )
}
