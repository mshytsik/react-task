export const fetchGroup = async (group) => {
  let fetchLink;
  let groupKey;

  switch (group) {
    case "category":
      fetchLink = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
      groupKey = "strCategory";
      break;
    case "ingredient":
      fetchLink = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
      groupKey = "strIngredient";
      break;
    default:
      fetchLink = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
      groupKey = "strArea";
  }

  let response = await fetch(fetchLink);
  let values = await response.json();

  const data = {
    group: group,
    values: values?.meals?.map((item) => item[groupKey]),
  };

  return data;
};
