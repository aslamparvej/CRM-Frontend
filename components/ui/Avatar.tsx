import { View, Text, Image } from "react-native";

interface AvatarProps {
  name?: string;
  uri?: string;
  size?: number;
  color?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  uri,
  size = 40,
  color,
}) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";
  const colors = [
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-cyan-500",
  ];
  const colorClass = color || colors[initials.charCodeAt(0) % colors.length];

  return (
    <View
      className={`items-center justify-center rounded-full ${!uri ? colorClass : ""} overflow-hidden`}
      style={{ width: size, height: size }}
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size }} />
      ) : (
        <Text
          className="text-white font-bold"
          style={{ fontSize: size * 0.38 }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
};

export default Avatar;
