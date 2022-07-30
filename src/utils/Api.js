import axios from 'axios';

export const getSectionsDetail = async (children) => {
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/pages/${children}/sections`)
      .then((res) => res.data)
      .catch((err) => {
        console.warn(err);
        return null;
      });
    if (!data) throw new Error('Cannot get API blabla');
    return data;
  } catch (err) {
    console.warn(err);
    return [];
  }
};

export const getMenuHeader = async () => {
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/menus/header`)
      .then((res) => res.data)
      .catch((err) => {
        console.warn(err);
        return null;
      });
    if (!data) throw new Error('Cannot get API blabla');
    return data;
  } catch (err) {
    console.warn(err);
    return [];
  }
};

export const getText = async () => {
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/texts`)
      .then((res) => res.data)
      .catch((err) => {
        console.warn(err);
        return null;
      });
    if (!data) throw new Error('Cannot get API blabla');
    return data;
  } catch (err) {
    console.warn(err);
    return [];
  }
};

export const getTheme = async () => {
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/themes`)
      .then((res) => res.data)
      .catch((err) => {
        console.warn(err);
        return null;
      });
    if (!data) throw new Error('Cannot get API blabla');
    return data;
  } catch (err) {
    console.warn(err);
    return [];
  }
};

export const getLocation = async () => {
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/locations`)
      .then((res) => res.data)
      .catch((err) => {
        console.warn(err);
        return null;
      });
    if (!data) throw new Error('Cannot get API blabla');
    return data;
  } catch (err) {
    console.warn(err);
    return [];
  }
};

export const getArticle = async () => {
  try {
    const data = await axios
      .get(`${process.env.REACT_APP_API_URL}/articles`)
      .then((res) => res.data)
      .catch((err) => {
        console.warn(err);
        return null;
      });
    if (!data) throw new Error('Cannot get API blabla');
    return data;
  } catch (err) {
    console.warn(err);
    return [];
  }
};
