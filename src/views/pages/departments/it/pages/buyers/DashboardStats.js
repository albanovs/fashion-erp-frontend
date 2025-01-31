import { CCard } from "@coreui/react"

function DashboardStats({ title, icon, value, description, colorIndex, color }) {

    const COLORS = ["primary", "primary"]

    const getDescStyle = () => {
        if (description.includes("↗︎")) return "font-bold text-green-700 dark:text-green-300"
        else if (description.includes("↙")) return "font-bold text-rose-500 dark:text-red-400"
        else return ""
    }

    return (
        <CCard className="">
            <div className="p-3">
                <div className={`stat-figure ${color ? color : 'text-blue-600'}  dark:${color ? color : `text-slate-300`} text-${COLORS[colorIndex % 2]}`}>{icon}</div>
                <div className="stat-title  dark:text-slate-300">{title}</div>
                <div className={`stat-value ${color ? color : 'text-blue-600'} dark:${color ? color : `text-slate-300`} text-${COLORS[colorIndex % 2]}`}>{value} {color ? 'сом' : ''}</div>
                <div className={"stat-desc  " + getDescStyle()}>{description}</div>
            </div>
        </CCard>
    )
}

export default DashboardStats