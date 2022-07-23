import axios from "axios";
import { BASE_URL } from "../../utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/router";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { IUser, Video } from "../../type";
import useAuthStore from "../../store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const [isAccounts, setisAccounts] = useState(true);
  const {allUsers} = useAuthStore();
  const Accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const Videos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg:white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${Accounts}`}
          onClick={() => setisAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${Videos}`}
          onClick={() => setisAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-05">
            {
                searchAccounts.length > 0 ? (
                    searchAccounts.map((user: IUser, index: number) => (
                        <Link key={index} href={`/profile/${user._id}`}>
                        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={50}
                              height={50}
                              className="rounded-full"
                              alt="user Profile"
                            />
                          </div>
                          <div className="xl:block">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}{" "}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400 text-xs">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                )
                :
                (
                    <NoResults text="No Account Found" />
                )
            }
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video, index) => <VideoCard post={video} key={index} />)
          ) : (
            <NoResults text={`No Video Results For ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
