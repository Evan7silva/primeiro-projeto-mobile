import AsyncStorage from "@react-native-async-storage/async-storage";

const LINK_STORAGE_KEY = "links-storage";

export type LinkStorage = {
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

async function remove(id: string) {
  try {
    const storageLink = await get();
    const updatedLinks = storageLink.filter((link) => link.id !== id);
    await AsyncStorage.setItem(LINK_STORAGE_KEY, JSON.stringify(updatedLinks));
  } catch (error) {
    throw error;
  }
}
export const linkStorage = { get, save, remove };
