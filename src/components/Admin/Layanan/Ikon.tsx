import { useRouter, usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
// import { Tooltip } from 'react-tooltip';

export default function LayananAdmin() {
    const router = useRouter();
    const pathname = usePathname();

    const navigateToService = () => {
        router.push('/admin/layanan');
    };

    const isLayananPage = pathname === '/admin/layanan';

    if (isLayananPage) {
        return null;
    }

    return (
        <>
            <div className="fixed bottom-20 right-8 z-[100]">
                <div
                    onClick={navigateToService}
                    aria-label="user service"
                    data-tooltip-id="user-service-tooltip"
                    data-tooltip-content="Layanan"
                    data-tooltip-place="top"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                >
                    <FaUser className="h-6 w-6" />
                </div>
            </div>
            {/* <Tooltip
                id="user-service-tooltip"
                style={{ backgroundColor: "#A3DA22", color: "#222" }}
            /> */}
        </>
    );
}
