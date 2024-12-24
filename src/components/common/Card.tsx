export default function Card({children}: { children: React.ReactNode }) {
    return (
        <div className="w-auto p-6 bg-white border rounded">
            {children}
        </div>
    );
}