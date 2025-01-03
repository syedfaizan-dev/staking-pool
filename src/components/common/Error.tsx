"use client";

export default function Error({ error }: { error: string | undefined }) {
    return (
        error && (
            <div className="mt-5 p-4 border border-red-400 bg-zinc-800 text-red-400 rounded">
                <p className="text-sm">{error}</p>
            </div>
        )
    );
}
