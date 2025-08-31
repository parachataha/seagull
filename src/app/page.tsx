import getBlogs from "@/actions/blogs/read/getBlogs";
import BlogCard from "@/components/cards/blog/BlogCard";
import UserCard from "@/components/cards/user/UserCard";
import Container from "@/components/layout/Container";
import FullPage from "@/components/layout/FullPage";
import Page from "@/components/layout/Page";
import { Button, LinkButton } from "@/components/ui/button";
import { Label } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRightIcon } from "lucide-react";

export default async function Home() {

  const blogsResult = await getBlogs()

  if (!blogsResult.success || !blogsResult.data) return (
    <Page>
      <Container className="w-full h-[90vh] flex items-center justify-center">
        Sorry, we had an issue fetching this page's data
      </Container>
    </Page>
  )

  const blogs = blogsResult.data.blogs;

  return (
    <Page>

      <Container>
        <header className="h-160 rounded-xl flex flex-col gap-3 items-center text-center justify-center p-3">
          <h1 className="text-5xl font-gelasio"> The Truth and The Truth Only. </h1>
          <p className="text-xl my-4"> Create your first blog today and share your knowledge with the world </p>
          <LinkButton 
            href="/signup" 
            variant="ghostBg"
            className="group"
          >
            Get started today
            {/* <ArrowRightIcon className="group-hover:translate-x-3 transition"/>  */}
          </LinkButton>
        </header> 

        {/* BLOGS SECTION */}
        <div className="flex flex-col items-center justify-between gap-2">

          <p className="text-sm text-foreground/50"> Check out current blogs </p>
          <div className="flex flex-wrap justify-center gap-2">
            {blogs.map(blog => (
              <BlogCard
                key={blog.id}
                blog={blog}
              />
            ))}
          </div>

          {/* <div className="mt-28">
            <h2 className="text-2xl"> An immersive blog and portfolio creator </h2>
          </div> */}

        </div>
      </Container>

    </Page>
  );
}
