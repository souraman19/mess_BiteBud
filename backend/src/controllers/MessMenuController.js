import MessMenuPerSlot from "./../models2.0/mess_menu/MessMenuPerSlot.js";


const getAllMessMenu = async (req, res) => {
    try{
        console.log("Fetching mess menu");
        const messmenu = await MessMenuPerSlot.find();
        res.status(200).json(messmenu);
    }catch(error){
        console.error("Error fetching mess menu:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export {getAllMessMenu};