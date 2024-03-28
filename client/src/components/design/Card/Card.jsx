
const Card = ({ profile }) => {
  return (
    <div className="card">
      <img src={profile?.image} alt={profile?.name} />
      <h2>{profile?.name}</h2>
      <p>{profile?.bio}</p>
    </div>
  );
};

export default Card;