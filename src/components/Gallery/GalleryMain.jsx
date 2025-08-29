import React from "react";
import Gallery from "./Gallery";
import ScrollAnimatedSection from "../ScrollAnimatedSection";
import ViewModal from "../ViewModal";

const GalleryMain = () => {
  return (
    <div className="px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44">
      <ScrollAnimatedSection id="gallery" direction="right">
        <Gallery />
      </ScrollAnimatedSection>
      <ViewModal />
    </div>
  );
};

export default GalleryMain;
