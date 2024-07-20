export const transformProductTitleIntoLinkTitle = (title) => {
  return title.replaceAll(/\s/g, "-");
};

export const transformLinkTitleIntoProductTitle = (title) => {
  return title.replaceAll("-", " ");
};
