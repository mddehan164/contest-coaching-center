import Gallery from "./Gallery";
import ScrollAnimatedSection from "../ScrollAnimatedSection";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

const GalleryMain = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_IMAGE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/photo-gallery");
      if (response.data.success) {
        const formattedImages = response.data.data.photos.map((photo) => ({
          id: photo.id,
          category: photo.category,
          src: `${BASE_IMAGE_URL}/${photo.image}`,
          status: photo.status,
          created_at: photo.created_at,
          creator: photo.creator,
          image_path: photo.image,
        }));
        setImages(formattedImages);
      }
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44">
      <ScrollAnimatedSection id="gallery" direction="right">
        <Gallery galleryData={images} loading={loading} />
      </ScrollAnimatedSection>
    </div>
  );
};

export default GalleryMain;
