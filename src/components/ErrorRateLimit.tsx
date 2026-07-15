
const ErrorRateLimit = () => {
    return (
        <div>
            <div className="flex-1 mt-6 p-8 flex flex-col items-center justify-center bg-white rounded-2xl border border-red-50 shadow-[0_2px_10px_-3px_rgba(239,68,68,0.1)] transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(239,68,68,0.1)]">

                <div className="relative flex items-center justify-center mb-4">
                    <div className="absolute w-12 h-12 bg-red-100 rounded-full animate-ping opacity-60"></div>

                    <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-red-50 rounded-full border border-red-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-red-500"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                </div>

                <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                    Rate Limit Reached
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1.5 text-center max-w-xs">
                    You're moving a little too fast. Please take a short breather and try again in a moment.
                </p>

            </div>
        </div>
    )
}

export default ErrorRateLimit