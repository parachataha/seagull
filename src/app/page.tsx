import getBlogs from "@/actions/blogs/read/getBlogs";
import BlogCard from "@/components/cards/blog/BlogCard";
import UserCard from "@/components/cards/user/UserCard";
import Container from "@/components/layout/Container";
import Page from "@/components/layout/Page";
import { Label } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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

        <header className="pb-5 mb-5">
          <h1 className="text-2xl font-bold"> 
            Welcome back
          </h1>
          <p className="text-muted-foreground"> Unleash your imagination and creativity </p>
        </header> 

        {/* BLOGS SECTION */}
        <Label>Browse Blogs</Label>
        <div className="flex flex-wrap gap-2">
          {blogs.map(blog => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>

        {/* USER SECTION */}

        <Label className="mt-7">Browser Users</Label>
        <div className="flex flex-wrap gap-2">

          <UserCard
            name="Taha Paracha"
            slug="tahaparacha"
            avatarURL="a"
            label="Developer & Designer"
          />

          <UserCard
            name="Hannah Paracha"
            slug="hannahparacha"
            avatarURL="a"
            label="Psychology Student"
          />

        </div>

      </Container>
    </Page>
  );
}
