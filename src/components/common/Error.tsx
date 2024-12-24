"use client";

export default function Error({ error }: { error: string | undefined }) {
    return (
        error && (
            <div className="mt-5 p-4 border border-red-500 bg-red-50 text-red-800 rounded">
                <p className="text-sm">{error}</p>
            </div>
        )
    );
}
