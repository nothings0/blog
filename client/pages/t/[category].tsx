import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import axios from "axios";
import BlogItem from "../../components/BlogItem";

interface IPropsData {
  name: string;
}
interface IProps {
  blog: { data: { Blogs: IBlog[] } };
}
interface IBlog {
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

const Category: NextPage<IProps> = (props) => {
  const blogs = props?.blog?.data.Blogs;

  return (
    <div className="alignment">
      {blogs?.map((item) => (
        <BlogItem data={item} key={item.id} />
      ))}
    </div>
  );
};

export default Category;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category;
  const res = await axios.get(
    `http://localhost:8000/api/blog/category?type=${category}`
  );

  return {
    props: {
      blog: res.data,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("http://localhost:8000/api/category");
  const paths = res.data.data.map((cate: IPropsData) => {
    return {
      params: { category: `${cate.name}` },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};
