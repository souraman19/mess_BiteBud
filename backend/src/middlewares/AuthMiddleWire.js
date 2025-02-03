import {User} from "./../models2.0/person/User.js";


//session-check middlewire
const sessionCheck = (req, res, next) => {
    console.log("req ses", req.session);
    if(req.session){
        next();
    } else {
        res.status(401).json({message: "Session expired, please login again"});
    }
}




//validate if all user data make correct sense or not
const validateUserData = (req, res, next) => {
    // console.log("here");
    const { firstName, lastName, phone, permanentAddress, nationality, hostel, gender, dateOfBirth, collegeMail, extraMail, bloodGroup } = req.body;

    // // Validate first name and last name
    // if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 1) {
    //     return res.status(400).json({ error: 'Invalid first name' });
    // }

    // if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 1) {
    //     return res.status(400).json({ error: 'Invalid last name' });
    // }

    // // Validate phone number
    // if (!phone || !phone.countryCode || !phone.phoneNo) {
    //     return res.status(400).json({ error: 'Phone details are required' });
    // }

    // const { countryCode, phoneNo } = phone;
    // if (!/^\+\d{1,3}$/.test(countryCode)) { // Example: +1, +44
    //     return res.status(400).json({ error: 'Invalid country code' });
    // }

    // if (!/^\d{10}$/.test(phoneNo)) { // Example: 10-digit phone number
    //     return res.status(400).json({ error: 'Invalid phone number' });
    // }

    // // Validate permanent address
    // if (!permanentAddress || !permanentAddress.country || !permanentAddress.state || !permanentAddress.pin || !permanentAddress.city) {
    //     return res.status(400).json({ error: 'Complete permanent address is required' });
    // }

    // const { country, state, pin, city } = permanentAddress;

    // // Validate postal code based on country
    // if (!validatePostalCode(country, pin)) {
    //     return res.status(400).json({ error: 'Invalid postal code for the selected country' });
    // }

    // // Validate other fields
    // if (!nationality || typeof nationality !== 'string' || nationality.trim().length < 1) {
    //     return res.status(400).json({ error: 'Invalid nationality' });
    // }

    // if (!hostel || typeof hostel !== 'string' || hostel.trim().length < 1) {
    //     return res.status(400).json({ error: 'Invalid hostel information' });
    // }

    // if (!gender || (gender !== 'Male' || gender !== 'Female' || gender !== 'Other' || gender !== "Prefer not to say")) {
    //     return res.status(400).json({ error: 'Invalid gender' });
    // }

    // if (!dateOfBirth || !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) { // YYYY-MM-DD format
    //     return res.status(400).json({ error: 'Invalid date of birth' });
    // }

    // if (!collegeMail || !/^[^\s@]+@mnnit.ac.in$/.test(collegeMail)) {
    //     return res.status(400).json({ error: 'Invalid college email' });
    // }

    // if (!extraMail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(extraMail)) {
    //     return res.status(400).json({ error: 'Invalid extra email' });
    // }

    // if (!bloodGroup || !/^(A|B|AB|O)[+-]$/.test(bloodGroup) || bloodGroup !== "Other" || bloodGroup !== "Prefer not to say") { // Example: A+, O-
    //     return res.status(400).json({ error: 'Invalid blood group' });
    // }

    // If all validations pass
    console.log("pass");
    next();
};

// Postal code validation function
const validatePostalCode = (country, postalCode) => {
    const postalCodePatterns = {
        'US': /^\d{5}(-\d{4})?$/, // ZIP Code (5 digits + optional 4 digits)
        'CA': /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/, // Canadian postal code (A1B 2C3)
        'UK': /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]{2}$/, // UK postal code
        'DE': /^\d{5}$/, // German postal code (5 digits)
        'AU': /^\d{4}$/, // Australian postal code (4 digits)
        'IN': /^\d{6}$/, // Indian postal code (6 digits)
        'JP': /^\d{3}-\d{4}$/, // Japanese postal code (123-4567)
    };

    const pattern = postalCodePatterns[country];
    return pattern ? pattern.test(postalCode) : false;
};



const checkUser = async (req, res, next) => {
    try{
        const {username, password} = req.body;
        if(username === "" || password === ""){
            console.log("Email or Password no one can empty");
        }
        // console.log(username, password);
        const result = await User.findOne({collegeMail: username});
        // console.log(result);
        if(result === null){
            console.log("User not found. Redirecting to register.");
            return res.status(201).json({message: "User not found"});
        }
        next();
    }catch(err){
        next(err);
    }
}




const authMiddleware = (req, res, next) => {
    // console.log("Checking authentication...");
    // console.log("reeq:", req);
    // console.log("Session Data:", req.session);
    // console.log("req.cookies['connect.sid']:", req.cookies['connect.sid']);
    // console.log("req.cookies:", req.cookies);
    // console.log("Cookies Received:", req);

    // return;

    if (!req.cookies || !req.cookies['connect.sid']) {
        return res.status(401).json({ message: "User not logged in. Session expired or missing."});
    }

    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "User not logged in. Session expired or missing." });
    }

    next(); // Proceed to the next middleware or route handler if authenticated
};


export {checkUser, validateUserData, sessionCheck, authMiddleware};

