import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Quill from "../../components/Quill";

const Create: NextPage = () => {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleCreate = async () => {
    const categorys = category.split(" ");
    const categorysArr: { name: string }[] = [];
    categorys.forEach((item) => {
      const obj = { name: item };
      categorysArr.push(obj);
    });
    await axios.post("http://localhost:8000/api/blog", {
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
      <div className="alignment">
        <h4>Tiêu đề</h4>
        <input
          type="text"
          placeholder="title ..."
          className="w-full p-2 border border-gray-800 rounded-lg mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h4 className="mt-5">Mô tả</h4>
        <textarea
          rows={5}
          placeholder="description ..."
          className="w-full p-2 border border-gray-800 rounded-lg mt-2"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <h4>Category</h4>
        <input
          type="text"
          placeholder="category ..."
          className="w-full p-2 border border-gray-800 rounded-lg mt-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Quill content={content} setContent={setContent} />
        <div className="flex items-center justify-center">
          <button
            className="text-base text-white bg-cyan-500 p-3 rounded-lg mt-5"
            onClick={handleCreate}
          >
            Tạo blog
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
