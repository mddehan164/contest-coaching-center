import MainBtn from "./MainBtn";
import ScrollAnimatedSection from "./ScrollAnimatedSection";

const Hero = ({ data }) => {
  return (
    <div className="w-full h-36 sm:h-44 md:h-52 lg:h-60 2xl:h-64 flex items-center justify-between">
      <div className=" w-[60%] lg:w-[50%] h-full no-scrollbar overflow-y-auto">
        <ScrollAnimatedSection id="texts" direction="left">
          <div className="space-y-2">
            <h1
              className={`text-base md:text-xl lg:text-2xl xl:text-3xl font-semibold ${data.color} lg:mt-8`}
            >
              {data.data.title}
            </h1>
            <h2 className="text-sm md:text-lg text-gray-600">
              {data.data.subtitle}
            </h2>
            <p className="text-sm 2xl:text-lg mt-1 text-gray-400">
              {data.data.des}
            </p>
            {data.btn &&
              data.btnData.btnName.map((name, idx) => (
                <MainBtn
                  key={idx}
                  data={name}
                  btnStyle={data.btnData.btnStyle}
                />
              ))}
          </div>
        </ScrollAnimatedSection>
      </div>
      <div className="w-[40%] flex justify-end items-end">
        <ScrollAnimatedSection id="img" direction="right">
          <img
            src={data.img}
            alt="hero"
            className="w-full h-auto sm:w-[80%] lg:w-[85%] xl:w-[70%] 2xl:w-[60%]"
            loading="lazy"
          />
        </ScrollAnimatedSection>
      </div>
    </div>
  );
};

export default Hero;
