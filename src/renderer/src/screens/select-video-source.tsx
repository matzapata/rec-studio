import { JSX } from 'react'

export default function SelectVideoSource(): JSX.Element {
  return (
    <>
      <header className="h-20 bg-transparent flex items-end pb-3 px-4 border-b">
        <h1 className="font-medium text-slate-700">New recording</h1>
      </header>
      <div className="bg-slate-50 h-full py-4 px-4 space-y-2">
        <div>
          <label className="block mb-2 text-xs font-medium text-gray-800">Layout</label>
          <select className="appearance-none custom-select-icon bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
            <option selected>Only screen</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs font-medium text-slate-700">Video source</label>
          <select className="appearance-none custom-select-icon bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option selected>Only screen</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs font-medium text-slate-700">Camera</label>
          <select className="appearance-none custom-select-icon bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option selected>Only screen</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-xs font-medium text-slate-700">Audio</label>
          <select className="appearance-none custom-select-icon bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option selected>Only screen</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div className='py-4'>
          <button className="text-center py-3 w-full bg-[#5538F5] text-sm text-white rounded-md">
            Start recording
          </button>
        </div>
      </div>
    </>
  )
}
