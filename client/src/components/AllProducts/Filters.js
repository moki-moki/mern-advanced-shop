import { checkbox, options } from "../data/dummyData";

const Filters = ({ toggleCat, filterParams, handleSort }) => {
  return (
    <div
      className={`w-1/6 m-2 z-10 h-fit bg-card-color border-2 border-p-primary rounded-md md:absolute md:-translate-x-full md:m-0 sm:-translate-x-full sm:m-0 sm:absolute sm:w-1/4 xsm:w-1/2 xsm:absolute xsm:-translate-x-full xsm:m-0
         ${toggleCat ? "md:-translate-x-0" : "md:-translate-x-full"} 
         ${toggleCat ? "sm:-translate-x-0" : "sm:-translate-x-full"} 
         ${toggleCat ? "xsm:-translate-x-0" : "xsm:-translate-x-full"} 
          `}
    >
      <h2
        className={`w-full p-3 text-xl border-b-2 border-p-primary ${
          toggleCat ? "sm:block" : "sm:hidden"
        } ${toggleCat ? "xsm:block" : "xsm:hidden"} `}
      >
        Category
      </h2>
      {checkbox.map((box) => (
        <div key={box.id}>
          <input
            className="mx-1 p-3 h-fit"
            type="checkbox"
            name={box.name}
            value={box.name.toLowerCase()}
            onChange={(e) => filterParams(e)}
          />
          <label htmlFor={box.name}>{box.name}</label>
        </div>
      ))}

      {/* SELECT */}
      <select
        defaultValue=""
        onChange={handleSort}
        className="p-1 my-2 mx-1 border-2 border-p-primary rounded-xl"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
