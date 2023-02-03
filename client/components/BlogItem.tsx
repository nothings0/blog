import React from "react";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

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
  Categories?: { name?: string }[];
}
interface IProps {
  data: IPropsData;
  handleRemove?: (id: string) => Promise<void>;
}

const BlogItem = ({ data, handleRemove }: IProps) => {
  const router = useRouter();
  return (
    <div
      className="group p-3 mt-4 bg-white rounded-lg border border-zinc-300 hover:shadow-md hover:shadow-zinc-500 transition duration-150 ease-out"
      key={data.id}
    >
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="flex gap-2">
            <img src="./eye-solid.svg" alt="" className="w-4 opacity-80" />
            <span>{data.view} views</span>
          </div>
          <div className="border-l border-zinc-500 pl-2">
            {moment(data.createdAt, "YYYYMMDD").fromNow()}
          </div>
        </div>
        {router.pathname === "/admin" && (
          <div className="flex gap-2">
            <Link href={`/create/${data.slug}`}>
              <div className="cursor-pointer px-3 hover:bg-slate-300 rounded-lg">
                Edit
              </div>
            </Link>
            <div
              className="cursor-pointer px-3 hover:bg-red-600 hover:text-white rounded-lg"
              onClick={() => handleRemove?.(data.slug)}
            >
              X
            </div>
          </div>
        )}
      </div>
      <Link href={`/blog/${data.slug}`} key={data.id}>
        <h2 className="text-2xl capitalize font-medium py-4 group-hover:text-sky-700 cursor-pointer">
          {data.title}
        </h2>
      </Link>
      <p className="text-base pb-3">{data.description}</p>
      <div className="flex gap-2">
        {data.Categories?.map((item, index) => (
          <Link key={index} href={`/t/${item.name}`}>
            <span className="p-1 cursor-pointer hover:bg-sky-200/60 rounded border hover:border-sky-600 text-xs">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogItem;
