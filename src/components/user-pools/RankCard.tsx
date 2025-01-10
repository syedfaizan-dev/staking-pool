import { FaCrown, FaExclamationCircle, FaMedal, FaStar } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";

export default function RankCard({ rankNo }: { rankNo: number | unknown }) {
    const rankStyles = {
        base: "flex items-center space-x-2 p-2 rounded-md shadow-sm",
        basic: "text-gray-400 bg-gray-800",
        gold: "text-yellow-400 bg-yellow-900",
        diamond: "text-blue-300 bg-blue-900",
        loading: "text-yellow-400 bg-yellow-800",
    };

    if (rankNo == 0) {
        return (
            <div className={`${rankStyles.base} ${rankStyles.basic}`}>
                <FaMedal size={20} />
                <p className="font-semibold">Rank: Basic</p>
            </div>
        );
    } else if (rankNo == 1) {
        return (
            <div className={`${rankStyles.base} ${rankStyles.gold}`}>
                <FaStar size={20} />
                <p className="font-semibold">Rank: Gold</p>
            </div>
        );
    } else if (rankNo == 2) {
        return (
            <div className={`${rankStyles.base} ${rankStyles.diamond}`}>
                <FaCrown size={20} />
                <p className="font-semibold">Rank: Diamond</p>
            </div>
        );
    } else {
        return (
            <div className={`${rankStyles.base} ${rankStyles.loading}`}>
                <TbLoader2 className="animate-spin" size={20} />
                <p className="font-semibold">Loading...</p>
            </div>
        );
    }
}
