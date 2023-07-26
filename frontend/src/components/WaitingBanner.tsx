import React from "react"

export default function WaitingBanner() {
  return (
    <>
      <div className="mx-auto max-w-md rounded-lg bg-white shadow">
        <div className="p-4">
          <h3 className="text-xl font-medium text-gray-900">
            Migrating to Sailboat UI
          </h3>
          <p className="mt-1 text-gray-500">
            Sailboat UI is a modern UI component library for Tailwind CSS. Get
            started with 150+ open source components.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        <button
          type="button"
          className="border-primary-500 bg-primary-500 hover:border-primary-700 hover:bg-primary-700 focus:ring-primary-200 disabled:border-primary-300 disabled:bg-primary-300 rounded-full border px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all focus:ring disabled:cursor-not-allowed"
        >
          Button text
        </button>
      </div>
    </>
  )
}
