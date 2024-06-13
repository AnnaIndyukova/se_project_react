import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  cards,
  onSelectCard,
  onCreateModal,
  onEditProfileModal,
  onLogout,
  onCardLike,
  isLoggedIn,
}) => {
  return (
    <section className="profile">
      <SideBar onEditProfileModal={onEditProfileModal} onLogout={onLogout} />
      <ClothesSection
        cards={cards}
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </section>
  );
};
export default Profile;
