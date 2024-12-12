import MessMenuPerSlot from "./../models2.0/mess_menu/MessMenuPerSlot.js";


const getAllMessMenu = async (req, res) => {
    try{
        //console.log("Fetching mess menu");
        const hostel = req.query.hostel;
        const messmenu = await MessMenuPerSlot.find({hostel: hostel});
        res.status(200).json(messmenu);
    }catch(error){
        console.error("Error fetching mess menu:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const addMessMenu = async (req, res) => {
    try{
        // console.log("req.body", req.body);
        const day = req.body.day;
        const title = req.body.name;
        const slot = req.body.mealTime;
        const hostel = req.body.hostel;
    
        const newMealItem = new MessMenuPerSlot({
            day,
            slot,
            hostel,
            menuItem: {
                title: title,
                menuItemId: null
            }
        });

        await newMealItem.save();
      
        res.json({message:"new meal Item added"});
      }catch(error){
        console.error("Error in adding meal items:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}



export {getAllMessMenu, addMessMenu};