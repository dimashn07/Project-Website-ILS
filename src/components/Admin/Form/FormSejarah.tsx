'use client'
import { useRouter } from "next/navigation";

export function FormSejarah({ handleSimpanClick, deskripsi, setDeskripsi }) {
    const router = useRouter();

    const handleKembaliClick = () => {
        router.push('../');
    };

    return (
        <form className="flex max-w-7xl flex-col" onSubmit={handleSimpanClick}>
            <div className="relative z-0 w-full mb-5 group">
                <textarea 
                    id="deskripsi" name="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Masukkan paragraf"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                </textarea>
            </div> 
            <div className="flex justify-end justify-items-center">
                <span onClick={handleKembaliClick} className=" cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-500 text-gray-700 border-gray-600 hover:bg-gray-300 hover:border-gray-600 focus:ring-gray-700">
                    Kembali
                </span>
                <button type="submit" className=" cursor-pointer dark:text-gray-900 dark:bg-white border dark:border-gray-300 dark:focus:outline-none dark:hover:bg-gray-100 dark:focus:ring-4 dark:focus:ring-gray-100 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700">
                    Simpan
                </button>
          </div>
        </form>
    );
}
