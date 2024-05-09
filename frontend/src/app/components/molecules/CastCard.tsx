import Image from "next/image";

interface CastCardProps {
  name: string;
  image: string;
  characterName: string;
}

function CastCard(props: CastCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg w-32 shadow-lg">
      <div className="relative w-32 h-40 ">
        <Image
          alt="character image"
          src={props.image}
          fill
          className="absolute object-cover rounded-t-lg overflow-hidden"
        />
      </div>

      <div className="space-y-2 p-2">
        <p>{props.characterName}</p>
        <p>{props.name}</p>
      </div>
    </div>
  );
}

export default CastCard;
