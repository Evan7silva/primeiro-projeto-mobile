import AsyncStorage from "@react-native-async-storage/async-storage";

const LINK_STORAGE_KEY = "links-storage";

type LinkStorage = {
  id: string;
  name: string;
  url: string;
  category: string;
};

async function get(): Promise<LinkStorage[]> {
  const storage = await AsyncStorage.getItem(LINK_STORAGE_KEY);
  const response = storage ? JSON.parse(storage) : [];
  return response;
}

async function save(newLinks: LinkStorage) {
  try {
    const storageLinks = await get();
    const updatedLinks = JSON.stringify([...storageLinks, newLinks]);

    await AsyncStorage.setItem(LINK_STORAGE_KEY, updatedLinks);
  } catch (error) {
    throw error;
  }
}

export const LinkStorage = { get, save };
