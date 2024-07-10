import { collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import HeroCard from "../components/HeroCard";
import { AuthContext } from "../contexts/AuthContext";
import { FavouritesContext } from "../contexts/FavoritesContext";
import { db } from "../Firebase";
import { storage } from "../Firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

function Profile() {
  const { user } = useContext(AuthContext);
  const { favourites } = useContext(FavouritesContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [avatarModal, setAvatarModal] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setEditProfile(false);
    }
  };

  const formatDate = (timeStamp) => {
    if (!timeStamp || isNaN(timeStamp)) {
      return "Invalid Date";
    }

    const date = new Date(Number(timeStamp));

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const formattedDate = date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formattedDate;
  };

  const lastLoginDate = formatDate(user.metadata.lastLoginAt);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSaveAvatar = () => {
    changeAvatar()
      .catch((error) => {
        console.log("error uploading image:", error.message);
      })
      .finally(() => {
        setAvatarModal(false);
      });
  };
  console.log("user metadata:", user.metadata.lastLoginAt);

  const changeAvatar = async () => {
    if (!selectedAvatar) {
      return;
    } else {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const previousAvatarUrl = userData.avatarUrl;
          if (previousAvatarUrl) {
            const previousAvatarRef = ref(storage, previousAvatarUrl);
            await deleteObject(previousAvatarRef);
          }
        }

        const response = await fetch(selectedAvatar);
        const blob = await response.blob();
        // Upload image to Firebase Storage
        const storageRef = ref(
          storage,
          `images/${user.uid}/avatar/${selectedAvatar.split("/").pop()}`
        );
        await uploadBytes(storageRef, blob);
        // Get image download URL
        const avatarUrl = await getDownloadURL(storageRef);
        await setDoc(userRef, { avatarUrl }, { merge: true });
        setProfileImg(selectedAvatar);
        console.log("Image uploaded and user avatar updated.");
      } catch (error) {
        console.error("Error updating avatar:", error.message);
      }
    }
  };

  const handlefirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleSubmit = () => {
    // e.preventDefault();
    addAttribute(user, firstName, lastName).catch((error) => {
      console.log("error uploading image:", error.message);
    }).finally(() => {
      editProfileToggle(false);
    });
  };

  const addAttribute = async (user, firstName, lastName) => {
    const userId = user.uid;
    const newAttributes = {
      firstName: firstName,
      lastName: lastName,
    };
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, newAttributes, { merge: true });
      console.log("User attributes updated");
    } catch (error) {
      console.error("Error adding attributes:", error.message);
    }
  };
  const avatars = [
    "/images/avatars/avatar1.png",
    "/images/avatars/avatar2.png",
    "/images/avatars/avatar3.png",
    "/images/avatars/avatar4.png",
    "/images/avatars/avatar5.png",
    "/images/avatars/avatar6.png",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setProfileImg(userData.avatarUrl || "");
          setSelectedAvatar(userData.avatarUrl);
        }
      }
    };

    fetchUserData();
    const getAllFavourites = async () => {
      if (user) {
        try {
          const userRef = doc(db, `users/${user.uid}`);
          const heroFavRef = collection(userRef, "favourites");
          const querySnapShot = await getDocs(heroFavRef);
          const herosArray = [];
          querySnapShot.forEach((doc) => {
            const heroFav = {
              docId: doc.id,
              ...doc.data(),
            };
            herosArray.push(heroFav);
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getAllFavourites();
  }, [user]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAvatarModal = () => {
    setAvatarModal(!avatarModal);
  };
  const editProfileToggle = () => {
    setEditProfile(!editProfile);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
          <div className="avatar-container">
            <img
              className="avatar-profile"
              src={profileImg}
              alt="profile-avatar"
            />
            <button
              type="button"
              onClick={handleAvatarModal}
              className="button_primary small-font small-height"
            >
              Change Avatar
            </button>
          </div>
          <hr/>
        <div className="ph1" ref={divRef}>
          <div className="info-container">
            <div>
              <h4>First Name</h4>
              {editProfile ? (
                <input
                  type="text"
                  placeholder="Email"
                  name="psw"
                  value={firstName}
                  onChange={handlefirstNameChange}
                />
              ) : (
                <p>
                  {firstName.length !== 0 ? firstName : "Add your first Name"}
                </p>
              )}
            </div>
            <div>
              <h4>Last Name</h4>
              {editProfile ? (
                <input
                  type="text"
                  placeholder="last Name"
                  name="psw"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              ) : (
                <p>
                  {lastName.length !== 0 ? lastName : "Enter your last name"}
                </p>
              )}
            </div>
            <div>
              <h4>Last Login</h4>
              <p>{lastLoginDate}</p>
            </div>
          </div>
        <div className="edit-profile-button-container">
          {editProfile ? (
            <>
              <button
                className="button_primary small-font small-height"
                type="button"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="button_primary small-font small-height"
                type="button"
                onClick={editProfileToggle}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="button_primary small-font small-height"
              type="button"
              onClick={editProfileToggle}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
        </div>
      <div>
        {avatarModal && (
          <div className="modal">
            <div className="change-avatar-container">
              <h3>Select Your Avatar</h3>
              <div className="avatar-selection">
                {avatars.map((avatar) => (
                  <img
                    key={avatar}
                    src={avatar}
                    alt="avatar"
                    className={`avatar ${
                      selectedAvatar === avatar ? "selected" : ""
                    }`}
                    onClick={() => handleAvatarSelect(avatar)}
                  />
                ))}
              </div>
              <div className="change-avatar-buttons">
                <button
                  className="button_primary small-font small-height"
                  onClick={handleAvatarModal}
                >
                  Cancel
                </button>
                <button
                  className="button_primary small-font small-height"
                  onClick={handleSaveAvatar}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <h3 className="home-title center-element">Your Favourite Heroes</h3>

        <div className="heros-container fh-container" >
          {favourites &&
            favourites.map((hero) => {
              return <HeroCard key={hero.id} hero={hero} />;
            })}
          ;
        </div>
      </div>
    </div>
  );
}

export default Profile;
