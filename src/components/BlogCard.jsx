import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from "@/assets/images/user.png";
import moment from "moment";
import { Link } from "react-router-dom";
import { RouteBlogDetails } from "@/helpers/RouteName";
import verifiedImg from "@/assets/images/verified.png";
const BlogCard = ({ props }) => {
  const user = useSelector((state) => state.user);
  if (!props) return null;
  if (!props.author) return null;
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      <Card className="pt-5">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center gap-2">
              <div className="relative w-10 h-10">
                <Avatar className="cursor-pointer border w-10 h-10">
                  <AvatarImage
                    src={props.author.avatar || usericon}
                    alt="User"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover border-2 rounded-full ${
                      props.author.role === "admin" ? "border-blue-400" : ""
                    }`}
                    onError={(e) => {
                      console.error("Image failed to load:", e);
                      e.currentTarget.src = usericon;
                    }}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                {props.author.role === "admin" && (
                  <img
                    src={verifiedImg}
                    alt="verified"
                    className="absolute bottom-0 -right-1 w-[18px]"
                  />
                )}
              </div>

              <span>{props.author.name}</span>
            </div>
            {props.author.role === "admin" && (
              <Badge variant="outline" className="bg-violet-500">
                Admin
              </Badge>
            )}
          </div>

          <div className="my-2">
            <img src={props.featuredImage} className="rounded" />
          </div>
          <div>
            <p className="flex items-center gap-2 mb-2">
              <FaRegCalendarAlt />
              <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
            </p>
            <h2 className="text-2xl font-bold line-clamp-2">{props.title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
