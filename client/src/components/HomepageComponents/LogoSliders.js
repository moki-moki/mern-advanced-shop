import Logo1 from "../data/logo1";
import Logo2 from "../data/logo2";
import Logo3 from "../data/logo3";

const LogoSliders = () => {
  return (
    <div className="w-5/6 sm:w-full xsm:w-full m-auto my-10 overflow-hidden border-2 rounded-xl p-10">
      <div className="animate-slide w-[calc(140px*14)]  m-auto flex items-center justify-around">
        <Logo1 />
        <Logo2 />
        <Logo3 />
        <Logo1 />
        <Logo2 />
        <Logo3 />
        <Logo1 />
      </div>
    </div>
  );
};

export default LogoSliders;
