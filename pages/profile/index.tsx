import { useQuery } from "@apollo/client";
import React from "react";
import { ME } from "../../apollo/queiries";
import Loader from "../../components/common/Loader";
import ContentContainer from "../../components/Layout/ContentContainer";
import ProfileAside from "../../components/Profile/ProfileAside";

interface Props {}

const Profile = (props: Props) => {
  const { data, loading, error } = useQuery(ME);

  if (loading) {
    return <Loader />;
  }
  console.log("🚀 ~ file: index.tsx ~ line 12 ~ Profile ~ data", data);

  if (error) {
    return <div>ooops error</div>;
  }

  return (
    <ContentContainer>
      <ProfileAside user={data?.user} />
    </ContentContainer>
  );
};

export default Profile;
