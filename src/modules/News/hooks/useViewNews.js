import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetOneNewsQuery } from "../../../rtk/newsApi/newsApi";

const useViewNews = () => {
  const { id } = useParams();
  
console.log("News ID:", id);


  const { data: newsData, isLoading, error } = useGetOneNewsQuery(id);

  const [news, setNews] = useState(null);

  useEffect(() => {
    if (newsData?.data) {
      const mappedNews = {
        titleEN: newsData.data.titleEN || "",
        titleAR: newsData.data.titleAR || "",
        contentEN: newsData.data.contentEN || "",
        contentAR: newsData.data.contentAR || "",
        video: newsData.data.video || null,
        photo: newsData.data.photo || null,
        images: Array.isArray(newsData.data.images) ? newsData.data.images : [],
        createdAt: newsData.data.createdAt || null,
        updatedAt: newsData.data.updatedAt || null,
      };
      setNews(mappedNews);
    } else {
      setNews(null);
    }
  }, [newsData]);

  return {
    news,
    isLoading,
    error,
  };
};

export default useViewNews;
