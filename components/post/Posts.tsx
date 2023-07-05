"use client";
import { ListState } from "@/context/CanvasContext";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { PostData } from "@/type/type";

interface Posts {
  data: PostData[];
  list: string;
}

const Posts: React.FC<Posts> = ({ data, list }) => {
  const { setLists } = ListState();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  console.log(postId);
  useEffect(() => {
    setLists(list, data);
  }, []);

  return (
    <React.Fragment>
      {postId ? (
        <Modal data={data} postId={postId} list={list.toLowerCase()}/>
      ) : (
        <React.Fragment>
          {data.map((item: PostData, index: number) => (
            <Link
              aria-label={item.post.title}
              key={item.id}
              shallow
              href={`/${list.toLowerCase()}?postId=${item.id}`}
              as={`/${list.toLowerCase()}/?postId=${item.id}`}
              className="md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] h-416 xl:h-512 rounded-md overflow-hidden relative shadow-2xl group"
            >
              <Image
                src={item.post.imageTitle.url}
                alt={item.post.title}
                fill
                sizes="(max-width: 640px) 100vw,
        (max-width: 1280px) 50%,
        (max-width: 1536px) 33%,
        25vw"
                style={{ objectFit: "cover" }}
                className="group-hover:blur-sm"
                placeholder="blur"
                loading={index < 4 ? "eager" : "lazy"}
                blurDataURL={item.post.imageTitle.blurDataURL}
              />
              <div className="absolute bottom-0 left-0 z-99 bg-white w-full p-16 duration-3000 transition-all max-h-[8rem] group-hover:max-h-[19rem] overflow-y-hidden">
                <h2 className="text-2xl text-purple font-bold text-center">
                  {item.post.title}
                </h2>
                <i className="text-lg text-black font-semibold text-center block">
                  {item.timestamp}
                </i>
                <p className="mt-16 text-md text-black font-regular break-all opacity-0 absolute max-line group-hover:relative group-hover:opacity-100">
                  {item.post.description1}
                </p>
              </div>
            </Link>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Posts;
