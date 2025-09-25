import error from "../../assets/images/not-available.wepb";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Stats = ({ stat }) => {
  const gradient = Array.isArray(stat?.backgroundGradient)
    ? stat?.backgroundGradient
    : [];
  const gradientStyle =
    gradient.length === 2
      ? {
          backgroundImage: `linear-gradient(to bottom right, ${gradient[0]}, ${gradient[1]})`,
        }
      : {};

  // fixed height for the card
  const cardHeight = "h-96 md:h-96 lg:h-96 xl:h-96";

  return (
    <div
      className={`flex flex-col items-center justify-start gap-4 p-4 bg-white shadow-md hover:shadow-xl border-t-4 border-headerColor rounded-md ${cardHeight}`}
    >
      <div
        className={`rounded-full w-32 h-32 md:w-40 md:h-40 lg:w-36 lg:h-36 flex items-center justify-center text-white font-semibold gap-2`}
        style={!stat?.img ? gradientStyle : {}}
      >
        {stat?.Icon ? (
          <stat.Icon className="w-16 h-16 text-white" />
        ) : (
          <img
            src={stat?.img ? `${BASE_URL}/${stat.img}` : error}
            alt={stat?.title || stat?.name}
            className="w-full h-full object-contain rounded-full border-2 border-headerColor"
            loading="lazy"
          />
        )}
      </div>

      <div>
        <h1 className="text-center font-bold text-lg md:text-xl lg:text-lg  w-full text-headerColor">
          {stat?.title || stat?.name || "No Title"}
        </h1>

        {!stat?.creator && (
          <h2 className="text-2xl md:text-3xl lg:text-2xl text-center">
            {stat?.count || "..."}
          </h2>
        )}

        {!stat?.creator && (
          <p className="text-sm text-justify px-2 overflow-auto max-h-20">
            {stat?.des || "..."}
          </p>
        )}

        {stat?.creator && (
          <>
            <h2 className="text-lg font-bold text-center text-contestRed">
              {stat?.rank || "..."}
            </h2>
            <p className="text-sm text-justify px-2 overflow-auto max-h-32">
              {stat?.description || "-"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Stats;
