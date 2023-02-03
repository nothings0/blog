import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Quill from "../../components/Quill";
import { useRouter } from "next/router";

interface IPropsData {
  id: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  Categories: { name?: string }[];
}
interface IProps {
  blog: IBlog;
}
interface IBlog {
  data: IPropsData;
  success: Boolean;
}

const Edit: NextPage<IProps> = (props) => {
  const { data } = props.blog;
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const category = data.Categories.map((item) => item.name).join(" ");

    setContent(data.content);
    setTitle(data.title);
    setDescription(data.description);
    setCategory(category);
  }, []);

  const handleUpdate = async () => {
    const categorys = category.split(" ");
    const categorysArr: { name: string }[] = [];
    categorys.forEach((item) => {
      const obj = { name: item };
      categorysArr.push(obj);
    });
    await axios.put(`http://localhost:8000/api/blog/${data.slug}`, {
      title,
      content,
      thumbnail: "anh 1",
      description,
      categorys: categorysArr,
    });
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Tạo blog | XDev</title>
      </Head>
      <div className="mt-16 py-4 px-6">
        <h4>Tiêu đề</h4>
        <input
          type="text"
          placeholder="title..."
          className="w-full p-2 border border-gray-800 rounded-lg mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h4 className="mt-5">Mô tả</h4>
        <textarea
          rows={5}
          placeholder="description..."
          className="w-full p-2 border border-gray-800 rounded-lg mt-2"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <h4>Category</h4>
        <input
          type="text"
          placeholder="title..."
          className="w-full p-2 border border-gray-800 rounded-lg mt-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Quill content={content} setContent={setContent} />
        <div className="flex items-center justify-center">
          <button
            className="text-base text-white bg-cyan-500 p-3 rounded-lg mt-5"
            onClick={handleUpdate}
          >
            Tạo blog
          </button>
        </div>
      </div>
    </>
  );
};

export default Edit;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  const res = await axios.get(`http://localhost:8000/api/blog/${slug}`);

  return {
    props: {
      blog: res.data,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("http://localhost:8000/api/blog");
  const paths = res.data.data.map((post: IPropsData) => {
    return {
      params: { slug: `${post.slug}` },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};
