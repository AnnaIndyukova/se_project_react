import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({ cards, onSelectCard, handleCreateModal }) => {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        cards={cards}
        onSelectCard={onSelectCard}
        onCreateModal={handleCreateModal}
      />
    </section>
  );
};
export default Profile;
