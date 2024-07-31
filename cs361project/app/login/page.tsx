import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[763px] h-auto px-[106px] py-16 flex flex-col justify-start items-center gap-[22px]">
        <div className="w-full h-auto flex flex-col justify-between items-center">
          <div className="w-full text-black text-7xl font-normal font-['Lancelot'] leading-[86.40px] text-center">
            Stock Market Simulator
          </div>
          <div className="text-center text-black text-base font-normal font-['Inter'] leading-snug mt-4">
            Ever wonder if you can beat the market? Find out here.
          </div>
        </div>
        <div className="w-full max-w-xs flex flex-col justify-start items-center gap-4">
          <div className="w-full px-4 py-3 bg-white rounded-lg border border-[#d9d9d9] flex items-center">
            <input
              type="text"
              placeholder="Username"
              className="w-full text-[#1e1e1e] text-base font-normal font-['Inter'] bg-white border-none outline-none"
            />
          </div>
          <div className="w-full px-4 py-3 bg-white rounded-lg border border-[#d9d9d9] flex items-center">
            <input
              type="password"
              placeholder="Password"
              className="w-full text-[#1e1e1e] text-base font-normal font-['Inter'] bg-white border-none outline-none"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            <div className="p-3 bg-[#2c2c2c] rounded-lg border border-[#2c2c2c] flex items-center">
              <Link
                href="/portfolio"
                className="text-neutral-100 text-base font-normal font-['Inter'] leading-none"
              >
                Login
              </Link>
            </div>
            <div className="text-center">
              <span className="text-black text-sm font-normal font-['Inter'] leading-tight">
                Don’t have an account yet?{" "}
              </span>
              <Link
                href="/register"
                className="text-[#0000ff] text-sm font-normal font-['Inter'] leading-tight"
              >
                Register Here.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
