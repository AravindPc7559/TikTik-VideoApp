import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { IUser, Video } from "../../type";
import { BASE_URL } from "../../utils";

interface Iprops {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideo: Video[];
  };
}

const Profile = ({ data }: Iprops) => {
  const { user, userVideos, userLikedVideo } = data;
  const [showUserVideos, setshowUserVideos] = useState(true);
  const [videosList, setvideosList] = useState<Video[]>([]);
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setvideosList(userVideos);
    } else {
      setvideosList(userLikedVideo);
    }
  }, [showUserVideos, userLikedVideo, userVideos]);
  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg:white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user Profile"
            layout="responsive"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
            {user.userName.replaceAll(" ", "")}{" "}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 md:text-xl text-xs">
            {user.userName}
          </p>
        </div>
      </div>
      <div className="">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg:white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
            onClick={() => setshowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setshowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/Profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
