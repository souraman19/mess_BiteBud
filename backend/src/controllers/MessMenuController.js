import MessMenuPerSlot from "./../models2.0/mess_menu/MessMenuPerSlot.js";
import MenuItem from "./../models2.0/mess_menu/MenuItem.js";

const getAllMessMenu = async (req, res) => {
  try {
    //console.log("Fetching mess menu");
    const hostel = req.query.hostel;
    const messmenu = await MessMenuPerSlot.find({ hostel: hostel });
    res.status(200).json(messmenu);
  } catch (error) {
    console.error("Error fetching mess menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addMessMenu = async (req, res) => {
  try {
    // console.log("req.body", req.body);
    const day = req.body.day;
    const title = req.body.name;
    const slot = req.body.mealTime;
    const hostel = req.body.hostel;
    const calorie_amount = req.body.calorie_amount;
    const calorie_unit = req.body.calorie_unit;

    const newMealItem = new MessMenuPerSlot({
      day,
      slot,
      hostel,
      menuItem: {
        title: title,
        menuItemId: null,
        calorie: {
          amount: calorie_amount,
          unit: calorie_unit,
        },
      },
    });
    await newMealItem.save();

    res.json({ message: "new meal Item added" });
  } catch (error) {
    console.error("Error in adding meal items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMessMenu = async (req, res) => {
  try {
    const { menuId } = req.query;
    // console.log("req query ----", req.query);
    const deletedItem = await MessMenuPerSlot.deleteOne({ menuId: menuId });

    res.status(200).json({ message: "deleted sucessfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editMessMenu = async (req, res) => {
  try {
    const menuId = req.body.menuId;
    const newMealName = req.body.newMealName;
    const respon = await MessMenuPerSlot.updateOne(
      { menuId: menuId },
      {
        $set: {
          menuItem: { title: newMealName },
        },
      }
    );
    res.status(200).json({ message: "Meal updated successfully" });
  } catch (error) {
    console.error("Error in editing mealName", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addMenuItem = async (req, res) => {
  try {
    // console.log("req.body", req.body);
    const title = req.body.itemName;
    const calorie = req.body.calorie;
    const caloriePerUnit = req.body.caloriePerUnit;
    const hostel = req.body.hostel;

    const newMenuItem = new MenuItem({
      title,
      hostel: hostel,
      calorie: {
        amount: calorie,
        unit: caloriePerUnit,
      },
    });

    // console.log("done");

    await newMenuItem.save();

    res.json({ message: "new menu Item added" });
  } catch (error) {
    console.error("Error in adding menu items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMenuItem = async (req, res) => {
  try {
    //console.log("Fetching mess menu");
    const hostel = req.query.hostel;
    const items = await MenuItem.find({ hostel: hostel });
    res.status(200).json({items: items});
  } catch (error) {
    console.error("Error fetching mess menu:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getAllMessMenu,
  addMessMenu,
  deleteMessMenu,
  editMessMenu,
  addMenuItem,
  getMenuItem,
};
