export const fetchGroups = async () => {
  let data = {};

  let groups = {
    category: {
      link: "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
      key: "strCategory",
    },
    ingredient: {
      link: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
      key: "strIngredient",
    },
    country: {
      link: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
      key: "strArea",
    },
  };

  for (let group in groups) {
    let response = await fetch(groups[group].link);
    let values = await response.json();
    data[group] = values?.meals?.map((item) => item[groups[group].key]);
  }

  return data;
};
