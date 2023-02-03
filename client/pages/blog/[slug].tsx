import axios from "axios";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import parse from "html-react-parser";
import Head from "next/head";

interface IPropsData {
  id: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
}
interface IProps {
  blog: IBlog;
}
interface IBlog {
  data: IPropsData;
  success: Boolean;
}
const Blog: NextPage<IProps> = (props) => {
  const { data } = props.blog;

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div className="alignment">
        <div className="bg-white px-4 py-6 rounded-lg">
          <h1 className="text-center text-3xl font-semibold capitalize py-4">
            {data.title}
          </h1>
          <div>{parse(data.content)}</div>
        </div>
      </div>
    </>
  );
};

export default Blog;

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
