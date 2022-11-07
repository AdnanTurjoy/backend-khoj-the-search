app.post("/Khoj_the_search_Page", (req, res) => {
  try {
    const newKhoj = new Khoj();
    const { input_values, search_value } = req.body;
    const search = Number(search_value);
    const values = input_values.split(/[ , ]/);
    let found = false;
    for (let index = 0; index < values.length; index++) {
      const element = Number(values[index]);
      if (element === search_value) {
        found = true;
      }
    }
    const sortedValues = values.toString();
    newKhoj.input_values = sortedValues;
    if (found) {
      newKhoj.status = "success";
      res.send(found);
    } else {
      newKhoj.status = "not found";
      res.send(found);
    }
    newKhoj.save();
  } catch (error) {
    res.status(500).send(error);
  }
});
