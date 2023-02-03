import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BlogItem from "../../components/BlogItem";

interface IPropsData {
  id: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  view: number;
}

const Query: NextPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/blog/search?q=${q}`
      );
      setData(res.data.data);
    };
    getData();
  }, [q]);

  return (
    <div className="alignment">
      {data.length > 0 ? (
        <>
          {data?.map((item: IPropsData) => (
            <BlogItem data={item} key={item.id} />
          ))}
        </>
      ) : (
        <div className="text-center">
          <p className="p-4 bg-white rounded-xl">Không có kết quả tìm kiếm</p>
        </div>
      )}
    </div>
  );
};

export default Query;
