import PartnershipMenu from "./brandsData";

const Kerjasama = () => {
  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="rounded-sm px-8 py-8 bg-gray-light dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              <h2 className="mb-10 text-2xl font-bold text-center text-gray-800 dark:text-white">
                Kerjasama Inisiatif Lampung Sehat
              </h2>
              <div className="flex flex-wrap items-center justify-center">
                <PartnershipMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Kerjasama;
