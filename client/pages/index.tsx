import axios from "axios";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BlogItem from "../components/BlogItem";
import { listBlogs } from "../redux/slice/blogSlice";

interface IPropsData {
  id: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  slug: string;
  view: number;
  createdAt?: string;
  updatedAt?: string;
}
interface IBlog {
  data: IPropsData[];
  success: Boolean;
}
interface IProps {
  list: IBlog;
}
export default function Home(props: IProps) {
  const { data } = props.list;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState<IPropsData[]>([]);
  useEffect(() => {
    dispatch(listBlogs(data));
    setBlogs(data);
  }, [data]);

  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>

      <div className="alignment">
        {data.length > 0 && (
          <>
            {blogs?.map((blog) => (
              <BlogItem data={blog} key={blog.id} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get("http://localhost:8000/api/blog");
  return {
    props: { list: res.data },
  };
};
