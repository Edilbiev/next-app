import ProfileHeader from "./ProfileHeader";
import ProfileEditor from "./ProfileEditor";
import ProfileMenu from "./ProfileMenu";
import React, { useState } from "react";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <ProfileHeader toggleEditMode={toggleEditMode} editMode={editMode} />

      {editMode ? (
        <ProfileEditor toggleEditMode={toggleEditMode} />
      ) : (
        <ProfileMenu />
      )}
    </>
  );
}
