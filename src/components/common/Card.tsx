export default function Card({children, className}: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`w-auto p-6 bg-zinc-900 rounded space-y-3 text-white ${className}`}>
            {children}
        </div>
    );
}