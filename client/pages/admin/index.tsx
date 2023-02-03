import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import BlogItem from "../../components/BlogItem";
import type { RootState } from "../../redux/store";

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

const Index: NextPage = () => {
  const data: IPropsData[] = useSelector((state: RootState) => state.blog.list);
  const [list, setList] = useState(data);
  const router = useRouter();
  const handleRemove = async (slug: string) => {
    await axios.delete(`http://localhost:8000/api/blog/${slug}`);
    setList(list.filter((blog) => blog.slug !== slug));
    router.push("/admin");
  };
  return (
    <div className="alignment">
      {list.map((item) => (
        <BlogItem data={item} key={item.id} handleRemove={handleRemove} />
      ))}
    </div>
  );
};

export default Index;
