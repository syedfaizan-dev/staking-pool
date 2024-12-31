export default function Card({children}: { children: React.ReactNode }) {
    return (
        <div className="w-auto p-6 bg-zinc-900 rounded space-y-3 text-white">
            {children}
        </div>
    );
}