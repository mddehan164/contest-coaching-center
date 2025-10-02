import Hero from "../components/Hero";
import { branchHeroData } from "../data/branchData";
import BranchCard from "../components/BranchCard/BranchCard";
import MapLocation from "../components/MapLocation";
import ScrollAnimatedSection from "../components/ScrollAnimatedSection";
import { useBranches } from "../hooks/useBranch";

const Branches = () => {
  const {
    isLoading,
    isError,
    dataList,
    // selectedData,
  } = useBranches();

  return (
    <div className="px-1 sm:px-5 md:px-10 lg:px-20 2xl:px-44 mt-5">
      <ScrollAnimatedSection id="hero" direction="right">
        <Hero data={branchHeroData} />
      </ScrollAnimatedSection>
      <div className="mt-10">
        <ScrollAnimatedSection id="map" direction="left">
          <MapLocation />
        </ScrollAnimatedSection>
      </div>
      <div className="mt-10">
        <ScrollAnimatedSection id="branch" direction="right">
          <h1 className="text-lg md:text-xl lg:text-3xl font-semibold mb-5">
            Our Current Branches
          </h1>
          <BranchCard data={dataList} loading={isLoading} error={isError} />
        </ScrollAnimatedSection>
      </div>
    </div>
  );
};

export default Branches;
