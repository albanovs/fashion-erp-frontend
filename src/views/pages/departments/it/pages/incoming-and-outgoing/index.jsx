import { NavLink } from "react-router-dom"

function IncomingAndOutgoing() {

    return (
        <>
            <div className="grid lg:grid-cols-[500px] gap-4">
                <NavLink to='/outgoing' className="lg:px-20 px-2 py-2 bg-white dark:bg-gray-700 rounded-md flex items-center gap-3 shadow-md">Расходы</NavLink>
                <NavLink to='/outgoing-archive' className="lg:px-20 px-2 py-2 bg-white dark:bg-gray-700 rounded-md flex items-center gap-3 shadow-md">Расходы архив</NavLink>
                <NavLink to='/ingoing' className="lg:px-20 px-2 py-2 bg-white dark:bg-gray-700 rounded-md flex items-center gap-3 shadow-md">Приходы</NavLink>
                <NavLink to='/ingoing-archive' className="lg:px-20 px-2 py-2 bg-white dark:bg-gray-700 rounded-md flex items-center gap-3 shadow-md">Приходы архив</NavLink>
            </div>
        </>
    )
}

export default IncomingAndOutgoing