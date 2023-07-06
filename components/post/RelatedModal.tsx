import { PostData } from "@/type/type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

interface RelatedModal {
  data: PostData[];
  list: string;
}
const RelatedModal: React.FC<RelatedModal> = ({ data, list }) => {
  const [scroll, setScroll] = useState<number>(0);
  const [postsWidth, setPostsWidth] = useState<number>();

  // handle Resize and current size
  const handleResize = () => {
    const slider: HTMLElement | null = document.getElementById("related-posts");
    if (slider) {
      const sliderWidth = slider.scrollWidth;
      const unscrollWidth = slider.clientWidth;
      setPostsWidth(sliderWidth - unscrollWidth);
    }
  };

  useEffect(() => {
    // drag to scroll event
    const slider: HTMLElement | null = document.getElementById("related-posts");
    const children = document.querySelectorAll(".related-post");
    let isDown = false;
    let startX: any;
    let scrollLeft: any;
    slider?.addEventListener("mousedown", (e: any) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider?.addEventListener("mouseleave", () => {
      isDown = false;
      setTimeout(() => {
        slider.classList.remove("cursor-grab");
        children.forEach((element) => {
          element.classList.remove("pointer-events-none");
        });
      }, 100);
    });
    slider?.addEventListener("mouseup", (e: any) => {
      isDown = false;
      e.preventDefault();
      setTimeout(() => {
        slider.classList.remove("cursor-grab");
        children.forEach((element) => {
          element.classList.remove("pointer-events-none");
        });
      }, 100);
    });
    slider?.addEventListener("mousemove", (e: any) => {
      if (!isDown) return;
      children.forEach((element) => {
        element.classList.add("pointer-events-none");
      });
      slider.classList.add("cursor-grab");
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      setScroll(scrollLeft - walk);
    });

    // Add event listener for the resize event
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [data]);

  const movePosts = (direction: string) => {
    const slider: HTMLElement | null = document.getElementById("related-posts");
    const child = document.querySelectorAll(".related-post")[0];
    let scrollLeft = slider ? slider.scrollLeft : 0;
    if (slider) {
      if (direction === "back") {
        if (scrollLeft - 120 >= 0) {
          slider.scrollLeft = scrollLeft - 120;
          setScroll(scrollLeft - 120);
        } else {
          slider.scrollLeft = 0;
          setScroll(0);
        }
      } else {
        slider.scrollLeft = scrollLeft + 120;
        setScroll(scrollLeft + 120);
      }
    }
  };
  return (
    <React.Fragment>
      <h2 className="text-2xl text-black mt-16 md:mt-24 lg:mt-32 xl:mt-40 mb-16 font-bold">
        Related post:
      </h2>
      <div className="flex gap-16">
        <button
          className="w-16"
          onClick={() => movePosts("back")}
          disabled={scroll <= 0 && true}
        >
          <IoMdArrowBack
            className={`text-xl ${
              scroll <= 0 ? "text-gray/50" : "text-black"
            } transition `}
          />
        </button>
        <div
          id="related-posts"
          className="w-[calc(100%-64px)] flex gap-16 md:gap-24 flex-nowrap overflow-auto cursor-pointer hide-scroll transition-all"
        >
          {data.map((item: PostData, index: number) => (
            <Link
              aria-label={item.post.title}
              key={item.id}
              shallow
              href={`/${list.toLowerCase()}?postId=${item.id}`}
              as={`/${list.toLowerCase()}/?postId=${item.id}`}
              className="related-post flex-grow-0 flex-shrink-0 basis-full md:basis-[calc(50%-12px)] lg:basis-[calc(33.33%-16px)] h-256 xl:h-320 rounded-md overflow-hidden relative shadow-2xl"
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
                className="hover:blur-sm peer"
                placeholder="blur"
                loading={index < 4 ? "eager" : "lazy"}
                blurDataURL={item.post.imageTitle.blurDataURL}
              />
              <h2 className="transition text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold pointer-events-none invisible peer-hover:visible peer                                                            ">
                {item.post.title}
              </h2>
            </Link>
          ))}
        </div>
        <button
          className="w-16"
          onClick={() => movePosts("forward")}
          disabled={postsWidth !== undefined && scroll >= postsWidth && true}
        >
          <IoMdArrowForward
            className={`text-xl ${
              postsWidth !== undefined && scroll >= postsWidth
                ? "text-gray/50"
                : "text-black"
            }`}
          />
        </button>
      </div>
    </React.Fragment>
  );
};

export default RelatedModal;
