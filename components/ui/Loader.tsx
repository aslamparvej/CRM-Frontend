import { ActivityIndicator, Text, View } from "react-native";

interface LoaderProps {
  size?: 'small' | 'large';
  fullScreen?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'large', fullScreen, text }) => {
  if (fullScreen) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size={size} color="#6366F1" />
        {text && <Text className="text-slate-400 mt-3 text-sm">{text}</Text>}
      </View>
    );
  }
  return (
    <View className="items-center justify-center py-8">
      <ActivityIndicator size={size} color="#6366F1" />
      {text && <Text className="text-slate-400 mt-2 text-sm">{text}</Text>}
    </View>
  );
};

export default Loader;
