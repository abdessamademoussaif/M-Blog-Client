import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo-white.png";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteIndex,
  RouteUser,
} from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEvn } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);
  const { data: categoryData } = useFetch(
    `${getEvn("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <Sidebar>
      <SidebarHeader className="bg-white ">
        <img src={logo} width={120} />
      </SidebarHeader>
      <SidebarContent className="bg-white dark:bg-[hsl(var(--background))]">
        <SidebarGroup>
          <SidebarMenu>
            <Link to={RouteIndex}>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <IoHomeOutline />
                  Home
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>

            {user && user.isLoggedIn ? (
              <>
                <Link to={RouteBlog}>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <GrBlog />
                      Blogs
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
                <Link to={RouteCommentDetails}>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FaRegComments />
                      Comments
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              </>
            ) : (
              <></>
            )}
            {user && user.isLoggedIn && user.user.role === "admin" ? (
              <>
                <Link to={RouteCategoryDetails}>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <BiCategoryAlt />
                      Categories
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
                <Link to={RouteUser}>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <LuUsers />
                      Users
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              </>
            ) : (
              <></>
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categoryData &&
              categoryData.category.length > 0 &&
              categoryData.category.map((category) => (
                <Link to={RouteBlogByCategory(category.slug)} key={category._id}>
                  <SidebarMenuItem >
                    <SidebarMenuButton>
                      <GoDot />

                      {category.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
