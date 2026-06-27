import { Linking } from "react-native";

export const call = async (phone: string) => {
  await Linking.openURL(`tel:${phone}`);
};

export const whatsApp = async (phone: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);

  await Linking.openURL(
    `whatsapp://send?phone=${phone}&text=${encodedMessage}`,
  );
};

export const email = async (email: string, subject: string, message: string) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedMessage = encodeURIComponent(message);

  const url = `mailto:${email}?subject=${encodedSubject}&body=${encodedMessage}`;

  await Linking.openURL(url);
};
