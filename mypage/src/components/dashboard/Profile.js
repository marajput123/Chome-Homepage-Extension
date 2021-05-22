import React, { useEffect, useState } from "react";
import Setting from "../settings/Setting";
import TabController from "../settings/TabController";
import WellnessGraph from "../graphs/WellnessGraph";

import { fetchGetWellness } from "../../fetch/fetchWellness";
import { connect } from "react-redux";
import Loader from "../loader/Loader";

const Profile = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const { userId } = props;
    const cb = (data) => {
      setUserData(data);
    };
    fetchGetWellness(userId, cb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderComp = () => {
    return (
      <>
        <WellnessGraph wellnessData={userData.wellness} />
        <Setting userId={props.userId} />
        <TabController userId={props.userId} />
      </>
    );
  };

  return <>{userData ? renderComp() : <Loader />}</>;
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(Profile);
