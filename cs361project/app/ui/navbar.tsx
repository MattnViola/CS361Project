import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <div className="h-[30px] flex justify-end items-start space-x-4">
      <Link href="/portfolio">
        <div className="px-3 py-1 bg-[#0000ff] rounded-tl rounded-tr border-b border-[#303030] flex justify-center items-center">
          <div className="text-[#f2f2f2] text-base font-normal font-['Inter'] leading-snug">
            Portfolio
          </div>
        </div>
      </Link>
      <Link href="/portfolio">
        <div className="px-3 py-1 rounded-tl rounded-tr flex justify-center items-center">
          <div className="text-[#0000ff] leading-snug">
            <Image src="/usericon.png" alt="User Icon" width={24} height={24} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
