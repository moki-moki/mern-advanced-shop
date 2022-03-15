import { cards } from "../data/cardData";
const HomepageCards = () => {
  return (
    <div className="w-10/12 m-auto grid gap-2 grid-cols-4  md:w-full sm:w-full sm:grid-cols-2 sm:grid-rows-1 xsm:grid-cols-1 xsm:grid-rows-1 xsm:w-full">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-card-color p-3 mx-2 flex flex-col border-2 rounded-lg"
        >
          <div className="flex items-center ">
            <h2 className="mr-2 font-bold">{card.heading}</h2>
            <div className="text-xl text-sub-heading"> {card.icon}</div>
          </div>
          <div>
            <p>{card.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomepageCards;
