import { ChangeEvent } from "react";

type SearchBarProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  getCoords: (e: any) => void; // As to be change ------------------------------------------------ <<<<<<<<
  isLoading: boolean;
};

export default function SearchBar({
  handleChange,
  getCoords,
  isLoading,
}: SearchBarProps) {
  return (
    <form className="flex flex-col md:flex-row justify-center items-center content-around gap-2">
      <input
        type="text"
        id="first_name"
        onChange={(e) => handleChange(e)}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-3/4"
      />
      <button
        type="submit"
        onClick={(e) => getCoords(e)}
        disabled={isLoading}
        className="max-w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button>
    </form>
  );
}
