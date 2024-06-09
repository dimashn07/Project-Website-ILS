'use client'
import { useRouter } from "next/navigation";

export function FormSebaranWilayah({ 
    handleSimpanClick, 
    wilayah, setWilayah, 
    alamat, setAlamat, 
    latitude, setLatitude,
    longitude, setLongitude,
    maps, setMaps
 }){
    const router = useRouter();

    const handleKembaliClick = () => {
        router.push('/admin/pelaksana');
    };

    return (
        <form className="flex max-w-7xl flex-col" onSubmit={handleSimpanClick}>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Wilayah
                </label>
                <input
                    type="text" id="wilayah" name="wilayah" 
                    value={wilayah} onChange={(e) => setWilayah(e.target.value)}
                    placeholder="cth: Kota Bandar Lampung" required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Alamat Lengkap
                </label>
                <textarea 
                    id="alamat" name="alamat" 
                    value={alamat} onChange={(e) => setAlamat(e.target.value)}  
                    placeholder="cth: Jalan Pulau Damar No. 37 Way Dadi, Kec. Sukarame, Kota Bandar Lampung, Lampung 35131, Indonesia" required
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                </textarea>
            </div>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Latitude
                </label>
                <input
                    type="text" id="latitude" name="latitude" 
                    value={latitude} onChange={(e) => setLatitude(e.target.value)} 
                    placeholder="cth: -5.3777803479146895" required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Longitude
                </label>
                <input
                    type="text" id="longitude" name="longitude" 
                    value={longitude} onChange={(e) => setLongitude(e.target.value)} 
                    placeholder="cth: 105.28905425428589" required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="mb-5">
                <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Link Google Maps
                </label>
                <input
                    type="text" id="maps" name="maps" 
                    value={maps} onChange={(e) => setMaps(e.target.value)} 
                    placeholder="cth: https://maps.app.goo.gl/WHK6kbp59EZ2gQCy9" required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
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
